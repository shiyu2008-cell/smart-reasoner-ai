import * as React from "react"
import { cn } from "@/lib/utils"
import { ScoreGauge } from "./ScoreGauge"
import type { EvaluationResult } from "@/lib/ai-service"
import { CheckCircle, AlertCircle, Lightbulb, TrendingUp, Target, BookOpen, Sparkles } from "lucide-react"

export interface EvaluationDisplayProps {
  /**
   * 评估结果数据
   */
  evaluation: EvaluationResult
  /**
   * 是否显示加载状态
   */
  isLoading?: boolean
  /**
   * 错误信息
   */
  error?: string | null
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 点击"一键优化"按钮时的回调
   */
  onOptimizeClick?: () => void
  /**
   * 是否紧凑模式（用于小屏幕）
   */
  compact?: boolean
}

/**
 * 评估结果展示组件
 * 
 * 将结构化评估数据转换为用户友好的纯文本展示，支持动态效果和交互
 */
export const EvaluationDisplay = React.memo(function EvaluationDisplay({
  evaluation,
  isLoading = false,
  error = null,
  className,
  onOptimizeClick,
  compact = false
}: EvaluationDisplayProps) {

  
  // 获取分数背景颜色类名
  const getScoreBgClass = (score: number): string => {
    if (score >= 80) return "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
    if (score >= 60) return "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
    if (score >= 30) return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
    return "bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800"
  }
  
  // 获取优化状态颜色类名
  const getOptimizationStatusClass = (allowed: boolean): string => {
    return allowed 
      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" 
      : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
  }
  
  // 获取优化状态图标
  const getOptimizationStatusIcon = (allowed: boolean) => {
    return allowed ? (
      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
    )
  }
  
  // 获取优化状态文本
  const getOptimizationStatusText = (allowed: boolean): string => {
    return allowed 
      ? "可以开始一键优化" 
      : "暂时无法优化"
  }
  
  // 获取优化状态描述
  const getOptimizationStatusDescription = (allowed: boolean, rejectionReasons: string[]): string => {
    if (allowed) {
      return "简历与职位基本匹配，AI将根据评估建议进行优化"
    } else if (rejectionReasons.length > 0) {
      return `根据评估结果，当前简历与职位匹配度不足，无法进行优化。原因：${rejectionReasons.join("；")}`
    } else {
      return "根据评估结果，当前简历与职位匹配度不足，无法进行优化。匹配度过低或存在逻辑错误，建议修改简历或选择其他职位"
    }
  }
  
  // 加载状态
  if (isLoading) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto p-6", className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // 错误状态
  if (error) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto p-6", className)}>
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            评估加载失败
          </h3>
          <p className="text-red-700 dark:text-red-400">
            {error}
          </p>
        </div>
      </div>
    )
  }
  
  // 空状态
  if (!evaluation) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto p-6", className)}>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 p-8 text-center">
          <Target className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            等待评估结果
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            请输入简历和职位描述，系统将自动进行智能评估
          </p>
        </div>
      </div>
    )
  }
  
  // 主内容
  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      {/* 头部评分区域 */}
      <div 
        className={cn(
          "mb-8 p-6 rounded-2xl border transition-all duration-300 animate-slide-up shadow-glow bg-noise",
          getScoreBgClass(evaluation.score),
          compact && "p-4"
        )}
        style={{ animationDelay: '0.1s' }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* 评分圆盘 */}
          <div className="flex-shrink-0">
            <ScoreGauge 
              score={evaluation.score} 
              size={compact ? 160 : 200}
              strokeWidth={compact ? 10 : 12}
              animationDuration={2000}
            />
          </div>
          
          {/* 评分详情 */}
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                简历匹配度评估报告
              </h2>
            </div>
            
            {/* 综合能力分析 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                综合能力分析
              </h3>
              <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {evaluation.analysis}
                </p>
              </div>
            </div>
            
            {/* 优化状态 */}
            <div className={cn(
              "p-4 rounded-lg border flex items-start gap-3",
              getOptimizationStatusClass(evaluation.allowedOptimization)
            )}>
              {getOptimizationStatusIcon(evaluation.allowedOptimization)}
              <div>
                <h4 className="font-semibold mb-1">
                  {getOptimizationStatusText(evaluation.allowedOptimization)}
                </h4>
                <p className="text-sm opacity-90">
                  {getOptimizationStatusDescription(
                    evaluation.allowedOptimization, 
                    evaluation.rejectionReasons
                  )}
                </p>
                {evaluation.allowedOptimization && onOptimizeClick && (
                  <button
                    onClick={onOptimizeClick}
                    className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all interactive-scale flex items-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    一键优化简历
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 详细信息区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 优势列表 */}
        {evaluation.strengths.length > 0 && (
          <div 
            className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-5 animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                核心优势 ({evaluation.strengths.length})
              </h3>
            </div>
            <ul className="space-y-3">
              {evaluation.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 hover-lift transition-all duration-200 rounded-lg p-2 -mx-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {strength}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* 不足列表 */}
        {evaluation.weaknesses.length > 0 && (
          <div 
            className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-5 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                <AlertCircle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
                待改进方面 ({evaluation.weaknesses.length})
              </h3>
            </div>
            <ul className="space-y-3">
              {evaluation.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3 hover-lift transition-all duration-200 rounded-lg p-2 -mx-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {weakness}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* 建议区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 优化建议 */}
        {evaluation.optimizationSuggestions.length > 0 && (
          <div 
            className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-5 animate-slide-up"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <Lightbulb className="w-5 h-5 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                简历优化建议 ({evaluation.optimizationSuggestions.length})
              </h3>
            </div>
            <div className="text-sm text-blue-800/80 dark:text-blue-300/80 mb-3">
              以下建议将作为AI优化的直接依据：
            </div>
            <ul className="space-y-3">
              {evaluation.optimizationSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {suggestion}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* 学习建议 */}
        {evaluation.learningRecommendations.length > 0 && (
          <div 
            className="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 p-5 animate-slide-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                <BookOpen className="w-5 h-5 text-purple-700 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                个性化学习建议 ({evaluation.learningRecommendations.length})
              </h3>
            </div>
            <ul className="space-y-3">
              {evaluation.learningRecommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-400">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {recommendation}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* 备选职业（如果匹配度较低） */}
      {evaluation.alternativeCareers.length > 0 && (
        <div 
          className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 to-gray-100/30 dark:from-gray-900/20 dark:to-gray-800/20 p-5 mb-8 animate-slide-up"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-gray-700 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              备选职业方向
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            基于您的简历和能力，以下职业方向可能更加适合：
          </p>
          <div className="flex flex-wrap gap-3">
            {evaluation.alternativeCareers.map((career, index) => (
              <div 
                key={index}
                className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {career}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 评估说明 */}
      <div 
        className="text-xs text-gray-500 dark:text-gray-400 text-center pt-4 border-t border-gray-200 dark:border-gray-800 animate-fade-in"
        style={{ animationDelay: '0.8s' }}
      >
        <p>
          本评估结果由AI智能生成，基于简历内容与职位描述的匹配度分析。
          评估结果仅作为参考建议，具体决策请结合实际情况。
        </p>
      </div>
    </div>
  )
})