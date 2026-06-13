@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - Netlify后端部署
echo ========================================
echo.
echo 正在部署后端到Netlify...
echo.

:: 检查Git是否安装
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：未找到Git
    echo 请先安装Git：https://git-scm.com/
    pause
    exit /b 1
)

:: 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：未找到Node.js
    echo 请先安装Node.js：https://nodejs.org/
    pause
    exit /b 1
)

:: 进入项目目录
cd D:\666\video-website

echo 🔄 正在初始化Git仓库...
git init

echo 🔄 正在添加文件...
git add .

echo 🔄 正在提交代码...
git commit -m "Netlify backend deployment: Video website backend system"

echo 🔄 正在推送代码...
git push -u origin main

echo.
echo ✅ 后端部署完成！
echo.
echo 🌐 部署后访问地址：
echo - 后端API：https://your-site-name.netlify.app/api/
echo - 管理界面：https://your-site-name.netlify.app/admin
echo - 测试页面：https://your-site-name.netlify.app/test
echo - API文档：https://your-site-name.netlify.app/docs
echo.
echo 🎬 视频网站后端已成功部署到Netlify！
echo.
pause