import * as React from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  HelpCircle, BookOpen, MessageSquare, 
  Mail, FileText, CheckCircle, Zap, 
  Sparkles, Target, Clock,
  Search, Download, Upload, Settings
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "帮助中心 | ResumeAI使用教程和常见问题解答",
  description: "ResumeAI使用教程、常见问题解答、功能使用指南。快速解决使用问题，最大化利用AI简历优化工具的功能和服务。",
  openGraph: {
    title: "帮助中心 | ResumeAI使用教程和常见问题解答",
    description: "ResumeAI使用教程、常见问题解答、功能使用指南。快速解决使用问题，最大化利用AI简历优化工具的功能和服务。",
    url: "https://resume-ai.com/help",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "帮助中心 | ResumeAI使用教程和常见问题解答",
    description: "ResumeAI使用教程、常见问题解答、功能使用指南。快速解决使用问题，最大化利用AI简历优化工具的功能和服务。",
  },
};

export default function HelpPage() {
  const faqs = [
    {
      question: "如何使用简历评估功能？",
      answer: "在仪表板页面输入您的简历内容和目标职位描述，点击&apos;开始评估&apos;按钮。AI将分析匹配度并提供详细报告。",
      category: "功能使用",
      icon: <Search className="h-5 w-5" />
    },
    {
      question: "AI优化会修改我的简历内容吗？",
      answer: "AI主要优化格式、表达和专业度，不会虚构经历或学历。所有修改都基于您提供的内容，确保真实准确。",
      category: "功能使用",
      icon: <FileText className="h-5 w-5" />
    },
    {
      question: "如何导出模板简历？",
      answer: "在简历优化完成后，点击&apos;导出模板&apos;按钮即可。系统支持多种页面尺寸和颜色主题。",
      category: "功能使用",
      icon: <Download className="h-5 w-5" />
    },
    {
      question: "免费版有哪些限制？",
      answer: "免费版提供3次简历评估和1次AI优化。如需更多服务可升级专业版。",
      category: "定价方案",
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      question: "专业版10次服务如何计算？",
      answer: "每次完整的简历评估+优化算作1次服务。模板导出不消耗服务次数。",
      category: "定价方案",
      icon: <Zap className="h-5 w-5" />
    },
    {
      question: "数据安全性如何保障？",
      answer: "我们采用企业级加密传输，处理完成后自动清除您的简历数据。不会存储或分享您的个人信息。",
      category: "安全隐私",
      icon: <Settings className="h-5 w-5" />
    },
    {
      question: "支持哪些文件格式上传？",
      answer: "支持纯文本粘贴，或上传.txt、.doc、.docx、.pdf格式文件。建议使用文本格式以获得最佳效果。",
      category: "功能使用",
      icon: <Upload className="h-5 w-5" />
    },
    {
      question: "评估报告中的分数代表什么？",
      answer: "分数（0-100）表示简历与目标职位的匹配度。80分以上为高度匹配，60-80分为基本匹配，低于60分建议优化。",
      category: "功能使用",
      icon: <Target className="h-5 w-5" />
    },
    {
      question: "是否可以评估英文简历？",
      answer: "支持中英文简历评估和优化。系统会自动识别语言并提供相应的优化建议。",
      category: "功能使用",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      question: "如何联系客服支持？",
      answer: "您可以通过页面底部的联系方式，或发送邮件至 l83311420@outlook.com 获取帮助。",
      category: "支持服务",
      icon: <Mail className="h-5 w-5" />
    }
  ]

  const tutorials = [
    {
      title: "快速入门指南",
      description: "5分钟了解核心功能和使用方法",
      duration: "5分钟",
      steps: 3,
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: "简历优化全流程",
      description: "从评估到导出的完整操作指南",
      duration: "15分钟",
      steps: 7,
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      title: "高级技巧分享",
      description: "提升简历质量的实用建议",
      duration: "12分钟",
      steps: 6,
      icon: <Target className="h-6 w-6" />
    }
  ]

  const contactMethods = [
    {
      title: "电话支持",
      description: "直接拨打电话咨询",
      responseTime: "工作时间",
      icon: <MessageSquare className="h-5 w-5" />,
      link: "tel:13522220541"
    },
    {
      title: "邮箱支持",
      description: "直接发送邮件咨询",
      responseTime: "24小时内",
      icon: <Mail className="h-5 w-5" />,
      link: "mailto:l83311420@outlook.com"
    },
    {
      title: "常见问题",
      description: "自助查询解决方案",
      responseTime: "立即",
      icon: <HelpCircle className="h-5 w-5" />,
      link: "#faq"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* 页面头部 */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-pulse-subtle">
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm font-medium">帮助中心 · 全面支持</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
            帮助与支持中心
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            在这里找到所有问题的答案，获取使用指南和专业技术支持
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">开始使用</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#faq">查看常见问题</Link>
            </Button>
          </div>
        </div>

        {/* 快速导航 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 animate-slide-up">
            <CardHeader className="pb-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">使用文档</CardTitle>
              <CardDescription>详细的操作指南和教程</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/legal/instructions">查看文档</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-secondary/10 hover:border-secondary/30 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 mb-4">
                <MessageSquare className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-lg">电话支持</CardTitle>
              <CardDescription>直接拨打电话咨询</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full">
                <Link href="tel:13522220541">联系支持</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 border-purple-500/10 hover:border-purple-500/30 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 mb-4">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle className="text-lg">更新日志</CardTitle>
              <CardDescription>最新功能和改进</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full">
                <Link href="#changelog">查看更新</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 教程指南 */}
        <div id="tutorials" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">学习指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {tutorials.map((tutorial, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {tutorial.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.duration} · {tutorial.steps}个步骤</CardDescription>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={
                      index === 0 ? "/help/tutorials/quick-start" :
                      index === 1 ? "/help/tutorials/resume-optimization" :
                      "/help/tutorials/advanced-tips"
                    }>开始学习</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 常见问题 */}
        <div id="faq" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">常见问题</h2>
            <div className="text-sm text-muted-foreground">
              共 {faqs.length} 个问题
            </div>
          </div>
          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="mb-4 border rounded-xl px-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      {faq.icon}
                    </div>
                    <div>
                      <span className="font-semibold">{faq.question}</span>
                      <div className="mt-1">
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-muted">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="pl-14">
                    <p className="text-muted-foreground">{faq.answer}</p>
                    {index === 0 && (
                      <div className="mt-4">
                        <Button asChild size="sm" variant="outline">
                          <Link href="/dashboard">立即尝试</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 联系支持 */}
        <div id="contact" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">联系支持</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                    <div className="text-primary">{method.icon}</div>
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>响应时间：{method.responseTime}</span>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={method.link}>立即联系</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 免责声明 */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-amber-200/30 bg-amber-50/30 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <HelpCircle className="h-5 w-5" />
                重要免责声明
              </CardTitle>
              <CardDescription className="text-amber-700/80 dark:text-amber-400/80">
                使用前请务必阅读
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-amber-800/90 dark:text-amber-300/90">
                <p>
                  <strong>AI优化性质说明：</strong> 本系统提供的AI优化主要针对简历格式、表达方式和结构逻辑，旨在提升简历的专业度和可读性。
                </p>
                <p>
                  <strong>事实准确性承诺：</strong> 系统严格禁止虚构或歪曲事实。如简历中无国外经验或教育背景，AI不会强行添加。所有优化均基于您提供的真实信息。
                </p>
                <p>
                  <strong>能力提升建议：</strong> 对于个人教育背景或实际能力方面的差距，AI优化无法替代真实的学习和成长。简历优化仅是求职过程中的辅助工具，个人能力的持续提升仍需自身努力。
                </p>
                <p>
                  <strong>最终责任声明：</strong> 优化结果仅供参考，最终简历内容和求职决策需用户自行判断和负责。建议结合多方建议和自身实际情况做出最佳选择。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient">
            <div className="bg-background rounded-xl p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">开始您的简历优化之旅</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                还有问题未解决？
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                我们的支持团队随时准备为您提供帮助，确保您获得最佳使用体验
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="outline">
                  <Link href="/dashboard">立即开始使用</Link>
                </Button>
                <Button asChild size="lg" className="animate-pulse-subtle">
                  <Link href="mailto:l83311420@outlook.com">联系客服支持</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}