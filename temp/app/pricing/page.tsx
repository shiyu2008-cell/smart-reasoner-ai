import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Star, Zap, Shield, Users, Rocket, Sparkles } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI简历优化价格 | 新人1元试用+专业套餐 - ResumeAI",
  description: "ResumeAI提供灵活定价：新人1元试用3次评估优化，专业套餐16次仅6.66元。按需付费，无隐藏费用，7天满意度保障。",
  openGraph: {
    title: "AI简历优化价格 | 新人1元试用 - ResumeAI",
    description: "新人1元试用3次评估优化，专业套餐16次仅6.66元。按需付费，无隐藏费用，7天满意度保障。",
    url: "https://resume-ai.com/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI简历优化价格 | 新人1元试用 - ResumeAI",
    description: "新人1元试用3次评估优化，专业套餐16次仅6.66元。按需付费，无隐藏费用，7天满意度保障。",
  },
};

export default function PricingPage() {
  const plans = [
    {
      name: "新人破冰",
      price: "¥1",
      period: "/3次",
      description: "新人超值特价",
      popular: false,
      features: [
        { text: "3次简历评估", included: true },
        { text: "3次AI优化", included: true },
        { text: "模板导出功能", included: true },
        { text: "基础数据分析", included: true },
        { text: "社区支持", included: true },
        { text: "购买限制: 限1次", included: true }
      ],
      cta: "立即购买",
      href: "/payment/new-user",
      highlight: true
    },
    {
      name: "六六顺",
      price: "¥6.66",
      period: "/16次",
      description: "平均每份简历优化成本仅0.4元",
      popular: true,
      features: [
        { text: "16次简历评估", included: true },
        { text: "16次AI优化", included: true },
        { text: "模板导出功能", included: true },
        { text: "详细数据分析", included: true },
        { text: "邮件支持", included: true },
        { text: "购买限制: 限1次", included: true }
      ],
      cta: "立即购买",
      href: "/payment/six-six-smooth",
      highlight: true
    },
    {
      name: "轻量小包",
      price: "¥9.9",
      period: "/20次",
      description: "高性价比套餐",
      popular: false,
      features: [
        { text: "20次简历评估", included: true },
        { text: "20次AI优化", included: true },
        { text: "模板导出功能", included: true },
        { text: "详细数据分析", included: true },
        { text: "邮件支持", included: true },
        { text: "购买限制: 不限购", included: true }
      ],
      cta: "立即购买",
      href: "/payment/light-pack",
      highlight: false
    },
    {
      name: "专业超值",
      price: "¥25",
      period: "/60次",
      description: "专业人员欣赏的超值套餐",
      popular: false,
      features: [
        { text: "60次简历评估", included: true },
        { text: "60次AI优化", included: true },

        { text: "模板导出功能", included: true },
        { text: "详细数据分析", included: true },
        { text: "邮件支持", included: true },
        { text: "购买限制: 不限购", included: true }
      ],
      cta: "立即购买",
      href: "/payment/professional",
      highlight: false
    },
    {
      name: "月卡",
      price: "¥29.9",
      period: "/30天",
      description: "职场冲刺期首选",
      popular: false,
      features: [
        { text: "30天不限次评估", included: true },
        { text: "30天不限次优化", included: true },

        { text: "模板导出功能", included: true },
        { text: "详细数据分析", included: true },
        { text: "优先级支持", included: true },
        { text: "熔断限制: 200次", included: true },
        { text: "购买限制: 不限购", included: true }
      ],
      cta: "立即购买",
      href: "/payment/monthly",
      highlight: false
    },
    {
      name: "年卡",
      price: "¥299",
      period: "/12个月",
      description: "高价值，高投入用户的首选",
      popular: false,
      features: [
        { text: "12个月不限次评估", included: true },
        { text: "12个月不限次优化", included: true },

        { text: "模板导出功能", included: true },
        { text: "高级数据分析", included: true },
        { text: "专属客户经理", included: true },
        { text: "定制开发支持", included: true },
        { text: "购买限制: 不限购", included: true }
      ],
      cta: "立即购买",
      href: "/payment/annual",
      highlight: false
    },
    {
      name: "超大包",
      price: "¥168",
      period: "/500次",
      description: "妈妈再也不用担心我简历写不好了",
      popular: false,
      features: [
        { text: "500次简历评估", included: true },
        { text: "500次AI优化", included: true },

        { text: "模板导出功能", included: true },
        { text: "详细数据分析", included: true },
        { text: "邮件支持", included: true },
        { text: "有效期: 永久", included: true }
      ],
      cta: "立即购买",
      href: "/payment/mega-pack",
      highlight: false
    }
  ]

  const faqs = [
    {
      question: "新人破冰套餐限购1次是什么意思？",
      answer: "新人破冰套餐是专为新用户设计的特惠套餐，每个用户仅限购买1次，用于体验我们的核心服务。"
    },
    {
      question: "月卡的不限次服务有使用限制吗？",
      answer: "月卡提供30天内不限次数使用，但设有熔断机制：每月最多使用200次服务，超过后当月将暂停服务，下月自动恢复。"
    },
    {
      question: "年卡包含哪些额外权益？",
      answer: "年卡用户享受12个月不限次服务，还包含专属客户经理、API访问和定制开发支持等高价值权益。"
    },
    {
      question: "超大包500次服务有效期多久？",
      answer: "超大包500次服务有效期为永久，无时间限制，适合需要大量使用但不需要月卡连续服务的用户。"
    },

    {
      question: "购买后如何开通服务？",
      answer: "支付成功后，系统会自动开通相应服务次数或时长，您可以在用户中心查看剩余次数、有效期和使用记录。"
    },
    {
      question: "支持哪些支付方式？",
      answer: "目前支持支付宝和微信支付，后续将开通更多支付方式。"
    },
    {
      question: "是否可以开具发票？",
      answer: "所有付费套餐均可申请开具增值税普通发票或专用发票，请在购买后联系客服办理。"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* 页面头部 */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-pulse-subtle">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">透明定价 · 无隐藏费用</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
            简单透明的定价方案
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            我们相信好用的工具应该简单实惠。选择适合您的方案，开始提升简历质量。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href="/features">查看功能详情</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/auth/register">立即免费注册</Link>
            </Button>
          </div>
        </div>

        {/* 定价卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative flex flex-col h-full transition-all duration-300 hover:shadow-xl animate-slide-up ${
                plan.highlight 
                  ? "border-2 border-primary shadow-soft scale-105" 
                  : "border-primary/10"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold flex items-center gap-2">
                    <Star className="h-3 w-3" />
                    最受欢迎
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {plan.name === "新人破冰" && <Zap className="h-5 w-5 text-amber-500" />}
                  {plan.name === "六六顺" && <Sparkles className="h-5 w-5 text-green-500" />}
                  {plan.name === "轻量小包" && <Zap className="h-5 w-5 text-blue-500" />}
                  {plan.name === "轻量超值" && <Rocket className="h-5 w-5 text-primary" />}
                  {plan.name === "月卡" && <Star className="h-5 w-5 text-yellow-500" />}
                  {plan.name === "年卡" && <Shield className="h-5 w-5 text-purple-500" />}
                  {plan.name === "超大包" && <Users className="h-5 w-5 text-indigo-500" />}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                </div>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
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
              
              <CardFooter>
                <Button 
                  asChild 
                  size="lg" 
                  className={`w-full ${plan.highlight ? "animate-pulse-subtle" : ""}`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* 特色说明 */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">灵活选择</h3>
              <p className="text-muted-foreground">
                7种套餐满足不同需求，从新人破冰到年卡，总有一款适合您
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">超高性价比</h3>
              <p className="text-muted-foreground">
                月卡30天不限次仅29.9元，年卡锁定高价值用户，单价低至0.25元/天
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent border border-secondary/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">透明定价</h3>
              <p className="text-muted-foreground">
                每个套餐清晰展示服务内容和定位，让您明明白白消费
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
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient">
            <div className="bg-background rounded-xl p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">立即开始</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                还在犹豫什么？
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                新人破冰套餐仅需1元即可体验3次完整服务，无需任何付费即可体验智能简历优化
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="outline">
                  <Link href="/features">了解更多</Link>
                </Button>
                <Button asChild size="lg" className="animate-pulse-subtle">
                  <Link href="/dashboard">免费开始使用</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}