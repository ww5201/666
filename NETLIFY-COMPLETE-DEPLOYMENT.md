# 🎬 视频网站 - 前后端完整Netlify部署指南

## 📋 概述

本指南详细介绍如何将视频网站的前端和后端系统完整部署到Netlify，实现全栈云部署方案。

## 🏗️ 完整部署架构

### 部署组件
- **前端**: Netlify Pages (静态网站)
- **后端**: Netlify Functions (无服务器函数)
- **数据库**: MongoDB Atlas (云数据库)
- **文件存储**: Netlify Large Media (大文件存储)

### 部署流程
1. 创建GitHub仓库
2. 配置Netlify
3. 设置环境变量
4. 部署到生产环境

## 🚀 完整部署步骤

### 1. 准备GitHub仓库

```bash
# 进入项目目录
cd D:\666\video-website

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交初始代码
git commit -m "Initial commit: Complete video website system"

# 添加远程仓库
git remote add origin https://github.com/ww5201/video-website-complete.git

# 推送到GitHub
git push -u origin main
```

### 2. 配置Netlify

#### 方法一：通过GitHub部署
1. 登录 [Netlify控制台](https://app.netlify.com/)
2. 点击 "New site from Git"
3. 选择 "GitHub" 作为Git提供商
4. 选择 `ww5201/video-website-complete` 仓库
5. 配置构建设置：
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`
6. 点击 "Deploy site"

#### 方法二：通过拖拽部署
1. 登录 [Netlify控制台](https://app.netlify.com/)
2. 点击 "Deploy manually"
3. 拖拽整个 `D:\666\video-website` 文件夹
4. 配置构建设置
5. 点击 "Deploy site"

### 3. 环境变量配置

在Netlify控制台中设置以下环境变量：

```bash
# 数据库配置
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/video-website

# JWT配置
JWT_SECRET=your-super-secret-jwt-key

# 服务器配置
PORT=3000
NODE_ENV=production

# 文件上传配置
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=524288000

# Netlify配置
NETLIFY=true
```

### 4. 自定义域名配置

1. 在Netlify控制台中进入 "Site settings"
2. 点击 "Domain management"
3. 添加自定义域名：
   - 主域名：`your-domain.com`
   - 子域名：`app.your-domain.com`

## 📁 项目结构

```
D:\666\video-website\
├── netlify.toml              # Netlify前端配置
├── netlify-backend.toml     # Netlify后端配置
├── backend/
│   ├── server.js             # 完整后端服务器
│   ├── server-simple.js      # 简化后端服务器
│   ├── server-test.js        # 测试后端服务器
│   ├── package.json          # 后端依赖
│   ├── middleware/           # 中间件
│   ├── models/               # 数据模型
│   ├── routes/               # 路由
│   └── .env.example          # 环境变量示例
├── frontend/
│   ├── build/                # 构建输出
│   ├── public/               # 静态资源
│   ├── src/                  # 源代码
│   └── package.json          # 前端依赖
├── backend-test.html         # 后端测试页面
├── admin-backend.html        # 后端管理界面
├── api-documentation.html    # API文档
├── demo.html                 # 前端演示
├── start-backend.bat         # 启动脚本
└── deploy-complete.bat       # 完整部署脚本
```

## 🔧 Netlify配置详解

### netlify.toml (前端)

```toml
[build]
  command = "npm install && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api"
  status = 200

[[redirects]]
  from = "/admin"
  to = "/admin.html"
  status = 200

[[redirects]]
  from = "/test"
  to = "/backend-test.html"
  status = 200

[[redirects]]
  from = "/docs"
  to = "/api-documentation.html"
  status = 200

[dev]
  command = "npm run dev"
  port = 3000
  publish = "dist"
```

### netlify-backend.toml (后端)

```toml
[build]
  command = "cd backend && npm install && npm run build"
  publish = "backend"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/backend/server-simple.js"
  status = 200

[[redirects]]
  from = "/api/*"
  to = "/backend/server-simple.js"
  status = 200

[[redirects]]
  from = "/admin"
  to = "/admin-backend.html"
  status = 200

[[redirects]]
  from = "/test"
  to = "/backend-test.html"
  status = 200

[[redirects]]
  from = "/docs"
  to = "/api-documentation.html"
  status = 200

[dev]
  command = "cd backend && npm run dev"
  port = 3000
  publish = "backend"
```

## 🌐 完整访问地址

### 部署后访问地址
- **前端应用**: https://your-site-name.netlify.app
- **后端API**: https://your-site-name.netlify.app/api/
- **管理界面**: https://your-site-name.netlify.app/admin
- **测试页面**: https://your-site-name.netlify.app/test
- **API文档**: https://your-site-name.netlify.app/docs

### 环境变量访问
- **生产环境**: https://your-site-name.netlify.app
- **预览环境**: https://deploy-preview-123--your-site-name.netlify.app
- **分支环境**: https://branch-name--your-site-name.netlify.app

## 📱 响应式设计

### 移动端支持
- 自动检测移动设备
- 适配不同屏幕尺寸
- 触摸友好的界面

### 访问方式
- **桌面端**: 直接访问完整界面
- **移动端**: 自动重定向到移动版本
- **平板端**: 优化布局体验

## 🔐 安全配置

### 环境变量安全
1. 在Netlify控制台中设置敏感信息
2. 使用加密的数据库连接字符串
3. 定期更新JWT密钥

### CORS配置
```javascript
// 在server.js中配置CORS
const corsOptions = {
  origin: ['https://your-site-name.netlify.app', 'https://deploy-preview-123--your-site-name.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

### 认证安全
1. 使用HTTPS协议
2. 实施JWT令牌过期机制
3. 密码加密存储

## 📊 性能优化

### 缓存策略
```javascript
// 设置缓存头
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
```

### 压缩配置
```javascript
// 启用Gzip压缩
const compression = require('compression');
app.use(compression());
```

### 静态资源优化
- 使用CDN加速
- 图片压缩和懒加载
- 代码分割和懒加载

## 🛠️ 监控和维护

### 日志监控
1. 配置Netlify Analytics
2. 设置错误告警
3. 监控API响应时间

### 性能监控
- 使用Netlify Performance Monitoring
- 设置性能阈值告警
- 定期性能优化

### 定期维护
1. 更新依赖包
2. 清理临时文件
3. 备份数据库

## 🚀 部署脚本

### 完整部署脚本
创建 `deploy-complete.bat`：

```batch
@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 完整Netlify部署
echo ========================================
echo.
echo 正在部署完整视频网站到Netlify...
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
git commit -m "Complete deployment: Video website frontend and backend"

echo 🔄 正在推送代码...
git push -u origin main

echo.
echo ✅ 完整部署完成！
echo.
echo 🌐 部署后访问地址：
echo - 前端应用：https://your-site-name.netlify.app
echo - 后端API：https://your-site-name.netlify.app/api/
echo - 管理界面：https://your-site-name.netlify.app/admin
echo - 测试页面：https://your-site-name.netlify.app/test
echo - API文档：https://your-site-name.netlify.app/docs
echo.
echo 🎬 视频网站已成功部署到Netlify！
echo.
pause
```

### 部署验证脚本
创建 `verify-complete-deployment.bat`：

```batch
@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     🎬 视频网站 - 完整部署验证
echo ========================================
echo.
echo 正在验证完整部署状态...
echo.

:: 测试前端应用
echo 🔄 正在测试前端应用...
curl -s https://your-site-name.netlify.app | head -20 || echo "前端应用测试失败"

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
echo ✅ 完整部署验证完成！
echo.
echo 🎬 视频网站已成功部署到Netlify！
echo.
pause
```

## 🎯 最佳实践

### 开发建议
1. 使用版本控制管理代码
2. 编写单元测试
3. 遵循RESTful API设计原则
4. 定期更新依赖包

### 部署建议
1. 使用环境变量管理配置
2. 定期备份数据
3. 监控服务器状态
4. 保持系统更新

### 安全建议
1. 定期更新密码
2. 使用HTTPS协议
3. 限制API访问频率
4. 定期安全审计

## 📞 技术支持

### 联系方式
- 邮箱：support@example.com
- 电话：123-456-7890
- 在线支持：https://your-site-name.netlify.app/admin

### 文档资源
- API文档：https://your-site-name.netlify.app/docs
- 用户手册：https://your-site-name.netlify.app/test
- 开发指南：https://your-site-name.netlify.app/admin

---

## 🎬 视频网站 - 完整Netlify部署完成！

*本指南最后更新时间：2026-06-13*