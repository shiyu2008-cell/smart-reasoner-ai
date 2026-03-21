"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@/lib/auth-client";
import { Loader2, LogIn, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { mutate: signIn, isPending, error } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    
    signIn(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          setSuccess(true);
          // 延迟跳转到仪表板
          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
        },
        onError: (error: unknown) => {
          console.error("登录失败:", error);
        },
      }
    );
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 blur-3xl animate-pulse-subtle" />
      
      {/* 流光粒子效果 */}
      <div className="stream-container">
        <div className="stream-line animate-stream-flow" style={{ top: '20%', animationDelay: '0s' }} />
        <div className="stream-line animate-stream-flow" style={{ top: '50%', animationDelay: '2s' }} />
        <div className="stream-line animate-stream-flow" style={{ top: '80%', animationDelay: '4s' }} />
      </div>

      <Card className="w-full max-w-md border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl shadow-primary/10 animate-fade-in relative overflow-hidden">
        {/* 卡片装饰 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-2xl" />
        
        <CardHeader className="space-y-3 pb-6">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent interactive-scale">
              <LogIn className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold gradient-text animate-gradient-shift">
                欢迎回来
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                登录您的账户，继续优化您的简历
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 邮箱输入 */}
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                邮箱地址
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 h-11 border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  autoComplete="email"
                  disabled={isPending}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* 密码输入 */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" />
                  密码
                </Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-xs text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors duration-300"
                >
                  忘记密码？
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10 h-11 border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  autoComplete="current-password"
                  disabled={isPending}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300 touch-target-sm"
                  disabled={isPending}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="animate-slide-down border border-destructive/50 bg-destructive/10 rounded-lg p-3">
                <p className="text-sm text-destructive">
                  {error.message || "登录失败，请检查您的邮箱和密码"}
                </p>
              </div>
            )}

            {/* 成功提示 */}
            {success && (
              <div className="border border-emerald-500/50 bg-emerald-500/10 rounded-lg p-3 animate-micro-celebration">
                <p className="text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  登录成功！正在跳转到仪表板...
                </p>
              </div>
            )}

            {/* 登录按钮 */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 hover:shadow-glow transition-all duration-300 group relative overflow-hidden touch-target-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  登录中...
                </>
              ) : (
                <>
                  登录账户
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
              {/* 按钮光晕效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-modern-gradient-flow" />
            </Button>


          </form>

          {/* 第三方登录选项 - 占位 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">其他登录方式</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              disabled
              className="h-10 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 touch-target-sm"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              disabled
              className="h-10 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 touch-target-sm"
            >
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6 border-t border-border/50">
          <p className="text-sm text-center text-muted-foreground">
            还没有账户？{" "}
            <Link
              href="/auth/register"
              className="text-primary font-semibold hover:text-primary/80 hover:underline underline-offset-2 transition-colors duration-300"
            >
              免费注册试用
            </Link>
          </p>
          <p className="text-xs text-center text-muted-foreground/70">
            登录即表示您同意我们的{" "}
            <Link href="/legal/terms" className="text-primary/80 hover:text-primary hover:underline underline-offset-2">
              服务条款
            </Link>{" "}
            和{" "}
            <Link href="/legal/privacy" className="text-primary/80 hover:text-primary hover:underline underline-offset-2">
              隐私政策
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}