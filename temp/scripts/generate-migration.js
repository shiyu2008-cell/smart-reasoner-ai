import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getMigrations } from "better-auth/db";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

// 创建一个临时内存数据库用于生成迁移
const sqlite = new Database(":memory:");
const db = drizzle(sqlite);

// 使用与生产相同的配置（除了数据库）
const authConfig = {
  secret: "dummy-secret-for-migration-generation",
  baseURL: "http://localhost:3000",
  database: drizzleAdapter(db, { provider: "sqlite" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
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
};

async function generateSQL() {
  const { compileMigrations } = await getMigrations(authConfig);
  const sql = await compileMigrations();
  console.log(sql);
}

generateSQL().catch(console.error);