@echo off
echo 正在启动手机版视频网站服务器...
echo.
echo 启动后请访问以下地址：
echo 电脑访问: http://localhost:8080/demo-mobile.html
echo 手机访问: http://localhost:8080/demo-mobile.html
echo.
echo 按任意键启动服务器...
pause >nul

cd /d D:\666
node video-server-mobile.js

pause