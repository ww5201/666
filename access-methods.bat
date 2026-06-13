@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 多种访问方式
echo ========================================
echo.
echo 选择您希望的访问方式：
echo.
echo 1. 本地服务器（推荐）
echo    - 启动本地Node.js服务器
echo    - 访问: http://localhost:8888
echo.
echo 2. 静态文件方式
echo    - 直接打开HTML文件
echo    - 无需服务器，双击即可使用
echo.
echo 3. Python服务器
echo    - 使用Python内置服务器
echo    - 访问: http://localhost:8000
echo.
echo 4. Node.js便携版
echo    - 无需安装Node.js
echo    - 使用便携版Node.js运行
echo.
echo 请选择方式 (1-4):
set /p choice=

if "%choice%"=="1" goto local_server
if "%choice%"=="2" goto static_files
if "%choice%"=="3" goto python_server
if "%choice%"=="4" goto portable_node
echo 无效选择，请重新运行脚本
pause
exit /b

:local_server
echo.
echo 正在启动本地服务器...
cd /d D:\666
node video-server-universal.js
pause
exit /b

:static_files
echo.
echo 使用静态文件方式...
echo 请在文件浏览器中双击以下文件之一：
echo.
echo 📱 手机版: D:\666\video-website\demo-mobile.html
echo 💻 电脑版: D:\666\video-website\demo.html
echo 🧪 测试版: D:\666\video-website\test.html
echo.
echo 注意：静态文件方式某些功能可能受限
pause
exit /b

:python_server
echo.
echo 正在启动Python服务器...
cd /d D:\666\video-website
python -m http.server 8000
pause
exit /b

:portable_node
echo.
echo 正在启动便携版Node.js服务器...
echo 请确保D:\666\portable-node.exe存在
cd /d D:\666
portable-node.exe video-server-universal.js
pause
exit /b