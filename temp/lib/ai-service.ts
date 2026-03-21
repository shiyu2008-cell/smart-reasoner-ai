/**
 * AI 服务客户端 - 用于简历优化
 * 
 * 此模块提供与 AI 服务交互的接口，支持流式响应。
 * 目前为模拟实现，后续可替换为真实 AI API（如 OpenAI、DeepSeek）。
 */



// AI 服务配置类型
export interface AIServiceConfig {
  apiKey?: string;
  baseURL?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

// 优化请求参数
export interface OptimizeResumeRequest {
  resume: string;
  jobDescription: string;
  config?: Partial<AIServiceConfig>;
}

// 评估请求参数
export interface EvaluateResumeRequest {
  resume: string;
  jobDescription: string;
  config?: Partial<AIServiceConfig>;
}

// 评估响应数据结构
export interface EvaluationResult {
  score: number; // 0-100匹配度分数
  allowedOptimization: boolean; // 是否允许一键优化
  analysis: string; // 综合能力分析
  strengths: string[]; // 优势列表
  weaknesses: string[]; // 不足列表
  optimizationSuggestions: string[]; // 优化建议（为后续优化提供依据）
  learningRecommendations: string[]; // 个性化学习建议
  alternativeCareers: string[]; // 备选职业方向
  rejectionReasons: string[]; // 拒绝优化原因（如果匹配度过低或存在逻辑错误）
}

// AI 响应状态类型
export type AIState = 'idle' | 'processing' | 'streaming' | 'completed' | 'error';

// 流式输出数据块
export interface StreamChunk {
  content: string;
  isComplete?: boolean;
  error?: string;
}



/**
 * 优化简历 - 使用 DeepSeek V3 API
 * 接收简历和职位描述，返回流式响应
 * 
 * @param request 优化请求参数
 * @returns 包含流式响应的 Promise
 */
export async function optimizeResume(
  request: OptimizeResumeRequest
): Promise<ReadableStream<string>> {
  console.log('DeepSeek 优化请求:', {
    resumeLength: request.resume.length,
    jobDescriptionLength: request.jobDescription.length,
    config: request.config
  });

  // 从环境变量获取 DeepSeek API 密钥
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY 环境变量未设置');
  }

  // 创建 OpenAI 兼容客户端，指向 DeepSeek API
  // 注意：后续版本可能会使用 createOpenAI 客户端，目前直接使用 fetch 调用

  // 记录完整的请求配置
  console.log('DeepSeek配置验证:', {
    apiKeyPrefix: apiKey?.substring(0, 12) + '...',
    baseURL: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
    resumeLength: request.resume.length,
    jobDescriptionLength: request.jobDescription.length,
    timestamp: new Date().toISOString()
  });

  // 构建系统提示词（优化版）
  const systemPrompt = `# Role
你是一位拥有10年经验的资深技术招聘专家，精通ATS筛选规则和简历优化。

# Context
候选人简历内容：
{RESUME_TEXT}

目标职位 JD：
{JOB_DESCRIPTION}

# Task
请根据职位描述优化候选人的简历，直接输出优化后的完整简历内容。

# Requirements
1. **直接输出最终结果**：不要输出任何思考过程、分析步骤或中间结论，直接提供优化后的简历内容。
2. **专业简历格式**：输出标准的简历格式，建议包含“专业摘要”、“工作经验”、“项目经历”、“技能”、“教育背景”等章节。使用清晰的标题和项目符号（•）列表。
3. **STAR法则自然应用**：描述经历时，请遵循“背景-任务-行动-结果”的逻辑，但**绝对不要使用“Situation:”、“Task:”、“Action:”、“Result:”等显式标签**。应使用自然的业务语言进行整合。
   *示例*： “在用户留存率下降的背景下，我主导了用户唤醒活动策划，通过A/B测试优化推送策略，最终使次月留存率提升了15%。”
4. **关键词植入**：从职位描述中提取高频关键词和技能，自然地融入简历内容。
5. **量化成果**：尽可能使用具体数字、百分比和时间来量化成就。
6. **语气**：专业、自信、客观。

# 输出要求
- 输出为纯文本，不要使用JSON、Markdown代码块、或任何结构化数据标记。
- 确保内容连贯、逻辑清晰，是一份可直接使用的专业简历。
- 不要添加任何解释性前缀，如“优化后的简历如下：”。`;

  // 替换占位符
  const finalPrompt = systemPrompt
    .replace('{RESUME_TEXT}', request.resume)
    .replace('{JOB_DESCRIPTION}', request.jobDescription);

  try {
    console.log('开始调用 DeepSeek API，模型: deepseek-chat (自定义流式实现)');
    console.log('系统提示词长度:', finalPrompt.length);
    
    // 自定义流式实现，直接使用DeepSeek Chat Completions API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: finalPrompt },
          { role: 'user', content: '请根据简历和职位描述生成优化建议' }
        ],
        temperature: 1.0,
        max_tokens: 2000,
        stream: true
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API 错误: ${response.status} ${response.statusText}\n${errorText}`);
    }

    console.log('DeepSeek API 调用成功，获取到流式响应');
    
    // 创建转换流，将SSE流转换为字符串流
    const decoder = new TextDecoder();
    return new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  controller.close();
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(content);
                  }
                } catch {
                  // 忽略解析错误，继续处理下一个数据块
                }
              }
            }
          }
        } catch (error) {
          console.error('流式读取错误:', error);
          controller.error(error);
        } finally {
          reader.releaseLock();
          controller.close();
        }
      }
    });
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error);
    console.error('错误详情:', {
      name: error instanceof Error ? error.name : '未知',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new Error(`AI 服务调用失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 评估简历与职位匹配度 - 使用 DeepSeek API
 * 接收简历和职位描述，返回结构化评估结果
 * 
 * @param request 评估请求参数
 * @returns 包含结构化评估结果的 Promise
 */
export async function evaluateResume(
  request: EvaluateResumeRequest
): Promise<EvaluationResult> {
  console.log('DeepSeek 评估请求:', {
    resumeLength: request.resume.length,
    jobDescriptionLength: request.jobDescription.length,
    config: request.config
  });

  // 从环境变量获取 DeepSeek API 密钥
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY 环境变量未设置');
  }

  // 构建评估专用提示词（优化版）
  const evaluationPrompt = `# Role
你是一位资深技术招聘专家，精通ATS筛选和职位匹配分析。

# Context
候选人简历内容：
{RESUME_TEXT}

目标职位描述：
{JOB_DESCRIPTION}

# Task
请对候选人简历与目标职位的匹配度进行全面评估，并**直接输出一个且仅一个JSON对象**作为评估结果。

# 评分维度与标准（总分100分）
请严格按以下维度独立评分后求和：
1. **技能匹配度 (0-40分)**: 简历技能与JD核心要求的匹配程度。
2. **经验相关度 (0-30分)**: 工作/项目经历与职位要求的相关性。
3. **资质符合度 (0-20分)**: 教育、证书等资质与要求的符合度。
4. **整体呈现 (0-10分)**: 简历结构、量化成果、表述的专业性。

# 评估结果字段说明
- **score**: 整数，上述维度得分之和。
- **allowedOptimization**: 布尔值。总分 ≥ 30 且未发现严重逻辑错误/虚假信息则为 true。
- **analysis**: 字符串，300字内综合分析。
- **strengths**: 字符串数组，3-5个核心优势。
- **weaknesses**: 字符串数组，3-5个关键不足。
- **optimizationSuggestions**: 字符串数组，3-5条具体优化建议。
- **learningRecommendations**: 字符串数组，3-5条学习建议。
- **alternativeCareers**: 字符串数组，2-3个备选职业方向（若匹配度低）。
- **rejectionReasons**: 字符串数组，若不允许优化则填写原因。

# 输出要求
- **必须直接输出JSON**，不要包含任何思考过程、解释或额外文本。
- **JSON必须严格符合以下结构**：
{
  "score": 85,
  "allowedOptimization": true,
  "analysis": "...",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "optimizationSuggestions": ["..."],
  "learningRecommendations": ["..."],
  "alternativeCareers": ["..."],
  "rejectionReasons": []
}`;

  // 替换占位符
  const finalPrompt = evaluationPrompt
    .replace('{RESUME_TEXT}', request.resume)
    .replace('{JOB_DESCRIPTION}', request.jobDescription);

  // 记录完整的请求配置
  console.log('DeepSeek评估配置:', {
    apiKeyPrefix: apiKey.substring(0, 12) + '...',
    baseURL: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
    promptLength: finalPrompt.length,
    timestamp: new Date().toISOString()
  });

    console.log('开始调用 DeepSeek API 进行评估，模型: deepseek-chat');
    
    // 添加超时控制
    const TIMEOUT_MS = 30000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      // 调用DeepSeek Chat Completions API（非流式）
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: '你是一位专业的招聘专家，负责简历评估。请严格按要求输出JSON格式的评估结果。' },
            { role: 'user', content: finalPrompt }
          ],
          temperature: 1.0, // 进一步降低温度以减少随机性
          seed: 42, // 固定随机种子确保一致性
          max_tokens: 2000,
          stream: false, // 非流式，一次性获取完整JSON
          response_format: { type: "json_object" } // 强制JSON格式输出
        }),
        signal: controller.signal  // 添加超时信号
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DeepSeek API 错误: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const result = await response.json();
      console.log('DeepSeek API 评估调用成功，收到响应');
      
      // 提取并解析响应内容
      const content = result.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('API响应中没有有效内容');
      }

      // 安全的JSON解析函数
      const safeParseJSON = (text: string): EvaluationResult => {
        // 先尝试直接解析
        try {
          return JSON.parse(text);
        } catch {}
        
        // 查找完整的 JSON 对象边界
        let braceCount = 0;
        let startIndex = -1;
        let endIndex = -1;
        
        for (let i = 0; i < text.length; i++) {
          if (text[i] === '{') {
            if (braceCount === 0) startIndex = i;
            braceCount++;
          } else if (text[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              endIndex = i;
              break;
            }
          }
        }
        
        if (startIndex !== -1 && endIndex !== -1) {
          try {
            return JSON.parse(text.substring(startIndex, endIndex + 1));
          } catch {}
        }
        
        throw new Error('无法提取有效JSON');
      };

      // 分数验证函数
      const validateScore = (score: number, previousScore?: number): boolean => {
        if (score < 0 || score > 100) return false;
        
        // 如果提供前次分数，检查突变
        if (previousScore !== undefined) {
          const delta = Math.abs(score - previousScore);
          // 单次变化超过 50 分视为异常
          if (delta > 50) {
            console.warn(`分数突变警告: ${previousScore} → ${score} (Δ${delta})`);
            return false;
          }
        }
        
        return true;
      };

      // 尝试解析JSON
      let parsedResult: EvaluationResult;
      try {
        parsedResult = safeParseJSON(content);
      } catch (error) {
        console.error('无法解析JSON响应:', error);
        console.error('原始响应内容:', content);
        throw new Error('评估结果格式错误，无法解析JSON');
      }

      // 验证必需字段
      if (!validateScore(parsedResult.score)) {
        throw new Error(`评估分数无效: ${parsedResult.score}，应在 0-100 范围内`);
      }
      if (typeof parsedResult.allowedOptimization !== 'boolean') {
        throw new Error('允许优化标志必须为布尔值');
      }
      if (typeof parsedResult.analysis !== 'string' || parsedResult.analysis.trim().length < 10) {
        throw new Error('分析内容过短或无效');
      }

      // 数组验证辅助函数
      const validateStringArray = (arr: unknown, fieldName: string, minLength = 0) => {
        if (!Array.isArray(arr)) {
          throw new Error(`${fieldName} 必须是数组`);
        }
        // 验证数组元素类型
        for (const item of arr) {
          if (typeof item !== 'string' || item.trim().length === 0) {
            throw new Error(`${fieldName} 中的元素必须是有效字符串`);
          }
        }
        if (arr.length < minLength) {
          throw new Error(`${fieldName} 至少需要 ${minLength} 个元素`);
        }
      };

      // 验证所有数组字段
      validateStringArray(parsedResult.strengths, '优势列表', 1);
      validateStringArray(parsedResult.weaknesses, '不足列表', 1);
      validateStringArray(parsedResult.optimizationSuggestions, '优化建议', 1);
      validateStringArray(parsedResult.learningRecommendations, '学习建议', 0);
      validateStringArray(parsedResult.alternativeCareers, '备选职业', 0);
      validateStringArray(parsedResult.rejectionReasons, '拒绝原因', 0);

      console.log('评估结果解析成功:', {
        score: parsedResult.score,
        allowedOptimization: parsedResult.allowedOptimization,
        strengthsCount: parsedResult.strengths.length,
        weaknessesCount: parsedResult.weaknesses.length,
        suggestionsCount: parsedResult.optimizationSuggestions.length
      });

      return parsedResult;

  } catch (error) {
    console.error('DeepSeek 评估API调用失败:', error);
    console.error('错误详情:', {
      name: error instanceof Error ? error.name : '未知',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new Error(`简历评估失败: ${error instanceof Error ? error.message : '未知错误'}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * 真实 AI 服务集成占位符
 * 后续可接入 OpenAI、DeepSeek 等 AI 提供者
 */
export class AIService {
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      model: 'gpt-4-turbo-preview',
      temperature: 1.0,
      maxTokens: 2000,
      ...config
    };
  }

  /**
   * 使用真实 AI API 优化简历
   * 当前为占位符，后续需要实现具体集成
   * 
   * 接入真实 AI 服务的步骤：
   * 1. 安装相应的 SDK：`npm install openai` 或 `npm install @deepseek/api`
   * 2. 在环境变量中设置 API 密钥：OPENAI_API_KEY 或 DEEPSEEK_API_KEY
   * 3. 取消下面的注释代码，并根据需要调整参数
   * 4. 确保处理流式响应，返回 ReadableStream<string>
   */
  async optimizeResumeStream(request: OptimizeResumeRequest): Promise<ReadableStream<string>> {
    console.log('真实 AI 服务调用（未实现）:', request);
    
    // 构建提示词
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prompt = `请优化以下简历以匹配职位描述：
    
简历：
${request.resume}

职位描述：
${request.jobDescription}

请提供具体的优化建议，包括关键词匹配、成就量化、技能突出和项目经验调整。`;

    // 目前返回模拟流，后续替换为真实 API 调用
    
    // === 示例 1: OpenAI API 集成 ===
    // 1. 安装: npm install openai
    // 2. 设置环境变量: OPENAI_API_KEY
    /*
    import OpenAI from 'openai';
    const openai = new OpenAI({ 
      apiKey: this.config.apiKey || process.env.OPENAI_API_KEY 
    });
    const stream = await openai.chat.completions.create({
      model: this.config.model || 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
      temperature: this.config.temperature,
      max_tokens: this.config.maxTokens,
    });
    
    // 转换 OpenAI 流到标准 ReadableStream
    return new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(content);
          }
        }
        controller.close();
      }
    });
    */

    // === 示例 2: DeepSeek API 集成 ===
    // 1. 安装: npm install @deepseek/api
    // 2. 设置环境变量: DEEPSEEK_API_KEY
    /*
    import DeepSeek from '@deepseek/api';
    const deepseek = new DeepSeek({ 
      apiKey: this.config.apiKey || process.env.DEEPSEEK_API_KEY 
    });
    const stream = await deepseek.chat.completions.create({
      model: this.config.model || 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
      temperature: this.config.temperature,
      max_tokens: this.config.maxTokens,
    });
    
    // 转换 DeepSeek 流到标准 ReadableStream
    return new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(content);
          }
        }
        controller.close();
      }
    });
    */

    // === 示例 3: 使用 Vercel AI SDK 的 streamText ===
    // 1. 确保已安装: npm install ai
    // 2. 使用 streamText 函数，支持多种提供商
    /*
    import { streamText } from 'ai';
    import { createOpenAI } from '@ai-sdk/openai';
    
    const openai = createOpenAI({
      apiKey: this.config.apiKey || process.env.OPENAI_API_KEY,
    });
    
    const stream = await streamText({
      model: openai(this.config.model || 'gpt-4-turbo'),
      prompt: prompt,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
    });
    
    return stream.toReadableStream();
    */

    // 当前返回模拟流，用于开发和测试
    return optimizeResume(request);
  }
}

// 默认导出实例
export const aiService = new AIService();

// 辅助函数：处理流式响应
export async function processStream(
  stream: ReadableStream<string>,
  onChunk: (chunk: string) => void,
  onComplete?: () => void
): Promise<void> {
  const reader = stream.getReader();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onComplete?.();
        break;
      }
      onChunk(value);
    }
  } finally {
    reader.releaseLock();
  }
}