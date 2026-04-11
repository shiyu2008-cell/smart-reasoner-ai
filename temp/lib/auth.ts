import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  origin: true,
  trustedOrigins: ["http://localhost:3000", "http://172.18.0.1:3000"],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7天
    updateAge: 60 * 60 * 24, // 每天更新
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7天
      strategy: "jwe",
      refreshCache: true,
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,
        unique: false,
      },
      evaluation_credits: {
        type: "number",
        required: true,
        default: 3,
      },
      optimization_credits: {
        type: "number",
        required: true,
        default: 0,
      },
      total_evaluations: {
        type: "number",
        required: true,
        default: 0,
      },
      total_optimizations: {
        type: "number",
        required: true,
        default: 0,
      },
    },
  },
  plugins: [
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
      activityTracking: {
        enabled: true,
        updateInterval: 300000, // 5分钟
      },
    }),
    admin({
      // 管理员用户ID列表，我们使用IP白名单替代
      adminUserIds: ["admin-user"],
      // 启用管理员API
      enabled: true,
    }),
  ],
});

// 导出类型
export type Auth = typeof auth;