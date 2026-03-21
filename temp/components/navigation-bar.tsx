"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-client";
import { LogIn, User, LogOut, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";

export function NavigationBar() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { label: "首页", href: "/" },
    { label: "功能", href: "/features" },
    { label: "定价", href: "/pricing" },
    { label: "案例", href: "/cases" },
    { label: "帮助", href: "/help" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserMenuOpen(false);
    } catch (error) {
      console.error("退出登录失败:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 品牌标识 */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <span className="text-sm font-bold text-primary-foreground">AI</span>
            </div>
            <span className="text-xl font-bold tracking-tight">锋屿天行</span>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                className="touch-target-sm"
                asChild
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </div>

        {/* 右侧操作区域 */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            // 加载状态
            <div className="flex items-center gap-2">
              <div className="h-8 w-20 bg-muted rounded animate-pulse" />
              <div className="h-8 w-24 bg-muted rounded animate-pulse" />
            </div>
          ) : isAuthenticated && user ? (
            // 已登录用户菜单
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 touch-target-sm"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="hidden sm:inline">{user.name || user.email}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </Button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border bg-background/95 backdrop-blur shadow-lg animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium">{user.name || user.email}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start touch-target-sm"
                      asChild
                    >
                      <Link href="/dashboard">仪表板</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start touch-target-sm"
                      asChild
                    >
                      <Link href="/settings">账户设置</Link>
                    </Button>
                    <div className="border-t my-1" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-destructive hover:text-destructive touch-target-sm"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      退出登录
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // 未登录用户按钮
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="touch-target-sm" asChild>
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  登录
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-accent touch-target-sm"
                asChild
              >
                <Link href="/auth/register">
                  <Sparkles className="mr-2 h-4 w-4" />
                  免费注册
                </Link>
              </Button>
            </div>
          )}

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none touch-target-sm flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">打开菜单</span>
              </summary>
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border bg-background shadow-lg p-2 animate-in fade-in slide-in-from-top-2">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start touch-target-sm"
                    asChild
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
                <div className="border-t my-2" />
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start touch-target-sm"
                      asChild
                    >
                      <Link href="/dashboard">仪表板</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-destructive hover:text-destructive touch-target-sm"
                      onClick={handleSignOut}
                    >
                      退出登录
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start touch-target-sm"
                      asChild
                    >
                      <Link href="/auth/login">登录</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-primary to-accent touch-target-sm"
                      asChild
                    >
                      <Link href="/auth/register">免费注册</Link>
                    </Button>
                  </>
                )}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}