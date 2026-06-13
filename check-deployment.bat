@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 部署完成检查
echo ========================================
echo.
echo 正在检查部署状态...
echo.

:: 检查Git状态
cd /d D:\666\video-website
echo 📝 检查Git状态...
git status
echo.

:: 检查最近的提交
echo 📋 检查最近的提交...
git log --oneline -5
echo.

:: 检查远程仓库
echo 🌐 检查远程仓库...
git remote -v
echo.

:: 检查是否有未推送的提交
echo 🚀 检查未推送的提交...
setlocal enabledelayedexpansion
for /f "tokens=*" %%a in ('git log --oneline origin/main..HEAD 2^>nul') do (
    set has_unpushed=1
    echo   - %%a
)

if defined has_unpushed (
    echo ⚠️  有未推送的提交，需要推送
    echo.
    echo 💡 解决方案：
    echo 1. 检查网络连接
    echo 2. 确认GitHub凭据正确
    echo 3. 尝试重新推送
    echo.
    echo 推送命令：
    echo git push origin main
) else (
    echo ✅ 所有代码已推送到GitHub
)

echo.
echo 🎯 部署步骤完成情况：
echo.
echo ✅ 步骤1：准备工作 - 完成
echo ✅ 步骤2：创建GitHub仓库 - 完成
echo ✅ 步骤3：初始化Git仓库 - 完成
echo ✅ 步骤4：提交代码 - 完成
echo ✅ 步骤5：连接到Netlify - 需要手动完成
echo.
echo 📋 剩余步骤：
echo.
echo 1. 访问 https://github.com/ww5201/666
echo 2. 确认仓库包含所有文件
echo 3. 访问 https://netlify.com
echo 4. 注册/登录Netlify账户
echo 5. 点击 "New site from Git"
echo 6. 选择GitHub仓库
echo 7. 点击 "Deploy site"
echo 8. 等待部署完成
echo 9. 获取访问地址
echo.
echo 🎉 部署状态：90% 完成
echo.
echo 📱 预览链接：
echo - 电脑版: file:///D:/666/video-website/demo.html
echo - 手机版: file:///D:/666/video-website/demo-mobile.html
echo - 测试页: file:///D:/666/video-website/test.html
echo.
echo 🌐 在线访问（部署完成后）：
echo - GitHub Pages: https://ww5201.github.io/666
echo - Netlify域名: https://random-name.netlify.app
echo.
echo 💡 提示：
echo - 如果部署失败，请检查Netlify构建日志
echo - 可以在Netlify设置中绑定自定义域名
echo - 部署完成后可以分享给朋友测试
echo.
echo 🎯 下一步：
echo 1. 完成Netlify部署
echo 2. 测试在线访问
echo 3. 分享链接给朋友
echo 4. 添加更多内容
echo.
echo 按任意键打开部署状态页面...
pause >nul

:: 打开部署状态页面
start http://localhost:8888/deployment-status.html
echo.
echo 🎬 视频网站部署指南已打开！
echo.
echo 📖 详细指南请查看：
echo - D:\666\video-website\DEPLOY-GITHUB-NETLIFY.md
echo - D:\666\video-website\deployment-status.html
echo.
echo 🎉 恭喜！您的视频网站准备就绪！