"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, AlertCircle, Zap, Shield, Users, Crown, Gem, Phone, MessageSquare, UserCheck, CreditCard, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-client"
import { useEffect, useState } from "react"

// 支持的套餐参数类型
export type PlanType = 'single' | 'monthly' | 'annual'

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
  wechatInstructions: string
}

// 套餐数据映射
const PLAN_DATA: Record<PlanType, PlanData> = {
  'single': {
    id: 'single',
    name: '单次体验',
    price: '¥0.5',
    period: '/次',
    description: '适合偶尔使用的用户',
    features: [
      { text: '1次简历AI评估', included: true },
      { text: '1次简历AI优化', included: true },
      { text: '基础模板导出', included: true },
      { text: '24小时内使用', included: true },
      { text: '单次购买，无需订阅', included: true }
    ],
    icon: Zap,
    color: 'from-blue-500 to-cyan-400',
    popular: false,
    highlight: false,
    wechatInstructions: '支付0.5元购买单次体验套餐'
  },
  'monthly': {
    id: 'monthly',
    name: '月度超值',
    price: '¥5',
    period: '/200次',
    description: '最受欢迎的性价比之选',
    features: [
      { text: '200次简历AI评估', included: true },
      { text: '200次简历AI优化', included: true },
      { text: '高级模板导出', included: true },
      { text: '详细数据分析报告', included: true },
      { text: '当月无限使用', included: true },
      { text: '仅限当月有效', included: true },
      { text: '平均每次仅¥0.025', included: true },
      { text: '优先技术支持', included: true }
    ],
    icon: Crown,
    color: 'from-emerald-500 to-green-400',
    popular: true,
    highlight: true,
    wechatInstructions: '支付5元购买月度超值套餐（200次）'
  },
  'annual': {
    id: 'annual',
    name: '年度尊享',
    price: '¥50',
    period: '/3000次',
    description: '重度用户最佳选择',
    features: [
      { text: '3000次简历AI评估', included: true },
      { text: '3000次简历AI优化', included: true },
      { text: '所有高级模板', included: true },
      { text: '深度数据分析报告', included: true },
      { text: '全年无限使用', included: true },
      { text: '仅限当年有效', included: true },
      { text: '平均每次仅¥0.017', included: true },
      { text: '专属客户经理', included: true },
      { text: '定制化功能请求', included: true }
    ],
    icon: Gem,
    color: 'from-purple-500 to-pink-400',
    popular: false,
    highlight: false,
    wechatInstructions: '支付50元购买年度尊享套餐（3000次）'
  }
}

// 页面组件
export default function PaymentPage({ params }: { params: Promise<{ plan: string }> }) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [planData, setPlanData] = useState<PlanData | null>(null)
  const [copied, setCopied] = useState(false)
  const [planParam, setPlanParam] = useState<string>("")

  // 解析参数
  React.useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setPlanParam(resolvedParams.plan)
    }
    resolveParams()
  }, [params])

  // 检查登录状态
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/auth/login?redirect=/payment/${planParam}`)
    }
  }, [isLoading, isAuthenticated, router, planParam])

  // 设置套餐数据
  useEffect(() => {
    if (planParam) {
      const data = PLAN_DATA[planParam as PlanType]
      if (!data) {
        router.push('/pricing')
      } else {
        // 使用setTimeout避免在effect中同步调用setState
        const timer = setTimeout(() => {
          setPlanData(data)
        }, 0)
        return () => clearTimeout(timer)
      }
    }
  }, [planParam, router])

  // 复制微信号到剪贴板
  const copyWechatId = () => {
    navigator.clipboard.writeText("13522220541")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 如果正在加载或未登录，显示加载状态
  if (isLoading || !planData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-primary/20" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">加载中...</h1>
            <p className="text-muted-foreground mb-8">
              正在加载支付信息，请稍候。
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 如果未登录，已经重定向，这里不需要显示内容
  if (!isAuthenticated) {
    return null
  }

  const Icon = planData.icon
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

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
              <CreditCard className="h-4 w-4" />
              <span className="text-sm font-medium">微信支付 · 安全便捷</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
              微信支付确认
            </h1>
            <p className="text-xl text-muted-foreground">
              请按照以下步骤完成支付，支付成功后系统将自动开通服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 套餐详情卡片 */}
            <div className="lg:col-span-2 space-y-8">
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
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-primary-foreground text-sm font-semibold">
                        超值推荐
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
                  
                  {/* 有效期说明 */}
                  <div className="rounded-lg bg-primary/5 p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-semibold">有效期说明</h4>
                        <p className="text-sm text-muted-foreground">
                          {planData.id === 'single' && '购买后24小时内有效'}
                          {planData.id === 'monthly' && `有效期：${currentYear}年${currentMonth}月1日 - ${currentYear}年${currentMonth}月${new Date(currentYear, currentMonth, 0).getDate()}日`}
                          {planData.id === 'annual' && `有效期：${currentYear}年1月1日 - ${currentYear}年12月31日`}
                        </p>
                      </div>
                    </div>
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
                </CardContent>
              </Card>

              {/* 微信支付说明 */}
              <Card className="border-2 border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-emerald-500" />
                    微信支付步骤
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">添加微信</h4>
                        <p className="text-muted-foreground">
                          添加我们的客服微信号：
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-lg font-bold">
                            13522220541
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={copyWechatId}
                            className="gap-2"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copied ? "已复制" : "复制"}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">发送支付信息</h4>
                        <p className="text-muted-foreground">
                          添加好友后，请发送以下信息：
                        </p>
                        <div className="mt-2 p-4 rounded-lg bg-muted font-mono text-sm whitespace-pre-wrap">
                          {`用户名：${user?.name || user?.email || '您的用户名'}\n套餐：${planData.name}\n${planData.wechatInstructions}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">完成支付</h4>
                        <p className="text-muted-foreground">
                          根据客服提示完成微信支付。支付时请务必备注您的用户名，以便我们快速为您开通服务。
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">等待开通</h4>
                        <p className="text-muted-foreground">
                          支付成功后，我们的客服将在5-15分钟内为您开通服务。开通后您会收到通知，即可开始使用。
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800">重要提示</h4>
                        <ul className="text-amber-700 text-sm space-y-1 mt-1">
                          <li>• 支付时请务必备注您的用户名，否则可能延迟开通</li>
                          <li>• 如果您在30分钟内未收到开通通知，请通过微信联系客服</li>
                          <li>• 开通后，您可以在用户中心查看剩余次数和使用记录</li>
                          <li>• 如有任何问题，请随时通过微信联系客服</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* 订单摘要和用户信息 */}
            <div className="space-y-6">
              {/* 用户信息 */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-primary" />
                    用户信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">用户名</span>
                    <span className="font-semibold">{user?.name || '未设置'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">邮箱</span>
                    <span className="font-semibold truncate">{user?.email || '未设置'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">用户ID</span>
                    <span className="font-mono text-xs truncate">{user?.id || '未知'}</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* 订单摘要 */}
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
              
              {/* 联系客服 */}
              <Card className="border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-emerald-500" />
                    联系客服
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium">微信客服</div>
                        <div className="text-sm text-muted-foreground">快速响应，专业服务</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-lg font-bold mb-2">13522220541</div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={copyWechatId}
                        className="w-full gap-2"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "微信号已复制" : "复制微信号"}
                      </Button>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    添加微信时请备注&quot;简历优化&quot;，以便快速通过验证。
                  </p>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <Button 
                  asChild
                  size="lg" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                >
                  <Link href="/dashboard">
                    返回仪表板
                  </Link>
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
          
          {/* 支付保障 */}
          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">支付安全保障</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">人工确认</div>
                      <div className="text-sm text-muted-foreground">每笔订单人工核对</div>
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
                      <div className="font-medium">售后保障</div>
                      <div className="text-sm text-muted-foreground">支付后未开通全额退款</div>
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