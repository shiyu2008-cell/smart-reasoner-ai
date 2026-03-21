import { Metadata } from "next";
import { FileText, Sparkles, Zap, CheckCircle, Download, Shield, Brain, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "使用说明 | AI简历优化",
  description: "AI简历优化平台完整使用指南和最佳实践"
};

export default function InstructionsPage() {
  return (
    <div className="container-responsive py-12 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">AI简历优化使用指南</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          全面了解如何使用AI简历优化工具，最大化您的求职成功率
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI智能分析</h3>
              <p className="text-sm text-muted-foreground">深度匹配度评估</p>
            </div>
          </div>
          <p className="text-sm">
            基于先进的AI算法，全面分析您的简历与目标职位的匹配程度，提供量化评分和具体改进建议。
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-6 border border-secondary/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">一键优化</h3>
              <p className="text-sm text-muted-foreground">智能内容重构</p>
            </div>
          </div>
          <p className="text-sm">
            自动优化简历内容，植入关键词、量化成果、调整结构，让您的简历在ATS系统中脱颖而出。
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-accent/10 rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-accent">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">隐私保护</h3>
              <p className="text-sm text-muted-foreground">安全数据加密</p>
            </div>
          </div>
          <p className="text-sm">
            端到端加密处理，严格遵守GDPR和中国网络安全法，确保您的个人信息安全。
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section className="bg-white dark:bg-gray-900 rounded-2xl border p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">核心功能详解</h2>
              <p className="text-muted-foreground">了解平台的主要功能和工作原理</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                简历智能评估
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span><strong>匹配度评分：</strong>0-100分量化评估简历与职位的匹配程度</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span><strong>关键词分析：</strong>识别JD中的核心关键词在简历中的覆盖情况</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span><strong>结构化分析：</strong>评估简历的结构、内容完整性和专业性</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span><strong>优化建议：</strong>提供具体、可操作的改进方向</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                AI优化引擎
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                  <span><strong>内容重构：</strong>基于STAR法则重新组织工作经历描述</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                  <span><strong>关键词植入：</strong>自然融入职位描述中的高频关键词</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                  <span><strong>成果量化：</strong>将模糊描述转换为具体、可量化的成果</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                  <span><strong>格式优化：</strong>调整格式以提高ATS系统通过率</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-2xl border p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent">
              <Target className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">分步使用指南</h2>
              <p className="text-muted-foreground">按照以下步骤获得最佳优化效果</p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent"></div>
              
              <div className="relative pl-16 pb-10">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">准备您的简历</h3>
                <div className="space-y-4">
                  <p><strong>最佳实践：</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>使用最新的简历版本，包含完整的工作经历</li>
                    <li>确保包含联系方式、教育背景、工作经历、技能证书</li>
                    <li>尽量详细描述工作职责和项目成果</li>
                    <li>建议简历长度在1-2页之间</li>
                    <li>可以上传Word、PDF或直接粘贴文本内容</li>
                  </ul>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      <strong>隐私提示：</strong>您可以临时删除敏感信息（如姓名、电话、地址）进行优化，
                      优化完成后再添加回去。所有数据处理都经过加密。
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative pl-16 pb-10">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">输入目标职位描述</h3>
                <div className="space-y-4">
                  <p><strong>如何获取优质职位描述：</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>从招聘网站（如LinkedIn、猎聘、BOSS直聘）复制完整职位描述</li>
                    <li>重点关注&quot;职位要求&quot;、&quot;任职资格&quot;、&quot;技能要求&quot;部分</li>
                    <li>包含具体的技术栈、工具、证书要求</li>
                    <li>注明工作年限、学历等硬性要求</li>
                    <li>越详细越好，AI需要充分理解职位需求</li>
                  </ul>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      <strong>专业提示：</strong>同时分析多个类似职位的描述，提取共同的关键词和要求，
                      可以让AI优化更有针对性。
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative pl-16 pb-10">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">进行简历评估</h3>
                <div className="space-y-4">
                  <p>填写完简历和职位描述后，系统会自动进行智能评估：</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">评估维度</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 技能匹配度（0-100分）</li>
                        <li>• 经验相关度分析</li>
                        <li>• 关键词覆盖情况</li>
                        <li>• 结构完整性评估</li>
                        <li>• 优化潜力判断</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">评估结果解读</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• ≥70分：高度匹配，强烈推荐优化</li>
                        <li>• 50-69分：基本匹配，建议优化</li>
                        <li>• 30-49分：匹配度较低，需显著改进</li>
                        <li>• &lt;30分：匹配度过低，建议寻找更合适职位</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    评估通常需要10-30秒，取决于内容长度。评估完成后会显示详细报告。
                  </p>
                </div>
              </div>

              <div className="relative pl-16 pb-10">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-lg">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-4">执行AI优化</h3>
                <div className="space-y-4">
                  <p>评估通过后，可以点击&quot;一键优化&quot;按钮：</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>流式生成：</strong>AI会逐步生成优化内容，您可以实时查看</li>
                    <li><strong>思考过程：</strong>部分情况下可以查看AI的思考分析过程</li>
                    <li><strong>最终答案：</strong>获得完整的优化后简历内容</li>
                    <li><strong>优化报告：</strong>包含修改说明和建议依据</li>
                  </ul>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      <strong>优化时间：</strong>根据内容复杂度，优化过程通常需要30秒到2分钟。
                      请耐心等待AI生成最佳结果。
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-lg">
                  5
                </div>
                <h3 className="text-xl font-semibold mb-4">导出和应用结果</h3>
                <div className="space-y-4">
                  <p>优化完成后：</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <Download className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">复制内容</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        直接复制优化后的文本到您的简历文档
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-secondary" />
                      <h4 className="font-semibold">人工调整</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        根据AI建议进行个性化调整和补充
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <h4 className="font-semibold">最终审查</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        检查语法、格式、内容准确性后提交
                      </p>
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <p className="text-sm text-purple-700 dark:text-purple-400">
                      <strong>重要提醒：</strong>AI优化建议仅供参考。您应对最终简历内容的
                      真实性、准确性和适当性负责。建议在提交前进行人工审查。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-2xl border p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-accent">
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">最佳实践与技巧</h2>
              <p className="text-muted-foreground">提升优化效果的实用建议</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">简历准备技巧</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <span><strong>量化成果：</strong>使用具体数字描述成就（如&quot;提升效率30%&quot;）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <span><strong>使用行动动词：</strong>以动词开头描述职责（如&quot;领导&quot;、&quot;开发&quot;）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <span><strong>针对性调整：</strong>为不同职位准备不同版本的简历</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <span><strong>关键词密度：</strong>自然融入行业术语和技术关键词</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">AI优化策略</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                    <span><strong>多次优化：</strong>对同一简历针对不同职位分别优化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                    <span><strong>渐进改进：</strong>基于AI建议进行多轮迭代优化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                    <span><strong>组合优化：</strong>综合多个类似职位的描述进行优化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                    <span><strong>反馈学习：</strong>记录哪些优化在实际申请中更有效</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">常见问题解答</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold">优化效果如何保证？</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI优化基于行业最佳实践和ATS系统规则，但不能保证获得面试或录用。
                      建议结合人工判断进行调整。
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4 py-2">
                    <h4 className="font-semibold">数据处理安全吗？</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      所有数据传输和存储都经过加密，符合GDPR和中国网络安全法要求。
                      详细内容请查看隐私政策。
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h4 className="font-semibold">支持哪些文件格式？</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      支持文本直接粘贴，也支持上传Word、PDF文件（自动提取文本）。
                      建议使用纯文本格式以获得最佳优化效果。
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h4 className="font-semibold">需要注册账户吗？</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      访客可以直接使用基本功能。注册账户可以保存历史记录、
                      使用高级功能和多设备同步。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-5">
                <h3 className="font-semibold mb-3">专业建议</h3>
                <p className="text-sm">
                  对于技术职位，重点关注技术栈匹配；对于管理职位，突出领导力和战略思维。
                  建议定期更新简历，即使没有在主动求职，也可以保持简历的时效性。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">开始您的简历优化之旅</h2>
            <p className="text-muted-foreground mb-6">
              立即体验AI驱动的简历优化，让每一份简历都成为机会的起点
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
              >
                开始免费优化
              </a>
              <a
                href="/legal/privacy"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
              >
                查看隐私政策
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              如有任何使用问题，请查看常见问题或联系客服支持。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}