@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 快速部署
echo ========================================
echo.
echo 正在部署最新更改到Netlify...
echo.

:: 检查Git是否安装
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：未找到Git
    echo 请先安装Git：https://git-scm.com/
    pause
    exit /b 1
)

:: 进入项目目录
cd D:\666\video-website

echo 🔄 正在添加所有文件...
git add .

echo 🔄 正在提交更改...
git commit -m "Update: Video website with fixed Netlify configuration"

echo 🔄 正在推送到GitHub...
git push origin main

echo.
echo ✅ 部署完成！
echo.
echo 🌐 Netlify将自动重新部署（1-2分钟）
echo.
echo 📱 访问地址：
echo - 首页：https://your-site-name.netlify.app/
echo - 演示页：https://your-site-name.netlify.app/demo.html
echo - 移动版：https://your-site-name.netlify.app/demo-mobile.html
echo - 管理后台：https://your-site-name.netlify.app/admin-backend.html
echo - API测试：https://your-site-name.netlify.app/backend-test.html
echo - API文档：https://your-site-name.netlify.app/api-documentation.html
echo.
echo 🎬 视频网站已成功部署到Netlify！
echo.
pause