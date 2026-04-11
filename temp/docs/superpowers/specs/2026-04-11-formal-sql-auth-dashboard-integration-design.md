# 正式SQL登录系统集成Better Auth Dashboard设计方案

## 项目概述
本项目旨在升级简历优化AI平台的登录系统，从当前的基础认证方案升级为完整的SQL数据库方案，并集成Better Auth Dashboard插件。目标包括：移除第三方登录选项、实现用户使用次数管理、提供管理员管理界面，并增强系统可维护性。

**设计批准日期**: 2026-04-11  
**设计状态**: 已批准  
**目标版本**: v1.0.0  

## 需求分析

### 核心需求
1. **数据库升级**: 从当前基础SQLite升级为正式的SQL数据库结构，记录用户完整信息
2. **登录系统简化**: 移除GitHub和Google登录选项，仅保留邮箱密码认证
3. **使用次数管理**: 记录每个用户的评估次数和优化次数，实现同步扣减
4. **管理员界面**: 提供现成的管理界面，支持用户管理和次数管理
5. **便携管理**: 开发者在服务器端能够快速管理用户数据

### 详细需求
- 用户注册时记录：用户名、邮箱、密码哈希、注册时间
- 用户登录时记录：最后活跃时间
- 使用次数字段：评估次数、优化次数、总评估数、总优化数
- 管理员认证：环境变量白名单方式
- Dashboard访问：集成到应用内，路径为 `/admin/dashboard`

## 架构设计

### 技术栈
- **认证框架**: Better Auth v1.4.17 + Dashboard插件
- **数据库**: SQLite (better-sqlite3)
- **ORM**: Drizzle ORM (已存在但未完全使用)
- **前端框架**: Next.js 16.1.6 + React 19
- **部署平台**: Vercel

### 系统架构
```
┌─────────────────────────────────────────────────────────────┐
│                     客户端层 (Frontend)                      │
├─────────────────────────────────────────────────────────────┤
│  • 用户界面: 登录/注册页面(移除第三方登录)                   │
│  • 仪表板: 显示剩余次数                                     │
│  • 管理界面: /admin/dashboard (白名单访问)                   │
├─────────────────────────────────────────────────────────────┤
│                    API层 (Next.js API Routes)               │
├─────────────────────────────────────────────────────────────┤
│  • 认证API: /api/auth/[...auth] (Better Auth)              │
│  • 评估API: /api/evaluate (扣减评估次数)                    │
│  • 优化API: /api/optimize (扣减优化次数)                    │
│  • 管理API: /api/admin/* (白名单认证)                       │
├─────────────────────────────────────────────────────────────┤
│                    服务层 (Business Logic)                   │
├─────────────────────────────────────────────────────────────┤
│  • 认证服务: Better Auth + Dashboard插件                    │
│  • 次数服务: 同步扣减、验证、管理                           │
│  • 用户服务: 用户信息管理、统计                             │
├─────────────────────────────────────────────────────────────┤
│                    数据层 (Database)                        │
├─────────────────────────────────────────────────────────────┤
│  • 用户表: users (Better Auth扩展)                          │
│  • 会话表: sessions                                         │
│  • 次数表: user_credits (扩展字段)                          │
│  • 审计表: audit_logs (Dashboard提供)                       │
└─────────────────────────────────────────────────────────────┘
```

### 组件设计
1. **Better Auth Dashboard集成**
   - 服务器端插件: `@better-auth/infra`
   - 客户端插件: `@better-auth/infra/client`
   - 活动追踪: 5分钟更新间隔

2. **用户次数管理组件**
   - 次数验证中间件
   - 同步扣减服务
   - 次数查询API

3. **管理员认证组件**
   - IP白名单验证
   - 环境变量配置
   - 访问控制中间件

## 数据库设计

### Better Auth基础表 (自动创建)
```sql
-- Better Auth自动创建的表
users (id, email, email_verified, name, username, image, created_at, updated_at)
sessions (id, user_id, expires_at)
accounts (id, user_id, provider, provider_account_id)
verifications (id, identifier, expires_at)
```

### 扩展字段 (通过Better Auth schema扩展)
```typescript
// 在Better Auth配置中扩展用户字段
user: {
  additionalFields: {
    username: { type: "string", required: false, unique: false },
    evaluation_credits: { type: "number", required: true, default: 2 },
    optimization_credits: { type: "number", required: true, default: 2 },
    total_evaluations: { type: "number", required: true, default: 0 },
    total_optimizations: { type: "number", required: true, default: 0 },
    last_active_at: { type: "date", required: false }, // Dashboard插件添加
  },
}
```

### 数据流说明
1. **用户注册**: 自动创建用户记录，初始化次数为2/2
2. **用户登录**: Dashboard插件更新`last_active_at`字段
3. **API调用**: 验证剩余次数 → 执行服务 → 同步扣减次数 → 更新统计
4. **管理员操作**: 通过Dashboard界面查看和修改用户数据

## API设计

### 现有API增强
1. **评估API** (`POST /api/evaluate`)
   ```typescript
   // 新增次数验证逻辑
   async function evaluateHandler(request) {
     // 1. 验证用户认证
     // 2. 查询剩余评估次数
     // 3. 如果次数不足，返回错误
     // 4. 执行评估逻辑
     // 5. 同步扣减评估次数 (原子操作)
     // 6. 增加总评估计数
     // 7. 返回结果
   }
   ```

2. **优化API** (`POST /api/optimize`)
   - 类似评估API，扣减优化次数

### 新增管理API
1. **用户列表API** (`GET /api/admin/users`)
   - 白名单认证
   - 返回用户列表，包含次数信息
   - 支持分页和搜索

2. **次数管理API** (`POST /api/admin/users/:userId/credits`)
   ```typescript
   interface CreditUpdateRequest {
     evaluation_credits?: number;  // 设置评估次数
     optimization_credits?: number; // 设置优化次数
     operation?: "add" | "set" | "subtract"; // 操作类型
   }
   ```

### Dashboard API路由
- Better Auth Dashboard自动提供以下路由：
  - `/admin/dashboard/users` - 用户管理
  - `/admin/dashboard/sessions` - 会话管理
  - `/admin/dashboard/analytics` - 分析报表
  - `/admin/dashboard/audit-logs` - 审计日志

## 安全性设计

### 认证安全
1. **用户认证**: Better Auth标准安全配置
   - 密码哈希: bcrypt
   - 会话管理: JWE加密Cookie
   - CSRF防护: 内置防护机制

2. **管理员认证**: 环境变量白名单
   ```env
   ADMIN_IP_WHITELIST=127.0.0.1,192.168.1.100
   ADMIN_API_KEY=your-admin-api-key
   ```
   
   - 访问`/admin/*`路由需要验证IP白名单
   - 管理API需要API密钥认证

### 数据安全
1. **次数扣减**: 使用数据库事务确保原子性
2. **审计日志**: Better Auth Dashboard提供完整审计跟踪
3. **敏感数据**: 密码哈希不记录日志，次数变更记录审计日志

### 访问控制
```
路径                 | 认证要求          | 授权要求
-------------------|-----------------|-------------------
/auth/*            | 无              | 无
/api/auth/*        | Better Auth处理 | Better Auth处理
/api/evaluate      | 用户认证         | 有足够评估次数
/api/optimize      | 用户认证         | 有足够优化次数
/admin/dashboard/* | IP白名单         | 管理员权限
/api/admin/*       | API密钥         | 管理员权限
```

## 部署与运维

### 环境配置
```env
# .env.local (开发环境)
BETTER_AUTH_SECRET=your-secret-key-change-this-in-production
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_API_KEY=ba_p68q4sgaka3lcju24wo87dh0ecaxy2ru

# 新增配置
ADMIN_IP_WHITELIST=127.0.0.1,::1
ADMIN_API_KEY=your-admin-api-key-dev
DATABASE_URL=file:./sqlite.db
```

```env
# .env.production (生产环境)
BETTER_AUTH_SECRET=<strong-production-secret>
BETTER_AUTH_URL=https://your-domain.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.com
BETTER_AUTH_API_KEY=<your-production-api-key>

ADMIN_IP_WHITELIST=<production-admin-ip>
ADMIN_API_KEY=<strong-production-admin-key>
DATABASE_URL=file:./sqlite.db
```

### 数据库迁移
1. **开发环境迁移**
   ```bash
   # 1. 备份现有数据库
   cp sqlite.db sqlite.db.backup.$(date +%Y%m%d)
   
   # 2. 安装依赖
   npm install @better-auth/infra @better-auth/infra/client
   
   # 3. 更新配置并启动应用
   # Better Auth会自动处理schema迁移
   ```

2. **生产环境迁移**
   - 在维护窗口执行
   - 完整数据库备份
   - 逐步流量切换

### 监控与维护
1. **健康检查**: `/api/health`端点
2. **性能监控**: Vercel Analytics + Better Auth Dashboard
3. **日志收集**: 控制台日志 + 审计日志
4. **备份策略**: 每日数据库备份

## 测试策略

### 单元测试
1. **次数服务测试**
   - 次数扣减原子性测试
   - 边界条件测试 (0次数、负数次数)
   - 并发扣减测试

2. **认证测试**
   - 用户注册/登录流程
   - 会话管理测试
   - 错误处理测试

### 集成测试
1. **API集成测试**
   - 认证API集成
   - 次数扣减流程
   - 错误响应处理

2. **Dashboard集成测试**
   - 管理界面访问控制
   - 用户管理操作
   - 审计日志验证

### E2E测试
1. **用户流程测试**
   - 注册 → 登录 → 使用服务 → 查看次数
   - 次数不足时的用户体验

2. **管理员流程测试**
   - 管理员登录 → 用户管理 → 次数调整

## 实施计划

### 阶段一: 基础集成 (预计2-3天)
1. **依赖安装与配置**
   - 安装Better Auth Dashboard插件
   - 更新Better Auth配置
   - 配置环境变量

2. **数据库schema更新**
   - 扩展用户表字段
   - 创建迁移脚本
   - 测试数据迁移

3. **移除第三方登录**
   - 修改登录页面
   - 修改注册页面
   - 移除相关依赖和配置

### 阶段二: 次数管理实现 (预计2-3天)
1. **次数服务开发**
   - 次数查询和验证服务
   - 同步扣减逻辑
   - 错误处理机制

2. **API增强**
   - 评估API集成次数验证
   - 优化API集成次数验证
   - 管理API开发

3. **前端集成**
   - 用户仪表板显示剩余次数
   - 次数不足提示
   - 使用历史记录

### 阶段三: 管理界面集成 (预计1-2天)
1. **Dashboard集成**
   - 配置Dashboard路由
   - 设置访问控制
   - 测试管理功能

2. **管理员工具**
   - 开发CLI管理工具
   - 数据库管理脚本
   - 部署配置

### 阶段四: 测试与部署 (预计1-2天)
1. **全面测试**
   - 单元测试和集成测试
   - E2E测试
   - 安全测试

2. **部署准备**
   - 生产环境配置
   - 监控设置
   - 备份策略实施

3. **上线发布**
   - 灰度发布
   - 性能监控
   - 问题修复

## 风险与缓解措施

### 技术风险
1. **数据库迁移风险**
   - **风险**: 数据丢失或损坏
   - **缓解**: 完整备份、测试环境验证、逐步迁移

2. **性能风险**
   - **风险**: 同步次数扣减影响API性能
   - **缓解**: 数据库索引优化、连接池配置、监控告警

3. **安全风险**
   - **风险**: 管理员接口被未授权访问
   - **缓解**: IP白名单、API密钥认证、审计日志

### 业务风险
1. **用户体验风险**
   - **风险**: 次数管理影响用户使用流程
   - **缓解**: 清晰提示、友好的错误信息、逐步引导

2. **兼容性风险**
   - **风险**: 现有用户数据兼容性问题
   - **缓解**: 由于当前无用户，风险较低，但仍需测试空状态

## 成功标准

### 功能成功标准
- [ ] Better Auth Dashboard成功集成并运行
- [ ] 用户注册时自动初始化次数(2/2)
- [ ] 评估/优化API正确扣减次数
- [ ] 管理员可以通过Dashboard管理用户
- [ ] 第三方登录选项完全移除
- [ ] 所有API路由安全保护正常

### 性能成功标准
- [ ] API响应时间增加不超过100ms
- [ ] 数据库查询性能符合预期
- [ ] 并发用户处理能力达标

### 安全成功标准
- [ ] 所有敏感路由正确保护
- [ ] 审计日志完整记录
- [ ] 无安全漏洞报告

## 附录

### 依赖包列表
```json
{
  "dependencies": {
    "better-auth": "1.4.17",
    "@better-auth/infra": "latest",
    "@better-auth/infra/client": "latest",
    "better-sqlite3": "^12.6.2",
    "drizzle-orm": "^0.39.0"
  }
}
```

### 文件结构变更
```
temp/
├── app/
│   ├── admin/                    # 新增
│   │   └── dashboard/
│   │       └── page.tsx         # Dashboard入口页面
│   ├── api/
│   │   ├── admin/               # 新增
│   │   │   ├── users/
│   │   │   │   └── route.ts
│   │   │   └── credits/
│   │   │       └── [userId]/
│   │   │           └── route.ts
│   │   └── middleware.ts        # 增强中间件
│   └── auth/
│       ├── login/
│       │   └── page.tsx         # 移除第三方登录按钮
│       └── register/
│           └── page.tsx         # 移除第三方登录选项
├── lib/
│   ├── auth.ts                  # 更新Better Auth配置
│   ├── auth-client.ts           # 更新客户端配置
│   ├── credit-service.ts        # 新增: 次数管理服务
│   └── admin-middleware.ts      # 新增: 管理员中间件
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-04-11-formal-sql-auth-dashboard-integration-design.md
```

### 开发团队备注
- 本设计基于现有代码架构，遵循YAGNI原则
- 优先使用现成方案(Better Auth Dashboard)减少开发成本
- 保持代码简洁，避免过度设计
- 遵循项目现有的AI游戏开发公约原则

---
*设计文档版本: 1.0*
*最后更新: 2026-04-11*
*设计负责人: 项目团队*