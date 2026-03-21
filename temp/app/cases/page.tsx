import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, TrendingUp, Star, Target, Zap, Sparkles } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "成功案例 | AI简历优化真实用户成果展示 - ResumeAI",
  description: "查看ResumeAI用户的真实成功案例：从投递无回应到一周内收到8个面试邀请。了解AI简历优化的实际效果和用户评价。",
  openGraph: {
    title: "成功案例 | AI简历优化真实用户成果展示 - ResumeAI",
    description: "查看ResumeAI用户的真实成功案例：从投递无回应到一周内收到8个面试邀请。了解AI简历优化的实际效果和用户评价。",
    url: "https://resume-ai.com/cases",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "成功案例 | AI简历优化真实用户成果展示 - ResumeAI",
    description: "查看ResumeAI用户的真实成功案例：从投递无回应到一周内收到8个面试邀请。了解AI简历优化的实际效果和用户评价。",
  },
};

export default function CasesPage() {
  const successStories = [
    {
      name: "张明",
      position: "前端开发工程师",
      company: "某互联网大厂",
      score: 92,
      duration: "3天拿到面试",
      story: "使用前投递30+公司无回应，优化后一周内收到8个面试邀请",
      improvements: [
        "技能描述更专业化",
        "项目成果数据化展示",
        "关键词匹配度提升40%"
      ],
      testimonial: "AI优化让我的简历从普通变得专业，HR反馈说简历结构非常清晰！"
    },
    {
      name: "李华",
      position: "产品经理",
      company: "某独角兽公司",
      score: 88,
      duration: "1周入职",
      story: "转型产品经理缺乏相关经验，通过简历重构突出可迁移能力",
      improvements: [
        "职业转型故事线",
        "可迁移能力突出",
        "产品思维量化展示"
      ],
      testimonial: "没想到AI能这么精准地理解产品岗位需求，简历优化后直接拿到了理想offer！"
    },
    {
      name: "王芳",
      position: "市场营销总监",
      company: "某外企",
      score: 95,
      duration: "2周升职加薪",
      story: "内部竞聘中通过简历优化突出管理能力和业绩成果",
      improvements: [
        "管理经验系统化",
        "ROI数据可视化",
        "战略思维突显"
      ],
      testimonial: "简历不仅用于求职，更能帮助我在内部晋升中清晰展示价值！"
    },
    {
      name: "刘伟",
      position: "数据分析师",
      company: "某金融科技公司",
      score: 85,
      duration: "5天多个offer",
      story: "技术能力强但表达不够专业，优化后获得多个心仪offer",
      improvements: [
        "技术栈规范化描述",
        "分析成果量化",
        "业务影响突出"
      ],
      testimonial: "作为技术人员最不擅长的就是写简历，AI优化真是救星！"
    },
    {
      name: "陈婷",
      position: "人力资源经理",
      company: "某上市公司",
      score: 90,
      duration: "10天成功跳槽",
      story: "跨行业跳槽，通过简历优化成功转入互联网行业",
      improvements: [
        "跨行业能力映射",
        "人力资源数字化展示",
        "组织发展贡献量化"
      ],
      testimonial: "从传统行业跳槽互联网，简历优化帮我找到了最佳表达方式！"
    },
    {
      name: "赵强",
      position: "全栈工程师",
      company: "某创业公司",
      score: 87,
      duration: "1个月薪资翻倍",
      story: "自由职业者转全职，通过简历系统化展示综合能力",
      improvements: [
        "项目作品集整合",
        "技术广度深度平衡",
        "解决方案思维展示"
      ],
      testimonial: "自由职业经历很难写进传统简历，AI帮我找到了最合适的呈现方式！"
    }
  ]

  const metrics = [
    { label: "用户满意度", value: "98%", icon: <Star className="h-5 w-5" />, color: "text-amber-500" },
    { label: "面试邀请率提升", value: "3.5倍", icon: <TrendingUp className="h-5 w-5" />, color: "text-green-500" },
    { label: "平均匹配度提升", value: "42分", icon: <Target className="h-5 w-5" />, color: "text-primary" },
    { label: "平均求职周期缩短", value: "60%", icon: <Zap className="h-5 w-5" />, color: "text-purple-500" }
  ]

  const industries = [
    "互联网/科技", "金融/保险", "教育/培训", "医疗/健康", 
    "制造业", "零售/电商", "房地产", "文化/娱乐", 
    "咨询/法律", "政府/非营利"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* 页面头部 */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-pulse-subtle">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">真实案例 · 效果验证</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
            成功案例分享
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            看看其他用户如何通过智能简历优化获得理想工作，提升职业发展
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">立即开始优化</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">查看定价方案</Link>
            </Button>
          </div>
        </div>

        {/* 数据指标 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <div 
              key={metric.label} 
              className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 ${metric.color}`}>
                {metric.icon}
              </div>
              <div className="text-3xl font-bold mb-2">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* 成功案例网格 */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">用户成功故事</h2>
            <div className="text-sm text-muted-foreground">
              共 {successStories.length} 个案例
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-xl">{story.name}</CardTitle>
                      <CardDescription>{story.position} · {story.company}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        {story.score}分
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{story.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{story.story}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm font-semibold">主要改进点：</div>
                    <ul className="space-y-2">
                      {story.improvements.map((improvement, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-sm italic text-muted-foreground">
                          &ldquo;{story.testimonial}&rdquo;
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 行业覆盖 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">覆盖行业</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {industries.map((industry, index) => (
              <div 
                key={index} 
                className="px-4 py-2.5 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 案例研究 */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">深度案例研究</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">技术转型成功案例</h3>
              <p className="text-muted-foreground mb-6">
                传统行业工程师成功转型互联网大厂技术专家，通过简历重构突出技术迁移能力和学习能力
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "识别可迁移技术栈和核心能力",
                  "构建技术成长故事线",
                  "突出新技术学习能力和应用成果",
                  "量化传统行业项目价值"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline">
                <Link href="/features">查看详细分析</Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">职业晋升案例</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">内部晋升加速器</h3>
              <p className="text-muted-foreground mb-6">
                利用简历优化在内部竞聘中脱颖而出，清晰展示职业成长轨迹和未来潜力
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "系统化梳理职业发展路径",
                  "突出岗位相关核心能力",
                  "展示对组织的持续贡献",
                  "明确未来发展方向和价值"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline">
                <Link href="/features">了解更多策略</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient">
            <div className="bg-background rounded-xl p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">您的成功故事</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                下一个成功案例就是您
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                加入数千名已通过简历优化获得理想工作的用户，开启您的职业发展新篇章
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="outline">
                  <Link href="/features">查看详细功能</Link>
                </Button>
                <Button asChild size="lg" className="animate-pulse-subtle">
                  <Link href="/dashboard">立即开始优化</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}