import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Sparkles, BarChart, Zap, Users, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI简历优化功能 | 智能评估+专业改写+多语言支持 - ResumeAI",
  description: "ResumeAI提供完整的简历优化解决方案：智能匹配度评分、AI专业改写、多语言支持、数据分析报告。从评估到优化，一站式提升简历质量。",
  openGraph: {
    title: "AI简历优化功能 | 智能评估+专业改写 - ResumeAI",
    description: "提供完整的简历优化解决方案：智能匹配度评分、AI专业改写、多语言支持、数据分析报告。一站式提升简历质量。",
    url: "https://resume-ai.com/features",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI简历优化功能 | 智能评估+专业改写 - ResumeAI",
    description: "提供完整的简历优化解决方案：智能匹配度评分、AI专业改写、多语言支持、数据分析报告。一站式提升简历质量。",
  },
};

export default function FeaturesPage() {
  const features = [
    {
      title: "智能简历评估",
      description: "基于AI的深度分析，全面评估简历与职位匹配度",
      icon: <Sparkles className="h-8 w-8 text-emerald-500" />,
      details: [
        "实时匹配度评分 (0-100分)",
        "关键词缺失分析",
        "专业能力评估",
        "改进建议生成"
      ]
    },
    {
      title: "AI简历优化",
      description: "一键智能优化，提升简历质量和专业度",
      icon: <Zap className="h-8 w-8 text-emerald-500" />,
      details: [
        "格式规范化处理",
        "表达专业化改写",
        "内容结构化重组",
        "行业术语适配"
      ]
    },

    {
      title: "数据分析报告",
      description: "详细的数据分析和趋势洞察",
      icon: <BarChart className="h-8 w-8 text-emerald-500" />,
      details: [
        "匹配度趋势分析",
        "竞争力评估",
        "行业对标数据",
        "个性化建议"
      ]
    },
    {
      title: "多语言支持",
      description: "支持中英文简历评估和优化",
      icon: <Users className="h-8 w-8 text-emerald-500" />,
      details: [
        "中文简历优化",
        "英文简历适配",
        "双语混合处理",
        "国际化格式规范"
      ]
    },
    {
      title: "持续更新维护",
      description: "定期更新算法和服务",
      icon: <CheckCircle className="h-8 w-8 text-emerald-500" />,
      details: [
        "算法模型迭代",
        "功能增强",
        "行业趋势同步",
        "用户体验优化"
      ]
    },
    {
      title: "隐私安全保护",
      description: "严格的数据隐私和安全保障",
      icon: <Shield className="h-8 w-8 text-emerald-500" />,
      details: [
        "端到端数据加密",
        "隐私数据自动脱敏",
        "合规存储与处理",
        "安全审计日志"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* 页面头部 */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
            核心功能特色
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            我们提供全面的简历优化解决方案，从智能评估到专业优化，助您赢得理想工作
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
              <Link href="/dashboard">立即开始体验</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">查看定价方案</Link>
            </Button>
          </div>
        </div>

        {/* 功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group shadow-card hover:shadow-xl transition-all duration-300 border-emerald-500/10 hover:border-emerald-500/30 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-2">{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 对比表格 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">套餐功能对比</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-4 text-left font-semibold">功能特性</th>
                  <th className="p-4 text-center font-semibold bg-gradient-to-r from-blue-500/10 to-cyan-400/10">单次体验</th>
                  <th className="p-4 text-center font-semibold bg-gradient-to-r from-emerald-500/10 to-green-400/10">月度超值</th>
                  <th className="p-4 text-center font-semibold bg-gradient-to-r from-purple-500/10 to-pink-400/10">年度尊享</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["智能简历评估", "1次", "200次", "3000次"],
                  ["AI简历优化", "1次", "200次", "3000次"],
                  ["模板导出", "基础模板", "高级模板", "所有高级模板"],
                  ["数据分析报告", "基础报告", "详细报告", "深度分析报告"],
                  ["优先级支持", "-", "✓", "专属客户经理"],
                  ["定制化支持", "-", "-", "✓"],
                  ["有效期", "24小时", "当月有效", "当年有效"],
                  ["平均每次成本", "¥0.5/次", "¥0.025/次", "¥0.017/次"]
                ].map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`p-4 ${cellIndex === 0 ? "font-medium" : "text-center"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            注：月度超值套餐当月有效（自然月），设有熔断机制，每月最多使用200次；年度尊享套餐包含专属客户经理和定制开发支持。
          </p>
        </div>

        {/* CTA区域 */}
        <div className="text-center">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-primary to-purple-500 animate-gradient">
            <div className="bg-background rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">准备好提升您的简历了吗？</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                立即体验智能简历优化，让您的简历脱颖而出，赢得更多面试机会
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 animate-pulse-subtle">
                <Link href="/dashboard">免费开始使用</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}