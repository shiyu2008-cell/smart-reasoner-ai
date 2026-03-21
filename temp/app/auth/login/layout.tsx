import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "登录ResumeAI | 继续优化您的简历 - 安全账户访问",
  description: "登录您的ResumeAI账户，继续使用智能简历评估和优化服务。多重安全验证，保护您的个人信息和简历数据安全。",
  openGraph: {
    title: "登录ResumeAI | 继续优化您的简历",
    description: "登录您的ResumeAI账户，继续使用智能简历评估和优化服务。多重安全验证，保护您的个人信息。",
    url: "https://resume-ai.com/auth/login",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "登录ResumeAI | 继续优化您的简历",
    description: "登录您的ResumeAI账户，继续使用智能简历评估和优化服务。多重安全验证，保护您的个人信息。",
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}