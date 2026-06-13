@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 完整系统启动
echo ========================================
echo.
echo 正在启动完整的视频网站系统...
echo.

:: 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：未找到Node.js
    echo 请先安装Node.js：https://nodejs.org/
    pause
    exit /b 1
)

:: 检查项目目录
if not exist "D:\666\video-website" (
    echo ❌ 错误：项目目录不存在
    echo 请确保项目路径正确：D:\666\video-website
    pause
    exit /b 1
)

echo 🎬 视频网站系统启动中...
echo.

:: 启动后端服务器
echo 🔄 正在启动后端服务器...
start "Backend Server" cmd /k "cd /d D:\666\video-website\backend && call start-backend.bat"

timeout /t 3 /nobreak >nul

:: 启动前端服务器（如果需要）
echo 🔄 正在启动前端服务器...
start "Frontend Server" cmd /k "cd /d D:\666\video-website\frontend && npm start"

timeout /t 3 /nobreak >nul

:: 启动通用服务器
echo 🔄 正在启动通用服务器...
start "Universal Server" cmd /k "cd /d D:\666 && node video-server-universal.js"

timeout /t 3 /nobreak >nul

echo.
echo ✅ 所有服务器启动完成！
echo.
echo 🌐 访问地址：
echo - 后端API：http://localhost:5000
echo - 前端界面：http://localhost:3000
echo - 通用服务器：http://localhost:8888
echo.
echo 📱 移动端访问：
echo - 手机版：http://localhost:8888（自动检测）
echo.
echo 🎯 测试命令：
echo curl http://localhost:5000/api/videos
echo.
echo 📋 系统组件：
echo - 后端：Node.js + Express + MongoDB
echo - 前端：React + Ant Design
echo - 通用：Node.js 静态服务器
echo.
echo 🎬 视频网站完整系统已启动！
echo.
echo 按任意键打开浏览器访问...
pause >nul

:: 打开浏览器
start http://localhost:8888

echo.
echo 🎉 系统已完全启动！
echo.
echo 📖 详细指南：
echo - D:\666\FINAL-DEPLOYMENT-GUIDE.md
echo - D:\666\NETLIFY-DEPLOYMENT-COMPLETE.md
echo.
echo 🎬 视频网站 - 让您的网站在线运行！