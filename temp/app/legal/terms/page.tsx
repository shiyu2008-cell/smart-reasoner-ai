import { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务条款 | AI简历优化",
  description: "AI简历优化平台服务条款和用户协议"
};

export default function TermsPage() {
  return (
    <div className="container-responsive py-12 max-w-4xl mx-auto">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-8 gradient-text">服务条款</h1>
        
        <p className="text-muted-foreground mb-8">
          最后更新日期：{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. 服务概述</h2>
            <p>
              AI简历优化平台（以下简称&quot;本平台&quot;）是一款基于人工智能技术的简历优化SaaS工具。
              我们通过先进的AI算法分析用户提供的简历内容和目标职位描述，提供个性化的简历优化建议、
              匹配度评估和职业发展指导。
            </p>
            <p>
              本平台由万柏（个人经营）运营。使用本平台即表示您同意遵守本服务条款。
              如果您不同意这些条款，请勿使用本平台。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. 使用资格</h2>
            <p>要使用本平台，您必须：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>年满16周岁（根据GDPR要求，如未满16周岁需获得家长或监护人同意）</li>
              <li>具备完全民事行为能力</li>
              <li>同意遵守本服务条款和所有适用法律法规</li>
              <li>不得使用本平台进行任何非法活动或侵犯他人权利</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. 用户账户</h2>
            <p>本平台提供以下使用方式：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>访客访问：</strong>无需注册即可使用基本功能</li>
              <li><strong>注册账户：</strong>如需保存历史记录和使用高级功能，需要创建账户</li>
              <li><strong>账户安全：</strong>您有责任保护账户凭据，并对账户下的所有活动负责</li>
              <li><strong>信息准确：</strong>您保证提供的所有信息真实、准确、完整</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. 用户内容与许可</h2>
            <p><strong>4.1 内容所有权</strong></p>
            <p>您上传的简历内容、职位描述和其他材料（以下简称&quot;用户内容&quot;）的所有权归您所有。</p>

            <p><strong>4.2 使用许可</strong></p>
            <p>
              通过上传用户内容，您授予本平台在全球范围内、非独占、免版税的许可，仅用于：
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>处理和分析以提供简历优化服务</li>
              <li>改进和训练AI算法（在匿名化处理后）</li>
              <li>提供技术支持和服务维护</li>
              <li>遵守法律义务</li>
            </ul>

            <p><strong>4.3 内容保证</strong></p>
            <p>您保证：</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>拥有用户内容的所有必要权利</li>
              <li>内容不侵犯第三方知识产权或其他权利</li>
              <li>内容不包含恶意代码、病毒或其他有害组件</li>
              <li>不包含虚假或误导性信息</li>
            </ul>

            <p><strong>4.4 AI生成内容</strong></p>
            <p>
              本平台提供的优化建议由AI生成，仅作为参考。您应对最终简历内容的准确性、适当性和合法性负责。
              我们不对AI生成内容的质量、准确性或适用性作任何保证。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. 知识产权</h2>
            <p><strong>5.1 平台知识产权</strong></p>
            <p>
              本平台的软件、算法、界面设计、文档、商标和其他所有内容（不包括用户内容）
              的知识产权归万柏（个人经营）或其许可方所有。未经明确书面许可，不得复制、修改、分发或创建衍生作品。
            </p>

            <p><strong>5.2 开源组件</strong></p>
            <p>
              本平台可能包含开源软件组件，其使用受各自开源许可证约束。
              相关开源许可证信息可在平台文档中查询。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. 服务限制</h2>
            <p>您同意不：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>滥用服务或进行任何可能干扰平台正常运行的 activity</li>
              <li>尝试未经授权访问系统、网络或账户</li>
              <li>使用自动化工具大规模访问服务（除非事先获得授权）</li>
              <li>上传侵犯他人权利或违反法律的内容</li>
              <li>将服务用于欺诈、虚假申请或其他非法目的</li>
              <li>逆向工程、反编译或试图提取源代码</li>
              <li>利用服务漏洞或进行安全测试（除非参与授权的漏洞赏金计划）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. 免责声明</h2>
            <p><strong>7.1 服务状态</strong></p>
            <p>
              本平台按&quot;现状&quot;提供，不提供任何明示或暗示的保证，包括但不限于：
              适销性、特定用途适用性、不侵权、安全性、准确性或可用性。
            </p>

            <p><strong>7.2 优化结果</strong></p>
            <p>
              简历优化建议基于AI算法生成，不能保证：
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>获得面试机会或工作录用</li>
              <li>完全符合特定雇主要求</li>
              <li>不存在错误或遗漏</li>
              <li>满足所有法律法规要求</li>
            </ul>
            <p>您应对最终简历内容负责，并在提交前进行仔细审查。</p>

            <p><strong>7.3 第三方服务</strong></p>
            <p>
              本平台可能集成第三方服务（如AI API提供商）。我们对第三方服务的可用性、
              质量或内容不承担责任。第三方服务受其各自条款约束。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. 责任限制</h2>
            <p><strong>8.1 最大责任</strong></p>
            <p>
              在法律允许的最大范围内，我们对因使用或无法使用本平台引起的任何间接、
              附带、特殊、后果性或惩罚性损害不承担责任，包括但不限于：
              利润损失、数据损失、商誉损失或业务中断。
            </p>

            <p><strong>8.2 总责任上限</strong></p>
            <p>
              在任何情况下，我们对您的总责任不超过您在过去12个月内支付给我们的服务费用总额，
              或100元人民币（以较高者为准）。对于免费用户，我们的总责任不超过100元人民币。
            </p>

            <p><strong>8.3 不可免除责任</strong></p>
            <p>
              某些司法管辖区不允许排除或限制某些类型的责任，因此上述限制可能不适用于您。
              在这种情况下，我们的责任将限于法律允许的最小范围。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. 赔偿</h2>
            <p>
              您同意赔偿并使万柏（个人经营）免受因以下原因引起的任何索赔、
              损害、责任、损失和费用（包括合理的律师费）：
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>您使用本平台（包括任何用户内容）</li>
              <li>您违反本服务条款</li>
              <li>您侵犯任何第三方权利</li>
              <li>您违反任何适用法律法规</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. 终止</h2>
            <p><strong>10.1 由您终止</strong></p>
            <p>您可以随时停止使用本平台。对于注册账户，您可以请求删除账户和个人数据。</p>

            <p><strong>10.2 由我们终止</strong></p>
            <p>我们可以在以下情况下暂停或终止您的访问：</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>您违反本服务条款</li>
              <li>法律或政府要求</li>
              <li>长期不活动（通常为12个月以上）</li>
              <li>安全原因或疑似滥用</li>
              <li>服务终止或重大变更</li>
            </ul>

            <p><strong>10.3 终止后果</strong></p>
            <p>
              终止后，您的访问权限将立即停止。我们将根据隐私政策保留或删除您的数据。
              终止后仍有效的条款（如知识产权、免责声明、责任限制、赔偿等）将继续有效。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. 修改</h2>
            <p><strong>11.1 服务条款修改</strong></p>
            <p>
              我们可能不时修改本服务条款。重大变更将通过电子邮件（如您已注册）或平台公告通知。
              继续使用服务表示您接受修改后的条款。
            </p>

            <p><strong>11.2 服务修改</strong></p>
            <p>
              我们保留随时修改、暂停或终止服务（或其任何部分）的权利，无需事先通知。
              我们对由此造成的任何影响不承担责任。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. 法律适用与争议解决</h2>
            <p><strong>12.1 法律适用</strong></p>
            <p>
              本服务条款受中华人民共和国法律管辖（不包括冲突法规则）。
              对于欧盟用户，本条款也符合GDPR要求。
            </p>

            <p><strong>12.2 争议解决</strong></p>
            <p>
              任何因本服务条款引起的争议应首先通过友好协商解决。
              协商不成的，应向运营商所在地有管辖权的人民法院提起诉讼。
            </p>

            <p><strong>12.3 消费者权利</strong></p>
            <p>
              如果您是消费者，您享有适用消费者保护法规定的权利。
              本服务条款不影响这些法定权利。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. 其他条款</h2>
            <p><strong>13.1 完整协议</strong></p>
            <p>
              本服务条款与隐私政策、Cookie政策一起构成您与我们之间的完整协议，
              取代所有先前或同期的口头或书面协议。
            </p>

            <p><strong>13.2 可分割性</strong></p>
            <p>
              如果本服务条款的任何条款被认定为无效或不可执行，不影响其他条款的有效性和可执行性。
            </p>

            <p><strong>13.3 不可转让</strong></p>
            <p>您不得转让本服务条款下的权利或义务，未经我们书面同意的任何转让均无效。</p>

            <p><strong>13.4 弃权</strong></p>
            <p>未能执行任何条款不构成对该条款或任何其他条款的弃权。</p>

            <p><strong>13.5 联系信息</strong></p>
            <p>
              如对本服务条款有任何疑问，请通过以下方式联系我们：
            </p>
            <ul className="list-none pl-0 space-y-1">
              <li>电子邮件：l83311420@outlook.com</li>
              <li>邮寄地址：无固定营业地址（个人经营）</li>
              <li>微信：13522220541</li>
            </ul>
            <p className="mt-4">
              对于GDPR相关查询，您还可以联系我们的数据保护官：l83311420@outlook.com
            </p>
          </section>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              本服务条款已根据GDPR（通用数据保护条例）和中国《网络安全法》要求制定，
              旨在保护用户权利并确保服务合规性。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}