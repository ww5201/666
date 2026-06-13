@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     视频网站 - Docker 部署脚本
echo ========================================
echo.

cd /d D:\666\video-website

echo [1/3] 创建目录结构...
if not exist "frontend" mkdir frontend
if not exist "backend\uploads\videos" mkdir backend\uploads\videos
if not exist "backend\uploads\thumbnails" mkdir backend\uploads\thumbnails

echo [2/3] 复制前端文件...
copy /Y demo.html frontend\index.html >nul
copy /Y demo-mobile.html frontend\mobile.html >nul

echo [3/3] 启动 Docker 容器...
docker-compose up -d --build

echo.
echo ========================================
echo     部署完成！
echo ========================================
echo.
echo 访问地址：
echo   电脑版: http://你的服务器IP:83
echo   手机版: http://你的服务器IP:83/mobile.html
echo.
echo API 地址：
echo   http://你的服务器IP:83/api/videos
echo.
echo 如需修改端口，请编辑 docker-compose.yml
echo.
pause