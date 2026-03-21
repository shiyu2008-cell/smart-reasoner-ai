import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/components/navigation-bar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI简历优化 | 专业SaaS工具",
  description: "使用AI技术优化您的简历，提升求职成功率。智能分析、个性化建议、实时预览。",
};



// 页脚组件
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t relative overflow-hidden">
      {/* 动态背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-primary/3">
        {/* 微粒子背景 */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => {
            // 使用伪随机数生成器避免纯度错误
            const seed = i * 100;
            const pseudoRandom = (offset: number) => {
              const x = Math.sin(seed + offset) * 10000;
              return x - Math.floor(x);
            };
            const floatX = pseudoRandom(1) * 20 - 10;
            const floatY = pseudoRandom(2) * -10 - 5;
            const particleOpacity = 0.05 + pseudoRandom(3) * 0.1;
            const left = pseudoRandom(4) * 100;
            const top = pseudoRandom(5) * 100;
            const width = 1 + pseudoRandom(6) * 3;
            const height = 1 + pseudoRandom(7) * 3;
            return (
              <div
                key={`footer-particle-${i}`}
                className="absolute rounded-full animate-particle-float-random"
                style={{
                  '--float-x': `${floatX}px`,
                  '--float-y': `${floatY}px`,
                  '--particle-opacity': `${particleOpacity}`,
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${width}px`,
                  height: `${height}px`,
                  background: `radial-gradient(circle, var(--primary) 0%, var(--accent) 100%)`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0,
                  animationDuration: '10s'
                } as React.CSSProperties}
              />
            );
          })}
        </div>
        {/* 渐变光晕 */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-secondary/5 to-accent/5 blur-3xl" />
      </div>
      
      <div className="container-responsive relative z-10 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent interactive-scale">
                <span className="text-2xl font-bold text-primary-foreground">AI</span>
              </div>
              <div>
                <h3 className="text-lg font-bold gradient-text animate-gradient-shift">锋屿天行</h3>
                <p className="text-sm text-muted-foreground mt-1">AI简历优化服务</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              使用先进的AI技术，帮助您打造专业、吸引人的简历，提升求职竞争力。
              <span className="block mt-2 text-primary/80">让每一份简历都成为机会的起点。</span>
            </p>
            {/* 社交媒体链接 - 现代动态效果 */}
            <div className="flex gap-4 pt-2">
              {[
                { name: 'Twitter', path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z', color: 'from-blue-500 to-cyan-400' },
                { name: 'GitHub', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', color: 'from-gray-700 to-gray-900' },
                { name: 'LinkedIn', path: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.60 1.56-1.36 2.14-2.23z', color: 'from-blue-600 to-blue-800' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="relative group touch-target-sm"
                  aria-label={social.name}
                >
                  {/* 背景光晕 */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`} />
                  
                  {/* 图标容器 */}
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-background to-card border border-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-glow">
                    <svg className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                    
                    {/* 微光效果 */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-modern-shimmer" />
                    </div>
                    
                    {/* 角标光点 */}
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* 悬浮提示 */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs bg-foreground text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.name}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-foreground rotate-45" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 产品链接 */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              产品
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "功能特色", href: "/features" },
                { label: "定价方案", href: "/pricing" },
                { label: "使用案例", href: "/cases" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-all duration-300 hover:text-primary hover:pl-2 flex items-center gap-2 touch-target-sm"
                  >
                    <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 资源链接 */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              资源
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "帮助中心", href: "/help" },
                { label: "账户设置", href: "/settings" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-all duration-300 hover:text-primary hover:pl-2 flex items-center gap-2 touch-target-sm"
                  >
                    <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系信息 */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
              联系我们
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="text-muted-foreground flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-primary/10 flex items-center justify-center">
                  <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                support@resume-ai.com
              </li>
              <li className="text-muted-foreground flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-primary/10 flex items-center justify-center">
                  <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                +86 400-123-4567
              </li>
              <li className="text-muted-foreground flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-primary/10 flex items-center justify-center">
                  <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </div>
                工作日 9:00-18:00
              </li>
            </ul>
            <div className="pt-4">
              <Button 
                size="sm" 
                className="relative w-full bg-gradient-to-r from-primary to-accent touch-target-sm interactive-scale overflow-hidden group"
              >
                {/* 背景光晕 */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-modern-gradient-flow" />
                
                {/* 按钮文本 */}
                <span className="relative z-10">联系我们</span>
                
                {/* 微光效果 */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-modern-shimmer" />
                </div>
                
                {/* 粒子效果 */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 3 }).map((_, i) => {
                    // 使用伪随机数生成器避免纯度错误
                    const seed = i * 50;
                    const pseudoRandom = (offset: number) => {
                      const x = Math.sin(seed + offset) * 10000;
                      return x - Math.floor(x);
                    };
                    const floatX = pseudoRandom(1) * 10 - 5;
                    const floatY = pseudoRandom(2) * -8 - 2;
                    return (
                      <div
                        key={`button-particle-${i}`}
                        className="absolute rounded-full animate-particle-float-random"
                        style={{
                          '--float-x': `${floatX}px`,
                          '--float-y': `${floatY}px`,
                          '--particle-opacity': '0.6',
                          left: `${20 + i * 30}%`,
                          top: '50%',
                          width: '2px',
                          height: '2px',
                          background: 'radial-gradient(circle, white 0%, transparent 100%)',
                          animationDelay: `${i * 0.2}s`,
                          opacity: 0
                        } as React.CSSProperties}
                      />
                    );
                  })}
                </div>
                
                {/* 图标动画 */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse-subtle" />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* 版权信息 - 现代动态视觉效果 */}
        <div className="mt-8 md:mt-12 border-t pt-6 md:pt-8 text-center">
          <div className="relative">
            {/* 装饰性背景 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-2xl" />
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-muted-foreground relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 border backdrop-blur-sm">
                <span className="text-xs">©</span>
                <span>{currentYear} 锋屿天行。保留所有权利。</span>
              </span>
              
              <span className="hidden md:inline text-primary/30">✦</span>
              
              <span className="flex items-center justify-center gap-3 flex-wrap">
                {["隐私政策", "服务条款", "Cookie政策", "使用说明"].map((item) => (
                  <a
                    key={item}
                    href={
                      item === "隐私政策" ? "/legal/privacy" :
                      item === "服务条款" ? "/legal/terms" :
                      item === "Cookie政策" ? "/legal/cookies" :
                      "/legal/instructions"
                    }
                    className="group relative px-3 py-1 rounded-full hover:bg-background/80 hover:border-primary/20 border border-transparent transition-all duration-300 touch-target-sm"
                  >
                    {/* 背景光晕 */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* 链接文本 */}
                    <span className="relative text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      {item}
                    </span>
                    
                    {/* 下划线动画 */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-3/4" />
                    
                    {/* 微光效果 */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-modern-shimmer" />
                    </div>
                    
                    {/* 角标 */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                ))}
              </span>
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground/70 relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 border backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse-subtle" />
                本产品由AI驱动，致力于提升您的求职成功率。我们承诺保护您的数据隐私。
              </span>
              <span className="block mt-2 px-3 py-1 rounded-full bg-background/30 border backdrop-blur-sm inline-flex items-center gap-2">
                <span className="text-[10px]">🛡️</span>
                <span>京ICP备2026008659号</span>
                <span className="w-1 h-1 rounded-full bg-accent/50 animate-pulse-subtle" />
              </span>
            </div>
            
            {/* 微粒子效果 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1">
              {Array.from({ length: 5 }).map((_, i) => {
                // 使用伪随机数生成器避免纯度错误
                const seed = i * 150;
                const pseudoRandom = (offset: number) => {
                  const x = Math.sin(seed + offset) * 10000;
                  return x - Math.floor(x);
                };
                const floatX = pseudoRandom(1) * 10 - 5;
                const floatY = pseudoRandom(2) * -5 - 2;
                const particleOpacity = 0.3 + pseudoRandom(3) * 0.3;
                const width = 1 + pseudoRandom(4) * 2;
                const height = 1 + pseudoRandom(5) * 2;
                return (
                  <div
                    key={`footer-dot-${i}`}
                    className="absolute bottom-0 rounded-full bg-gradient-to-r from-primary to-accent animate-particle-float-random"
                    style={{
                      '--float-x': `${floatX}px`,
                      '--float-y': `${floatY}px`,
                      '--particle-opacity': `${particleOpacity}`,
                      left: `${20 + i * 15}%`,
                      width: `${width}px`,
                      height: `${height}px`,
                      animationDelay: `${i * 0.5}s`,
                      opacity: 0,
                      animationDuration: '8s'
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" data-scroll-behavior="smooth" id="top">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <NavigationBar />
        <main className="flex-1 animate-fade-in">
          <div className="container-responsive py-8 md:py-12">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
