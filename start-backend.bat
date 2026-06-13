@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 后端服务器启动
echo ========================================
echo.
echo 正在启动视频网站后端服务器...
echo.

:: 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：未找到Node.js
    echo 请先安装Node.js：https://nodejs.org/
    pause
    exit /b 1
)

:: 检查后端目录是否存在
if not exist "D:\666\video-website\backend" (
    echo ❌ 错误：后端目录不存在
    echo 请确保项目路径正确：D:\666\video-website\backend
    pause
    exit /b 1
)

:: 进入后端目录
cd /d "D:\666\video-website\backend"

:: 检查是否已安装依赖
if not exist "node_modules" (
    echo 📦 正在安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
)

:: 创建uploads目录
if not exist "uploads" (
    mkdir uploads
    echo 📁 创建uploads目录
)

:: 检查环境变量文件
if not exist ".env" (
    echo 📝 创建环境变量文件...
    echo JWT_SECRET=your-secret-key-123456 > .env
    echo MONGODB_URI=mongodb://localhost:27017/video-website >> .env
    echo PORT=5000 >> .env
    echo ✅ 环境变量文件已创建
)

echo.
echo 🚀 正在启动服务器...
echo.
echo 服务器信息：
echo - 后端地址：http://localhost:5000
echo - API文档：http://localhost:5000/api/videos
echo - 测试页面：http://localhost:5000
echo.
echo 按Ctrl+C停止服务器
echo.
echo 📋 可用的API端点：
echo GET  /api/videos          - 获取视频列表
echo GET  /api/videos/:id     - 获取单个视频
echo POST /api/users/login     - 用户登录
echo POST /api/users/register  - 用户注册
echo GET  /api/users/me       - 获取当前用户信息
echo.
echo 🎯 测试命令：
echo curl http://localhost:5000/api/videos
echo.
echo 启动服务器...
pause >nul

:: 启动服务器
node server.js