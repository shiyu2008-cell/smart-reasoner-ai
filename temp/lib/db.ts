import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

// 创建 SQLite 数据库连接，文件位于项目根目录的 sqlite.db
const sqlite = new Database('sqlite.db');

// 导出 drizzle 实例
export const db = drizzle(sqlite);

// 注意：Better Auth 所需的表结构将通过迁移脚本或手动 SQL 创建
// 表结构定义可以单独放在 lib/auth-schema.ts 中，或通过 drizzle 迁移生成