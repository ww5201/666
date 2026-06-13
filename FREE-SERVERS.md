# 🎬 视频网站 - 免费服务器部署指南

## 🌟 推荐的免费服务器方案

### 1. **GitHub Pages + Netlify** ⭐⭐⭐⭐⭐
**最适合静态网站**
- ✅ 完全免费
- ✅ 全球CDN加速
- ✅ 自动HTTPS
- ✅ 无需维护服务器
- ✅ 自动部署

**部署步骤：**
1. 创建GitHub仓库
2. 推送代码到GitHub
3. 访问 https://netlify.com
4. 点击 "New site from Git"
5. 连接GitHub仓库
6. 配置自动部署
7. 获得免费域名

### 2. **Vercel** ⭐⭐⭐⭐⭐
**最适合React应用**
- ✅ 免费部署
- ✅ 全球CDN
- ✅ 自动HTTPS
- ✅ 支持React/Vue等框架
- ✅ 边缘计算

**部署步骤：**
1. 访问 https://vercel.com
2. 点击 "New Project"
3. 连接GitHub仓库
4. 选择项目并部署
5. 获得免费域名

### 3. **Glitch** ⭐⭐⭐⭐
**最适合在线开发**
- ✅ 在线代码编辑器
- ✅ 免费运行Node.js项目
- ✅ 实时预览
- ✅ 社区功能

**部署步骤：**
1. 访问 https://glitch.com
2. 点击 "New Project"
3. 选择 "Import from GitHub"
4. 连接您的仓库
5. 自动部署并运行

### 4. **Render** ⭐⭐⭐⭐
**最适合Node.js应用**
- ✅ 免费托管
- ✅ 自动部署
- ✅ 支持数据库
- ✅ 全球访问

**部署步骤：**
1. 访问 https://render.com
2. 注册账户
3. 点击 "New + Web Service"
4. 连接GitHub仓库
5. 配置部署

### 5. **PythonAnywhere** ⭐⭐⭐
**最适合Python项目**
- ✅ 免费Python托管
- ✅ 无需服务器维护
- ✅ 支持Flask/Django
- ✅ 欧洲服务器

**部署步骤：**
1. 访问 https://www.pythonanywhere.com
2. 注册免费账户
3. 上传项目文件
4. 配置Web应用

### 6. **Heroku** ⭐⭐⭐
**最适合企业级应用**
- ✅ 免费托管
- ✅ 自动扩展
- ✅ 支持多种语言
- ✅ 丰富的插件生态

**注意：需要信用卡验证**

## 🚀 快速开始

### 最简单的方式：GitHub Pages + Netlify
1. **创建GitHub仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/video-website.git
   git push -u origin main
   ```

2. **连接到Netlify**
   - 访问 https://netlify.com
   - 点击 "New site from Git"
   - 连接GitHub仓库
   - 配置构建命令：`npm run build`（如果需要）
   - 配置发布目录：`dist`（如果需要）
   - 点击 "Deploy site"

3. **获得免费域名**
   - Netlify会自动分配一个随机域名
   - 也可以绑定自定义域名

### 最快速的方式：Vercel
1. **安装Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **部署项目**
   ```bash
   cd D:\666\video-website
   vercel
   ```

3. **按照提示完成部署**

## 📋 部署前准备

### 1. 创建package.json（如果还没有）
```json
{
  "name": "video-website",
  "version": "1.0.0",
  "description": "类似腾讯视频、哔哩哔哩的视频平台",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### 2. 创建简单的服务器文件
```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('video-website'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'video-website', 'demo.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. 安装依赖
```bash
cd D:\666\video-website
npm init -y
npm install express
```

## 🌐 部署后的访问地址

- **GitHub Pages**: https://yourusername.github.io/video-website
- **Netlify**: https://random-name.netlify.app
- **Vercel**: https://your-project.vercel.app
- **Glitch**: https://your-project.glitch.me

## 💡 建议

1. **新手推荐**：GitHub Pages + Netlify
2. **React项目**：Vercel
3. **在线开发**：Glitch
4. **Node.js应用**：Render
5. **Python项目**：PythonAnywhere

## 🔧 故障排除

### 常见问题：
1. **部署失败**：检查package.json和依赖
2. **页面空白**：检查文件路径
3. **样式丢失**：检查CSS文件路径
4. **图片不显示**：检查图片路径和权限

### 解决方案：
1. 确保所有文件都在正确的目录
2. 检查package.json的scripts配置
3. 确保所有依赖都已安装
4. 检查环境变量配置

---

**选择最适合您需求的方案，开始您的免费服务器之旅！** 🚀