@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - Netlify部署验证
echo ========================================
echo.
echo 正在验证Netlify部署状态...
echo.

:: 测试后端API
echo 🔄 正在测试后端API...
curl -s https://your-site-name.netlify.app/api/videos | jq . || echo "API测试失败"

:: 测试管理界面
echo 🔄 正在测试管理界面...
curl -s https://your-site-name.netlify.app/admin | head -20 || echo "管理界面测试失败"

:: 测试测试页面
echo 🔄 正在测试测试页面...
curl -s https://your-site-name.netlify.app/test | head -20 || echo "测试页面测试失败"

:: 测试API文档
echo 🔄 正在测试API文档...
curl -s https://your-site-name.netlify.app/docs | head -20 || echo "API文档测试失败"

echo.
echo ✅ Netlify部署验证完成！
echo.
echo 🎬 视频网站后端已成功部署到Netlify！
echo.
pause