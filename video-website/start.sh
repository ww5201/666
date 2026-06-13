#!/bin/bash

echo "正在启动视频网站项目..."
echo ""

echo "1. 检查依赖..."
if [ ! -d "frontend/node_modules" ]; then
    echo "安装前端依赖..."
    cd frontend
    npm install
    cd ..
else
    echo "前端依赖已安装"
fi

if [ ! -d "backend/node_modules" ]; then
    echo "安装后端依赖..."
    cd backend
    npm install
    cd ..
else
    echo "后端依赖已安装"
fi

echo ""
echo "2. 启动服务器..."
echo ""
echo "前端地址: http://localhost:3000"
echo "后端地址: http://localhost:5000"
echo ""
echo "按Ctrl+C停止服务器"
echo ""

npm run dev