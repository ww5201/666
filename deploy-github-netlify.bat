@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - GitHub Pages + Netlify 部署
echo ========================================
echo.
echo 这个方案将帮助您把视频网站部署到免费的GitHub Pages + Netlify
echo.
echo 步骤概览：
echo 1. 创建GitHub仓库
echo 2. 准备项目文件
echo 3. 推送到GitHub
echo 4. 连接到Netlify
echo 5. 配置自动部署
echo 6. 获得免费域名
echo.
echo 准备开始？(y/n)
set /p start=
if /i "%start%"=="n" exit /b

echo.
echo 🚀 开始部署步骤...
echo.

:: 检查Git是否安装
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：Git未安装
    echo 请先安装Git：https://git-scm.com/download/win
    pause
    exit /b
)

echo ✅ Git已安装
echo.

:: 检查是否在正确的目录
cd /d D:\666
if not exist "video-website" (
    echo ❌ 错误：video-website目录不存在
    echo 请确保项目在正确的位置
    pause
    exit /b
)

echo ✅ 项目目录存在
echo.

:: 检查是否已初始化Git仓库
cd /d D:\666\video-website
if not exist ".git" (
    echo 📝 初始化Git仓库...
    git init
    echo ✅ Git仓库已初始化
) else (
    echo ✅ Git仓库已存在
)

echo.

:: 检查是否有远程仓库
git remote -v | findstr "origin" >nul
if %errorlevel% neq 0 (
    echo 🌐 请创建GitHub仓库并添加远程地址：
    echo.
    echo 1. 访问 https://github.com/new
    echo 2. 创建新仓库（命名为video-website或其他名称）
    echo 3. 选择"Public"（免费）
    echo 4. 不要选择"Add README"、".gitignore"、"license"
    echo 5. 复制仓库地址（如：https://github.com/yourname/video-website.git）
    echo.
    echo 创建完成后，请输入仓库地址：
    set /p repo_url=
    
    if not "%repo_url%"=="" (
        git remote add origin %repo_url%
        echo ✅ 远程仓库已添加
    ) else (
        echo ❌ 未提供仓库地址
        pause
        exit /b
    )
) else (
    echo ✅ 远程仓库已配置
)

echo.

:: 添加所有文件到Git
git add .
echo ✅ 文件已添加到Git

echo.

:: 提交文件
git commit -m "Initial commit: Video website deployment"
echo ✅ 文件已提交

echo.

:: 推送到GitHub
git push -u origin main
if %errorlevel% neq 0 (
    echo ❌ 推送失败，请检查GitHub凭据
    echo 可能需要配置Git用户名和邮箱：
    echo git config --global user.name "Your Name"
    echo git config --global user.email "your.email@example.com"
    pause
    exit /b
)

echo ✅ 代码已推送到GitHub
echo.

echo 🎉 GitHub部分完成！现在连接到Netlify：
echo.
echo 1. 访问 https://netlify.com
echo 2. 点击 "Sign up" 注册账户（可用GitHub登录）
echo 3. 点击 "New site from Git"
echo 4. 选择GitHub仓库
echo 5. 授权Netlify访问GitHub
echo 6. 选择仓库并点击 "Deploy site"
echo.
echo Netlify会自动检测项目类型并部署
echo 部署完成后会获得一个免费的域名！
echo.
echo 📋 部署完成后，您的网站将可以通过以下地址访问：
echo - Netlify域名：https://random-name.netlify.app
echo - GitHub Pages：https://yourname.github.io/video-website
echo.
echo 🎯 提示：
echo - Netlify部署通常需要1-3分钟
echo - 如果部署失败，检查package.json配置
echo - 可以在Netlify设置中绑定自定义域名
echo.
echo 部署完成！
pause