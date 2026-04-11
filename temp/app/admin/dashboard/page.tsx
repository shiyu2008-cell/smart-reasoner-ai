import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Shield,
  Calendar,
  Activity
} from "lucide-react";

export default function AdminDashboardPage() {
  // 模拟数据 - 实际应从API获取
  const stats = {
    totalUsers: 0,
    activeUsers: 0,
    totalEvaluations: 0,
    totalOptimizations: 0,
    totalEvaluationCredits: 0,
    totalOptimizationCredits: 0,
  };

  const recentActivities = [
    { id: 1, user: "user1@example.com", action: "注册账号", time: "2026-04-11 10:30" },
    { id: 2, user: "user2@example.com", action: "完成简历评估", time: "2026-04-11 11:15" },
    { id: 3, user: "user1@example.com", action: "使用优化服务", time: "2026-04-11 12:45" },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">管理员控制面板</h1>
            <p className="text-muted-foreground">
              管理系统用户、监控使用情况、配置系统设置
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-600 font-medium">管理员模式</span>
          </div>
        </div>



        {/* 欢迎信息 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">欢迎使用管理员控制面板</h2>
                  <p className="text-muted-foreground">
                    您已成功登录到简历优化AI平台的管理员界面。Better Auth Dashboard已集成到系统中，提供完整的用户管理和分析功能。
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">系统信息</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>Better Auth Dashboard: 已集成</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>访问控制: IP白名单 + API密钥</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>最后更新: 2026-04-11</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">快速操作</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      查看用户
                    </Button>
                    <Button size="sm" variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      管理次数
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      系统设置
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">总用户数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">已注册用户总数</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">最近24小时活跃</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">评估次数</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvaluations}</div>
              <p className="text-xs text-muted-foreground">总评估次数 / 剩余 {stats.totalEvaluationCredits}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">优化次数</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOptimizations}</div>
              <p className="text-xs text-muted-foreground">总优化次数 / 剩余 {stats.totalOptimizationCredits}</p>
            </CardContent>
          </Card>
        </div>

        {/* 管理功能区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Better Auth Dashboard 集成 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Better Auth Dashboard
              </CardTitle>
              <CardDescription>
                完整的用户认证管理、会话监控和分析报表
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">
                  Better Auth Dashboard 提供专业的企业级用户管理界面，包含：
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 用户管理（查看、搜索、禁用、删除）</li>
                  <li>• 会话监控和撤销</li>
                  <li>• 组织管理（如有多组织支持）</li>
                  <li>• 分析报表（注册、登录、活跃用户）</li>
                  <li>• 审计日志查询</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <Button className="w-full">
                  <a 
                    href="/api/auth/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full"
                  >
                    打开Better Auth Dashboard
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  注意：Dashboard访问受IP白名单保护
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 自定义管理工具 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                自定义管理工具
              </CardTitle>
              <CardDescription>
                专为简历优化AI平台定制的管理功能
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
                  <Users className="h-5 w-5" />
                  <span className="text-xs">用户管理</span>
                  <span className="text-xs text-muted-foreground">查看/编辑用户</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-xs">次数管理</span>
                  <span className="text-xs text-muted-foreground">调整用户次数</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-xs">使用统计</span>
                  <span className="text-xs text-muted-foreground">查看平台数据</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
                  <Activity className="h-5 w-5" />
                  <span className="text-xs">系统监控</span>
                  <span className="text-xs text-muted-foreground">API调用监控</span>
                </Button>
              </div>
              
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">API管理接口</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <code className="bg-muted px-2 py-1 rounded">GET /api/admin/users</code>
                    <span>用户列表查询</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-muted px-2 py-1 rounded">POST /api/admin/credits/[userId]</code>
                    <span>用户次数管理</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近活动 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              最近活动
            </CardTitle>
            <CardDescription>系统最近发生的重要事件</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="font-medium text-sm">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 系统状态 */}
        <Card>
          <CardHeader>
            <CardTitle>系统状态</CardTitle>
            <CardDescription>当前系统组件运行状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>认证服务 (Better Auth)</span>
                </div>
                <span className="text-sm text-green-600">运行正常</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>数据库 (SQLite)</span>
                </div>
                <span className="text-sm text-green-600">连接正常</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>AI服务 (DeepSeek API)</span>
                </div>
                <span className="text-sm text-green-600">可用</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Dashboard插件</span>
                </div>
                <span className="text-sm text-green-600">已集成</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}