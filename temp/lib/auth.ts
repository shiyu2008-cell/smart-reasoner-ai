import { betterAuth } from "better-auth";

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
    },
  },
});

// 导出类型
export type Auth = typeof auth;