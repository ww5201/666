@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     视频网站 - Docker 部署脚本
echo ========================================
echo.

cd /d D:\666\video-website

echo [1/4] 创建目录结构...
if not exist "frontend" mkdir frontend
if not exist "backend\uploads\videos" mkdir backend\uploads\videos
if not exist "backend\uploads\thumbnails" mkdir backend\uploads\thumbnails

echo [2/4] 复制前端文件到 frontend 目录...
copy /Y demo.html frontend\index.html >nul
copy /Y demo-mobile.html frontend\mobile.html >nul
echo     - index.html (电脑版)
echo     - mobile.html (手机版)

echo [3/4] 检查 Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 Docker！请先安装 Docker
    echo 安装命令: curl -fsSL https://get.docker.com ^| sh
    pause
    exit /b 1
)

echo [4/4] 启动 Docker 容器...
docker-compose down >nul 2>&1
docker-compose up -d --build

echo.
echo ========================================
echo     部署完成！
echo ========================================
echo.
echo 访问地址：
echo   电脑版: http://8.138.218.146:83
echo   手机版: http://8.138.218.146:83/mobile.html
echo.
echo API 测试：
echo   http://8.138.218.146:83/api/videos
echo.
echo 查看日志: docker-compose logs -f
echo 停止服务: docker-compose down
echo.
pause