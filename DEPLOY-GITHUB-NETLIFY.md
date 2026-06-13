# 🎬 视频网站 - GitHub Pages + Netlify 详细部署指南

## 🌟 为什么选择 GitHub Pages + Netlify？

### 优势
- ✅ **完全免费**：无需支付任何费用
- ✅ **全球CDN**：访问速度快，用户体验好
- ✅ **自动HTTPS**：安全加密，无需配置
- ✅ **自动部署**：代码推送后自动更新
- ✅ **自定义域名**：支持绑定自己的域名
- ✅ **版本控制**：完整的Git历史记录
- ✅ **统计分析**：访问流量统计
- ✅ **回滚功能**：可以回退到之前的版本

### 适用场景
- 静态网站（HTML、CSS、JavaScript）
- React、Vue、Angular等前端框架
- 个人项目、作品集、博客
- 小型商业网站

## 🚀 完整部署步骤

### 步骤1：准备工作

#### 1.1 安装必要软件
```bash
# 安装Git
# 下载地址：https://git-scm.com/download/win

# 安装Node.js（如果还没有）
# 下载地址：https://nodejs.org/

# 验证安装
git --version
node --version
npm --version
```

#### 1.2 准备项目文件
确保您的视频网站文件结构如下：
```
D:\666\video-website\
├── demo.html              # 电脑版主页
├── demo-mobile.html       # 手机版主页
├── test.html              # 测试页面
├── README.md              # 项目说明
├── images/                # 图片目录
├── css/                   # CSS样式目录
└── js/                    # JavaScript脚本目录
```

### 步骤2：创建GitHub仓库

#### 2.1 注册/登录GitHub
- 访问：https://github.com
- 如果没有账户，点击 "Sign up" 注册
- 可以使用GitHub账户登录

#### 2.2 创建新仓库
1. 点击右上角的 "+" 号
2. 选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `video-website`（或其他名称）
   - **Description**: `类似腾讯视频、哔哩哔哩的视频平台演示版`
   - **Public**: 选择（免费）
   - **Private**: 不选择（免费方案需要公开仓库）
4. **不要**勾选以下选项：
   - "Add a README file"
   - "Add .gitignore"
   - "Add a license"
5. 点击 "Create repository"

#### 2.3 获取仓库地址
创建成功后，复制仓库地址：
```
https://github.com/yourname/video-website.git
```

### 步骤3：初始化Git仓库

#### 3.1 进入项目目录
```bash
cd D:\666\video-website
```

#### 3.2 初始化Git仓库
```bash
git init
```

#### 3.3 配置Git用户信息（如果还没有）
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 3.4 添加远程仓库
```bash
git remote add origin https://github.com/yourname/video-website.git
```

### 步骤4：提交和推送代码

#### 4.1 添加所有文件
```bash
git add .
```

#### 4.2 提交代码
```bash
git commit -m "Initial commit: Video website deployment"
```

#### 4.3 推送到GitHub
```bash
git push -u origin main
```

如果提示输入GitHub用户名和密码：
- 用户名：您的GitHub用户名
- 密码：您的GitHub密码（或者使用Personal Access Token）

### 步骤5：连接到Netlify

#### 5.1 注册Netlify账户
- 访问：https://netlify.com
- 点击 "Sign up" 
- 可以使用GitHub账户一键登录

#### 5.2 创建新站点
1. 登录后，点击 "New site from Git"
2. 选择 "GitHub"
3. 授权Netlify访问您的GitHub账户
4. 选择刚创建的仓库

#### 5.3 配置部署设置
- **Build command**: 留空（静态网站）
- **Publish directory**: 留空（根目录）
- 点击 "Deploy site"

#### 5.4 等待部署完成
- 部署通常需要1-3分钟
- 可以在Netlify控制台查看部署进度
- 部署成功后会显示绿色的"Live"状态

### 步骤6：获取访问地址

#### 6.1 获取Netlify域名
部署成功后，Netlify会自动分配一个随机域名：
```
https://random-name.netlify.app
```

#### 6.2 绑定自定义域名（可选）
1. 进入Netlify控制台
2. 选择您的项目
3. 点击 "Domain settings"
4. 点击 "Add custom domain"
5. 输入您的域名（如：yourdomain.com）
6. 配置DNS解析

## 🔧 高级配置

### 配置自定义域名
1. 在域名注册商处添加DNS记录：
   ```
   Type: A
   Name: @
   Value: 192.30.252.153 (Netlify IP)
   ```

2. 在Netlify中添加自定义域名

### 配置HTTPS
Netlify会自动为您的网站启用HTTPS，无需额外配置。

### 配置重定向
如果需要重定向规则，可以在 `_redirects` 文件中配置：
```
/*    /index.html   200
```

## 📋 部署后管理

### 查看网站状态
- Netlify控制台：https://app.netlify.com
- 可以查看访问统计、构建日志等

### 更新网站内容
```bash
# 修改文件
# 添加更改
git add .
git commit -m "Update content"
git push origin main
```

Netlify会自动检测到代码推送并重新部署。

### 回滚版本
如果新版本有问题，可以在Netlify控制台中回滚到之前的版本。

## 🎯 常见问题解决

### 问题1：部署失败
**可能原因**：
- 仓库为空
- 文件路径错误
- 依赖问题

**解决方案**：
1. 确保所有文件都在根目录
2. 检查文件权限
3. 查看Netlify构建日志

### 问题2：样式丢失
**可能原因**：
- CSS文件路径错误
- 相对路径问题

**解决方案**：
1. 使用绝对路径或CDN链接
2. 检查CSS文件引用路径

### 问题3：图片不显示
**可能原因**：
- 图片路径错误
- 图片权限问题

**解决方案**：
1. 将图片上传到GitHub或CDN
2. 使用正确的图片路径

### 问题4：访问速度慢
**可能原因**：
- CDN配置问题
- 大文件未优化

**解决方案**：
1. 压缩图片和CSS文件
2. 启用Gzip压缩
3. 使用CDN加速

## 🎉 部署成功！

恭喜！您的视频网站现在已经在线运行了！

### 访问地址
- **Netlify域名**：https://random-name.netlify.app
- **GitHub Pages**：https://yourname.github.io/video-website

### 功能确认
- ✅ 手机和电脑都能访问
- ✅ 响应式设计
- ✅ 用户注册/登录
- ✅ 视频浏览和搜索
- ✅ 视频上传（演示版）
- ✅ 个人中心

### 下一步
1. 分享给朋友测试
2. 添加更多内容
3. 绑定自定义域名
4. 添加统计分析

---

**您的视频网站现在已经在线运行了！🎬**