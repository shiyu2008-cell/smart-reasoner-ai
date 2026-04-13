"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, User, Mail, Hash, Calendar, Clock, LogOut, CreditCard, BarChart3, History, Settings as SettingsIcon } from "lucide-react";
import { cn, validateDeveloperCode } from "@/lib/utils";

// 兑换码历史记录类型
interface RedemptionHistory {
  code: string;
  type: "evaluation" | "optimization" | "premium";
  amount: number;
  redeemedAt: string;
  expiresAt?: string;
}

// 使用统计类型
interface UsageStats {
  evaluationRemaining: number;
  optimizationRemaining: number;
  totalEvaluations: number;
  totalOptimizations: number;
  lastUsed: string | null;
}

export default function SettingsPage() {
  const { user, session, isLoading, isAuthenticated, signOut } = useAuth();
  const [usageStats, setUsageStats] = useState<UsageStats>({
    evaluationRemaining: 0,
    optimizationRemaining: 0,
    totalEvaluations: 0,
    totalOptimizations: 0,
    lastUsed: null,
  });
  const [redemptionHistory, setRedemptionHistory] = useState<RedemptionHistory[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [developerCode, setDeveloperCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState<string | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [isDeveloperModeRedeemed, setIsDeveloperModeRedeemed] = useState(false);

  // 加载使用统计
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // 基于用户ID构建存储key，实现数据隔离
      const userId = isAuthenticated ? 'authenticated' : 'anonymous';
      
      // 如果是登录用户，检查是否有匿名用户的数据需要迁移
      if (isAuthenticated) {
        const anonymousEvalKey = 'evaluationRemaining_anonymous';
        const anonymousOptKey = 'optimizationRemaining_anonymous';
        const anonymousTotalEvalKey = 'totalEvaluations_anonymous';
        const anonymousTotalOptKey = 'totalOptimizations_anonymous';
        const anonymousLastUsedKey = 'lastUsed_anonymous';
        const anonymousDeveloperRedeemedKey = 'developerModeRedeemed_anonymous';
        const anonymousHistoryKey = 'redemptionHistory_anonymous';
        
        const anonymousSavedEvaluation = localStorage.getItem(anonymousEvalKey);
        const anonymousSavedOptimization = localStorage.getItem(anonymousOptKey);
        const anonymousSavedTotalEval = localStorage.getItem(anonymousTotalEvalKey);
        const anonymousSavedTotalOpt = localStorage.getItem(anonymousTotalOptKey);
        const anonymousSavedLastUsed = localStorage.getItem(anonymousLastUsedKey);
        const anonymousSavedDeveloperRedeemed = localStorage.getItem(anonymousDeveloperRedeemedKey);
        const anonymousSavedHistory = localStorage.getItem(anonymousHistoryKey);
        
        // 如果有匿名用户数据，迁移到认证用户
        if (anonymousSavedEvaluation !== null || anonymousSavedOptimization !== null) {
          console.log('设置页面：发现匿名用户数据，迁移到认证用户');
          
          // 迁移评估次数相关数据
          if (anonymousSavedEvaluation !== null) {
            const evalValue = parseInt(anonymousSavedEvaluation, 10);
            if (!isNaN(evalValue) && evalValue >= 0) {
              localStorage.setItem(`evaluationRemaining_${userId}`, evalValue.toString());
            }
          }
          if (anonymousSavedOptimization !== null) {
            const optValue = parseInt(anonymousSavedOptimization, 10);
            if (!isNaN(optValue) && optValue >= 0) {
              localStorage.setItem(`optimizationRemaining_${userId}`, optValue.toString());
            }
          }
          
          // 迁移总次数数据
          if (anonymousSavedTotalEval !== null) {
            const totalEvalValue = parseInt(anonymousSavedTotalEval, 10);
            if (!isNaN(totalEvalValue) && totalEvalValue >= 0) {
              localStorage.setItem(`totalEvaluations_${userId}`, totalEvalValue.toString());
            }
          }
          if (anonymousSavedTotalOpt !== null) {
            const totalOptValue = parseInt(anonymousSavedTotalOpt, 10);
            if (!isNaN(totalOptValue) && totalOptValue >= 0) {
              localStorage.setItem(`totalOptimizations_${userId}`, totalOptValue.toString());
            }
          }
          
          // 迁移最后使用时间
          if (anonymousSavedLastUsed !== null) {
            localStorage.setItem(`lastUsed_${userId}`, anonymousSavedLastUsed);
          }
          
          // 迁移开发者模式兑换状态
          if (anonymousSavedDeveloperRedeemed !== null) {
            localStorage.setItem(`developerModeRedeemed_${userId}`, anonymousSavedDeveloperRedeemed);
          }
          
          // 迁移兑换历史
          if (anonymousSavedHistory !== null) {
            localStorage.setItem(`redemptionHistory_${userId}`, anonymousSavedHistory);
          }
        }
      }
      
      // 从localStorage读取剩余次数（与dashboard页面保持一致）
      const evalKey = `evaluationRemaining_${userId}`;
      const optKey = `optimizationRemaining_${userId}`;
      
      const evaluationRemaining = parseInt(
        localStorage.getItem(evalKey) || "2",
        10
      );
      const optimizationRemaining = parseInt(
        localStorage.getItem(optKey) || "2",
        10
      );

      // 从localStorage读取使用历史（基于用户ID隔离）
      const totalEvalKey = `totalEvaluations_${userId}`;
      const totalOptKey = `totalOptimizations_${userId}`;
      const lastUsedKey = `lastUsed_${userId}`;
      
      const totalEvaluations = parseInt(
        localStorage.getItem(totalEvalKey) || "0",
        10
      );
      const totalOptimizations = parseInt(
        localStorage.getItem(totalOptKey) || "0",
        10
      );
      const lastUsed = localStorage.getItem(lastUsedKey) || null;

      setUsageStats({
        evaluationRemaining,
        optimizationRemaining,
        totalEvaluations,
        totalOptimizations,
        lastUsed,
      });
    } catch (err) {
      console.error("加载使用统计失败:", err);
      setError("加载使用统计时发生错误");
    } finally {
      setIsLoadingStats(false);
    }
  }, [isAuthenticated]);

  // 检查开发者模式兑换状态
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const userId = isAuthenticated ? 'authenticated' : 'anonymous';
      const redeemedKey = `developerModeRedeemed_${userId}`;
      const alreadyRedeemed = localStorage.getItem(redeemedKey) === 'true';
      setIsDeveloperModeRedeemed(alreadyRedeemed);
    } catch (err) {
      console.error("检查开发者模式兑换状态失败:", err);
    }
  }, [isAuthenticated]);

  // 修复开发者代码兑换错误数据（针对万柏用户的问题）
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const userId = isAuthenticated ? 'authenticated' : 'anonymous';
      const redeemedKey = `developerModeRedeemed_${userId}`;
      const alreadyRedeemed = localStorage.getItem(redeemedKey) === 'true';
      
      // 只有已兑换开发者代码的用户才需要检查修复
      if (!alreadyRedeemed) return;
      
      // 确保开发者模式固定标志已设置
      localStorage.setItem(`developerModeFixed_${userId}`, 'true');
      
      const evalKey = `evaluationRemaining_${userId}`;
      const optKey = `optimizationRemaining_${userId}`;
      const totalEvalKey = `totalEvaluations_${userId}`;
      const totalOptKey = `totalOptimizations_${userId}`;
      
      const currentEval = parseInt(localStorage.getItem(evalKey) || '0', 10);
      const currentOpt = parseInt(localStorage.getItem(optKey) || '0', 10);
      const currentTotalEval = parseInt(localStorage.getItem(totalEvalKey) || '0', 10);
      const currentTotalOpt = parseInt(localStorage.getItem(totalOptKey) || '0', 10);
      
      // 检测错误情况：总使用次数异常高（>=5000）而剩余次数为0
      // 这是旧版兑换逻辑的错误，应该修复
      const needsFix = (currentTotalEval >= 5000 && currentEval === 0) || 
                       (currentTotalOpt >= 5000 && currentOpt === 0);
      
      if (needsFix) {
        console.log('检测到开发者代码兑换数据错误，开始修复...');
        
        // 修复逻辑：将总使用次数减去5000（还原错误增加的部分）
        // 将剩余次数设置为5000（开发者代码应给的次数）
        const fixedTotalEval = Math.max(0, currentTotalEval - 5000);
        const fixedTotalOpt = Math.max(0, currentTotalOpt - 5000);
        const fixedEval = 5000;
        const fixedOpt = 5000;
        
        localStorage.setItem(evalKey, fixedEval.toString());
        localStorage.setItem(optKey, fixedOpt.toString());
        localStorage.setItem(totalEvalKey, fixedTotalEval.toString());
        localStorage.setItem(totalOptKey, fixedTotalOpt.toString());
        
        console.log('数据修复完成：', {
          评估剩余次数: fixedEval,
          优化剩余次数: fixedOpt,
          总评估次数: fixedTotalEval,
          总优化次数: fixedTotalOpt
        });
        
        // 重新加载使用统计以更新显示
        const evaluationRemaining = parseInt(localStorage.getItem(evalKey) || "2", 10);
        const optimizationRemaining = parseInt(localStorage.getItem(optKey) || "2", 10);
        const totalEvaluations = parseInt(localStorage.getItem(totalEvalKey) || "0", 10);
        const totalOptimizations = parseInt(localStorage.getItem(totalOptKey) || "0", 10);
        
        setUsageStats(prev => ({
          ...prev,
          evaluationRemaining,
          optimizationRemaining,
          totalEvaluations,
          totalOptimizations,
        }));
      }
    } catch (err) {
      console.error("修复开发者代码数据时出错:", err);
    }
  }, [isAuthenticated]);

  // 确保开发者模式固定5000次
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const userId = isAuthenticated ? 'authenticated' : 'anonymous';
      const developerModeFixed = localStorage.getItem(`developerModeFixed_${userId}`) === 'true';
      
      // 如果不是开发者模式，跳过
      if (!developerModeFixed) return;
      
      const evalKey = `evaluationRemaining_${userId}`;
      const optKey = `optimizationRemaining_${userId}`;
      
      const currentEval = parseInt(localStorage.getItem(evalKey) || '0', 10);
      const currentOpt = parseInt(localStorage.getItem(optKey) || '0', 10);
      
      // 如果剩余次数不是5000，强制设置为5000
      if (currentEval !== 5000 || currentOpt !== 5000) {
        console.log('Settings: 开发者模式，强制设置剩余次数为5000');
        
        localStorage.setItem(evalKey, '5000');
        localStorage.setItem(optKey, '5000');
        
        // 重新加载使用统计以更新显示
        const evaluationRemaining = parseInt(localStorage.getItem(evalKey) || "2", 10);
        const optimizationRemaining = parseInt(localStorage.getItem(optKey) || "2", 10);
        const totalEvaluations = parseInt(localStorage.getItem(`totalEvaluations_${userId}`) || "0", 10);
        const totalOptimizations = parseInt(localStorage.getItem(`totalOptimizations_${userId}`) || "0", 10);
        
        setUsageStats(prev => ({
          ...prev,
          evaluationRemaining,
          optimizationRemaining,
          totalEvaluations,
          totalOptimizations,
        }));
      }
    } catch (err) {
      console.error("Settings: 确保开发者模式固定次数时出错:", err);
    }
  }, [isAuthenticated]);

  // 加载兑换码历史
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // 基于用户ID构建存储key，实现数据隔离
      const userId = isAuthenticated ? 'authenticated' : 'anonymous';
      const historyKey = `redemptionHistory_${userId}`;
      
      const savedHistory = localStorage.getItem(historyKey);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory) as RedemptionHistory[];
        setRedemptionHistory(parsed);
      } else {
        // 如果没有历史数据，显示示例数据（实际项目中应从API获取）
        const exampleHistory: RedemptionHistory[] = [
          {
            code: "WELCOME2024",
            type: "evaluation",
            amount: 5,
            redeemedAt: "2024-01-15T10:30:00",
            expiresAt: "2024-12-31T23:59:59",
          },
          {
            code: "OPTIMIZE10",
            type: "optimization",
            amount: 10,
            redeemedAt: "2024-02-01T14:20:00",
          },
          {
            code: "PREMIUM30",
            type: "premium",
            amount: 30,
            redeemedAt: "2024-01-20T09:15:00",
            expiresAt: "2024-06-30T23:59:59",
          },
        ];
        setRedemptionHistory(exampleHistory);
        // 保存示例数据以便演示
        localStorage.setItem(historyKey, JSON.stringify(exampleHistory));
      }
    } catch (err) {
      console.error("加载兑换码历史失败:", err);
    }
  }, [isAuthenticated]);

  // 处理退出登录
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      // 重定向到首页（由认证系统自动处理）
    } catch (err) {
      console.error("退出登录失败:", err);
      setError("退出登录失败，请重试");
    } finally {
      setIsSigningOut(false);
    }
  };

  // 处理开发者代码兑换
  const handleRedeemDeveloperCode = async () => {
    if (!developerCode.trim()) {
      setRedeemError("请输入开发者代码");
      return;
    }

    setIsRedeeming(true);
    setRedeemError(null);
    setRedeemMessage(null);

    try {
      // 基于用户ID构建存储key，实现数据隔离
      const userId = isAuthenticated ? 'authenticated' : 'anonymous';
      const redeemedKey = `developerModeRedeemed_${userId}`;

      // 检查是否已兑换过
      const alreadyRedeemed = localStorage.getItem(redeemedKey);
      if (alreadyRedeemed === 'true') {
        setRedeemError("您已经兑换过开发者代码，无法重复兑换");
        return;
      }

      // 验证开发者代码（使用哈希验证）
      const developerCodeHash = process.env.NEXT_PUBLIC_DEVELOPER_CODE_HASH;
      const isValid = await validateDeveloperCode(developerCode.trim(), developerCodeHash);
      
      if (!isValid) {
        setRedeemError("开发者代码无效，请检查后重试");
        return;
      }

      // 获取当前的剩余次数和总次数
      const evalKey = `evaluationRemaining_${userId}`;
      const optKey = `optimizationRemaining_${userId}`;
      const totalEvalKey = `totalEvaluations_${userId}`;
      const totalOptKey = `totalOptimizations_${userId}`;

      const currentEval = parseInt(localStorage.getItem(evalKey) || '0', 10);
      const currentOpt = parseInt(localStorage.getItem(optKey) || '0', 10);
      const currentTotalEval = parseInt(localStorage.getItem(totalEvalKey) || '0', 10);
      const currentTotalOpt = parseInt(localStorage.getItem(totalOptKey) || '0', 10);

      // 开发者模式：永久固定5000次（即使使用也不会减少）
      const newEval = 5000; // 直接设置为5000，不累加
      const newOpt = 5000;  // 直接设置为5000，不累加
      // 注意：totalEvaluations和totalOptimizations不应增加，因为这是已使用次数的统计
      const newTotalEval = currentTotalEval; // 保持不变
      const newTotalOpt = currentTotalOpt;   // 保持不变
      // 标记为开发者模式（固定次数）
      localStorage.setItem(`developerModeFixed_${userId}`, 'true');

      // 保存到localStorage
      localStorage.setItem(evalKey, newEval.toString());
      localStorage.setItem(optKey, newOpt.toString());
      localStorage.setItem(totalEvalKey, newTotalEval.toString());
      localStorage.setItem(totalOptKey, newTotalOpt.toString());
      
      // 标记为已兑换
      localStorage.setItem(redeemedKey, 'true');

      // 更新兑换历史记录
      const historyKey = `redemptionHistory_${userId}`;
      const savedHistory = localStorage.getItem(historyKey);
      const history: RedemptionHistory[] = savedHistory ? JSON.parse(savedHistory) : [];
      const newHistoryItem: RedemptionHistory = {
        code: developerCode.trim(),
        type: "premium", // 使用premium类型表示开发者代码
        amount: 5000,
        redeemedAt: new Date().toISOString(),
      };
      history.unshift(newHistoryItem); // 添加到开头
      localStorage.setItem(historyKey, JSON.stringify(history));

      // 更新状态以刷新显示
      setUsageStats(prev => ({
        ...prev,
        evaluationRemaining: newEval,
        optimizationRemaining: newOpt,
        totalEvaluations: newTotalEval,
        totalOptimizations: newTotalOpt,
      }));
      setRedemptionHistory(history);
      setDeveloperCode('');
      setIsDeveloperModeRedeemed(true);
      setRedeemMessage("开发者代码兑换成功！已获得5,000次评估和5,000次优化次数。");

    } catch (err) {
      console.error("兑换开发者代码失败:", err);
      setRedeemError("兑换过程中发生错误，请重试");
    } finally {
      setIsRedeeming(false);
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 获取类型显示文本
  const getTypeDisplay = (type: RedemptionHistory["type"]) => {
    switch (type) {
      case "evaluation":
        return "评估次数";
      case "optimization":
        return "优化次数";
      case "premium":
        return "高级套餐";
      default:
        return type;
    }
  };

  // 获取类型颜色
  const getTypeColor = (type: RedemptionHistory["type"]) => {
    switch (type) {
      case "evaluation":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
      case "optimization":
        return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "premium":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
    }
  };

  if (isLoading || isLoadingStats) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">加载用户设置...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">需要登录</h2>
          <p className="text-muted-foreground mb-6">
            请登录后查看账户设置页面。
          </p>
          <Button asChild>
            <a href="/auth/login">前往登录</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10">
      {/* 页面标题 */}
      <div className="mb-8 md:mb-12 text-center animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl gradient-text">
          账户设置
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          管理您的账户信息、使用统计和兑换码历史
        </p>
      </div>

      {/* 主内容区 */}
      <div className="container-responsive max-w-6xl">
        {error && (
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* 左侧列：用户信息和使用统计 */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* 用户信息卡片 */}
            <Card className="animate-slide-up">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle>用户信息</CardTitle>
                    <CardDescription>
                      您的账户基本信息
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 邮箱信息 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">邮箱地址</p>
                        <p className="text-base font-medium truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* 用户名 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Hash className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">用户名</p>
                        <p className="text-base font-medium">{user.name || "未设置"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 账户状态 */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">账户状态</p>
                      <p className="text-xs text-muted-foreground">
                        {session?.user.emailVerified ? "已验证" : "未验证"}邮箱
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        session?.user.emailVerified ? "bg-green-500" : "bg-yellow-500"
                      )} />
                      <span className="text-sm">
                        {session?.user.emailVerified ? "活跃" : "待验证"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <p className="text-xs text-muted-foreground">
                  账户创建于：{session?.user.createdAt ? formatDate(session.user.createdAt.toString()) : "未知"}
                </p>
              </CardFooter>
            </Card>

            {/* 使用统计卡片 */}
            <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-accent">
                    <BarChart3 className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle>使用统计</CardTitle>
                    <CardDescription>
                      您的AI简历优化服务使用情况
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 剩余次数 */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      剩余次数
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold gradient-text">{usageStats.evaluationRemaining}</div>
                        <p className="text-xs text-muted-foreground mt-1">评估次数</p>
                      </div>
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold gradient-text">{usageStats.optimizationRemaining}</div>
                        <p className="text-xs text-muted-foreground mt-1">优化次数</p>
                      </div>
                    </div>
                  </div>

                  {/* 累计使用 */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      累计使用
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold gradient-text">{usageStats.totalEvaluations}</div>
                        <p className="text-xs text-muted-foreground mt-1">总评估次数</p>
                      </div>
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold gradient-text">{usageStats.totalOptimizations}</div>
                        <p className="text-xs text-muted-foreground mt-1">总优化次数</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 最后使用时间 */}
                {usageStats.lastUsed && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">最后使用时间</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(usageStats.lastUsed)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-6">
                <p className="text-xs text-muted-foreground">
                  统计信息基于本地存储，可能会因清除浏览器数据而重置
                </p>
              </CardFooter>
            </Card>

            {/* 兑换码历史卡片 */}
            <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <History className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>兑换码历史</CardTitle>
                    <CardDescription>
                      您已兑换的优惠码和使用记录
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {redemptionHistory.length > 0 ? (
                  <div className="space-y-4">
                    {redemptionHistory.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-lg border p-4 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span className="font-mono font-medium">{item.code}</span>
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                getTypeColor(item.type)
                              )}>
                                {getTypeDisplay(item.type)}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>兑换: {formatDate(item.redeemedAt)}</span>
                              </div>
                              {item.expiresAt && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>过期: {formatDate(item.expiresAt)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold gradient-text">+{item.amount}</div>
                            <p className="text-xs text-muted-foreground">
                              {item.type === "premium" ? "天高级套餐" : "次"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">暂无兑换记录</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      您还没有兑换过任何优惠码。关注官方活动获取兑换码，解锁更多使用次数。
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-6">
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                      兑换码历史保存在本地存储中
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/pricing">查看套餐与购买</a>
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* 右侧列：账户设置 */}
          <div className="space-y-6 lg:space-y-8">
            {/* 账户设置卡片 */}
            <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500">
                    <SettingsIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>账户设置</CardTitle>
                    <CardDescription>
                      管理您的账户和安全选项
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/dashboard">返回工作台</a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/help">帮助中心</a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/legal/privacy">隐私政策</a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/legal/terms">服务条款</a>
                  </Button>
                </div>

                {/* 开发者模式 */}
                 <div className="pt-4 border-t">
                   <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                     开发者模式
                   </h3>
                   
                   {isDeveloperModeRedeemed ? (
                     // 已兑换状态
                     <div className="space-y-3">
                       <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20 p-4">
                         <div className="flex items-center gap-3">
                           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                             <svg className="h-4 w-4 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                             </svg>
                           </div>
                           <div>
                             <p className="text-sm font-medium text-green-700 dark:text-green-300">开发者模式已激活</p>
                             <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                               您已永久获得5,000次评估和5,000次优化次数。
                             </p>
                           </div>
                         </div>
                       </div>
                       <p className="text-xs text-muted-foreground">
                         开发者代码已兑换，感谢您使用开发者模式。
                       </p>
                     </div>
                   ) : (
                     // 未兑换状态
                     <>
                       <p className="text-xs text-muted-foreground mb-4">
                         输入开发者代码可永久获得5,000次评估和5,000次优化次数。
                       </p>
                       
                       <div className="space-y-3">
                         <div className="space-y-2">
                           <Label htmlFor="developer-code" className="text-sm">
                             开发者代码
                           </Label>
                           <Input
                             id="developer-code"
                             type="text"
                             placeholder="输入开发者代码"
                             value={developerCode}
                             onChange={(e) => setDeveloperCode(e.target.value)}
                             className="font-mono"
                             disabled={isRedeeming}
                           />
                         </div>
                         
                         {redeemMessage && (
                           <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20 p-3">
                             <p className="text-sm text-green-700 dark:text-green-300">{redeemMessage}</p>
                           </div>
                         )}
                         
                         {redeemError && (
                           <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
                             <p className="text-sm text-destructive">{redeemError}</p>
                           </div>
                         )}
                         
                         <Button
                           variant="default"
                           className="w-full"
                           onClick={handleRedeemDeveloperCode}
                           disabled={isRedeeming || !developerCode.trim()}
                         >
                           {isRedeeming ? (
                             <>
                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                               兑换中...
                             </>
                           ) : (
                             <>
                               兑换开发者代码
                             </>
                           )}
                         </Button>
                       </div>
                       
                       <p className="text-xs text-muted-foreground mt-3">
                         开发者代码仅限使用一次，兑换后永久有效。
                       </p>
                     </>
                   )}
                 </div>

                {/* 退出登录按钮 */}
                <div className="pt-4 border-t">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        退出中...
                      </>
                    ) : (
                      <>
                        <LogOut className="mr-2 h-4 w-4" />
                        退出登录
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    退出登录后，您需要重新登录才能使用AI简历优化服务。
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 使用提示卡片 */}
            <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <CardTitle>使用提示</CardTitle>
                <CardDescription>
                  优化您的使用体验
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                      1
                    </div>
                    <p className="text-sm">定期检查剩余次数，避免使用时不足</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                      2
                    </div>
                    <p className="text-sm">关注官方活动获取免费兑换码</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                      3
                    </div>
                    <p className="text-sm">填写详细的简历和职位描述可获得更精准优化</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                      4
                    </div>
                    <p className="text-sm">清除浏览器数据会重置本地统计信息</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <p className="text-xs text-muted-foreground">
                  如有问题，请访问<Button variant="link" className="h-auto p-0" asChild><a href="/help">帮助中心</a></Button>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}