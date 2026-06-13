#!/bin/bash

echo ""
echo "========================================"
echo "     视频网站 - Docker 部署脚本"
echo "========================================"
echo ""

cd "$(dirname "$0")"

echo "[1/4] 创建目录结构..."
mkdir -p frontend
mkdir -p backend/uploads/videos
mkdir -p backend/uploads/thumbnails

echo "[2/4] 复制前端文件..."
cp -f demo.html frontend/index.html
cp -f demo-mobile.html frontend/mobile.html
echo "  - index.html (电脑版)"
echo "  - mobile.html (手机版)"

echo "[3/4] 检查 Docker..."
if ! command -v docker &> /dev/null; then
    echo "[错误] 未安装 Docker"
    echo "安装命令: curl -fsSL https://get.docker.com | sh"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "[错误] 未安装 docker-compose"
    echo "安装命令: apt install docker-compose 或 yum install docker-compose"
    exit 1
fi

echo "[4/4] 启动 Docker 容器..."
docker-compose down 2>/dev/null
docker-compose up -d --build

echo ""
echo "========================================"
echo "     部署完成！"
echo "========================================"
echo ""
echo "访问地址："
echo "  电脑版: http://$(hostname -I | awk '{print $1}'):83"
echo "  手机版: http://$(hostname -I | awk '{print $1}'):83/mobile.html"
echo ""
echo "API 测试："
echo "  http://$(hostname -I | awk '{print $1}'):83/api/videos"
echo ""
echo "查看日志: docker-compose logs -f"
echo "停止服务: docker-compose down"
echo ""