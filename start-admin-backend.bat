@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 后端管理界面启动
echo ========================================
echo.
echo 正在启动后端管理界面...
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

echo 🎬 后端管理界面启动中...
echo.

:: 启动后端服务器
echo 🔄 正在启动后端服务器...
start "Backend Server" cmd /k "cd /d D:\666\video-website\backend && node server-simple.js"

timeout /t 3 /nobreak >nul

:: 启动通用服务器
echo 🔄 正在启动通用服务器...
start "Universal Server" cmd /k "cd /d D:\666 && node video-server-universal.js"

timeout /t 3 /nobreak >nul

:: 启动管理界面
echo 🔄 正在启动管理界面...
start "Admin Backend" cmd /k "echo 管理界面已启动 & pause"

timeout /t 2 /nobreak >nul

echo.
echo ✅ 后端管理界面启动完成！
echo.
echo 🌐 管理界面地址：
echo - 后端管理界面：http://localhost:8888/admin-backend.html
echo - 后端API：http://localhost:5000
echo - 通用服务器：http://localhost:8888
echo.
echo 📱 移动端访问：
echo - 手机版：http://localhost:8888（自动检测）
echo.
echo 🎯 管理功能：
echo - 服务器状态监控
echo - API接口测试
echo - 用户管理
echo - 视频管理
echo - 系统日志查看
echo.
echo 📋 系统组件：
echo - 后端：Node.js + Express + 模拟数据
echo - 通用：Node.js 静态服务器
echo - 管理：HTML + JavaScript + CSS
echo.
echo 🎬 视频网站后端管理界面已启动！
echo.
echo 按任意键打开浏览器访问管理界面...
pause >nul

:: 打开浏览器
start http://localhost:8888/admin-backend.html

echo.
echo 🎉 后端管理界面已完全启动！
echo.
echo 📖 管理功能说明：
echo - 服务器状态实时监控
echo - API接口一键测试
echo - 用户和视频管理
echo - 系统性能监控
echo - 错误日志查看
echo.
echo 🎬 视频网站 - 让您的网站在线运行！