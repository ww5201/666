@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - Python服务器
echo ========================================
echo.
echo 正在启动Python内置服务器...
echo.
echo 启动后请访问：
echo 电脑版: http://localhost:8000/demo.html
echo 手机版: http://localhost:8000/demo-mobile.html
echo.
echo 按任意键启动服务器...
pause >nul

cd /d D:\666\video-website

python -m http.server 8000

echo.
echo 服务器已停止
pause