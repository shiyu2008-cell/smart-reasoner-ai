import { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策 | AI简历优化",
  description: "AI简历优化平台隐私政策，符合GDPR和中国网络安全法要求"
};

export default function PrivacyPage() {
  return (
    <div className="container-responsive py-12 max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-8 gradient-text">隐私政策</h1>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">重要提示</h3>
          <p className="text-blue-700 dark:text-blue-400">
            本隐私政策详细说明了AI简历优化平台如何处理您的个人数据。
            我们严格遵守GDPR（通用数据保护条例）和中国《网络安全法》的要求，
            保护您的隐私权利。请仔细阅读本政策，了解我们收集、使用和保护您信息的方式。
          </p>
          <p className="text-blue-700 dark:text-blue-400 mt-2">
            最后更新日期：{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. 数据控制者信息</h2>
            <p>
              <strong>数据控制者：</strong>万柏（个人经营）<br />
              <strong>电子邮件：</strong>l83311420@outlook.com<br />
              <strong>微信：</strong>13522220541
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. 我们收集的信息</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 您直接提供的信息</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>简历内容：</strong>包括个人信息（姓名、联系方式、地址）、工作经历、
                教育背景、技能证书、项目经验等
              </li>
              <li>
                <strong>职位描述：</strong>目标职位的要求、职责、技能需求等
              </li>
              <li>
                <strong>账户信息：</strong>如您注册账户，我们会收集电子邮件、用户名、密码（加密存储）
              </li>
              <li>
                <strong>联系方式：</strong>如您联系我们，我们会收集您的姓名、电子邮件、电话号码
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 自动收集的信息</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>使用数据：</strong>IP地址、浏览器类型、设备信息、操作系统、
                访问时间、页面浏览量、功能使用情况
              </li>
              <li>
                <strong>Cookie和跟踪技术：</strong>详见我们的Cookie政策
              </li>
              <li>
                <strong>技术日志：</strong>错误报告、性能数据、安全事件日志
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.3 从第三方获得的信息</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>社交媒体：</strong>如您通过社交媒体账户登录
              </li>
              <li>
                <strong>分析服务：</strong>Google Analytics等（匿名化数据）
              </li>
              <li>
                <strong>AI服务提供商：</strong>DeepSeek API处理您的简历内容以提供优化服务
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. 信息使用目的和法律依据</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">使用目的</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">处理的数据类型</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">法律依据（GDPR）</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">中国法律依据</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">提供简历优化服务</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">简历内容、职位描述</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">合同履行（第6(1)(b)条）</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">《网络安全法》第41条</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">账户管理和身份验证</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">账户信息、登录凭证</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">合同履行（第6(1)(b)条）</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">《网络安全法》第21条</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">服务改进和产品开发</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">使用数据、匿名化简历数据</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">合法利益（第6(1)(f)条）</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">《个人信息保护法》第13条</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">安全防护和欺诈预防</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">IP地址、设备信息、日志数据</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">合法利益（第6(1)(f)条）</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">《网络安全法》第21条</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">遵守法律义务</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">所有相关数据</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">法律义务（第6(1)(c)条）</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">《网络安全法》第21条</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">营销和推广（经同意）</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">电子邮件、使用偏好</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">同意（第6(1)(a)条）</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">《个人信息保护法》第13条</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. 数据共享与披露</h2>
            
            <h3 className="text-xl font-semibold mb-3">4.1 服务提供商</h3>
            <p>我们与以下类型的服务提供商共享必要数据：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>AI服务提供商：</strong>DeepSeek API - 用于处理简历优化请求
                （数据传输加密，服务商遵守严格的数据处理协议）
              </li>
              <li>
                <strong>云基础设施：</strong>Vercel、AWS或其他云服务商 - 用于托管和存储
              </li>
              <li>
                <strong>分析服务：</strong>Google Analytics（匿名化数据）
              </li>
              <li>
                <strong>客户支持：</strong>客户服务工具提供商
              </li>
            </ul>
            <p className="mt-2">
              所有服务提供商均签署数据处理协议（DPA），确保其数据处理符合GDPR要求。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 法律要求</h3>
            <p>在以下情况下，我们可能披露您的信息：</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>遵守法律义务或政府要求</li>
              <li>执行我们的服务条款</li>
              <li>保护我们、用户或公众的权利、财产或安全</li>
              <li>防止欺诈或安全威胁</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.3 业务转让</h3>
            <p>
              如果发生合并、收购、资产出售或破产，您的信息可能作为交易的一部分被转移。
              我们会要求接收方继续遵守本隐私政策。
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.4 国际数据传输</h3>
            <p>
              我们的服务提供商可能位于中国境外。对于向欧盟以外的数据传输，我们实施适当保障措施：
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>欧盟标准合同条款（SCCs）</li>
              <li>充分性决定（如适用）</li>
              <li>技术保护措施（加密、匿名化）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. 数据安全</h2>
            <p>
              我们实施技术和组织措施保护您的数据安全，符合GDPR第32条和中国《网络安全法》第21条要求：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>传输加密：</strong>使用TLS 1.2+加密所有数据传输
              </li>
              <li>
                <strong>存储加密：</strong>静态数据使用AES-256加密
              </li>
              <li>
                <strong>访问控制：</strong>基于角色的访问控制（RBAC），最小权限原则
              </li>
              <li>
                <strong>网络防护：</strong>防火墙、入侵检测系统、DDoS防护
              </li>
              <li>
                <strong>定期审计：</strong>安全评估、漏洞扫描、渗透测试
              </li>
              <li>
                <strong>员工培训：</strong>所有员工接受数据保护和隐私培训
              </li>
              <li>
                <strong>事件响应：</strong>制定数据泄露应急响应计划，72小时内向监管机构报告
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. 数据保留</h2>
            <p>我们仅在有合法目的需要时保留您的数据：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>简历内容：</strong>处理完成后立即删除，除非您选择保存
                （注册用户可保存30天，访客会话结束后删除）
              </li>
              <li>
                <strong>账户信息：</strong>账户存续期间保留，注销后30天内删除
              </li>
              <li>
                <strong>使用数据：</strong>匿名化后保留24个月用于分析
              </li>
              <li>
                <strong>法律要求：</strong>为遵守法律义务（如税务记录）可能保留更长时间
              </li>
              <li>
                <strong>备份数据：</strong>备份保留30天，定期清理
              </li>
            </ul>
            <p className="mt-4">
              保留期满后，我们将安全删除或匿名化您的数据。
              您也可以随时请求提前删除（见第7节您的权利）。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. 您的权利（GDPR和中国法律）</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">访问权（GDPR第15条）</h3>
                <p className="text-sm">
                  您有权获取我们处理的您的个人数据副本，了解处理目的、类别、接收方等信息。
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">更正权（GDPR第16条）</h3>
                <p className="text-sm">
                  您有权要求更正不准确或不完整的个人数据。
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">删除权（GDPR第17条）</h3>
                <p className="text-sm">
                  您有权要求删除您的个人数据（&quot;被遗忘权&quot;），特别是在数据不再需要、
                  撤回同意或非法处理的情况下。
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">限制处理权（GDPR第18条）</h3>
                <p className="text-sm">
                  您有权在特定情况下限制对您个人数据的处理，如质疑数据准确性或反对处理。
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">数据可携权（GDPR第20条）</h3>
                <p className="text-sm">
                  您有权以结构化、常用且机器可读的格式接收您的数据，并传输给其他控制者。
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900/20">
                <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">反对权（GDPR第21条）</h3>
                <p className="text-sm">
                  您有权反对基于合法利益的处理，包括用于直接营销的分析。
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-pink-50 dark:bg-pink-900/20">
                <h3 className="font-semibold text-pink-800 dark:text-pink-300 mb-2">同意撤回权</h3>
                <p className="text-sm">
                  您有权随时撤回同意，不影响撤回前基于同意的处理的合法性。
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-800 dark:text-gray-300 mb-2">投诉权</h3>
                <p className="text-sm">
                  您有权向监管机构投诉。欧盟用户可联系所在国家的数据保护机构，
                  中国用户可向网信部门投诉。
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold mb-2">如何行使您的权利</h3>
              <p>
                要行使上述任何权利，请通过以下方式联系我们：
                <strong> privacy@resume-ai.com</strong>
              </p>
              <p className="mt-2 text-sm">
                我们将在30天内回复您的请求。根据GDPR第12条，我们可能需要验证您的身份。
                某些情况下，我们可能因法律义务或合法利益拒绝请求，但会说明理由。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cookie和跟踪技术</h2>
            <p>
              我们使用Cookie和类似技术提供、保护和改进我们的服务。详细信息请参阅我们的
              <a href="/legal/cookies" className="text-primary hover:underline ml-1">Cookie政策</a>。
            </p>
            <p className="mt-2">
              首次访问时，我们会征求您对非必要Cookie的同意。
              您可以通过浏览器设置或我们的Cookie控制面板随时管理偏好。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. 儿童隐私</h2>
            <p>
              我们的服务不面向16岁以下儿童（欧盟）或14岁以下儿童（中国）。
              如果我们发现收集了未成年人的个人数据，将立即删除。
              如果您是家长或监护人并认为孩子向我们提供了数据，请立即联系我们。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. 第三方链接和服务</h2>
            <p>
              我们的服务可能包含第三方网站或服务的链接。本隐私政策仅适用于我们的服务。
              我们不对第三方的隐私实践负责，建议您阅读其隐私政策。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. 隐私政策变更</h2>
            <p>
              我们可能不时更新本隐私政策。重大变更将在生效前通过电子邮件或平台通知。
              我们会在本页面顶部更新&quot;最后更新日期&quot;。
            </p>
            <p className="mt-2">
              继续使用我们的服务表示您接受更新后的政策。
              如果您不同意变更，应停止使用服务并联系我们删除您的数据。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. 联系我们</h2>
            <p>
              如对本隐私政策有任何疑问、意见或请求，请通过以下方式联系我们：
            </p>
            <ul className="list-none pl-0 space-y-2 mt-2">
              <li>
                <strong>数据保护查询：</strong>privacy@resume-ai.com
              </li>
              <li>
                <strong>GDPR数据保护官：</strong>dpo@resume-ai.com（仅限GDPR相关查询）
              </li>
              <li>
                <strong>邮寄地址：</strong>无固定营业地址（个人经营），收件人：万柏
              </li>
              <li>
                <strong>微信：</strong>13522220541
              </li>
            </ul>
            <p className="mt-4">
              对于欧盟用户，您还可以联系您所在国家的数据保护机构。
              我们的欧盟代表（如需要）信息将在网站上公布。
            </p>
          </section>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              本隐私政策根据GDPR（通用数据保护条例）、中国《网络安全法》和《个人信息保护法》制定。
              我们致力于保护您的隐私和个人数据权利。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}