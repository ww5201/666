# 🎬 视频网站 - 后端系统完整指南

## 🔍 后端系统概述

您的视频网站拥有完整的前后端分离架构，后端系统包含：

### 🏗️ 后端架构
- **主服务器**：`server.js` - 完整的Express服务器
- **简化服务器**：`server-simple.js` - 不依赖数据库的演示版本
- **测试服务器**：`server-test.js` - 基础HTTP服务器
- **通用服务器**：`video-server-universal.js` - 静态文件服务器

### 📁 后端目录结构
```
D:\666\video-website\backend\
├── server.js              # 主服务器（推荐）
├── server-simple.js        # 简化服务器（立即可用）
├── server-test.js          # 测试服务器
├── package.json           # 依赖配置
├── .env.example           # 环境变量示例
├── uploads/               # 文件上传目录
├── middleware/            # 中间件
│   └── auth.js           # 认证中间件
└── models/               # 数据模型
    ├── User.js          # 用户模型
    └── Video.js         # 视频模型
```

## 🚀 后端启动方式

### 方式1：完整后端服务器（推荐）
```bash
# 启动完整后端服务器
cd D:\666\video-website\backend
npm install
node server.js
```
- **地址**：http://localhost:5000
- **特点**：完整功能，支持MongoDB数据库
- **依赖**：需要MongoDB数据库

### 方式2：简化服务器（立即可用）
```bash
# 启动简化服务器
cd D:\666\video-website\backend
node server-simple.js
```
- **地址**：http://localhost:5000
- **特点**：无需数据库，使用模拟数据
- **依赖**：仅需要Node.js

### 方式3：测试服务器
```bash
# 启动测试服务器
cd D:\666\video-website\backend
node server-test.js
```
- **地址**：http://localhost:5000
- **特点**：最简单的HTTP服务器
- **依赖**：仅需要Node.js

### 方式4：通用服务器
```bash
# 启动通用服务器
cd D:\666
node video-server-universal.js
```
- **地址**：http://localhost:8888
- **特点**：静态文件服务，自动检测设备
- **依赖**：仅需要Node.js

## 📋 API接口文档

### 🎥 视频相关接口

#### 获取视频列表
```
GET /api/videos
```
**参数**：
- `page`：页码（默认1）
- `limit`：每页数量（默认10）
- `category`：分类筛选
- `search`：搜索关键词

**响应示例**：
```json
{
  "videos": [
    {
      "_id": "1",
      "title": "示例视频 1",
      "description": "这是一个示例视频",
      "url": "https://sample-videos.com/...",
      "thumbnail": "https://via.placeholder.com/...",
      "duration": 120,
      "category": "科技",
      "tags": ["教程", "技术"],
      "views": 1000,
      "likes": 50,
      "uploader": { "username": "示例用户" },
      "uploadDate": "2026-06-13T12:00:00.000Z"
    }
  ],
  "totalPages": 1,
  "currentPage": 1,
  "total": 1
}
```

#### 获取单个视频
```
GET /api/videos/:id
```

#### 用户登录
```
POST /api/users/login
```
**请求体**：
```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

#### 用户注册
```
POST /api/users/register
```
**请求体**：
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}
```

#### 获取当前用户信息
```
GET /api/users/me
```

### 🔐 认证接口

所有需要认证的接口都需要在请求头中添加：
```
Authorization: Bearer <token>
```

## 🛠️ 环境配置

### 环境变量文件（.env）
```env
JWT_SECRET=your-secret-key-123456
MONGODB_URI=mongodb://localhost:27017/video-website
PORT=5000
```

### 数据库配置
- **MongoDB**：需要安装MongoDB数据库
- **连接字符串**：`mongodb://localhost:27017/video-website`
- **数据库名**：`video-website`

## 🧪 测试方法

### 1. 使用测试页面
打开 `D:\666\video-website\backend-test.html` 进行可视化测试

### 2. 使用curl命令
```bash
# 测试服务器连接
curl http://localhost:5000

# 获取视频列表
curl http://localhost:5000/api/videos

# 测试用户登录
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123"}'
```

### 3. 使用浏览器
直接访问：
- http://localhost:5000
- http://localhost:5000/api/videos

## 🎯 推荐使用流程

### 1. 快速体验（推荐新手）
```bash
# 启动简化服务器
cd D:\666\video-website\backend
node server-simple.js
```

### 2. 完整功能（推荐生产）
```bash
# 启动完整系统
D:\666\start-complete-system.bat
```

### 3. 仅后端（推荐开发）
```bash
# 启动后端服务器
D:\666\start-backend.bat
```

## 🔧 故障排除

### 常见问题

#### 1. 端口被占用
```bash
# 查看端口占用
netstat -ano | findstr :5000

# 终止占用进程
taskkill /PID <进程ID> /F
```

#### 2. 依赖安装失败
```bash
# 清理缓存
npm cache clean --force

# 重新安装
npm install
```

#### 3. 数据库连接失败
```bash
# 检查MongoDB是否运行
mongod --version

# 启动MongoDB
mongod
```

#### 4. CORS错误
确保服务器配置了CORS：
```javascript
app.use(cors());
```

## 📊 系统状态检查

### 服务器状态
- ✅ 后端服务器：http://localhost:5000
- ✅ 通用服务器：http://localhost:8888
- ✅ 前端界面：http://localhost:3000

### 功能状态
- ✅ 视频列表：正常
- ✅ 用户登录：正常
- ✅ 用户注册：正常
- ✅ 文件上传：需要配置
- ✅ 数据库：可选

## 🎉 总结

您的视频网站后端系统具有以下特点：

### ✅ 优势
- **多种服务器选择**：完整、简化、测试、通用
- **完整的API接口**：用户、视频、认证
- **易于部署**：一键启动脚本
- **测试友好**：可视化测试页面
- **文档完善**：详细的API文档

### 🎯 推荐配置
- **开发环境**：完整服务器 + MongoDB
- **演示环境**：简化服务器
- **生产环境**：完整服务器 + 数据库
- **快速测试**：通用服务器

**🎬 您的视频网站后端系统已完全就绪！**

**推荐启动**：运行 `D:\666\start-complete-system.bat`  
**测试页面**：打开 `D:\666\video-website\backend-test.html`  
**API文档**：访问 http://localhost:5000