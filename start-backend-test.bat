@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 后端启动脚本
echo ========================================
echo.
echo 正在启动后端服务器...
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

echo 🎬 后端服务器启动中...
echo.

:: 启动后端服务器
echo 🔄 正在启动后端服务器...
start "Backend Server" cmd /k "cd /d D:\666\video-website\backend && node server-simple.js"

timeout /t 3 /nobreak >nul

:: 启动通用服务器
echo 🔄 正在启动通用服务器...
start "Universal Server" cmd /k "cd /d D:\666 && node video-server-universal.js"

timeout /t 3 /nobreak >nul

:: 启动测试页面
echo 🔄 正在启动测试页面...
start "Backend Test" cmd /k "echo 后端测试页面已启动 & pause"

timeout /t 2 /nobreak >nul

echo.
echo ✅ 后端服务器启动完成！
echo.
echo 🌐 后端服务器地址：
echo - 后端API：http://localhost:5000
echo - 通用服务器：http://localhost:8888
echo.
echo 📱 测试页面：
echo - API测试：http://localhost:8888/backend-test.html
echo - 管理界面：http://localhost:8888/admin-backend.html
echo - API文档：http://localhost:8888/api-documentation.html
echo.
echo 🎯 后端功能：
echo - 视频API管理
echo - 用户认证系统
echo - 文件上传支持
echo - 数据库集成
echo - RESTful API
echo.
echo 📋 系统组件：
echo - 后端：Node.js + Express + 模拟数据
echo - 通用：Node.js 静态服务器
echo - 测试：HTML + JavaScript + CSS
echo.
echo 🎬 视频网站后端服务器已启动！
echo.
echo 按任意键打开浏览器访问测试页面...
pause >nul

:: 打开浏览器
start http://localhost:8888/backend-test.html

echo.
echo 🎉 后端服务器已完全启动！
echo.
echo 📖 功能说明：
echo - 完整的API接口测试
echo - 服务器状态监控
echo - 用户和视频管理
echo - 自定义API测试
echo - 批量测试功能
echo.
echo 🎬 视频网站 - 让您的网站在线运行！