#!/bin/bash

# 部署脚本 for ECS服务器
# 使用方法: ./deploy.sh [dev|prod]

set -e  # 遇到错误时退出

ENV=${1:-prod}
IMAGE_NAME="next-app"
CONTAINER_NAME="next-app-$ENV"
DOCKER_COMPOSE_FILE="docker-compose.yml"

echo "=== 开始部署 Next.js 应用到 $ENV 环境 ==="

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

# 加载环境变量
if [ -f .env.docker ]; then
    echo "📁 加载环境变量文件 .env.docker"
    source .env.docker
elif [ -f .env.local ]; then
    echo "📁 加载环境变量文件 .env.local"
    source .env.local
else
    echo "⚠️  未找到环境变量文件，使用默认值"
fi

# 根据环境执行不同的部署流程
case $ENV in
    dev)
        echo "🔧 启动开发环境..."
        docker-compose -f $DOCKER_COMPOSE_FILE up app-dev --build -d
        ;;
    prod)
        echo "🚀 部署生产环境..."
        
        # 停止并删除旧容器
        if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
            echo "🛑 停止运行中的容器..."
            docker stop $CONTAINER_NAME
            docker rm $CONTAINER_NAME
        fi
        
        # 删除旧镜像
        if [ "$(docker images -q $IMAGE_NAME:latest)" ]; then
            echo "🗑️  删除旧镜像..."
            docker rmi $IMAGE_NAME:latest
        fi
        
        # 构建新镜像
        echo "🔨 构建Docker镜像..."
        docker build -t $IMAGE_NAME:latest .
        
        # 运行新容器
        echo "🐳 启动新容器..."
        docker run -d \
            --name $CONTAINER_NAME \
            --restart always \
            -p 3000:3000 \
            -e NODE_ENV=production \
            -e NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000 \
            -e BETTER_AUTH_URL=http://localhost:3000 \
            -e BETTER_AUTH_SECRET="$BETTER_AUTH_SECRET" \
            -e DEEPSEEK_API_KEY="$DEEPSEEK_API_KEY" \
            -e BETTER_AUTH_API_KEY="$BETTER_AUTH_API_KEY" \
            -e ADMIN_API_KEY="$ADMIN_API_KEY" \
            -e DEFAULT_EVAL_CREDITS="$DEFAULT_EVAL_CREDITS" \
            -e DEFAULT_OPT_CREDITS="$DEFAULT_OPT_CREDITS" \
            -v $(pwd)/sqlite.db:/app/sqlite.db \
            -v $(pwd)/logs:/app/logs \
            $IMAGE_NAME:latest
        
        # 清理无用镜像
        echo "🧹 清理无用Docker资源..."
        docker system prune -f
        ;;
    *)
        echo "❌ 未知环境: $ENV"
        echo "使用方法: $0 [dev|prod]"
        exit 1
        ;;
esac

# 检查容器状态
echo "📊 检查容器状态..."
sleep 3
docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 检查应用健康状态
echo "🏥 检查应用健康状态..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/auth/get-session | grep -q "200"; then
    echo "✅ 应用启动成功！"
    echo "🌐 访问地址: http://localhost:3000"
else
    echo "⚠️  应用可能未完全启动，请查看日志: docker logs $CONTAINER_NAME"
fi

echo "=== 部署完成 ==="