-- Better Auth SQLite 表结构 (基于默认配置)
-- 如果使用 drizzleAdapter，表名和字段名可能有所不同，请根据实际情况调整

CREATE TABLE IF NOT EXISTS "user" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "email_verified" INTEGER NOT NULL DEFAULT 0,
    "password_hash" TEXT,
    "name" TEXT,
    "username" TEXT,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
    "id" TEXT PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "expires_at" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
    "id" TEXT PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_at" INTEGER,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE,
    UNIQUE("provider", "provider_account_id")
);

CREATE TABLE IF NOT EXISTS "verification" (
    "id" TEXT PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "expires_at" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "session" ("user_id");
CREATE INDEX IF NOT EXISTS "session_token_idx" ON "session" ("token");
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "account" ("user_id");
CREATE INDEX IF NOT EXISTS "account_provider_idx" ON "account" ("provider", "provider_account_id");
CREATE INDEX IF NOT EXISTS "verification_token_idx" ON "verification" ("token");
CREATE INDEX IF NOT EXISTS "verification_identifier_idx" ON "verification" ("identifier");