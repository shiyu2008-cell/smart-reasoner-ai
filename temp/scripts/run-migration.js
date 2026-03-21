import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// 连接到 SQLite 数据库文件
const db = new Database('sqlite.db');

// 读取 SQL 文件
const sqlPath = path.join(__dirname, 'auth-schema.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

// 执行 SQL 语句（按分号分割）
const statements = sql.split(';').filter(stmt => stmt.trim());

console.log('正在创建 Better Auth 表结构...');
try {
  db.transaction(() => {
    for (const stmt of statements) {
      if (stmt.trim()) {
        db.prepare(stmt).run();
      }
    }
  })();
  console.log('表结构创建成功！');
} catch (error) {
  console.error('创建表结构时出错:', error.message);
  process.exit(1);
} finally {
  db.close();
}