import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, AlertCircle, Sparkles, Zap, Star, Shield, Users, Rocket } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

// 支持的套餐参数类型
export type PlanType = 'new-user' | 'professional' | 'monthly' | 'annual' | 'mega-pack' | 'six-six-smooth' | 'light-pack'

// 套餐数据接口
interface PlanData {
  id: PlanType
  name: string
  price: string
  period: string
  description: string
  features: Array<{ text: string; included: boolean }>
  icon: React.ComponentType<{ className?: string }>
  color: string
  popular: boolean
  highlight: boolean
}

// 套餐数据映射
const PLAN_DATA: Record<PlanType, PlanData> = {
  'new-user': {
    id: 'new-user',
    name: '新人破冰',
    price: '¥1',
    period: '/3次',
    description: '新人超值特价',
    features: [
      { text: '3次简历评估', included: true },
      { text: '3次AI优化', included: true },
      { text: '模板导出功能', included: true },
      { text: '基础数据分析', included: true },
      { text: '社区支持', included: true },
      { text: '购买限制: 限1次', included: true }
    ],
    icon: Zap,
    color: 'from-amber-500 to-yellow-500',
    popular: false,
    highlight: true
  },
  'professional': {
    id: 'professional',
    name: '专业超值',
    price: '¥25',
    period: '/60次',
    description: '专业人员欣赏的超值套餐',
    features: [
      { text: '60次简历评估', included: true },
      { text: '60次AI优化', included: true },
      { text: '模板导出功能', included: true },
      { text: '详细数据分析', included: true },
      { text: '邮件支持', included: true },
      { text: '购买限制: 不限购', included: true }
    ],
    icon: Star,
    color: 'from-primary to-blue-500',
    popular: false,
    highlight: false
  },
  'monthly': {
    id: 'monthly',
    name: '月卡',
    price: '¥29.9',
    period: '/30天',
    description: '职场冲刺期首选',
    features: [
      { text: '30天不限次评估', included: true },
      { text: '30天不限次优化', included: true },
      { text: '模板导出功能', included: true },
      { text: '详细数据分析', included: true },
      { text: '优先级支持', included: true },
      { text: '熔断限制: 200次', included: true },
      { text: '购买限制: 不限购', included: true }
    ],
    icon: Shield,
    color: 'from-purple-500 to-indigo-500',
    popular: false,
    highlight: false
  },
  'annual': {
    id: 'annual',
    name: '年卡',
    price: '¥299',
    period: '/12个月',
    description: '高价值，高投入用户的首选',
    features: [
      { text: '12个月不限次评估', included: true },
      { text: '12个月不限次优化', included: true },
      { text: '模板导出功能', included: true },
      { text: '高级数据分析', included: true },
      { text: '专属客户经理', included: true },
      { text: '定制开发支持', included: true },
      { text: '购买限制: 不限购', included: true }
    ],
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    popular: false,
    highlight: false
  },
  'mega-pack': {
    id: 'mega-pack',
    name: '超大包',
    price: '¥168',
    period: '/500次',
    description: '妈妈再也不用担心我简历写不好了',
    features: [
      { text: '500次简历评估', included: true },
      { text: '500次AI优化', included: true },
      { text: '模板导出功能', included: true },
      { text: '详细数据分析', included: true },
      { text: '邮件支持', included: true },
      { text: '有效期: 永久', included: true }
    ],
    icon: Rocket,
    color: 'from-pink-500 to-rose-500',
    popular: false,
    highlight: false
  },
  'six-six-smooth': {
    id: 'six-six-smooth',
    name: '六六顺',
    price: '¥6.66',
    period: '/16次',
    description: '平均每份简历优化成本仅0.4元',
    features: [
      { text: '16次简历评估', included: true },
      { text: '16次AI优化', included: true },
      { text: '模板导出功能', included: true },
      { text: '详细数据分析', included: true },
      { text: '邮件支持', included: true },
      { text: '购买限制: 限1次', included: true }
    ],
    icon: Sparkles,
    color: 'from-green-500 to-emerald-500',
    popular: true,
    highlight: true
  },
  'light-pack': {
    id: 'light-pack',
    name: '轻量小包',
    price: '¥9.9',
    period: '/20次',
    description: '高性价比套餐',
    features: [
      { text: '20次简历评估', included: true },
      { text: '20次AI优化', included: true },
      { text: '模板导出功能', included: true },
      { text: '详细数据分析', included: true },
      { text: '邮件支持', included: true },
      { text: '购买限制: 不限购', included: true }
    ],
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    popular: false,
    highlight: false
  }
}

// 生成静态参数（用于静态生成）
export function generateStaticParams() {
  return Object.keys(PLAN_DATA).map((plan) => ({
    plan: plan as PlanType
  }))
}

// 页面元数据
export async function generateMetadata({ params }: { params: Promise<{ plan: string }> }): Promise<Metadata> {
  const { plan } = await params
  const planData = PLAN_DATA[plan as PlanType]
  
  if (!planData) {
    return {
      title: '套餐不存在 - ResumeAI',
      description: '请求的套餐不存在或已下架。'
    }
  }
  
  return {
    title: `${planData.name}支付确认 - ResumeAI`,
    description: `${planData.name}: ${planData.price}${planData.period} - ${planData.description}`,
    openGraph: {
      title: `${planData.name}支付确认 - ResumeAI`,
      description: `${planData.name}: ${planData.price}${planData.period} - ${planData.description}`,
      url: `https://resume-ai.com/payment/${plan}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${planData.name}支付确认 - ResumeAI`,
      description: `${planData.name}: ${planData.price}${planData.period} - ${planData.description}`,
    },
  }
}

// 页面组件
export default async function PaymentPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params
  const planData = PLAN_DATA[plan as PlanType]
  
  // 无效套餐处理
  if (!planData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">套餐不存在</h1>
            <p className="text-muted-foreground mb-8">
              您请求的套餐不存在或已下架。请返回价格页面选择其他可用套餐。
            </p>
            <Button asChild size="lg">
              <Link href="/pricing">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回价格页面
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  const Icon = planData.icon
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* 返回链接 */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/pricing">
              <ArrowLeft className="h-4 w-4" />
              返回价格页面
            </Link>
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-pulse-subtle">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">支付确认 · 安全可靠</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
              确认您的订单
            </h1>
            <p className="text-xl text-muted-foreground">
              请仔细核对套餐信息，确认无误后进行支付
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 套餐详情卡片 */}
            <div className="lg:col-span-2">
              <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/30 transition-all duration-300">
                {/* 装饰性背景 */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl -translate-y-32 translate-x-32" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${planData.color} text-primary-foreground`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl md:text-3xl">{planData.name}</CardTitle>
                        <CardDescription className="text-base">{planData.description}</CardDescription>
                      </div>
                    </div>
                    {planData.popular && (
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">
                        最受欢迎
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-6">
                  {/* 价格显示 */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{planData.price}</span>
                    <span className="text-2xl text-muted-foreground">{planData.period}</span>
                  </div>
                  
                  {/* 特性列表 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">套餐包含</h3>
                    <ul className="space-y-3">
                      {planData.features.map((feature, idx) => (
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
                  </div>
                  
                  {/* 待开发提示 */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-2">支付功能待开发</h4>
                        <p className="text-amber-700">
                          支付功能目前正在开发中，暂时无法完成支付。我们的开发团队正在全力推进，敬请期待！
                        </p>
                        <p className="text-amber-700 mt-2">
                          在此期间，您可以先体验我们的免费服务或联系客服进行人工购买。
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* 订单摘要 */}
            <div className="space-y-6">
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle>订单摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">套餐</span>
                    <span className="font-semibold">{planData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">单价</span>
                    <span className="font-semibold">{planData.price}{planData.period}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">数量</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>总计</span>
                      <span className="text-primary">{planData.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle>支付方式</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4 cursor-not-allowed opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">支</span>
                      </div>
                      <div>
                        <div className="font-medium">支付宝</div>
                        <div className="text-sm text-muted-foreground">快速安全的支付方式</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 cursor-not-allowed opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold">微</span>
                      </div>
                      <div>
                        <div className="font-medium">微信支付</div>
                        <div className="text-sm text-muted-foreground">便捷的移动支付</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full cursor-not-allowed"
                  disabled
                >
                  <AlertCircle className="mr-2 h-5 w-5" />
                  支付功能开发中
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                >
                  <Link href="/pricing">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    选择其他套餐
                  </Link>
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  支付完成后，系统将自动开通服务，您可以在用户中心查看使用情况。
                </p>
              </div>
            </div>
          </div>
          
          {/* 安全提示 */}
          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">安全支付保障</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">SSL加密</div>
                      <div className="text-sm text-muted-foreground">银行级数据保护</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">隐私保护</div>
                      <div className="text-sm text-muted-foreground">不存储支付信息</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium">7天无忧退款</div>
                      <div className="text-sm text-muted-foreground">不满意全额退款</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}