"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/lib/auth-client";
import { Loader2, UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: signUp, isPending, error } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      
      // 实时验证密码匹配
      if (name === "password" || name === "confirmPassword") {
        if (newFormData.password && newFormData.confirmPassword && newFormData.password !== newFormData.confirmPassword) {
          setPasswordError("密码不匹配");
        } else {
          setPasswordError("");
        }
      }
      
      return newFormData;
    });
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      return "用户名不能为空";
    }
    if (!formData.email.trim()) {
      return "邮箱地址不能为空";
    }
    if (!formData.password) {
      return "密码不能为空";
    }
    if (formData.password.length < 8) {
      return "密码长度至少为8位";
    }
    if (formData.password !== formData.confirmPassword) {
      return "两次输入的密码不匹配";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    
    const validationError = validateForm();
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    
    signUp(
      {
        email: formData.email,
        password: formData.password,
        name: formData.username,
        username: formData.username,
      },
      {
        onSuccess: () => {
          setSuccess(true);
          // 新用户将自动获得3次评估机会（通过数据库默认值设置）
          console.log('新用户注册成功，已分配3次评估机会');
          // 延迟跳转到仪表板
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        },
        onError: (error: unknown) => {
          console.error("注册失败:", error);
          setPasswordError((error as Error)?.message || "注册失败，请稍后重试");
        },
      }
    );
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-secondary/10 to-accent/10 blur-3xl animate-pulse-subtle" />
      
      {/* 流光粒子效果 */}
      <div className="stream-container">
        <div className="stream-line animate-stream-flow" style={{ top: '30%', animationDelay: '1s' }} />
        <div className="stream-line animate-stream-flow" style={{ top: '60%', animationDelay: '3s' }} />
        <div className="stream-line animate-stream-flow" style={{ top: '90%', animationDelay: '5s' }} />
      </div>

      <Card className="w-full max-w-md border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl shadow-accent/10 animate-fade-in relative overflow-hidden">
        {/* 卡片装饰 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-secondary" />
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 blur-2xl" />
        
        <CardHeader className="space-y-3 pb-6">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary interactive-scale">
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold gradient-text animate-gradient-shift">
                免费注册
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                创建您的账户，开启AI简历优化之旅
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 用户名输入 */}
            <div className="space-y-2.5">
              <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                <User className="h-3.5 w-3.5" />
                用户名
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="请输入用户名"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="pl-10 h-11 border-border/50 bg-background/50 focus:border-accent focus:ring-accent/20 transition-all duration-300"
                  autoComplete="username"
                  disabled={isPending}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

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
                  className="pl-10 h-11 border-border/50 bg-background/50 focus:border-accent focus:ring-accent/20 transition-all duration-300"
                  autoComplete="email"
                  disabled={isPending}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* 密码输入 */}
            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="h-3.5 w-3.5" />
                密码
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="至少8位字符"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10 h-11 border-border/50 bg-background/50 focus:border-accent focus:ring-accent/20 transition-all duration-300"
                  autoComplete="new-password"
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

            {/* 确认密码输入 */}
            <div className="space-y-2.5">
              <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                <Lock className="h-3.5 w-3.5" />
                确认密码
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="再次输入密码"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10 h-11 border-border/50 bg-background/50 focus:border-accent focus:ring-accent/20 transition-all duration-300"
                  autoComplete="new-password"
                  disabled={isPending}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300 touch-target-sm"
                  disabled={isPending}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 密码要求提示 */}
            <div className="rounded-lg border border-border/50 p-3 space-y-2 bg-background/30">
              <p className="text-xs font-medium text-muted-foreground">密码要求：</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? "text-emerald-600" : ""}`}>
                  {formData.password.length >= 8 ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-muted-foreground/50" />
                  )}
                  至少8位字符
                </li>
                <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? "text-emerald-600" : ""}`}>
                  {/[A-Z]/.test(formData.password) ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-muted-foreground/50" />
                  )}
                  包含大写字母
                </li>
                <li className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? "text-emerald-600" : ""}`}>
                  {/[0-9]/.test(formData.password) ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-muted-foreground/50" />
                  )}
                  包含数字
                </li>
              </ul>
            </div>

            {/* 错误提示 */}
            {(error || passwordError) && (
              <div className="animate-slide-down border border-destructive/50 bg-destructive/10 rounded-lg p-3">
                <p className="text-sm text-destructive">
                  {error?.message || passwordError || "注册失败，请检查输入"}
                </p>
              </div>
            )}

            {/* 成功提示 */}
            {success && (
              <div className="border border-emerald-500/50 bg-emerald-500/10 rounded-lg p-3 animate-micro-celebration">
                <p className="text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  注册成功！正在跳转到仪表板...
                </p>
              </div>
            )}

            {/* 注册按钮 */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 hover:shadow-glow transition-all duration-300 group relative overflow-hidden touch-target-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  注册中...
                </>
              ) : (
                <>
                  开始免费注册
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
              {/* 按钮光晕效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-modern-gradient-flow" />
            </Button>


          </form>

          {/* 服务条款说明 */}
          <div className="rounded-lg border border-border/50 p-4 bg-background/30">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              点击&quot;开始免费注册&quot;即表示您同意我们的{" "}
              <Link href="/legal/terms" className="text-primary font-medium hover:text-primary/80 hover:underline underline-offset-2">
                服务条款
              </Link>{" "}
              和{" "}
              <Link href="/legal/privacy" className="text-primary font-medium hover:text-primary/80 hover:underline underline-offset-2">
                隐私政策
              </Link>
              。注册后可立即获得3次简历评估机会。
            </p>
          </div>

          {/* 已有账户提示 */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              已有账户？{" "}
              <Link
                href="/auth/login"
                className="text-accent font-semibold hover:text-accent/80 hover:underline underline-offset-2 transition-colors duration-300"
              >
                立即登录
              </Link>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-xs font-bold text-primary">AI</span>
              </div>
              <p className="text-xs text-muted-foreground">智能分析</p>
            </div>
            <div className="space-y-1">
              <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <span className="text-xs font-bold text-accent">✓</span>
              </div>
              <p className="text-xs text-muted-foreground">实时优化</p>
            </div>
            <div className="space-y-1">
              <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <span className="text-xs font-bold text-secondary">∞</span>
              </div>
              <p className="text-xs text-muted-foreground">无限导出</p>
            </div>
          </div>
          
          <p className="text-xs text-center text-muted-foreground/70">
            注册后可立即获得3次简历评估机会
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}