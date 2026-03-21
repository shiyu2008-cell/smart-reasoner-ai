import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Zap, CheckCircle, Clock, FileText, Download } from "lucide-react"
import Link from "next/link"

export default function QuickStartTutorialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* 导航栏 */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/help">
              <ArrowLeft className="h-4 w-4" />
              返回帮助中心
            </Link>
          </Button>
        </div>

        {/* 页面头部 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">快速入门指南</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 gradient-text">
            快速入门指南
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            5分钟了解核心功能和使用方法，快速上手简历优化平台
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>时长：5分钟</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>3个步骤</span>
            </div>
          </div>
        </div>

        {/* 教程内容 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 步骤1 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 animate-slide-up">
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <CardTitle className="text-lg">准备简历内容</CardTitle>
                <CardDescription>收集和整理您的简历信息</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>准备完整的个人信息和工作经历</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>整理教育背景和专业技能</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>明确求职目标和期望职位</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 步骤2 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-accent/10 hover:border-accent/30 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
                  <span className="text-xl font-bold text-accent">2</span>
                </div>
                <CardTitle className="text-lg">进行简历评估</CardTitle>
                <CardDescription>AI智能分析简历匹配度</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>进入仪表板页面填写简历内容</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>输入目标职位描述和要求</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>点击&quot;开始评估&quot;获取匹配度分析</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 步骤3 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-secondary/10 hover:border-secondary/30 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 mb-4">
                  <span className="text-xl font-bold text-secondary">3</span>
                </div>
                <CardTitle className="text-lg">优化并导出简历</CardTitle>
                <CardDescription>获得专业的优化建议</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>查看AI提供的优化建议</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>一键优化简历格式和表达</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>导出为模板格式或分享链接</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 实用技巧 */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="border-amber-200/30 bg-amber-50/30 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <Zap className="h-5 w-5" />
                实用小贴士
              </CardTitle>
              <CardDescription className="text-amber-700/80 dark:text-amber-400/80">
                让您的使用体验更高效
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-amber-800/90 dark:text-amber-300/90">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>保存草稿：</strong>中途退出时，系统会自动保存您已填写的内容</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>多次优化：</strong>同一份简历可针对不同职位进行多次优化</span>
                </li>

              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 操作指引 */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">立即开始体验</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  免费注册
                </CardTitle>
                <CardDescription>立即体验完整功能</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  注册后即可获得2次简历评估和1次AI优化机会
                </p>
                <Button asChild className="w-full">
                  <Link href="/auth/register">开始免费注册</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="h-5 w-5 text-accent" />
                  成功案例
                </CardTitle>
                <CardDescription>用户成功故事</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  查看其他用户如何通过简历优化获得理想工作
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/cases">查看案例</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 导航到其他教程 */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-6">继续学习其他教程</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/help/tutorials/resume-optimization">简历优化全流程</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/help/tutorials/advanced-tips">高级技巧分享</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/help">返回帮助中心</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}