import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Target, CheckCircle, Clock, Zap, TrendingUp, BarChart, Lightbulb, Shield, Users, Brain, Award } from "lucide-react"
import Link from "next/link"

export default function AdvancedTipsTutorialPage() {
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
            <Target className="h-4 w-4" />
            <span className="text-sm font-medium">高级技巧分享</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 gradient-text">
            高级技巧分享
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            提升简历质量的实用建议，让您在求职中脱颖而出
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>时长：12分钟</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>6个技巧</span>
            </div>
          </div>
        </div>

        {/* 高级技巧内容 */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 技巧1 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 animate-slide-up">
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">量化成就展示</CardTitle>
                <CardDescription>用数据说话，提升说服力</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>使用具体数字描述工作成果</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>例如：&quot;提升团队效率30%&quot;而不是&quot;提升了团队效率&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>展示百分比增长、金额节省、用户增长等</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>使用时间框架说明成效（如&quot;在3个月内实现...&quot;）</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 技巧2 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-accent/10 hover:border-accent/30 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">关键词优化策略</CardTitle>
                <CardDescription>通过ATS筛选系统</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>研究目标职位的招聘要求</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>提取行业和专业术语关键词</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>自然融入关键词，避免关键词堆砌</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>在技能、经验和成就中重复使用核心关键词</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 技巧3 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-secondary/10 hover:border-secondary/30 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 mb-4">
                  <BarChart className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">STAR法则应用</CardTitle>
                <CardDescription>结构化描述经历</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>S（情境）：</strong> 描述项目或任务的背景</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>T（任务）：</strong> 说明您承担的具体职责</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>A（行动）：</strong> 描述您采取的具体行动</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>R（结果）：</strong> 展示您取得的量化成果</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 技巧4 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-purple-500/10 hover:border-purple-500/30 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 mb-4">
                  <Lightbulb className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-lg">差异化竞争优势</CardTitle>
                <CardDescription>突出您的独特价值</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>识别并突出您的核心竞争优势</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>展示跨界技能和多元背景</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>强调解决问题的能力而非任务执行</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>展示持续学习和适应能力</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 技巧5 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-amber-500/10 hover:border-amber-500/30 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 mb-4">
                  <Shield className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle className="text-lg">避免常见错误</CardTitle>
                <CardDescription>提升专业度和可信度</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>避免拼写和语法错误，使用专业术语</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>不要使用过于笼统或模糊的描述</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>避免信息过载，保持简洁有力</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>不要虚构或夸大事实，保持真实性</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 技巧6 */}
            <Card className="hover:shadow-xl transition-all duration-300 border-green-500/10 hover:border-green-500/30 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 mb-4">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-lg">雇主视角思考</CardTitle>
                <CardDescription>从招聘者角度优化简历</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>思考&quot;我能为公司解决什么问题？&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>强调贡献而非职责，展示价值创造</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>匹配公司文化和价值观</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>展示长期发展和团队协作能力</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 专家建议 */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="border-blue-200/30 bg-blue-50/30 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                <Brain className="h-5 w-5" />
                专家建议
              </CardTitle>
              <CardDescription className="text-blue-700/80 dark:text-blue-400/80">
                资深HR的简历评审视角
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-blue-800/90 dark:text-blue-300/90">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>第一印象很重要：</strong> 招聘者平均只花6秒扫描一份简历，确保关键信息一目了然
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>定制化优于通用化：</strong> 为每个目标职位微调简历，提高匹配度
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>成果导向思维：</strong> 展示您如何为公司创造价值，而不仅仅是完成任务
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>持续优化迭代：</strong> 简历不是一成不变的，根据反馈和市场变化不断改进
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 进阶工具推荐 */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="border-purple-200/30 bg-purple-50/30 dark:bg-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-300">
                <Award className="h-5 w-5" />
                进阶工具推荐
              </CardTitle>
              <CardDescription className="text-purple-700/80 dark:text-purple-400/80">
                辅助提升简历质量的专业工具
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-purple-800/90 dark:text-purple-300/90">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>ATS模拟测试：</strong> 使用在线工具测试简历通过ATS系统的可能性</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>可读性分析：</strong> 检查简历语言是否清晰易懂，避免过于复杂的表达</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>关键词密度分析：</strong> 确保关键词自然分布，避免过度优化</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>同行评审：</strong> 请行业内的朋友或导师提供反馈意见</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 行动计划 */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">实施行动计划</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    1
                  </span>
                  评估当前简历
                </CardTitle>
                <CardDescription>识别改进空间</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  使用AI评估功能分析当前简历的匹配度和优化空间
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard">立即评估</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent">
                    2
                  </span>
                  应用高级技巧
                </CardTitle>
                <CardDescription>针对性优化</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  根据本指南中的技巧，逐一优化简历的各个部分
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard">开始优化</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary">
                    3
                  </span>
                  获取专业反馈
                </CardTitle>
                <CardDescription>持续改进</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  导出简历后，寻求专业人士的意见进行最终调整
                </p>
                <Button asChild className="w-full">
                  <Link href="mailto:l83311420@outlook.com">联系专家</Link>
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
              <Link href="/help/tutorials/quick-start">快速入门指南</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/help/tutorials/resume-optimization">简历优化全流程</Link>
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