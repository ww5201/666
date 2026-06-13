# 🎬 视频网站 - 后端系统完整指南

## 📖 简介

本指南详细介绍视频网站的后端系统，包括服务器启动、API接口、管理界面和测试工具。

## 🏗️ 系统架构

### 服务器组件

1. **后端服务器** (`server-simple.js`)
   - 端口：5000
   - 功能：完整的API接口，用户认证，视频管理
   - 数据库：MongoDB（可选，使用模拟数据）

2. **通用服务器** (`video-server-universal.js`)
   - 端口：8888
   - 功能：静态文件服务，前端页面托管
   - 特性：自动检测移动设备，响应式设计

3. **测试服务器** (`server-test.js`)
   - 端口：5000
   - 功能：基础HTTP服务器，API测试

### 管理界面

1. **后端管理界面** (`admin-backend.html`)
   - 服务器状态监控
   - API接口测试
   - 用户和视频管理
   - 系统日志查看

2. **API测试页面** (`backend-test.html`)
   - 完整的API测试工具
   - 自定义API测试
   - 批量测试功能
   - 实时响应监控

3. **API文档** (`api-documentation.html`)
   - 完整的API文档
   - 接口说明和示例
   - 参数说明
   - 响应格式

## 🚀 快速启动

### 方法一：使用启动脚本

```bash
# 启动完整后端系统
D:\666\start-backend.bat

# 启动测试界面
D:\666\start-backend-test.bat

# 启动管理界面
D:\666\start-admin-backend.bat
```

### 方法二：手动启动

```bash
# 启动后端服务器
cd D:\666\video-website\backend
node server-simple.js

# 启动通用服务器
cd D:\666
node video-server-universal.js

# 访问管理界面
open http://localhost:8888/admin-backend.html
```

## 🔧 API接口

### 视频相关接口

#### 获取视频列表
```http
GET /api/videos
```

**参数：**
- `page`: 页码（默认1）
- `limit`: 每页数量（默认10）
- `category`: 分类筛选
- `search`: 搜索关键词

**响应示例：**
```json
{
  "videos": [
    {
      "_id": "1",
      "title": "示例视频 1",
      "description": "这是一个示例视频",
      "url": "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      "thumbnail": "https://via.placeholder.com/300x200?text=视频封面",
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
```http
GET /api/videos/:id
```

#### 上传视频
```http
POST /api/videos
```
需要认证，支持文件上传

### 用户相关接口

#### 用户注册
```http
POST /api/users/register
```

**请求体：**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}
```

#### 用户登录
```http
POST /api/users/login
```

**请求体：**
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

**响应示例：**
```json
{
  "message": "登录成功",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec9f9b1d8c001f8e4a7b",
    "username": "testuser",
    "email": "test@example.com",
    "avatar": "",
    "role": "user"
  }
}
```

#### 获取用户信息
```http
GET /api/users/me
```
需要认证

### 管理员接口

#### 获取所有用户
```http
GET /api/admin/users
```
需要管理员权限

#### 删除用户
```http
DELETE /api/admin/users/:id
```
需要管理员权限

## 🎮 管理界面功能

### 服务器状态监控
- 实时显示服务器运行状态
- 检测数据库连接状态
- 监控系统资源使用情况

### API接口测试
- 一键测试所有API接口
- 自定义API测试
- 批量测试功能
- 实时响应显示

### 用户管理
- 查看用户列表
- 用户状态管理
- 用户权限设置

### 视频管理
- 视频审核功能
- 视频删除操作
- 视频分类管理

## 📱 移动端支持

### 响应式设计
- 自动检测移动设备
- 适配不同屏幕尺寸
- 触摸友好的界面

### 移动端访问
- 手机版：`http://localhost:8888`
- 自动重定向到移动版本
- 优化的移动端体验

## 🔐 安全特性

### 认证系统
- JWT令牌认证
- 密码加密存储
- 会话管理

### 权限控制
- 基于角色的访问控制
- API接口权限验证
- 用户状态管理

### 数据安全
- 输入验证
- SQL注入防护
- XSS攻击防护

## 🛠️ 开发工具

### 调试功能
- 实时日志查看
- 错误信息显示
- 性能监控

### 测试工具
- API接口测试
- 自定义测试用例
- 批量测试功能

### 部署工具
- 自动启动脚本
- 配置文件管理
- 环境变量设置

## 📊 性能优化

### 缓存策略
- 静态文件缓存
- API响应缓存
- 数据库查询优化

### 负载均衡
- 多服务器支持
- 负载分配
- 故障转移

### 资源管理
- 内存使用优化
- CPU使用监控
- 磁盘空间管理

## 🔍 故障排除

### 常见问题

1. **服务器启动失败**
   - 检查Node.js是否安装
   - 检查端口是否被占用
   - 检查配置文件是否正确

2. **API接口无法访问**
   - 检查服务器是否运行
   - 检查网络连接
   - 检查防火墙设置

3. **数据库连接失败**
   - 检查MongoDB是否运行
   - 检查连接字符串是否正确
   - 检查权限设置

### 日志查看

```bash
# 查看服务器日志
tail -f logs/server.log

# 查看错误日志
tail -f logs/error.log

# 查看访问日志
tail -f logs/access.log
```

## 📈 监控和维护

### 性能监控
- 服务器响应时间
- 数据库查询性能
- 内存使用情况
- CPU使用率

### 定期维护
- 数据库备份
- 日志清理
- 系统更新
- 安全检查

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
- 在线支持：http://localhost:8888/admin-backend.html

### 文档资源
- API文档：`http://localhost:8888/api-documentation.html`
- 用户手册：`http://localhost:8888/backend-test.html`
- 开发指南：`http://localhost:8888/admin-backend.html`

---

## 🎬 视频网站 - 让您的网站在线运行！

*本指南最后更新时间：2026-06-13*