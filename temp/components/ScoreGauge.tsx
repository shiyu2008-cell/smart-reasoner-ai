import * as React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

export interface ScoreGaugeProps {
  /**
   * 评分值 (0-100)
   */
  score: number
  /**
   * 是否显示分数文本
   * @default true
   */
  showScore?: boolean
  /**
   * 圆盘尺寸 (像素)
   * @default 200
   */
  size?: number
  /**
   * 圆环厚度 (像素)
   * @default 12
   */
  strokeWidth?: number
  /**
   * 是否显示动画
   * @default true
   */
  animate?: boolean
  /**
   * 动画持续时间 (毫秒)
   * @default 1500
   */
  animationDuration?: number
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 分数变化时的回调
   */
  onScoreChange?: (score: number) => void
}

/**
 * 渐变圆盘式评分展示组件
 * 
 * 通过圆盘旋转动画直观显示评分结果，支持渐变颜色和动态效果
 */
export const ScoreGauge = React.memo(function ScoreGauge({
  score,
  showScore = true,
  size = 200,
  strokeWidth = 12,
  animate = true,
  animationDuration = 1500,
  className,
  onScoreChange
}: ScoreGaugeProps) {
  // 内部状态
  const [displayedScore, setDisplayedScore] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, color: string}>>([])
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const particleIdRef = useRef(0)
  const displayedScoreRef = useRef(displayedScore)
  
  // 根据分数计算颜色
  const getScoreColor = useCallback((scoreValue: number): string => {
    if (scoreValue >= 80) return "#10b981" // 绿色 - 优秀
    if (scoreValue >= 60) return "#f59e0b" // 黄色 - 良好
    if (scoreValue >= 30) return "#ef4444" // 红色 - 一般
    return "#6b7280" // 灰色 - 较差
  }, [])
  
  // 根据分数获取渐变ID
  const getGradientId = (scoreValue: number): string => {
    if (scoreValue >= 80) return "score-gradient-green"
    if (scoreValue >= 60) return "score-gradient-yellow"
    if (scoreValue >= 30) return "score-gradient-red"
    return "score-gradient-gray"
  }
  
  // 发射粒子效果
  const emitParticles = useCallback((scoreValue: number) => {
    if (!animate) return
    
    const color = getScoreColor(scoreValue)
    const centerX = size / 2
    const centerY = size / 2
    const radius = (size - strokeWidth) / 2
    const newParticles: Array<{id: number, x: number, y: number, color: string}> = []
    
    // 根据分数值决定粒子数量
    const particleCount = Math.floor(scoreValue / 20) + 3
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      const distance = radius + strokeWidth / 2
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance
      
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        color
      })
    }
    
    setParticles(prev => [...prev, ...newParticles])
    
    // 2秒后移除粒子
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
    }, 2000)
  }, [animate, size, strokeWidth, getScoreColor])
  
  // 同步ref和state
  useEffect(() => {
    displayedScoreRef.current = displayedScore
  }, [displayedScore])
  
  // 计算圆环参数
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayedScore / 100) * circumference
  
  // 动画效果
  useEffect(() => {
    // 调试日志：跟踪分数变化
    console.log(`ScoreGauge: 收到分数=${score}, 当前显示分数=${displayedScoreRef.current}, 动画中=${isAnimating}`);
    
    // 验证分数范围
    if (score < 0 || score > 100 || isNaN(score)) {
      console.warn(`无效的分数值: ${score}, 使用默认值0`);
      requestAnimationFrame(() => {
        setDisplayedScore(0);
      });
      return;
    }
    
    // 如果分数未变化，跳过
    if (score === displayedScoreRef.current) {
      console.log(`ScoreGauge: 分数未变化(${score})，跳过更新`);
      return;
    }
    
    // 如果分数变化小于阈值，跳过动画
    const scoreDiff = Math.abs(score - displayedScoreRef.current);
    if (scoreDiff < 5 && displayedScoreRef.current > 0) {
      console.log(`ScoreGauge: 分数变化${scoreDiff}小于阈值5，跳过动画，直接更新`);
      requestAnimationFrame(() => {
        setDisplayedScore(score);
      });
      return;
    }
    
    if (!animate) {
      // 使用requestAnimationFrame避免在effect中直接调用setState
      requestAnimationFrame(() => {
        setDisplayedScore(score)
      })
      // 非动画模式下也触发轻微粒子效果
      setTimeout(() => emitParticles(score), 100)
      return
    }
    
    // 取消之前的动画
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    requestAnimationFrame(() => {
      setIsAnimating(true)
    })
    startTimeRef.current = Date.now()
    
    const animateScore = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - (startTimeRef.current || currentTime)
      const progress = Math.min(elapsed / animationDuration, 1)
      
      // 使用更平滑的缓动函数
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentScore = Math.round(easeOutCubic * score)
      
      setDisplayedScore(currentScore)
      
      // 仅在动画完成时发射粒子
      if (progress >= 1) {
        setIsAnimating(false)
        emitParticles(score)
        if (onScoreChange) {
          onScoreChange(score)
        }
      } else {
        animationRef.current = requestAnimationFrame(animateScore)
      }
    }
    
    animationRef.current = requestAnimationFrame(animateScore)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [score, animate, animationDuration, onScoreChange, emitParticles, isAnimating])
  
  // 获取分数评级
  const getScoreRating = (scoreValue: number): string => {
    if (scoreValue >= 90) return "卓越"
    if (scoreValue >= 80) return "优秀"
    if (scoreValue >= 70) return "良好"
    if (scoreValue >= 60) return "合格"
    if (scoreValue >= 30) return "待提升"
    return "不匹配"
  }
  
  // 获取分数描述
  const getScoreDescription = (scoreValue: number): string => {
    if (scoreValue >= 80) return "高度匹配，强烈推荐优化"
    if (scoreValue >= 60) return "基本匹配，建议优化后申请"
    if (scoreValue >= 30) return "匹配度较低，需要显著改进"
    return "匹配度过低，建议寻找更合适职位"
  }
  
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* SVG圆盘 */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* 定义渐变 */}
          <defs>
            <linearGradient id="score-gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="score-gradient-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="score-gradient-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="score-gradient-gray" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="50%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
          </defs>
          
          {/* 背景圆环 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeOpacity={0.1}
            className="text-muted"
          />
          
          {/* 进度圆环 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${getGradientId(displayedScore)})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="transition-all duration-300 ease-out"
            style={{
              transition: animate ? `stroke-dashoffset ${animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)` : 'none'
            }}
          />
          
          {/* 内圆装饰 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - strokeWidth / 2 - 4}
            fill="currentColor"
            fillOpacity={0.02}
            className="text-foreground"
          />
        </svg>
        
        {/* 中心分数显示 */}
        {showScore && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="flex items-baseline justify-center">
                <span 
                  className={cn(
                    "font-bold tabular-nums transition-all duration-300",
                    isAnimating && "animate-pulse-subtle"
                  )}
                  style={{ 
                    fontSize: size * 0.3,
                    color: getScoreColor(displayedScore),
                    textShadow: `0 0 20px ${getScoreColor(displayedScore)}40`
                  }}
                >
                  {displayedScore}
                </span>
                <span 
                  className="ml-1 font-medium opacity-80"
                  style={{ fontSize: size * 0.15 }}
                >
                  /100
                </span>
              </div>
              <div 
                className="mt-1 font-semibold tracking-wide"
                style={{ 
                  fontSize: size * 0.08,
                  color: getScoreColor(displayedScore)
                }}
              >
                {getScoreRating(displayedScore)}
              </div>
            </div>
          </div>
        )}
        
        {/* 外环发光效果 */}
        <div 
          className="absolute inset-0 rounded-full opacity-20 blur-md transition-all duration-500"
          style={{
            background: `radial-gradient(circle at center, ${getScoreColor(displayedScore)}40 0%, transparent 70%)`,
            animation: isAnimating ? 'pulse 2s ease-in-out infinite' : 'none'
          }}
        />
        
        {/* 增强光晕效果 */}
        <div 
          className="absolute inset-0 rounded-full opacity-10 blur-xl animate-glow"
          style={{
            background: `radial-gradient(circle at center, ${getScoreColor(displayedScore)}80 0%, transparent 60%)`,
            animationDuration: '3s'
          }}
        />
        
        {/* 粒子效果 */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full animate-particle-float"
            style={{
              left: particle.x - 2, // 减去一半宽度以居中
              top: particle.y - 2,
              backgroundColor: particle.color,
              boxShadow: `0 0 8px ${particle.color}, 0 0 16px ${particle.color}`,
              zIndex: 10
            }}
          />
        ))}
      </div>
      
      {/* 分数描述 */}
      <div className="mt-6 text-center max-w-xs">
        <p className="text-sm text-muted-foreground">
          {getScoreDescription(displayedScore)}
        </p>
        {isAnimating && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="h-1 w-1 rounded-full bg-current animate-pulse" />
            <span className="text-xs text-muted-foreground">评估中...</span>
          </div>
        )}
      </div>
      
      {/* 自定义样式 */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
})

/**
 * 简化的评分指示器组件（用于紧凑空间）
 */
export function ScoreIndicator({
  score,
  size = 32,
  showTooltip = true
}: {
  score: number
  size?: number
  showTooltip?: boolean
}) {
  const getScoreColor = (scoreValue: number): string => {
    if (scoreValue >= 80) return "#10b981"
    if (scoreValue >= 60) return "#f59e0b"
    if (scoreValue >= 30) return "#ef4444"
    return "#6b7280"
  }
  
  const radius = size / 2 - 3
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference
  
  return (
    <div className="relative inline-flex" title={showTooltip ? `匹配度: ${score}/100` : undefined}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeOpacity={0.1}
          className="text-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span 
        className="absolute inset-0 flex items-center justify-center text-xs font-medium"
        style={{ color: getScoreColor(score) }}
      >
        {score}
      </span>
    </div>
  )
}