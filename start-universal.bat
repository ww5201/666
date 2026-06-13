@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 通用版启动器
echo ========================================
echo.
echo 启动后，请使用以下地址访问：
echo 📱 手机访问: http://localhost:8888
echo 💻 电脑访问: http://localhost:8888
echo.
echo 系统会自动检测您的设备类型，
echo 并显示最适合的界面！
echo.
echo 正在启动服务器...
echo.

cd /d D:\666

:check_node
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：未找到Node.js
    echo 请先安装Node.js：https://nodejs.org/
    pause
    exit /b 1
)

:start_server
echo ✅ 启动服务器...
echo.
node video-server-universal.js

echo.
echo 服务器已停止
pause