import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, CheckCircle, FileText, Brain, BarChart, Cpu, Network, Target, Shield } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI简历优化工具 | 智能评估+专业优化 | 提升求职成功率 - ResumeAI",
  description: "使用AI技术智能分析您的简历，提供个性化优化建议。实时匹配度评分，专业格式导出，提升面试邀请率。免费试用，立即体验专业简历优化服务！",
  openGraph: {
    title: "AI简历优化工具 | 智能评估+专业优化 - ResumeAI",
    description: "使用AI技术智能分析您的简历，提供个性化优化建议。实时匹配度评分，专业格式导出，提升面试邀请率。",
    url: "https://resume-ai.com/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI简历优化工具 | 智能评估+专业优化 - ResumeAI",
    description: "使用AI技术智能分析您的简历，提供个性化优化建议。实时匹配度评分，专业格式导出，提升面试邀请率。",
  },
};

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* 性能优化渐变背景 - 减少模糊层数 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl animate-pulse-subtle" />
        <div className="absolute top-60 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-secondary/5 to-accent/5 blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl animate-pulse-subtle" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/3" />
        
        {/* 粒子背景系统 - 现代化流光粒子效果增强 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none stream-container">
          {/* 流光效果层 - 水平流动光线 */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`stream-horizontal-${i}`}
              className="stream-line animate-stream-flow"
              style={{
                top: `${15 + i * 25}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + i * 2}s`
              } as React.CSSProperties}
            />
          ))}
          
          {/* 流光效果层 - 对角线流动光线 */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`stream-diagonal-${i}`}
              className="stream-line-thick animate-stream-flow-diagonal"
              style={{
                top: `${40 + i * 20}%`,
                transform: `rotate(${45 + i * 10}deg)`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${12 + i * 3}s`
              } as React.CSSProperties}
            />
          ))}
          
          {/* 流光效果层 - 细光晕线 */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`stream-glow-${i}`}
              className="stream-line-glow animate-stream-flow"
              style={{
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + i * 2}s`
              } as React.CSSProperties}
            />
          ))}
          
          {/* 主要粒子层 - 增强渐变与微交互 */}
          {Array.from({ length: 20 }).map((_, i) => {
            // 使用伪随机数生成器避免纯度错误
            const seed = i * 200;
            const pseudoRandom = (offset: number) => {
              const x = Math.sin(seed + offset) * 10000;
              return x - Math.floor(x);
            };
            const floatX = pseudoRandom(1) * 40 - 20;
            const floatY = pseudoRandom(2) * -30 - 10;
            const particleOpacity = 0.2 + pseudoRandom(3) * 0.5;
            const left = pseudoRandom(4) * 100;
            const top = pseudoRandom(5) * 100;
            const width = 3 + pseudoRandom(6) * 8;
            const height = 3 + pseudoRandom(7) * 8;
            const particleType = i % 3;
            
            // 根据粒子类型应用不同的渐变和动画
            let particleClass = "absolute rounded-full animate-particle-float-random";
            let gradientStyle = `radial-gradient(circle, var(--primary) 0%, var(--accent) 100%)`;
            
            if (particleType === 0) {
              particleClass += " animate-particle-glow-gradient";
              gradientStyle = `radial-gradient(circle, var(--primary) 0%, var(--accent) 50%, transparent 100%)`;
            } else if (particleType === 1) {
              particleClass += " animate-particle-multi-color";
              gradientStyle = `radial-gradient(circle, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%)`;
            } else {
              particleClass += " animate-sparkle-twinkle";
              gradientStyle = `radial-gradient(circle, var(--accent) 0%, var(--secondary) 100%)`;
            }
            
            return (
              <div
                key={`particle-${i}`}
                className={`${particleClass} particle-optimized`}
                style={{
                  '--float-x': `${floatX}px`,
                  '--float-y': `${floatY}px`,
                  '--particle-opacity': `${particleOpacity}`,
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${width}px`,
                  height: `${height}px`,
                  background: gradientStyle,
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0,
                  filter: `blur(${pseudoRandom(8) * 0.5}px)`
                } as React.CSSProperties}
              />
            );
          })}
          
          {/* 光晕效果层 - 增强 */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl animate-aura-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-secondary/5 to-accent/5 blur-3xl animate-aura-wave" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-2xl animate-particle-glow-gradient" style={{ animationDelay: '2.5s' }} />
          
          {/* 轨道粒子 - 增强 */}
          {Array.from({ length: 12 }).map((_, i) => {
            const orbitRadius = 50 + i * 25;
            const orbitDuration = 10 + i * 3;
            const particleSize = 1.5 + (i % 3) * 0.5;
            
            return (
              <div
                key={`orbital-${i}`}
                className="absolute top-1/2 left-1/2 rounded-full animate-particle-orbital"
                style={{
                  '--orbit-radius': `${orbitRadius}px`,
                  width: `${particleSize}px`,
                  height: `${particleSize}px`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${orbitDuration}s`,
                  background: i % 2 === 0 
                    ? `radial-gradient(circle, var(--primary) 0%, var(--accent) 100%)`
                    : `radial-gradient(circle, var(--accent) 0%, var(--secondary) 100%)`
                } as React.CSSProperties}
              />
            );
          })}
          
          {/* 微交互响应层 - 仅在交互时显示 */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`interaction-${i}`}
                className="absolute rounded-full animate-ripple-interaction"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  width: '100px',
                  height: '100px',
                  animationDelay: `${i * 0.2}s`
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 图形元素渐入组合开场效果 */}
      <div className="relative overflow-hidden">
        <div className="container-responsive relative z-20 py-16 md:py-24 lg:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-bold tracking-tight mb-6">
                <span className="block gradient-text-sunset animate-gradient-shift">智能简历优化</span>
                <span className="block text-fluid-2xl md:text-fluid-3xl text-foreground/80 mt-4">让AI为您的职业旅程注入智慧</span>
              </h1>
              <p className="text-fluid-base text-muted-foreground max-w-3xl mx-auto">
                通过先进的图形化分析系统，让您的简历元素智能组合，展现最佳职业形象
              </p>
            </div>
            
            {/* 图形元素组合动画区域 */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] mb-20">
              {/* 连接线 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <path
                  d="M20,40 Q40,30 50,50 T80,60"
                  stroke="url(#gradient-line)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="animate-graphic-assemble-connect"
                  style={{ '--delay': '0.5s' } as React.CSSProperties}
                />
                <path
                  d="M80,40 Q60,30 50,50 T20,60"
                  stroke="url(#gradient-line)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="animate-graphic-assemble-connect"
                  style={{ '--delay': '1s' } as React.CSSProperties}
                />
                <defs>
                  <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--accent)" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* 中央AI大脑核心 */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow graphic-element-glow animate-graphic-assemble-rotate"
                style={{
                  '--start-rotation': '-180deg',
                  '--end-rotation': '0deg',
                  zIndex: 10,
                  animationDelay: '0.2s'
                } as React.CSSProperties}
              >
                <Brain className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground animate-micro-interaction-spin" style={{ animationDuration: '4s' }} />
              </div>
              
              {/* 左侧简历图标 */}
              <div 
                className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-background to-card border-2 border-primary/20 flex items-center justify-center shadow-soft graphic-element animate-graphic-assemble-entry"
                style={{
                  '--entry-x': '-100px',
                  '--entry-y': '-50px',
                  zIndex: 9,
                  animationDelay: '0.4s'
                } as React.CSSProperties}
              >
                <FileText className="w-10 h-10 md:w-12 md:h-12 text-primary animate-micro-interaction-bounce" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-bold">1</span>
                </div>
              </div>
              
              {/* 右侧进度条图标 */}
              <div 
                className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-background to-card border-2 border-secondary/20 flex items-center justify-center shadow-soft graphic-element animate-graphic-assemble-entry"
                style={{
                  '--entry-x': '100px',
                  '--entry-y': '-50px',
                  zIndex: 9,
                  animationDelay: '0.6s'
                } as React.CSSProperties}
              >
                <BarChart className="w-10 h-10 md:w-12 md:h-12 text-secondary animate-graphic-assemble-pulse" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-bold">2</span>
                </div>
              </div>
              
              {/* 左下角CPU处理图标 */}
              <div 
                className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-background to-card border-2 border-accent/20 flex items-center justify-center shadow-soft graphic-element animate-graphic-assemble-entry"
                style={{
                  '--entry-x': '-80px',
                  '--entry-y': '80px',
                  zIndex: 9,
                  animationDelay: '0.8s'
                } as React.CSSProperties}
              >
                <Cpu className="w-8 h-8 md:w-10 md:h-10 text-accent animate-micro-interaction-spin" style={{ animationDuration: '3s' }} />
              </div>
              
              {/* 右下角网络连接图标 */}
              <div 
                className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-background to-card border-2 border-primary/20 flex items-center justify-center shadow-soft graphic-element animate-graphic-assemble-entry"
                style={{
                  '--entry-x': '80px',
                  '--entry-y': '80px',
                  zIndex: 9,
                  animationDelay: '1s'
                } as React.CSSProperties}
              >
                <Network className="w-8 h-8 md:w-10 md:h-10 text-primary animate-graphic-assemble-glow" />
              </div>
              
              {/* 顶部目标图标 */}
              <div 
                className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-background to-card border-2 border-secondary/20 flex items-center justify-center shadow-soft graphic-element animate-graphic-assemble-rotate"
                style={{
                  '--start-rotation': '180deg',
                  '--end-rotation': '0deg',
                  zIndex: 8,
                  animationDelay: '1.2s'
                } as React.CSSProperties}
              >
                <Target className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
              </div>
              
              {/* 底部防护图标 */}
              <div 
                className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-background to-card border-2 border-accent/20 flex items-center justify-center shadow-soft graphic-element animate-graphic-assemble-rotate"
                style={{
                  '--start-rotation': '-180deg',
                  '--end-rotation': '0deg',
                  zIndex: 8,
                  animationDelay: '1.4s'
                } as React.CSSProperties}
              >
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              </div>
              
              {/* 光晕效果 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-2xl animate-aura-radiate" />
            </div>
            
            {/* 组合完成提示 */}
            <div className="text-center animate-fade-in" style={{ animationDelay: '2s' }}>
              <div className="inline-flex items-center gap-3 rounded-full border bg-background/80 px-6 py-3 backdrop-blur-sm hover:shadow-soft hover:border-primary/30 transition-all duration-300 interactive-scale touch-target">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent animate-glow">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium gradient-text-energy">图形元素组合完成</p>
                  <p className="text-xs text-muted-foreground">AI系统已就绪，开始优化您的简历</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="container-responsive relative z-10 py-12 md:py-24">
        {/* 品牌展示区域 */}
        <div className="mb-8 md:mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center gap-3 rounded-full border bg-background/80 px-4 py-2 backdrop-blur-sm hover:shadow-soft hover:border-primary/30 transition-all duration-300 interactive-scale touch-target">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent animate-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium gradient-text-energy">AI驱动的简历优化SaaS</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* 左侧：标题和描述 */}
            <div className="flex flex-col justify-center space-y-8 animate-slide-up">
              <div className="space-y-6">
                <h1 className="font-bold tracking-tight">
                  <span className="block text-fluid-3xl md:text-fluid-4xl text-foreground">让您的简历</span>
                  <span className="block gradient-text-sunset animate-gradient-shift text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl">
                    脱颖而出
                  </span>
                </h1>
                <p className="text-fluid-base text-muted-foreground">
                  使用先进的AI技术分析、优化和个性化您的简历，提升求职成功率。
                  <span className="block mt-2 text-fluid-sm text-primary font-medium">
                    智能诊断 → 个性化建议 → 实时预览 → 一键导出
                  </span>
                </p>
              </div>

              {/* 核心功能展示 */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {["AI智能分析", "实时优化建议", "个性化建议", "一键导出"].map((feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 interactive-scale touch-target-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle className="h-4 w-4 text-primary animate-bounce-gentle" style={{ animationDelay: `${index * 200}ms` }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 核心CTA按钮组 */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    size="lg"
                    className="group relative h-14 w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-lg font-semibold shadow-glow hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 touch-feedback interactive-scale"
                    asChild
                  >
                    <Link href="/dashboard">
                      开始免费诊断
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group relative h-14 w-full sm:w-auto border-2 text-lg font-semibold hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 touch-feedback interactive-scale"
                    asChild
                  >
                    <Link href="/features">
                      观看演示视频
                      <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    </Link>
                  </Button>
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">
                      免费注册 · 立即获得3次评估机会
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：图形展示 - 优化移动端高度 */}
            <div className="relative animate-slide-down">
              <div className="relative h-full min-h-[350px] md:min-h-[450px] overflow-hidden rounded-2xl border bg-gradient-to-br from-card via-background to-card p-1 shadow-soft depth-layer-2">
                {/* 渐变边框 */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 blur-lg" />
                
                {/* 内容卡片 */}
                <div className="relative h-full rounded-xl bg-background/90 backdrop-blur-sm p-6 md:p-8">
                  <div className="space-y-6">
                    {/* 模拟简历卡片 */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent animate-glow" />
                          <div>
                            <div className="h-4 w-32 rounded bg-gradient-to-r from-muted to-muted/50 animate-pulse-subtle" />
                            <div className="mt-1 h-3 w-24 rounded bg-muted/50" />
                          </div>
                        </div>
                        <div className="h-6 w-16 rounded-full bg-gradient-to-r from-primary/20 to-accent/20" />
                      </div>
                      
                      <div className="space-y-3">
                        {[
                          { label: "内容完整度", width: 85 },
                          { label: "关键词匹配", width: 60 },
                          { label: "经验相关度", width: 75 },
                          { label: "排版专业度", width: 90 }
                        ].map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{item.label}</span>
                              <span className="font-medium text-primary">{item.width}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                                style={{ width: `${item.width}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI建议卡片 */}
                    <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 p-4 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 interactive-scale">
                      <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-primary mt-0.5 animate-pulse-subtle" />
                        <div className="space-y-2">
                          <h4 className="font-medium">AI优化建议</h4>
                          <p className="text-sm text-muted-foreground">
                            建议加强项目成果量化描述，使用更多行业关键词...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 装饰元素 - 降低显著性 */}
              <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-sm" />
              <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-gradient-to-r from-secondary/10 to-accent/10 blur-sm" />
            </div>
          </div>
        </div>

        {/* 统计数据 - 现代动态视觉效果增强 */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "10,000+", label: "优化简历", color: "from-primary to-accent", icon: "📄", duration: "2s" },
            { value: "95%", label: "用户满意度", color: "from-secondary to-accent", icon: "😊", duration: "2.5s" },
            { value: "2.5倍", label: "面试邀请提升", color: "from-primary to-secondary", icon: "🚀", duration: "3s" },
            { value: "30秒", label: "快速诊断", color: "from-accent to-primary", icon: "⚡", duration: "1.5s" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="relative rounded-xl border bg-background/60 p-4 md:p-6 text-center backdrop-blur-sm hover:shadow-card hover:border-primary/20 transition-all duration-300 interactive-scale touch-feedback overflow-hidden group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* 动态背景粒子 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {Array.from({ length: 3 }).map((_, i) => {
                  // 使用固定种子生成可预测的随机值，避免纯度错误
                  const seed = i + stat.label.length;
                  const pseudoRandom = (offset: number) => {
                    const x = Math.sin(seed * 100 + offset) * 10000;
                    return x - Math.floor(x);
                  };
                  const floatX = pseudoRandom(1) * 20 - 10;
                  const floatY = pseudoRandom(2) * -15 - 5;
                  const particleOpacity = 0.2 + pseudoRandom(3) * 0.3;
                  const width = 2 + pseudoRandom(4) * 4;
                  const height = 2 + pseudoRandom(5) * 4;
                  return (
                    <div
                      key={`particle-${stat.label}-${i}`}
                      className="absolute rounded-full animate-particle-float-random"
                      style={{
                        '--float-x': `${floatX}px`,
                        '--float-y': `${floatY}px`,
                        '--particle-opacity': `${particleOpacity}`,
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                        width: `${width}px`,
                        height: `${height}px`,
                        background: `radial-gradient(circle, var(--primary) 0%, var(--accent) 100%)`,
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0
                      } as React.CSSProperties}
                    />
                  );
                })}
              </div>
              
              {/* 光晕边框效果 */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/10 transition-all duration-500" />
              
              {/* 内容 */}
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent sm:text-3xl animate-modern-gradient-flow`} style={{ animationDuration: stat.duration }}>
                    {stat.value}
                  </div>
                  <div className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{stat.label}</div>
                
                {/* 动态进度条 */}
                <div className="mt-4 relative">
                  <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${stat.color} animate-modern-shimmer`}
                      style={{ 
                        width: stat.label === '用户满意度' ? '95%' : 
                               stat.label === '面试邀请提升' ? '100%' : 
                               stat.label === '快速诊断' ? '100%' : '100%',
                        animationDuration: stat.duration
                      }}
                    />
                  </div>
                  <div className="absolute -top-2 right-0 w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
                </div>
              </div>
              
              {/* 悬停时显示的光晕 */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* 合作企业Logo墙 */}
        <div className="mt-24 text-center animate-fade-in">
          <h3 className="text-lg font-medium text-muted-foreground mb-6">受到以下优秀企业和求职者的信赖</h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { name: "阿里巴巴", logo: "🏢" },
              { name: "腾讯", logo: "🐧" },
              { name: "字节跳动", logo: "🎵" },
              { name: "华为", logo: "🌺" },
              { name: "微软", logo: "🔷" },
              { name: "谷歌", logo: "🔍" },
              { name: "亚马逊", logo: "📦" },
              { name: "美团", logo: "🛵" }
            ].map((company, index) => (
              <div 
                key={company.name}
                className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl">{company.logo}</div>
                <div className="text-sm font-medium text-muted-foreground">{company.name}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            以上为模拟展示，实际服务已帮助来自全球知名企业的求职者优化简历
          </p>
        </div>

        {/* 额外号召区域 */}
        <div className="mt-24 text-center animate-fade-in">
          <div className="inline-flex flex-col items-center gap-6 max-w-2xl mx-auto p-8 rounded-2xl border bg-gradient-to-br from-background/50 to-primary/5 backdrop-blur-sm">
            <h2 className="text-2xl font-bold gradient-text">立即开始您的简历优化之旅</h2>
            <p className="text-muted-foreground">
              加入超过10,000名求职者，让AI帮助您获得更多面试机会
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent shadow-glow hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 touch-feedback interactive-scale"
              asChild
            >
              <Link href="/dashboard">
                免费开始优化
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}