# 使用多阶段构建来减小镜像大小
# 第一阶段：依赖安装和构建
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package.json package-lock.json ./

# 安装依赖（包括devDependencies用于构建）
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：生产运行
FROM node:20-alpine AS runner

# 设置工作目录
WORKDIR /app

# 设置生产环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非root用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 从builder阶段复制必要的文件
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非root用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 启动命令
CMD ["node", "server.js"]