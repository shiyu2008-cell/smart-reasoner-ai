import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie政策 | AI简历优化",
  description: "AI简历优化平台Cookie政策，符合GDPR和ePrivacy指令要求"
};

export default function CookiesPage() {
  return (
    <div className="container-responsive py-12 max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Cookie政策</h1>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Cookie同意管理</h3>
          <p className="text-yellow-700 dark:text-yellow-400">
            根据GDPR和ePrivacy指令，我们尊重您对Cookie的偏好。
            首次访问时，我们会征求您对非必要Cookie的同意。
            您可以通过浏览器设置或下方的Cookie控制面板随时管理偏好。
          </p>
          <p className="text-yellow-700 dark:text-yellow-400 mt-2">
            最后更新日期：{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. 什么是Cookie？</h2>
            <p>
              Cookie是您访问网站时存储在您设备上的小型文本文件。
              它们被广泛用于使网站正常工作或更高效地工作，以及向网站所有者提供信息。
            </p>
            <p className="mt-2">
              Cookie有多种类型，包括：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>会话Cookie：</strong>在浏览器会话期间临时存储，关闭浏览器时删除
              </li>
              <li>
                <strong>持久Cookie：</strong>在设备上保留指定时间或直到手动删除
              </li>
              <li>
                <strong>第一方Cookie：</strong>由您访问的网站设置
              </li>
              <li>
                <strong>第三方Cookie：</strong>由您访问网站以外的域名设置
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. 我们使用的Cookie类型</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Cookie类型</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">目的</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">法律依据</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">是否需要同意</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <strong>必要Cookie</strong>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      使网站基本功能正常工作，如页面导航、访问安全区域、维持会话状态
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      合同履行（GDPR第6(1)(b)条）
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-sm">
                        不需要
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <strong>性能Cookie</strong>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      收集匿名信息，帮助我们了解用户如何与网站互动，改进网站性能
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      同意（GDPR第6(1)(a)条）
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded text-sm">
                        需要
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <strong>功能Cookie</strong>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      记住您的偏好（如语言、区域设置），提供个性化功能
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      同意（GDPR第6(1)(a)条）
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded text-sm">
                        需要
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <strong>广告Cookie</strong>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      跟踪用户跨网站行为，提供相关广告（本平台目前不使用广告Cookie）
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      同意（GDPR第6(1)(a)条）
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded text-sm">
                        需要
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. 具体Cookie列表</h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">必要Cookie</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Cookie名称</th>
                        <th className="text-left py-2">提供方</th>
                        <th className="text-left py-2">目的</th>
                        <th className="text-left py-2">有效期</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-mono text-sm">session_id</td>
                        <td className="py-2">第一方</td>
                        <td className="py-2">维持用户会话状态，确保服务正常运作</td>
                        <td className="py-2">会话结束</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-mono text-sm">csrf_token</td>
                        <td className="py-2">第一方</td>
                        <td className="py-2">防止跨站请求伪造攻击，保护账户安全</td>
                        <td className="py-2">会话结束</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-mono text-sm">cookie_consent</td>
                        <td className="py-2">第一方</td>
                        <td className="py-2">存储您的Cookie偏好设置</td>
                        <td className="py-2">1年</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">性能Cookie</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Cookie名称</th>
                        <th className="text-left py-2">提供方</th>
                        <th className="text-left py-2">目的</th>
                        <th className="text-left py-2">有效期</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-mono text-sm">_ga</td>
                        <td className="py-2">Google Analytics</td>
                        <td className="py-2">区分唯一用户，统计网站使用情况（匿名）</td>
                        <td className="py-2">2年</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-mono text-sm">_gid</td>
                        <td className="py-2">Google Analytics</td>
                        <td className="py-2">区分用户会话，分析页面浏览行为</td>
                        <td className="py-2">24小时</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-mono text-sm">_gat</td>
                        <td className="py-2">Google Analytics</td>
                        <td className="py-2">限制请求速率，控制数据收集频率</td>
                        <td className="py-2">1分钟</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-blue-700 dark:text-blue-400">
                  注意：我们配置Google Analytics使用IP匿名化，不存储完整IP地址。
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">功能Cookie</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Cookie名称</th>
                        <th className="text-left py-2">提供方</th>
                        <th className="text-left py-2">目的</th>
                        <th className="text-left py-2">有效期</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-mono text-sm">language</td>
                        <td className="py-2">第一方</td>
                        <td className="py-2">记住您的语言偏好</td>
                        <td className="py-2">1年</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-mono text-sm">theme</td>
                        <td className="py-2">第一方</td>
                        <td className="py-2">记住您的主题偏好（深色/浅色模式）</td>
                        <td className="py-2">1年</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-mono text-sm">recent_resumes</td>
                        <td className="py-2">第一方</td>
                        <td className="py-2">存储您最近处理的简历ID（本地存储）</td>
                        <td className="py-2">30天</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. 第三方Cookie</h2>
            <p>
              本平台使用以下第三方服务，它们可能设置自己的Cookie：
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Google Analytics：</strong>用于分析网站使用情况。
                我们已配置IP匿名化，并与Google签署数据处理协议。
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  查看Google隐私政策
                </a>
              </li>
              <li>
                <strong>DeepSeek API：</strong>用于AI简历优化处理。
                API调用可能涉及技术Cookie，但不用于跟踪目的。
                <a href="https://www.deepseek.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  查看DeepSeek隐私政策
                </a>
              </li>
              <li>
                <strong>Vercel：</strong>我们的托管服务商，可能设置必要的技术Cookie以确保服务正常运行。
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  查看Vercel隐私政策
                </a>
              </li>
            </ul>
            <p className="mt-4">
              我们要求所有第三方服务提供商遵守GDPR要求，并限制其Cookie的使用范围。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookie控制</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">浏览器设置</h3>
                <p className="text-sm mb-3">
                  大多数浏览器允许您控制Cookie：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>接受或拒绝所有Cookie</li>
                  <li>仅接受第一方Cookie</li>
                  <li>在设置Cookie时收到通知</li>
                  <li>删除现有Cookie</li>
                </ul>
                <p className="text-sm mt-3">
                  请注意，禁用必要Cookie可能影响网站功能。
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">我们的Cookie控制面板</h3>
                <p className="text-sm mb-3">
                  您可以通过我们的Cookie控制面板管理偏好：
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">必要Cookie</span>
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">始终启用</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">性能Cookie</span>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">启用</button>
                      <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded text-xs">禁用</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">功能Cookie</span>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">启用</button>
                      <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded text-xs">禁用</button>
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-3">
                  更改设置将更新您的cookie_consent Cookie。
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold mb-2">按浏览器管理Cookie</h3>
              <ul className="list-none pl-0 space-y-2">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Chrome Cookie设置
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Firefox Cookie设置
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Safari Cookie设置
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Edge Cookie设置
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. GDPR和ePrivacy合规性</h2>
            <p>
              我们的Cookie实践符合以下法规要求：
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>GDPR（通用数据保护条例）：</strong>
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>基于同意的处理（第6(1)(a)条）</li>
                  <li>透明信息要求（第12-14条）</li>
                  <li>用户权利，包括撤回同意权</li>
                </ul>
              </li>
              <li>
                <strong>ePrivacy指令（Cookie法）：</strong>
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>非必要Cookie需要事先同意</li>
                  <li>同意必须自由给出、具体、知情和明确</li>
                  <li>提供简单的同意撤回机制</li>
                </ul>
              </li>
              <li>
                <strong>中国《个人信息保护法》：</strong>
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>个人信息处理需要取得同意</li>
                  <li>提供便捷的撤回同意方式</li>
                  <li>明示处理目的、方式和范围</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. 数据存储和安全</h2>
            <p>
              Cookie中存储的数据：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>采用加密传输（HTTPS/TLS）</li>
              <li>敏感信息（如会话ID）安全存储</li>
              <li>定期审查和更新Cookie设置</li>
              <li>实施SameSite属性防止CSRF攻击</li>
              <li>设置HttpOnly标志保护敏感Cookie不被JavaScript访问</li>
            </ul>
            <p className="mt-4">
              我们定期进行安全评估，确保Cookie实践符合最新的安全标准。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. 政策变更</h2>
            <p>
              我们可能不时更新本Cookie政策，以反映技术变更、法规更新或服务调整。
              重大变更将在生效前通过网站通知。
            </p>
            <p className="mt-2">
              我们会更新本页面的&quot;最后更新日期&quot;，建议您定期查看。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. 联系我们</h2>
            <p>
              如对本Cookie政策有任何疑问，或需要协助管理Cookie偏好，请通过以下方式联系我们：
            </p>
            <ul className="list-none pl-0 space-y-2 mt-2">
              <li>
                <strong>电子邮件：</strong>l83311420@outlook.com
              </li>
              <li>
                <strong>邮寄地址：</strong>无固定营业地址（个人经营），收件人：万柏
              </li>
              <li>
                <strong>微信：</strong>13522220541
              </li>
            </ul>
            <p className="mt-4">
              对于GDPR相关查询，您还可以联系我们的数据保护官：dpo@resume-ai.com
            </p>
          </section>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              本Cookie政策根据GDPR、ePrivacy指令和中国《个人信息保护法》制定，
              旨在提供透明、可控的Cookie使用体验。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}