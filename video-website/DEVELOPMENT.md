# 视频网站项目启动指南

## 🚀 快速开始

### 1. 安装依赖

#### 前端依赖
```bash
cd frontend
npm install
```

#### 后端依赖
```bash
cd backend
npm install
```

### 2. 配置环境变量

复制环境变量模板文件：
```bash
cd backend
cp .env.example .env
```

编辑 `.env` 文件，配置数据库连接等信息：
```env
MONGODB_URI=mongodb://localhost:27017/video-website
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

### 3. 启动项目

#### 启动后端服务器
```bash
cd backend
npm run dev
```

#### 启动前端开发服务器
```bash
cd frontend
npm start
```

### 4. 访问应用

- 前端地址：http://localhost:3000
- 后端API地址：http://localhost:5000

## 📋 功能特性

### 已实现功能
- ✅ 用户注册和登录
- ✅ 视频上传
- ✅ 视频播放
- ✅ 视频搜索和分类
- ✅ 用户个人中心
- ✅ 收藏功能
- ✅ 点赞功能
- ✅ 响应式设计

### 技术栈
- **前端**: React 18, Ant Design, Video.js
- **后端**: Node.js, Express, MongoDB
- **文件上传**: Multer
- **认证**: JWT
- **视频处理**: FFmpeg

## 🛠️ 开发指南

### 项目结构
```
video-website/
├── frontend/                 # React 前端应用
│   ├── public/              # 静态资源
│   ├── src/
│   │   ├── components/      # React 组件
│   │   ├── pages/           # 页面组件
│   │   ├── services/        # API 服务
│   │   └── App.js          # 主应用组件
│   └── package.json
├── backend/                 # Node.js 后端应用
│   ├── models/              # 数据模型
│   ├── routes/              # 路由
│   ├── middleware/          # 中间件
│   ├── uploads/             # 文件上传目录
│   ├── server.js           # 服务器入口
│   └── package.json
└── README.md
```

### API 接口

#### 用户相关
- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/me` - 获取当前用户信息
- `PUT /api/users/profile` - 更新用户信息
- `PUT /api/users/password` - 修改密码

#### 视频相关
- `GET /api/videos` - 获取视频列表
- `GET /api/videos/:id` - 获取单个视频
- `POST /api/videos` - 上传视频
- `PUT /api/videos/:id` - 更新视频
- `DELETE /api/videos/:id` - 删除视频
- `POST /api/videos/:id/like` - 点赞视频
- `POST /api/videos/:id/unlike` - 取消点赞

### 数据库设计

#### 用户表 (users)
- username: 用户名
- email: 邮箱
- password: 密码（加密存储）
- avatar: 头像URL
- bio: 个人简介
- favorites: 收藏列表
- watchHistory: 观看历史
- role: 用户角色

#### 视频表 (videos)
- title: 视频标题
- description: 视频描述
- url: 视频URL
- thumbnail: 缩略图URL
- duration: 视频时长
- category: 视频分类
- tags: 标签
- views: 观看次数
- likes: 点赞数
- uploader: 上传者ID
- uploadDate: 上传时间
- status: 视频状态

## 📚 学习资源

### React 学习
- [React 官方文档](https://react.dev/)
- [Ant Design 组件库](https://ant.design/)
- [React Router](https://reactrouter.com/)

### Node.js 学习
- [Node.js 官方文档](https://nodejs.org/)
- [Express 框架](https://expressjs.com/)
- [MongoDB 官方文档](https://www.mongodb.com/)

### 视频处理
- [FFmpeg 官方文档](https://ffmpeg.org/)
- [Multer 文件上传](https://github.com/expressjs/multer)

## 🚨 注意事项

1. **安全性**: 
   - 密码使用 bcrypt 加密存储
   - JWT token 用于身份认证
   - 文件上传类型和大小限制

2. **性能优化**:
   - 视频文件建议使用 CDN 存储
   - 数据库索引优化查询性能
   - 前端组件懒加载

3. **部署建议**:
   - 使用 Docker 容器化部署
   - 前端部署到 Vercel
   - 后端部署到 Railway 或 AWS
   - 数据库使用 MongoDB Atlas

## 🎯 下一步计划

1. **视频处理功能**
   - 视频自动转码
   - 缩略图生成
   - 视频时长自动获取

2. **高级功能**
   - 视频评论系统
   - 用户关注功能
   - 视频推荐算法

3. **性能优化**
   - 视频流式播放
   - 缓存优化
   - CDN 集成

4. **移动端适配**
   - 响应式设计优化
   - PWA 支持
   - 移动端专用组件

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

1. Fork 本项目
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request

## 📄 许可证

MIT License