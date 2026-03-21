import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "免费注册ResumeAI | 立即获得3次免费试用 - 优化简历",
  description: "注册ResumeAI账户，立即获得3次免费简历评估和优化机会。无需信用卡，快速注册，立即开始提升您的求职成功率。",
  openGraph: {
    title: "免费注册ResumeAI | 3次免费试用",
    description: "注册ResumeAI账户，立即获得3次免费简历评估和优化机会。无需信用卡，快速注册，提升求职成功率。",
    url: "https://resume-ai.com/auth/register",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "免费注册ResumeAI | 3次免费试用",
    description: "注册ResumeAI账户，立即获得3次免费简历评估和优化机会。无需信用卡，快速注册，提升求职成功率。",
  },
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}