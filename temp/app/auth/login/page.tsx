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