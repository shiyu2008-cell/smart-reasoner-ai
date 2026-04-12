# Docker部署指南

本文档介绍如何在ECS服务器上使用Docker部署Next.js应用。

## 🎯 部署目标

- 在ECS服务器上构建和运行Docker容器
- 通过域名 `https://fytx.top` 访问应用
- 使用nginx作为反向代理（可选）
- 实现自动重启和健康检查

## 📁 文件结构

```
项目根目录/
├── Dockerfile              # Docker构建文件
├── docker-compose.yml      # Docker Compose配置
├── .dockerignore          # Docker忽略文件
├── .env.docker            # 环境变量示例
├── deploy.sh              # 部署脚本
├── nginx.conf             # nginx配置（可选）
└── DOCKER_DEPLOYMENT.md   # 本文档
```

## 🚀 快速开始

### 1. 服务器准备

确保ECS服务器已安装：
- Docker 20.10+
- Docker Compose 2.0+
- Git

```bash
# 检查Docker是否安装
docker --version
docker-compose --version
```

### 2. 克隆项目

```bash
# 进入工作目录
cd /opt

# 克隆项目（使用您的仓库地址）
git clone <your-repository-url> next-app
cd next-app
```

### 3. 配置环境变量

```bash
# 复制环境变量示例文件
cp .env.docker .env.production

# 编辑环境变量（使用实际值替换）
vim .env.production

# 或者直接设置环境变量
export BETTER_AUTH_SECRET="your_secret_key"
export DEEPSEEK_API_KEY="your_api_key"
export BETTER_AUTH_API_KEY="your_better_auth_key"
export ADMIN_API_KEY="your_admin_key"
```

### 4. 构建和运行

#### 方法一：使用Docker Compose（推荐）

```bash
# 构建并启动生产环境
docker-compose up -d app

# 查看日志
docker-compose logs -f app

# 检查状态
docker-compose ps
```

#### 方法二：使用部署脚本

```bash
# 给脚本执行权限
chmod +x deploy.sh

# 部署生产环境
./deploy.sh prod

# 部署开发环境
./deploy.sh dev
```

#### 方法三：直接使用Docker命令

```bash
# 构建镜像
docker build -t next-app:latest .

# 运行容器
docker run -d \
  --name next-app \
  --restart always \
  -p 3000:3000 \
  --env-file .env.production \
  -v $(pwd)/sqlite.db:/app/sqlite.db \
  -v $(pwd)/logs:/app/logs \
  next-app:latest
```

## 🔧 配置nginx反向代理

如果您的ECS服务器已经安装了nginx，可以配置反向代理：

### 1. 创建nginx配置文件

```bash
sudo nano /etc/nginx/sites-available/fytx.top
```

### 2. 配置内容

```nginx
server {
    listen 80;
    server_name fytx.top www.fytx.top;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name fytx.top www.fytx.top;
    
    # SSL证书（根据实际路径配置）
    ssl_certificate /etc/nginx/ssl/fytx.top.crt;
    ssl_certificate_key /etc/nginx/ssl/fytx.top.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 健康检查
    location /health {
        access_log off;
        return 200 "healthy\n";
    }
}
```

### 3. 启用配置

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/fytx.top /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重新加载nginx
sudo nginx -s reload
```

## 📊 监控和维护

### 查看日志

```bash
# Docker容器日志
docker logs next-app --tail 100 -f

# 应用日志（如果配置了日志卷）
tail -f logs/app.log
```

### 健康检查

```bash
# 检查容器状态
docker ps

# 检查应用健康
curl -f http://localhost:3000/api/auth/get-session || echo "应用异常"

# 检查nginx健康
curl -f https://fytx.top || echo "nginx异常"
```

### 更新部署

```bash
# 拉取最新代码
git pull origin main

# 重新构建和部署
./deploy.sh prod

# 或者使用Docker Compose
docker-compose down
docker-compose up -d --build app
```

## 🔒 安全建议

1. **环境变量安全**：
   - 不要将`.env.production`文件提交到Git
   - 使用ECS密钥管理服务存储敏感信息
   - 定期轮换API密钥

2. **容器安全**：
   - 使用非root用户运行容器
   - 限制容器资源使用
   - 定期更新基础镜像

3. **网络安全**：
   - 配置防火墙，只开放必要端口
   - 使用HTTPS加密传输
   - 配置DDoS防护

## 🐛 故障排除

### 502 Bad Gateway

```bash
# 1. 检查Next.js应用是否运行
docker ps | grep next-app

# 2. 检查应用日志
docker logs next-app

# 3. 检查端口是否监听
netstat -tulpn | grep :3000

# 4. 检查nginx配置
sudo nginx -t
tail -f /var/log/nginx/error.log
```

### 应用启动失败

```bash
# 1. 查看详细日志
docker logs next-app --details

# 2. 检查环境变量
docker exec next-app env

# 3. 检查数据库连接
docker exec next-app ls -la /app/sqlite.db

# 4. 进入容器调试
docker exec -it next-app sh
```

### 内存不足

```bash
# 查看容器资源使用
docker stats next-app

# 限制容器内存使用（在docker-compose.yml中添加）
# services:
#   app:
#     deploy:
#       resources:
#         limits:
#           memory: 512M
```

## 🔄 自动化部署

### 使用GitHub Actions（示例）

```yaml
name: Deploy to ECS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to ECS
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.ECS_HOST }}
        username: ${{ secrets.ECS_USER }}
        key: ${{ secrets.ECS_SSH_KEY }}
        script: |
          cd /opt/next-app
          git pull origin main
          ./deploy.sh prod
```

## 📞 支持

如果遇到问题：

1. 查看本文档的故障排除部分
2. 检查应用日志：`docker logs next-app`
3. 检查nginx日志：`tail -f /var/log/nginx/error.log`
4. 验证网络连接：`curl -v https://fytx.top`

---

**注意**：本文档假设您已经在ECS服务器上配置了SSL证书和域名解析。如果没有，请先完成这些配置。