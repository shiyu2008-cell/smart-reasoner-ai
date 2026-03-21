"use client";

import { useState, useCallback, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, FileText, Briefcase, CheckCircle2, Sparkles, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResultDisplay } from "@/components/ResultDisplay";
import { EvaluationDisplay } from "@/components/EvaluationDisplay";
import { AIState, EvaluationResult } from "@/lib/ai-service";
import { useAuth } from "@/lib/auth-client";

export default function DashboardPage() {
  // 状态管理
  const [resume, setResume] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    resume?: string;
    jobDescription?: string;
  }>({});
  // AI 相关状态
  const [aiState, setAiState] = useState<AIState>('idle');
  const [optimizedResult, setOptimizedResult] = useState<string>("");
  // 思考过程和最终答案分离
  const [thinkingProcess, setThinkingProcess] = useState<string>("");
  const [finalAnswer, setFinalAnswer] = useState<string>("");
  const [hasReachedFinalAnswer, setHasReachedFinalAnswer] = useState<boolean>(false);

  // 评估相关状态
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  const [lastEvaluationInputHash, setLastEvaluationInputHash] = useState<string>("");
  const [lastEvaluatedHash, setLastEvaluatedHash] = useState<string>(""); // 上一次成功评估时的文本哈希

  // 评估流程控制状态
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [needsReevaluation, setNeedsReevaluation] = useState<boolean>(false);

  // 剩余次数管理
  const [evaluationRemaining, setEvaluationRemaining] = useState<number>(0);
  const [optimizationRemaining, setOptimizationRemaining] = useState<number>(0);
  const [isLoadingCounts, setIsLoadingCounts] = useState<boolean>(true);

  // 用户认证状态
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // 兑换码相关状态
  const [redeemCode, setRedeemCode] = useState<string>("万柏666");
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  // 加载保存的使用次数
  useEffect(() => {
    const savedEvaluation = sessionStorage.getItem('freeRegistrationEvaluationRemaining');
    const savedOptimization = sessionStorage.getItem('freeRegistrationOptimizationRemaining');
    
    if (savedEvaluation !== null) {
      setEvaluationRemaining(parseInt(savedEvaluation, 10));
    } else {
      // 无登录时也能有两次完整使用次数
      setEvaluationRemaining(2);
    }
    
    if (savedOptimization !== null) {
      setOptimizationRemaining(parseInt(savedOptimization, 10));
    } else {
      // 无登录时也能有两次完整使用次数
      setOptimizationRemaining(2);
    }
    
    setIsLoadingCounts(false); // 加载完成
  }, []);

  // 保存使用次数到sessionStorage
  useEffect(() => {
    sessionStorage.setItem('freeRegistrationEvaluationRemaining', evaluationRemaining.toString());
  }, [evaluationRemaining]);

  useEffect(() => {
    sessionStorage.setItem('freeRegistrationOptimizationRemaining', optimizationRemaining.toString());
  }, [optimizationRemaining]);

  // 加载保存的简历数据
  useEffect(() => {
    const savedResume = sessionStorage.getItem('dashboardResume');
    const savedJobDescription = sessionStorage.getItem('dashboardJobDescription');
    const savedOptimizedResult = sessionStorage.getItem('dashboardOptimizedResult');
    
    if (savedResume !== null) {
      setResume(savedResume);
    }
    if (savedJobDescription !== null) {
      setJobDescription(savedJobDescription);
    }
    if (savedOptimizedResult !== null) {
      setOptimizedResult(savedOptimizedResult);
    }
  }, []);

  // 保存简历数据到sessionStorage
  useEffect(() => {
    sessionStorage.setItem('dashboardResume', resume);
  }, [resume]);

  useEffect(() => {
    sessionStorage.setItem('dashboardJobDescription', jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    sessionStorage.setItem('dashboardOptimizedResult', optimizedResult);
  }, [optimizedResult]);

  // 字符计数（可选功能）
  const resumeCharCount = resume.length;
  const jobDescriptionCharCount = jobDescription.length;
  
  // 清理效果

  
  // 输入验证
  const validateInputs = useCallback(() => {
    const errors: { resume?: string; jobDescription?: string } = {};
    
    if (!resume.trim()) {
      errors.resume = "请填写简历内容";
    } else if (resume.trim().length < 50) {
      errors.resume = "简历内容过短，建议至少50个字符";
    }
    
    if (!jobDescription.trim()) {
      errors.jobDescription = "请填写职位描述";
    } else if (jobDescription.trim().length < 20) {
      errors.jobDescription = "职位描述过短，建议至少20个字符";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [resume, jobDescription]);

  // 处理输入变化
  const handleResumeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setResume(value);
    // 清除该字段的验证错误
    if (validationErrors.resume) {
      setValidationErrors(prev => ({ ...prev, resume: undefined }));
    }
    setError(null);
    // 标记需要重新评估
    if (hasEvaluated) {
      setNeedsReevaluation(true);
    }
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJobDescription(value);
    // 清除该字段的验证错误
    if (validationErrors.jobDescription) {
      setValidationErrors(prev => ({ ...prev, jobDescription: undefined }));
    }
    setError(null);
    // 标记需要重新评估
    if (hasEvaluated) {
      setNeedsReevaluation(true);
    }
  };

  // 计算输入内容的哈希（用于检测是否真正变化）
  const calculateInputHash = useCallback((resumeText: string, jobText: string): string => {
    // 使用更可靠的哈希算法
    const simpleHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转换为32位整数
      }
      return hash;
    };
    
    const resumeHash = simpleHash(resumeText.trim());
    const jobHash = simpleHash(jobText.trim());
    return `${resumeHash}_${jobHash}`;
  }, []);

  // 执行评估API调用
  const performEvaluation = useCallback(async (isManualTrigger: boolean = false) => {
    // 验证输入
    if (!resume.trim() || !jobDescription.trim()) {
      return;
    }

    // 检查是否已在评估中，避免重复调用
    if (isEvaluating) {
      console.log('评估已在运行中，跳过重复调用');
      return;
    }

    // 计算当前输入哈希
    const currentHash = calculateInputHash(resume, jobDescription);
    
    // 如果输入未变化且已有评估结果，跳过
    if (currentHash === lastEvaluationInputHash && evaluationResult) {
      console.log('输入未变化，使用缓存结果');
      return;
    }

    setLastEvaluationInputHash(currentHash);
    
    // 开始新评估前清除旧结果，避免新旧混合
    setEvaluationResult(null);
    setEvaluationError(null);
    setIsEvaluating(true);

    try {
      console.log('开始调用评估API...', isManualTrigger ? '(手动触发)' : '(自动触发)');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时
      
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume,
          jobDescription,
          config: {
            temperature: 0.3,
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || `评估失败: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        // 验证响应数据是否属于当前请求
        const responseHash = calculateInputHash(resume, jobDescription);
        if (responseHash === currentHash) {
          // 仅在结果发生变化时更新显示
          const shouldUpdate = !evaluationResult || 
            evaluationResult.score !== result.data.score ||
            evaluationResult.allowedOptimization !== result.data.allowedOptimization ||
            evaluationResult.analysis !== result.data.analysis;
          
          if (shouldUpdate) {
            setEvaluationResult(result.data);
            console.log('评估结果已更新:', result.data);
          } else {
            console.log('评估结果未变化，跳过更新');
          }
          
          setHasEvaluated(true);
          setNeedsReevaluation(false);
          // 记录上一次成功评估的文本哈希
          setLastEvaluatedHash(currentHash);
        } else {
          console.log('评估结果已过期，输入已变化，丢弃结果');
        }
      } else {
        throw new Error(result.error || '评估结果格式错误');
      }
    } catch (err) {
      // 如果是取消请求，不显示错误
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('评估请求已取消');
        return;
      }
      
      const errorMessage = err instanceof Error ? err.message : '评估过程中出现错误';
      setEvaluationError(errorMessage);
      setEvaluationResult(null);
      console.error('评估错误:', err);
    } finally {
      setIsEvaluating(false);
    }
  }, [resume, jobDescription, calculateInputHash, isEvaluating, lastEvaluationInputHash, evaluationResult]);


  // 清除评估结果

  // 处理评估按钮点击（一键评估/重新评估）
  const handleEvaluateClick = () => {
    // 验证输入
    if (!resume.trim() || !jobDescription.trim()) {
      setError("请填写简历和职位描述");
      return;
    }

    // 检查输入是否足够长
    if (resume.trim().length < 50 || jobDescription.trim().length < 20) {
      setError("简历内容至少50个字符，职位描述至少20个字符");
      return;
    }

    // 检查剩余评估次数
    if (evaluationRemaining <= 0) {
      setError("评估次数已用完，请购买套餐继续使用");
      return;
    }

    // 检查文本是否实质性修改
    const currentHash = calculateInputHash(resume, jobDescription);
    if (lastEvaluatedHash && currentHash === lastEvaluatedHash) {
      setError("文本未发生改变，请修改文本后再点击评估按钮");
      return;
    }

    // 减少评估次数
    setEvaluationRemaining(prev => prev - 1);
    
    // 执行手动评估
    performEvaluation(true);
  };

  // 处理一键优化（当评估允许时）
  const handleOptimizeClick = () => {
    // 检查剩余优化次数
    if (optimizationRemaining <= 0) {
      setError("优化次数已用完，请购买套餐继续使用");
      return;
    }

    // 检查文本是否实质性修改
    const currentHash = calculateInputHash(resume, jobDescription);
    if (lastEvaluatedHash && currentHash === lastEvaluatedHash) {
      setError("文本未发生改变，请修改文本后再点击优化按钮");
      return;
    }
    
    if (evaluationResult?.allowedOptimization) {
      handleSubmit();
    } else {
      setError("根据评估结果，当前简历与职位匹配度不足，无法进行优化");
    }
  };

  // 处理兑换码兑换
  const handleRedeemCode = async () => {
    // 检查用户是否已登录
    if (!isAuthenticated) {
      setRedeemError("请先登录后再使用兑换码");
      return;
    }

    if (!redeemCode.trim()) {
      setRedeemError("请输入兑换码");
      return;
    }

    setIsRedeeming(true);
    setRedeemError(null);
    setRedeemSuccess(null);

    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: redeemCode.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '兑换失败');
      }

      if (result.success) {
        setRedeemSuccess(result.message || '兑换成功！');
        // 更新本地使用次数 - 添加数据验证
        if (result.data?.evaluationAdded && typeof result.data.evaluationAdded === 'number') {
          const added = Math.max(0, Math.min(result.data.evaluationAdded, 100)); // 限制范围
          setEvaluationRemaining(prev => prev + added);
        }
        if (result.data?.optimizationAdded && typeof result.data.optimizationAdded === 'number') {
          const added = Math.max(0, Math.min(result.data.optimizationAdded, 100)); // 限制范围
          setOptimizationRemaining(prev => prev + added);
        }
        // 清空输入
        setRedeemCode("");
      } else {
        throw new Error(result.error || '兑换失败');
      }
    } catch (err) {
      setRedeemError(err instanceof Error ? err.message : '兑换过程中出现错误');
    } finally {
      setIsRedeeming(false);
    }
  };

  // 处理表单提交 - 调用AI优化服务
  const handleSubmit = async () => {
    // 验证输入
    if (!validateInputs()) {
      setError("请检查输入内容");
      return;
    }

    // 减少优化次数
    setOptimizationRemaining(prev => prev - 1);

    // 设置AI状态
    setAiState('processing');
    setIsLoading(true);
    setError(null);
    setOptimizedResult(""); // 清空之前的结果

    try {
      // 重置所有结果状态
      setOptimizedResult("");
      setThinkingProcess("");
      setFinalAnswer("");
      setHasReachedFinalAnswer(false);

      // 调用优化API
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume,
          jobDescription,
          // 可传递配置，如模型、温度等
          config: {
            model: 'deepseek-reasoner',
            temperature: 0.7,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API请求失败: ${response.status}`);
      }

      // 处理流式响应
      setAiState('streaming');
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法读取响应流');
      }

      const decoder = new TextDecoder('utf-8');
      let accumulatedResult = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setAiState('completed');
          // 优化完成，无需解析JSON评分数据
          break;
        }

        const chunk = decoder.decode(value);
        accumulatedResult += chunk;
        
        // 检查是否包含【最终答案】标记
        if (!hasReachedFinalAnswer && accumulatedResult.includes('【最终答案】')) {
          setHasReachedFinalAnswer(true);
          // 分割内容：标记之前是思考过程，之后是最终答案
          const parts = accumulatedResult.split('【最终答案】');
          const thinkingPart = parts[0];
          const answerPart = parts[1] || '';
          
          setThinkingProcess(thinkingPart);
          setFinalAnswer(answerPart);
          // 同时更新optimizedResult用于向后兼容
          setOptimizedResult(accumulatedResult);
        } else if (hasReachedFinalAnswer) {
          // 已经到达标记，将新内容添加到最终答案
          const newFinalAnswer = finalAnswer + chunk;
          setFinalAnswer(newFinalAnswer);
          setOptimizedResult(accumulatedResult);
          
          // 增量JSON解析已移除，避免分数跳动
        } else {
          // 尚未到达标记，将内容添加到思考过程
          setThinkingProcess(accumulatedResult);
          setOptimizedResult(accumulatedResult);
        }
      }

    } catch (err) {
      setAiState('error');
      setError(err instanceof Error ? err.message : "处理过程中出现错误，请稍后重试");
      console.error("优化请求错误:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 输入是否有效（用于按钮状态）
  const isFormValid = resume.trim().length > 0 && jobDescription.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10">
      {/* 页面标题 */}
      <div className="mb-8 md:mb-12 text-center animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl gradient-text">
          AI简历优化工作台
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          输入您的简历和职位描述，AI将为您提供个性化的优化建议
        </p>
        
        {/* 流程步骤指示器 */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            {[
              { step: 1, label: "输入简历", description: "填写或上传简历内容" },
              { step: 2, label: "输入职位描述", description: "填写目标职位要求" },
              { step: 3, label: "AI评估", description: "智能评估匹配度" },
              { step: 4, label: "优化建议", description: "获取专业优化建议" }
            ].map((item, index, array) => (
              <div key={item.step} className="flex items-center">
                {/* 步骤节点 */}
                <div className="relative">
                  <div className={`flex items-center justify-center h-10 w-10 rounded-full border-2 ${
                    index < 2 
                      ? "bg-gradient-to-br from-primary to-accent border-primary text-primary-foreground" 
                      : "bg-background border-muted-foreground/30 text-muted-foreground"
                  } font-semibold transition-all duration-300`}>
                    {item.step}
                  </div>
                  {/* 步骤标签 */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-32 text-center">
                    <div className={`text-sm font-medium ${
                      index < 2 ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </div>
                
                {/* 连接线（除最后一个步骤外） */}
                {index < array.length - 1 && (
                  <div className={`h-0.5 w-16 ${
                    index < 1 ? "bg-gradient-to-r from-primary to-accent" : "bg-muted-foreground/30"
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* 当前步骤说明 */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent animate-glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium gradient-text-energy">当前步骤: 输入简历</p>
                <p className="text-xs text-muted-foreground">请填写或上传您的简历内容以继续</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主工作区 */}
      <div className="container-responsive max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 左侧：简历输入区 */}
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">简历输入</h2>
                  <p className="text-sm text-muted-foreground">粘贴或输入您的简历内容</p>
                </div>
              </div>
              {resumeCharCount > 0 && (
                <div className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  resumeCharCount < 50 
                    ? "bg-destructive/10 text-destructive" 
                    : "bg-primary/10 text-primary"
                )}>
                  {resumeCharCount} 字符
                </div>
              )}
            </div>
            {/* 上传简历文件按钮 */}
            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="group flex items-center gap-2"
                onClick={() => {
                  // TODO: 实现文件上传功能
                  alert('文件上传功能开发中...');
                }}
              >
                <Upload className="h-4 w-4" />
                上传 PDF/Word 文件
              </Button>
              <span className="text-xs text-muted-foreground">
                支持 PDF、Word 文档格式，最大 10MB
              </span>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder={`请在此粘贴您的简历内容，例如：
• 个人信息：姓名、联系方式
• 工作经历：公司、职位、工作时间、工作内容
• 教育背景：学校、专业、学历
• 技能专长：技术栈、语言能力、证书
• 项目经验：项目名称、角色、成果

建议内容不少于200字符，以获得更准确的优化建议。`}
                value={resume}
                onChange={handleResumeChange}
                className="min-h-[400px] resize-y font-mono text-sm"
                disabled={isLoading}
              />
              
              {validationErrors.resume && (
                <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <span>{validationErrors.resume}</span>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>支持中文、英文等多种语言</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>内容将进行加密处理，确保隐私安全</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>建议包含量化成果（如&quot;提升效率30%&quot;）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：JD输入区 */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-accent">
                  <Briefcase className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">职位描述</h2>
                  <p className="text-sm text-muted-foreground">输入目标职位的描述和要求</p>
                </div>
              </div>
              {jobDescriptionCharCount > 0 && (
                <div className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  jobDescriptionCharCount < 20 
                    ? "bg-destructive/10 text-destructive" 
                    : "bg-primary/10 text-primary"
                )}>
                  {jobDescriptionCharCount} 字符
                </div>
              )}
            </div>
            {/* 上传职位描述文件按钮 */}
            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="group flex items-center gap-2"
                onClick={() => {
                  // TODO: 实现文件上传功能
                  alert('职位描述文件上传功能开发中...');
                }}
              >
                <Upload className="h-4 w-4" />
                上传职位描述文件
              </Button>
              <span className="text-xs text-muted-foreground">
                支持 PDF、Word、TXT 文档格式，最大 10MB
              </span>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder={`请在此输入职位描述，例如：
职位名称：高级前端开发工程师
公司行业：互联网/科技
岗位职责：
1. 负责公司核心产品的前端架构设计和开发
2. 与产品、设计、后端团队协作，完成功能迭代
3. 优化前端性能，提升用户体验
4. 技术栈要求：React, TypeScript, Next.js, Tailwind CSS
5. 其他要求：3年以上经验，良好的沟通能力

尽可能详细地描述职位要求，有助于AI提供更精准的优化建议。`}
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                className="min-h-[400px] resize-y font-mono text-sm"
                disabled={isLoading}
              />
              
              {validationErrors.jobDescription && (
                <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <span>{validationErrors.jobDescription}</span>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>可从招聘网站复制完整的职位描述</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>重点突出技能要求和工作经验要求</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>包含关键词有助于提升匹配度</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中间按钮区域 - sticky固定在底部 */}
        <div className="sticky bottom-6 z-50 mt-12 lg:mt-16">
          {/* 连接线（桌面端） */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent z-0" />
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
          </div>

          {/* 按钮容器 */}
          <div className="relative z-10 flex justify-center">
            <div className="bg-background px-6 py-4 rounded-2xl border shadow-soft animate-pulse-subtle">
              <Button
                size="lg"
                onClick={handleEvaluateClick}
                disabled={!isFormValid || isLoading || isEvaluating}
                className={cn(
                  "group relative h-14 px-10 bg-gradient-to-r from-primary to-accent text-lg font-semibold shadow-glow hover:shadow-lg hover:shadow-primary/30 transition-all duration-300",
                  (!isFormValid || isLoading || isEvaluating) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isEvaluating ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
                    <span className="font-medium">AI评估中</span>
                    <div className="flex items-center gap-1 ml-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-ai-thinking" />
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-ai-thinking" style={{ animationDelay: "0.2s" }} />
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-ai-thinking" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary-foreground" />
                    <span className="font-medium">AI思考中</span>
                    <div className="flex items-center gap-1 ml-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-ai-thinking" />
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-ai-thinking" style={{ animationDelay: "0.2s" }} />
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-ai-thinking" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                ) : hasEvaluated && needsReevaluation ? (
                  <>
                    重新评估
                    <svg
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </>
                ) : hasEvaluated && evaluationResult && !evaluationResult.allowedOptimization ? (
                  <div className="flex items-center justify-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <span className="font-medium">重新评估</span>
                  </div>
                ) : (
                  <>
                    一键评估
                    <svg
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l3 3 9-9M9 12l-3 3m3-3V3"
                      />
                    </svg>
                  </>
                )}
              </Button>
              {/* 剩余次数显示 */}
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {isLoadingCounts ? (
                  <p className="text-muted-foreground animate-pulse">加载剩余次数中...</p>
                ) : (
                  <p>剩余次数：评估 {evaluationRemaining} 次，优化 {optimizationRemaining} 次</p>
                )}
              </div>

              {/* 兑换码输入 */}
              <div className="mt-4 p-4 border border-primary/20 rounded-xl bg-gradient-to-br from-primary/5 to-transparent">
                {isAuthLoading ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground animate-pulse">检查登录状态中...</p>
                  </div>
                ) : !isAuthenticated ? (
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-primary mb-2">兑换码功能</h4>
                    <p className="text-xs text-muted-foreground mb-3">登录后即可使用兑换码获取额外使用次数</p>
                    <Button
                      onClick={() => window.location.href = '/auth/login'}
                      size="sm"
                      variant="outline"
                      className="mt-2"
                    >
                      前往登录
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-3">
                      <h4 className="text-sm font-semibold text-primary">兑换码</h4>
                      <p className="text-xs text-muted-foreground mt-1">输入兑换码获取额外使用次数</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        type="text"
                        placeholder="万柏666"
                        value={redeemCode}
                        readOnly
                        disabled={isRedeeming}
                        className="flex-1"
                        autoComplete="one-time-code"
                      />
                      <Button
                        onClick={handleRedeemCode}
                        disabled={isRedeeming || !redeemCode.trim()}
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        {isRedeeming ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            兑换中
                          </>
                        ) : (
                          "立即兑换"
                        )}
                      </Button>
                    </div>
                    
                    {/* 兑换结果提示 */}
                    {redeemError && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-destructive animate-fade-in">
                        <AlertCircle className="h-3 w-3" />
                        <span>{redeemError}</span>
                      </div>
                    )}
                    
                    {redeemSuccess && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-green-600 animate-fade-in">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>{redeemSuccess}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mt-6 flex justify-center animate-fade-in">
              <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 max-w-md">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </div>
          )}

          {/* 表单状态提示 */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  resumeCharCount > 0 ? "bg-green-500" : "bg-muted"
                )} />
                <span>简历 {resumeCharCount > 0 ? "已填写" : "待填写"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  jobDescriptionCharCount > 0 ? "bg-green-500" : "bg-muted"
                )} />
                <span>职位描述 {jobDescriptionCharCount > 0 ? "已填写" : "待填写"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  isFormValid ? "bg-green-500" : "bg-muted"
                )} />
                <span>优化准备 {isFormValid ? "就绪" : "待完成"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 简历智能评估结果 */}
        {(evaluationResult || isEvaluating || evaluationError) && (
          <div className="mt-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  简历智能评估报告
                </h2>
                <p className="text-sm text-muted-foreground">
                  AI基于您的简历与职位描述生成的匹配度分析
                </p>
              </div>
            </div>
            
            <EvaluationDisplay
              evaluation={evaluationResult!}
              isLoading={isEvaluating}
              error={evaluationError}
              onOptimizeClick={handleOptimizeClick}
              compact={false}
              className="shadow-lg border-2 border-purple-200/30 dark:border-purple-800/30 rounded-2xl overflow-hidden"
            />
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                评估结果将作为&quot;一键评估&quot;的依据，只有匹配度合格的简历才能进行AI优化。
              </p>
            </div>
          </div>
        )}

        {/* AI 优化结果展示 */}
        {(aiState !== 'idle' || optimizedResult) && (
          <div className="mt-12 animate-slide-up">
            {/* 评分与分析面板 */}
            {(evaluationResult?.score !== undefined || (evaluationResult?.weaknesses?.length ?? 0) > 0 || evaluationResult?.analysis) && (
              <div className="mb-6 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 gradient-text">匹配度分析</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {evaluationResult?.score !== undefined && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">匹配分数</span>
                        <span className="text-2xl font-bold gradient-text">{evaluationResult?.score}/100</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-[width] duration-700"
                          style={{ width: `${evaluationResult?.score}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {(evaluationResult?.weaknesses?.length ?? 0) > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">缺失关键词</span>
                        <span className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded-full">
                          {evaluationResult?.weaknesses?.length} 个
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {evaluationResult?.weaknesses?.slice(0, 5).map((weakness, index) => (
                          <span key={index} className="px-3 py-1 bg-background border border-muted rounded-full text-sm">
                            {weakness}
                          </span>
                        ))}
                        {(evaluationResult?.weaknesses?.length ?? 0) > 5 && (
                          <span className="px-3 py-1 text-muted-foreground text-sm">
                            +{(evaluationResult?.weaknesses?.length ?? 0) - 5} 更多
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {evaluationResult?.analysis && (
                    <div className="md:col-span-3 space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">分析建议</span>
                      <p className="text-sm leading-relaxed">{evaluationResult?.analysis}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* 思考过程显示 */}
            {thinkingProcess && (
              <div className="mb-6 p-4 rounded-xl border border-muted/30 bg-gradient-to-b from-muted/5 to-transparent">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-muted-foreground">AI思考过程</h4>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">实时思考中...</span>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <pre className="thinking-process-text whitespace-pre-wrap">
                    {thinkingProcess}
                  </pre>
                </div>
              </div>
            )}

            {/* 最终答案显示 */}
            <ResultDisplay
              content={finalAnswer || optimizedResult}
              isStreaming={aiState === 'streaming' && hasReachedFinalAnswer}
              typingSpeed={20}
              autoType={false}
              onClear={() => {
                setOptimizedResult("");
                setThinkingProcess("");
                setFinalAnswer("");
                setHasReachedFinalAnswer(false);
                setAiState('idle');
              }}
              className="shadow-lg border-2 border-primary/20"
            />
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  aiState === 'processing' ? "bg-yellow-500 animate-pulse" :
                  aiState === 'streaming' ? "bg-green-500 animate-pulse" :
                  aiState === 'completed' ? "bg-green-500" :
                  aiState === 'error' ? "bg-destructive" : "bg-muted"
                )} />
                <span>
                  {aiState === 'processing' ? '处理中...' :
                   aiState === 'streaming' ? '流式输出中...' :
                   aiState === 'completed' ? '优化完成' :
                   aiState === 'error' ? '优化失败' : '等待开始'}
                </span>
              </div>
              {optimizedResult && (
                <div className="flex items-center gap-2">
                  <span>字符数: {optimizedResult.length}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-16 p-6 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">如何使用工作台？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <h4 className="font-medium">填写内容</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                在左右两侧分别输入您的简历内容和目标职位描述。内容越详细，优化效果越好。
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <h4 className="font-medium">开始评估</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                点击&quot;一键评估&quot;按钮，AI将评估您的简历与职位的匹配度。
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <h4 className="font-medium">查看结果</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                查看AI生成的优化建议，包括关键词匹配、内容重组、格式优化等。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}