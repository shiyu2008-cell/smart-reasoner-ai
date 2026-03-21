import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Sparkles, CheckCircle, Clock, FileText, Target, BarChart } from "lucide-react"
import Link from "next/link"

export default function ResumeOptimizationTutorialPage() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">简历优化全流程</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 gradient-text">
            简历优化全流程
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            从评估到导出的完整操作指南，15分钟掌握专业简历优化技巧
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>时长：15分钟</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>7个步骤</span>
            </div>
          </div>
        </div>

        {/* 教程内容 - 7个步骤 */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 步骤1 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 animate-slide-up">
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <CardTitle className="text-lg">输入简历信息</CardTitle>
                <CardDescription>填写基本信息</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>填写个人信息</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>详细的工作经历</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>教育背景和技能</span>
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
                <CardTitle className="text-lg">设定求职目标</CardTitle>
                <CardDescription>明确职位要求</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                    <span>目标职位名称</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                    <span>公司行业背景</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                    <span>关键技能要求</span>
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
                <CardTitle className="text-lg">AI初步评估</CardTitle>
                <CardDescription>获取匹配度分析</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-secondary mt-0.5 flex-shrink-0" />
                    <span>简历与职位匹配度</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-secondary mt-0.5 flex-shrink-0" />
                    <span>优势领域识别</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-secondary mt-0.5 flex-shrink-0" />
                    <span>改进建议清单</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 步骤4 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-purple-500/10 hover:border-purple-500/30 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 mb-4">
                  <span className="text-xl font-bold text-purple-500">4</span>
                </div>
                <CardTitle className="text-lg">内容结构调整</CardTitle>
                <CardDescription>优化信息层次</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>重点内容前置</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>信息层级优化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>冗余内容精简</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 步骤5 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-amber-500/10 hover:border-amber-500/30 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 mb-4">
                  <span className="text-xl font-bold text-amber-500">5</span>
                </div>
                <CardTitle className="text-lg">语言表达优化</CardTitle>
                <CardDescription>提升专业度</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>专业术语应用</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>动词强化表达</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>量化成果展示</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 步骤6 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-green-500/10 hover:border-green-500/30 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 mb-4">
                  <span className="text-xl font-bold text-green-500">6</span>
                </div>
                <CardTitle className="text-lg">格式排版美化</CardTitle>
                <CardDescription>视觉呈现优化</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>字体字号统一</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>间距对齐调整</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>重点内容突出</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 步骤7 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-pink-500/10 hover:border-pink-500/30 animate-slide-up lg:col-start-2" style={{ animationDelay: '0.6s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-500/10 mb-4">
                  <span className="text-xl font-bold text-pink-500">7</span>
                </div>
                <CardTitle className="text-lg">最终导出分享</CardTitle>
                <CardDescription>完成并交付</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span>模板格式导出</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span>分享链接生成</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span>云端备份保存</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 优化要点 */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <Target className="h-5 w-5" />
                优化核心要点
              </CardTitle>
              <CardDescription className="text-accent/80">
                掌握这些关键点，让简历脱颖而出
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-primary" />
                    成果量化
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    使用具体数字和百分比展示成就，如&quot;提升效率30%&quot;、&quot;节省成本20%&quot;
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    职位匹配
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    针对不同职位调整简历重点，突出与目标职位最相关的经验和技能
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4 text-secondary" />
                    关键词优化
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    使用行业术语和招聘关键词，提高简历在ATS系统中的通过率
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    故事性表达
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    将工作经历串联成有逻辑的职业发展故事，展示成长轨迹
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 常见错误提醒 */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="border-red-200/30 bg-red-50/30 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <FileText className="h-5 w-5" />
                需要避免的常见错误
              </CardTitle>
              <CardDescription className="text-red-600/80 dark:text-red-400/80">
                这些错误会影响简历效果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-red-700/90 dark:text-red-300/90">
                <li className="flex items-start gap-2">
                  <span className="font-bold">❌</span>
                  <span><strong>信息过时：</strong>没有更新最新的工作经历和技能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">❌</span>
                  <span><strong>格式混乱：</strong>字体、字号、间距不统一</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">❌</span>
                  <span><strong>内容冗余：</strong>描述过于冗长，缺乏重点</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">❌</span>
                  <span><strong>缺乏量化：</strong>只有职责描述，没有成果展示</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 导航到其他教程 */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-6">探索更多教程</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/help/tutorials/quick-start">快速入门指南</Link>
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