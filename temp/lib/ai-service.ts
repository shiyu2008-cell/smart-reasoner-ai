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

  // 构建系统提示词（安全边界版）
  const systemPrompt = `# Role
你是一位拥有10年经验的资深技术招聘专家，精通ATS筛选规则和简历优化。你严格遵守事实准确性和职业伦理准则。

# Context
候选人简历内容：
{RESUME_TEXT}

目标职位 JD：
{JOB_DESCRIPTION}

# Task
请根据职位描述优化候选人的简历，直接输出优化后的完整简历内容。优化过程中必须严格遵守以下安全边界。

# 安全边界规则（绝对禁止）

## 红线条款（违反任何一条将终止服务）
1. ❌ **禁止杜撰**：不能添加简历中未提及的任何技能、经验、证书、项目、教育背景。
2. ❌ **禁止夸大**：不能夸大职位级别、项目规模、团队人数、个人贡献、成就影响。
3. ❌ **禁止虚构**：不能创建不存在的公司、职位、时间、成果数据、量化指标。

## 内容边界限制
1. **事实准确性原则**：
   - 所有优化必须严格基于候选人提供的简历内容。
   - 不能添加简历中没有明确提及的任何信息。
   - 不能改变事实性质（如将“参与”改为“主导”，除非简历明确说明）。

2. **技能映射限制**：
   - 只能优化简历中已有技能的表述方式，不能添加新技能。
   - 同义词替换允许（如“熟悉”→“掌握”），但技能范围不得扩大。
   - 不能从职位描述中引入简历未提及的技能关键词。

3. **量化数据限制**：
   - 如原文无量化数据，不得添加任何数字、百分比、时间等量化信息。
   - 如原文有量化数据，只能微调表达方式，不能改变数值（调整幅度≤20%）。
   - 不能将定性描述改为量化表述（如不能将“提高了效率”改为“提升了30%效率”）。

4. **时间线与经历限制**：
   - 不能改变工作经历的时间顺序、时长、公司名称、职位名称。
   - 不能添加或删除任何一段工作经历。
   - 时间表述可以规范化（如“2023.03-2024.05”→“2023年3月-2024年5月”）。

# 优化要求（允许操作）
1. **表达优化**：改进句子结构、专业术语、行业标准用语，提升语言流畅度。
2. **格式规范**：标准化简历结构、标题、项目符号，提升可读性。
3. **关键词强调**：突出原文中已有的核心技能关键词，提升ATS匹配度。
4. **STAR法则自然应用**：描述经历时，请遵循“背景-任务-行动-结果”的逻辑，但**绝对不要使用“Situation:”、“Task:”、“Action:”、“Result:”等显式标签**。应使用自然的业务语言进行整合。
   *示例*： “在用户留存率下降的背景下，我主导了用户唤醒活动策划，通过A/B测试优化推送策略，最终使次月留存率提升了15%。”
5. **语气调整**：专业、自信、客观，符合目标职位行业规范。

# 输出要求
- 输出为纯文本，不要使用JSON、Markdown代码块、或任何结构化数据标记。
- 确保内容连贯、逻辑清晰，是一份可直接使用的专业简历。
- 不要添加任何解释性前缀，如“优化后的简历如下：”。
- 在输出结束时，添加一行安全声明：“[AI优化完成 - 所有内容均基于原始简历事实]”`;

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

  // 构建评估专用提示词（安全边界版）
  const evaluationPrompt = `# Role
你是一位资深技术招聘专家，精通ATS筛选和职位匹配分析。你严格遵守事实准确性原则，只评估简历中明确提及的内容。

# Context
候选人简历内容：
{RESUME_TEXT}

目标职位描述：
{JOB_DESCRIPTION}

# Task
请对候选人简历与目标职位的匹配度进行全面评估，并**直接输出一个且仅一个JSON对象**作为评估结果。评估过程中必须严格遵守以下安全边界。

# 评估安全边界（绝对禁止）

## 评估原则
1. **禁止推断**：不能基于简历内容推断未明确说明的信息。只能评估简历中明确提及的内容。
2. **禁止假设**：不能假设候选人具备未提及的技能、经验或资质。只能基于实际文本评估。
3. **事实核对**：如果发现简历内容有明显矛盾、不合理之处或潜在虚假信息，必须在rejectionReasons中明确说明。
4. **文本依据**：所有评估结论必须有明确的简历文本依据，不能凭空评价。

## 评分维度与标准（总分100分）
请严格按以下维度独立评分后求和，**每个维度评分必须有具体的简历文本依据**：

1. **技能匹配度 (0-40分)**: 简历中**明确提及**的技能与JD核心要求的匹配程度。
   - 评分依据：必须列出简历中具体的技能关键词
   - 不能为简历添加未提及的技能进行匹配

2. **经验相关度 (0-30分)**: 简历中**明确描述**的工作/项目经历与职位要求的相关性。
   - 评分依据：必须基于简历中具体的经历描述
   - 不能假设简历未提及的职责或项目

3. **资质符合度 (0-20分)**: 简历中**明确列出**的教育、证书等资质与要求的符合度。
   - 评分依据：必须基于简历中具体的教育背景和证书
   - 不能为简历添加未提及的资质

4. **整体呈现 (0-10分)**: 简历结构、量化成果、表述的专业性（基于实际文本）。
   - 评分依据：必须基于简历实际的格式和表述
   - 不能假设未明确表述的内容

# 评估结果字段说明（增强版）
- **score**: 整数，上述维度得分之和。必须基于严格的文本依据。
- **allowedOptimization**: 布尔值。总分 ≥ 30 且**未发现严重逻辑错误/虚假信息/事实矛盾**则为 true。如果发现潜在虚假信息，必须设为false。
- **analysis**: 字符串，300字内综合分析。**必须注明每个主要结论的简历文本依据**。
- **strengths**: 字符串数组，3-5个核心优势。**每个优势必须对应简历中的具体内容**。
- **weaknesses**: 字符串数组，3-5个关键不足。**必须基于简历中缺失或不足的实际内容**。
- **optimizationSuggestions**: 字符串数组，3-5条具体优化建议。**建议必须基于简历现有内容的改进，不能建议添加未提及的内容**。
- **learningRecommendations**: 字符串数组，3-5条学习建议。**必须基于职位要求与简历实际内容的差距**。
- **alternativeCareers**: 字符串数组，2-3个备选职业方向（若匹配度低）。**必须基于简历中实际具备的技能和经验**。
- **rejectionReasons**: 字符串数组，若不允许优化则填写原因。**必须明确说明具体的文本矛盾、逻辑错误或潜在虚假信息**。

# 真实性检查要求
在完成评估前，必须执行以下检查：
1. **一致性检查**：检查简历中时间线是否合理，经历是否有矛盾。
2. **合理性检查**：检查成就描述是否合理（如初级职位不应有"主导大型跨国项目"）。
3. **文本依据检查**：确保所有评估结论都有明确的简历文本支持。

# 输出要求
- **必须直接输出JSON**，不要包含任何思考过程、解释或额外文本。
- **JSON必须严格符合以下结构**：
{
  "score": 85,
  "allowedOptimization": true,
  "analysis": "基于简历中明确提及的...【必须注明文本依据】",
  "strengths": ["Java编程能力（简历第3行提及）", "项目经验（简历第5-8行描述）"],
  "weaknesses": ["缺乏云计算经验（简历未提及）", "英语能力未明确（简历未说明）"],
  "optimizationSuggestions": ["优化Java项目描述的表达方式", "突出简历中已有的团队协作经验"],
  "learningRecommendations": ["学习云计算基础知识", "考取相关专业证书"],
  "alternativeCareers": ["Java开发工程师", "后端开发工程师"],
  "rejectionReasons": []
}
- **重要**：strengths和weaknesses中的每个条目建议标注简历文本位置（如"简历第X行提及"）`;

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