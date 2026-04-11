import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Zap, Shield, Sparkles, Crown, TrendingUp, Target, BadgeCheck, Gem } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI简历优化价格 | 超值套餐选择 - ResumeAI",
  description: "选择最适合您的AI简历优化套餐：5毛钱单次体验、5块钱200次当月超值套餐、50块3000次年度尊享。透明定价，无隐藏费用。",
  openGraph: {
    title: "AI简历优化价格 | 超值套餐选择 - ResumeAI",
    description: "选择最适合您的AI简历优化套餐：5毛钱单次体验、5块钱200次当月超值套餐、50块3000次年度尊享。",
    url: "https://resume-ai.com/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI简历优化价格 | 超值套餐选择 - ResumeAI",
    description: "选择最适合您的AI简历优化套餐：5毛钱单次体验、5块钱200次当月超值套餐、50块3000次年度尊享。",
  },
};

export default function PricingPage() {
  const plans = [
    {
      name: "单次体验",
      price: "¥0.5",
      period: "/次",
      description: "适合偶尔使用的用户",
      popular: false,
      highlight: false,
      badge: "灵活",
      icon: Zap,
      color: "from-blue-500 to-cyan-400",
      features: [
        { text: "1次简历AI评估", included: true },
        { text: "1次简历AI优化", included: true },
        { text: "基础模板导出", included: true },
        { text: "24小时内使用", included: true },
        { text: "单次购买，无需订阅", included: true },
        { text: "适合临时需求", included: true }
      ],
      cta: "立即购买",
      href: "/payment/single",
      note: ""
    },
    {
      name: "月度超值",
      price: "¥5",
      period: "/200次",
      description: "最受欢迎的性价比之选",
      popular: true,
      highlight: true,
      badge: "超值推荐",
      icon: Crown,
      color: "from-emerald-500 to-green-400",
      features: [
        { text: "200次简历AI评估", included: true },
        { text: "200次简历AI优化", included: true },
        { text: "高级模板导出", included: true },
        { text: "详细数据分析报告", included: true },
        { text: "当月无限使用", included: true },
        { text: "仅限当月有效", included: true },
        { text: "平均每次仅¥0.025", included: true },
        { text: "优先技术支持", included: true }
      ],
      cta: "立即抢购",
      href: "/payment/monthly",
      note: "仅限当月使用"
    },
    {
      name: "年度尊享",
      price: "¥50",
      period: "/3000次",
      description: "重度用户最佳选择",
      popular: false,
      highlight: false,
      badge: "尊享",
      icon: Gem,
      color: "from-purple-500 to-pink-400",
      features: [
        { text: "3000次简历AI评估", included: true },
        { text: "3000次简历AI优化", included: true },
        { text: "所有高级模板", included: true },
        { text: "深度数据分析报告", included: true },
        { text: "全年无限使用", included: true },
        { text: "仅限当年有效", included: true },
        { text: "平均每次仅¥0.017", included: true },
        { text: "专属客户经理", included: true },
        { text: "定制化功能请求", included: true }
      ],
      cta: "尊享购买",
      href: "/payment/annual",
      note: "仅限当年使用"
    }
  ]

  const faqs = [
    {
      question: "月度超值套餐的'仅限当月使用'是什么意思？",
      answer: "月度超值套餐在购买当月的自然月内有效，例如5月15日购买，有效期至5月31日。200次使用次数仅在当月有效，未使用次数不累积到下月。"
    },
    {
      question: "年度尊享套餐的'仅限当年使用'是什么意思？",
      answer: "年度尊享套餐在购买当年的自然年内有效，例如2025年5月15日购买，有效期至2025年12月31日。3000次使用次数仅在当年有效。"
    },
    {
      question: "购买后如何开始使用？",
      answer: "购买后，您的账户将立即获得相应次数。登录后即可在仪表板中使用AI简历评估和优化功能。"
    },
    {
      question: "支持哪些支付方式？",
      answer: "目前支持微信支付。请添加微信号 13522220541 联系客服完成支付。支付时请备注您的用户名。"
    },
    {
      question: "是否可以开具发票？",
      answer: "所有付费套餐均可申请开具发票，请在支付后联系客服办理。"
    },
    {
      question: "如果次数用完了怎么办？",
      answer: "您可以在次数用尽后购买新的套餐。月度套餐和年度套餐都有大量次数，适合不同使用频率的用户。"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* 页面头部 */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-600 dark:text-emerald-400 mb-6 animate-pulse-subtle">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">超高性价比 · 透明定价</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary via-emerald-500 to-accent bg-clip-text text-transparent">
            简单极致的价格方案
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            我们摒弃复杂套餐，只提供三种最实用选择。无论您是偶尔使用还是专业需求，总有一款适合您。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href="/features">查看功能详情</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
              <Link href="#plans">查看套餐</Link>
            </Button>
          </div>
        </div>

        {/* 定价卡片 */}
        <div id="plans" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card 
                key={plan.name}
                className={`relative flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slide-up ${
                  plan.highlight 
                    ? "border-2 border-emerald-500 shadow-xl scale-105 lg:scale-110 z-10" 
                    : "border-primary/10"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 推荐徽章 */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-bold flex items-center gap-2 shadow-lg">
                      <BadgeCheck className="h-4 w-4" />
                      {plan.badge}
                    </div>
                  </div>
                )}
                
                {/* 角标 */}
                {plan.badge && !plan.popular && (
                  <div className="absolute -top-3 -right-3">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-xs font-semibold">
                      {plan.badge}
                    </div>
                  </div>
                )}
                
                {/* 装饰性背景 */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${plan.color}`} />
                
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${plan.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground text-xl">{plan.period}</span>
                      )}
                    </div>
                    {plan.note && (
                      <div className="mt-2">
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          {plan.note}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <div className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`${feature.included ? "text-foreground" : "text-muted-foreground line-through"}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-6">
                  <Button 
                    asChild 
                    size="lg" 
                    className={`w-full ${plan.highlight ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 animate-pulse-subtle" : ""}`}
                    variant={plan.highlight ? "default" : "outline"}
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* 特色说明 */}
        <div className="mb-16 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">为什么选择我们的套餐？</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              我们专注于提供最实用、最高性价比的AI简历优化服务，让每一分钱都物超所值。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 mb-4">
                <Target className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">极致性价比</h3>
              <p className="text-muted-foreground">
                月度套餐200次仅5元，平均每次仅0.025元，是市场上最具竞争力的价格。
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">灵活选择</h3>
              <p className="text-muted-foreground">
                三种套餐覆盖所有需求：单次体验、月度超值、年度尊享，总有一款适合您。
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 mb-4">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">透明无隐藏</h3>
              <p className="text-muted-foreground">
                所有套餐明码标价，无隐藏费用，无自动续费，让您完全掌控消费。
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">常见问题</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-3">
                  <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">Q</span>
                  </div>
                  {faq.question}
                </h3>
                <p className="text-muted-foreground pl-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-primary to-purple-500 animate-gradient">
            <div className="bg-background rounded-xl p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-600 dark:text-emerald-400 mb-6">
                <Crown className="h-4 w-4" />
                <span className="text-sm font-medium">立即升级体验</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                立即体验AI简历优化的强大功能
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                月度超值套餐正在热销中！200次AI优化仅需5元，平均每次仅0.025元，是提升求职竞争力的最佳投资。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="outline">
                  <Link href="/features">了解更多</Link>
                </Button>
                <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 animate-pulse-subtle">
                  <Link href="#plans">立即购买</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}