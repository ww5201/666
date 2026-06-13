@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 免费服务器方案
echo ========================================
echo.
echo 选择您希望的免费服务器方案：
echo.
echo 1. GitHub Pages + Netlify（推荐）
echo    - 完全免费，无需服务器
echo    - 自动部署，全球访问
echo    - 适合静态网站
echo.
echo 2. Vercel（推荐）
echo    - 免费部署，自动CDN
echo    - 支持React应用
echo    - 全球加速访问
echo.
echo 3. Glitch
echo    - 在线代码编辑器
echo    - 免费运行Node.js项目
echo    - 实时预览
echo.
echo 4. Render
echo    - 免费托管Node.js应用
echo    - 自动部署
echo    - 支持数据库
echo.
echo 5. PythonAnywhere
echo    - 免费Python托管
echo    - 支持Flask/Django
echo    - 适合Python项目
echo.
echo 6. Heroku（免费层）
echo    - 免费Node.js托管
echo    - 自动扩展
echo    - 需要信用卡验证
echo.
echo 请选择方案 (1-6):
set /p choice=

if "%choice%"=="1" goto github_netlify
if "%choice%"=="2" goto vercel
if "%choice%"=="3" goto glitch
if "%choice%"=="4" goto render
if "%choice%"=="5" goto pythonanywhere
if "%choice%"=="6" goto heroku
echo 无效选择，请重新运行脚本
pause
exit /b

:github_netlify
echo.
echo 🌟 GitHub Pages + Netlify 方案
echo.
echo 步骤：
echo 1. 创建GitHub仓库
echo 2. 推送代码到GitHub
echo 3. 连接到Netlify自动部署
echo 4. 获得免费域名和CDN
echo.
echo 优势：
echo ✅ 完全免费
echo ✅ 全球CDN加速
echo ✅ 自动HTTPS
echo ✅ 无需维护服务器
echo.
echo 开始部署？(y/n)
set /p deploy=
if /i "%deploy%"=="y" goto start_deployment
pause
exit /b

:vercel
echo.
echo 🌟 Vercel 方案
echo.
echo 步骤：
echo 1. 注册Vercel账户
echo 2. 连接GitHub仓库
echo 3. 自动部署项目
echo 4. 获得免费域名
echo.
echo 优势：
echo ✅ 免费部署
echo ✅ 全球CDN
echo ✅ 自动HTTPS
echo ✅ 支持React/Vue等框架
echo.
echo 开始部署？(y/n)
set /p deploy=
if /i "%deploy%"=="y" goto vercel_deployment
pause
exit /b

:glitch
echo.
echo 🌟 Glitch 方案
echo.
echo 步骤：
echo 1. 访问 https://glitch.com
echo 2. 点击 "New Project"
echo 3. 选择 "Import from GitHub"
echo 4. 连接您的仓库
echo 5. 自动部署并运行
echo.
echo 优势：
echo ✅ 在线编辑器
echo ✅ 免费运行
echo ✅ 实时预览
echo ✅ 社区功能
echo.
echo 开始部署？(y/n)
set /p deploy=
if /i "%deploy%"=="y" goto glitch_deployment
pause
exit /b

:render
echo.
echo 🌟 Render 方案
echo.
echo 步骤：
echo 1. 注册Render账户
echo 2. 连接GitHub仓库
echo 3. 创建Web Service
echo 4. 自动部署
echo 5. 获得免费域名
echo.
echo 优势：
echo ✅ 免费托管
echo ✅ 自动部署
echo ✅ 支持数据库
echo ✅ 全球访问
echo.
echo 开始部署？(y/n)
set /p deploy=
if /i "%deploy%"=="y" goto render_deployment
pause
exit /b

:pythonanywhere
echo.
echo 🌟 PythonAnywhere 方案
echo.
echo 步骤：
echo 1. 注册PythonAnywhere账户
echo 2. 上传项目文件
echo 3. 配置Web应用
echo 4. 启动服务
echo.
echo 优势：
echo ✅ 免费Python托管
echo ✅ 无需服务器维护
echo ✅ 支持Flask/Django
echo ✅ 欧洲服务器
echo.
echo 开始部署？(y/n)
set /p deploy=
if /i "%deploy%"=="y" goto pythonanywhere_deployment
pause
exit /b

:heroku
echo.
echo 🌟 Heroku 方案
echo.
echo 步骤：
echo 1. 注册Heroku账户
echo 2. 安装Heroku CLI
echo 3. 连接GitHub仓库
echo 4. 创建Heroku应用
echo 5. 自动部署
echo.
echo 优势：
echo ✅ 免费托管
echo ✅ 自动扩展
echo ✅ 支持多种语言
echo ✅ 丰富的插件生态
echo.
echo 注意：需要信用卡验证
echo.
echo 开始部署？(y/n)
set /p deploy=
if /i "%deploy%"=="y" goto heroku_deployment
pause
exit /b

:start_deployment
echo.
echo 🚀 开始GitHub Pages + Netlify部署...
echo.
echo 1. 创建GitHub仓库
echo 2. 推送代码到GitHub
echo 3. 连接到Netlify
echo 4. 配置自动部署
echo.
echo 具体步骤请参考：https://docs.netlify.com/site-deployments/overview/
pause
exit /b

:vercel_deployment
echo.
echo 🚀 开始Vercel部署...
echo.
echo 1. 访问 https://vercel.com
echo 2. 点击 "New Project"
echo 3. 连接GitHub仓库
echo 4. 选择项目并部署
echo.
echo 具体步骤请参考：https://vercel.com/docs/getting-started
pause
exit /b

:glitch_deployment
echo.
echo 🚀 开始Glitch部署...
echo.
echo 1. 访问 https://glitch.com
echo 2. 点击 "New Project"
echo 3. 选择 "Import from GitHub"
echo 4. 连接您的仓库
echo.
echo 具体步骤请参考：https://glitch.com/docs/
pause
exit /b

:render_deployment
echo.
echo 🚀 开始Render部署...
echo.
echo 1. 访问 https://render.com
echo 2. 注册账户
echo 3. 点击 "New + Web Service"
echo 4. 连接GitHub仓库
echo.
echo 具体步骤请参考：https://render.com/docs
pause
exit /b

:pythonanywhere_deployment
echo.
echo 🚀 开始PythonAnywhere部署...
echo.
echo 1. 访问 https://www.pythonanywhere.com
echo 2. 注册免费账户
echo 3. 上传项目文件
echo 4. 配置Web应用
echo.
echo 具体步骤请参考：https://docs.pythonanywhere.com/
pause
exit /b

:heroku_deployment
echo.
echo 🚀 开始Heroku部署...
echo.
echo 1. 访问 https://heroku.com
echo 2. 注册账户
echo 3. 安装Heroku CLI
echo 4. 创建应用
echo.
echo 具体步骤请参考：https://devcenter.heroku.com/articles/getting-started-with-nodejs
pause
exit /b