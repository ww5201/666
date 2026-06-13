# 视频网站项目

一个完整的类似腾讯视频、哔哩哔哩的视频网站项目，使用 React + Node.js 构建。

## 🚀 快速开始

### 安装依赖
```bash
# 安装所有依赖
npm run install:all

# 或者分别安装
cd frontend && npm install
cd ../backend && npm install
```

### 启动项目
```bash
# 同时启动前端和后端
npm run dev

# 只启动前端
npm run dev:frontend

# 只启动后端
npm run dev:backend

# 启动简化版后端（无需MongoDB）
npm run dev:backend:simple

# 启动测试版后端
npm run dev:backend:test
```

### 访问地址
- **前端**: http://localhost:3000
- **后端API**: http://localhost:5000

## 📁 项目结构

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
│   ├── server-simple.js    # 简化版服务器（无需MongoDB）
│   ├── server-test.js      # 测试版服务器
│   └── package.json
├── uploads/                # 视频上传目录
├── .gitignore              # Git忽略文件
├── package.json           # 根目录包配置
└── README.md
```

## 🛠️ 技术栈

### 前端
- **React 18** - 现代化前端框架
- **Ant Design** - 企业级UI组件库
- **Video.js** - 专业视频播放器
- **React Router** - 路由管理
- **Axios** - HTTP客户端

### 后端
- **Node.js** - JavaScript运行环境
- **Express** - Web框架
- **MongoDB** - NoSQL数据库
- **JWT** - 身份认证
- **Multer** - 文件上传
- **FFmpeg** - 视频处理

## ✨ 功能特性

### 已实现功能
- ✅ 用户注册和登录
- ✅ 视频上传和播放
- ✅ 视频搜索和分类
- ✅ 用户个人中心
- ✅ 收藏功能
- ✅ 点赞功能
- ✅ 响应式设计

### 高级特性
- 🎨 **现代化UI** - 使用Ant Design组件库
- 🔐 **安全认证** - JWT token认证
- 📊 **数据统计** - 观看次数、点赞数等
- 🏷️ **标签系统** - 视频标签管理
- ⏱️ **时长显示** - 视频时长格式化

## 📋 API 接口

### 用户相关
- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/me` - 获取当前用户信息
- `PUT /api/users/profile` - 更新用户信息
- `PUT /api/users/password` - 修改密码

### 视频相关
- `GET /api/videos` - 获取视频列表
- `GET /api/videos/:id` - 获取单个视频
- `POST /api/videos` - 上传视频
- `PUT /api/videos/:id` - 更新视频
- `DELETE /api/videos/:id` - 删除视频
- `POST /api/videos/:id/like` - 点赞视频
- `POST /api/videos/:id/unlike` - 取消点赞

## 🚀 开发指南

### 1. 环境配置
```bash
# 复制环境变量模板
cp backend/.env.example backend/.env

# 编辑 .env 文件
```

### 2. 数据库设置
```bash
# 启动MongoDB
mongod --dbpath /path/to/data

# 或者使用简化版服务器（无需MongoDB）
npm run dev:backend:simple
```

### 3. 开发流程
```bash
# 安装依赖
npm run install:all

# 启动开发服务器
npm run dev

# 测试API
curl http://localhost:5000/api/videos
```

## 📚 学习资源

### 推荐学习网站
- **React官方文档**: https://react.dev/
- **Ant Design**: https://ant.design/
- **Node.js文档**: https://nodejs.org/
- **MongoDB文档**: https://www.mongodb.com/
- **FFmpeg文档**: https://ffmpeg.org/

### 视频教程推荐
- B站React教程
- 慕课网Node.js课程
- MongoDB大学课程

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

## 🚨 注意事项

### 安全性
- 密码使用bcrypt加密
- JWT token认证
- 文件上传类型和大小限制

### 性能优化
- 视频文件使用CDN存储
- 数据库索引优化查询性能
- 前端组件懒加载

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

1. Fork 本项目
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 技术支持

如果您在开发过程中遇到问题，可以：
1. 查看项目文档
2. 搜索相关技术文档
3. 提交Issue反馈问题
4. 参考相关教程视频

---

**项目地址**: https://github.com/ww5201/666
**作者**: Your Name
**创建时间**: 2026-06-13