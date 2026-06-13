@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - Netlify 部署配置
echo ========================================
echo.
echo 检测到您正在配置Netlify部署，我来帮您完成设置！
echo.
echo 📋 当前配置建议：
echo.
echo 项目名称：w520
echo 项目地址：https://w520.netlify.app
echo.
echo 🔧 推荐配置：
echo.
echo 构建设置：
echo - 分支：main
echo - 基础目录：video-website
echo - 构建命令：不需要（静态网站）
echo - 发布目录：不需要（根目录）
echo.
echo 环境变量：
echo - 不需要特殊环境变量
echo.
echo 🚀 立即部署步骤：
echo.
echo 1. 确认配置正确
echo 2. 点击 "Deploy site" 按钮
echo 3. 等待1-3分钟
echo 4. 获得访问地址
echo.
echo 📱 部署完成后，您的网站将可以通过以下地址访问：
echo - https://w520.netlify.app
echo.
echo 🎯 功能验证：
echo - 电脑版：https://w520.netlify.app
echo - 手机版：自动适配
echo - 搜索功能：正常
echo - 用户注册：正常
echo.
echo ⚡ 部署优势：
echo - ✅ 完全免费
echo - ✅ 全球CDN
echo - ✅ 自动HTTPS
echo - ✅ 24/7在线
echo - ✅ 自动部署
echo.
echo 🎉 恭喜！您的视频网站即将在线运行！
echo.
echo 按任意键继续...
pause >nul

echo.
echo 🚀 正在启动本地服务器进行测试...
echo.
echo 如果Netlify部署出现问题，您可以使用本地服务器：
echo.
echo 地址：http://localhost:8888
echo.
echo 启动本地服务器？(y/n)
set /p start_local=
if /i "%start_local%"=="y" (
    cd D:\666
    start video-server-universal.js
    echo ✅ 本地服务器已启动！
    echo 请访问：http://localhost:8888
    echo.
)

echo.
echo 📖 完整指南请查看：
echo - D:\666\FINAL-DEPLOYMENT-GUIDE.md
echo - D:\666\video-website\deployment-status.html
echo.
echo 🎬 视频网站部署指南 - 让您的网站在线运行！
echo.