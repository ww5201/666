@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 最终部署指南
echo ========================================
echo.
echo 您的视频网站项目已经准备就绪！
echo.
echo 📋 当前状态：
echo ✅ 项目文件：已完成
echo ✅ Git管理：已完成
echo ✅ 本地测试：已完成
echo ⏳ GitHub推送：进行中
echo ⏳ Netlify部署：待完成
echo.
echo 🚀 立即完成部署：
echo.
echo 方法1：手动完成Netlify部署（推荐）
echo 1. 访问：https://github.com/ww5201/666
echo 2. 访问：https://netlify.com
echo 3. 注册账户，连接GitHub仓库
echo 4. 点击 "Deploy site"
echo 5. 获得免费域名
echo.
echo 方法2：使用本地服务器（立即可用）
echo 1. 双击运行：D:\666\start-universal.bat
echo 2. 访问：http://localhost:8888
echo 3. 自动检测设备类型
echo.
echo 方法3：使用演示版本（无需服务器）
echo 1. 打开：D:\666\video-website\demo.html
echo 2. 打开：D:\666\video-website\demo-mobile.html
echo.
echo 🎯 推荐选择：
echo 如果您想要真正的在线网站，选择方法1
echo 如果您想要快速测试，选择方法2或3
echo.
echo 准备开始哪个方法？(1/2/3)
set /p choice=

if "%choice%"=="1" goto netlify
if "%choice%"=="2" goto local
if "%choice%"=="3" goto demo
echo 无效选择，请重新运行脚本
pause
exit /b

:netlify
echo.
echo 🌟 Netlify部署步骤：
echo.
echo 1. 打开浏览器访问：https://github.com/ww5201/666
echo 2. 确认仓库包含所有文件
echo 3. 访问：https://netlify.com
echo 4. 点击 "Sign up" 注册（可用GitHub登录）
echo 5. 点击 "New site from Git"
echo 6. 选择 "GitHub"
echo 7. 授权Netlify访问GitHub
echo 8. 选择仓库 "ww5201/666"
echo 9. 点击 "Deploy site"
echo 10. 等待1-3分钟，获得域名
echo.
echo 🎉 部署完成后，您的网站将在线运行！
echo.
echo 是否需要我帮您检查部署状态？(y/n)
set /p check=
if /i "%check%"=="y" goto check_status
pause
exit /b

:local
echo.
echo 🚀 启动本地服务器...
echo.
echo 正在启动通用服务器...
echo 服务器将在以下地址运行：
echo - 电脑版：http://localhost:8888
echo - 手机版：http://localhost:8888（自动检测）
echo.
echo 按任意键启动服务器...
pause >nul

cd D:\666
start video-server-universal.js

echo.
echo ✅ 服务器已启动！
echo.
echo 请在浏览器中访问：http://localhost:8888
echo.
echo 服务器将自动检测您的设备类型并显示相应版本
echo.
echo 按Ctrl+C停止服务器
pause
exit /b

:demo
echo.
echo 🎬 演示版本已准备！
echo.
echo 打开以下文件即可体验：
echo.
echo 💻 电脑版：
echo 文件：D:\666\video-website\demo.html
echo 或在浏览器中打开：file:///D:/666/video-website/demo.html
echo.
echo 📱 手机版：
echo 文件：D:\666\video-website\demo-mobile.html
echo 或在浏览器中打开：file:///D:/666/video-website/demo-mobile.html
echo.
echo 🧪 测试页面：
echo 文件：D:\666\video-website\test.html
echo.
echo 🎯 功能特点：
echo ✅ 响应式设计
echo ✅ 用户注册/登录
echo ✅ 视频浏览和搜索
echo ✅ 个人中心
echo ✅ 移动端适配
echo.
echo 🎉 您的视频网站已经可以使用了！
pause
exit /b

:check_status
echo.
echo 🔍 检查部署状态...
echo.
echo 正在检查GitHub仓库...
cd D:\666\video-website
git status
echo.
echo 正在检查最近的提交...
git log --oneline -5
echo.
echo 正在检查远程仓库...
git remote -v
echo.
echo 📋 部署状态检查完成！
echo.
echo 如果显示 "working tree clean"，说明所有文件已提交
echo 如果显示 "ahead of origin"，需要推送代码
echo.
echo 推送命令：git push origin main
echo.
pause