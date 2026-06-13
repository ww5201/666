# 视频网站 - Docker 部署指南

## 架构

```
┌─────────────────────────────────────────┐
│              Nginx (端口 83)              │
│         前端静态文件 + API 反向代理        │
└─────────────┬───────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼───┐         ┌────▼────┐
│ 前端  │         │ Node.js │
│ HTML  │         │ (3001)  │
└───────┘         └────┬────┘
                       │
                 ┌─────▼─────┐
                 │  MongoDB  │
                 │  (27017)  │
                 └───────────┘
```

## 快速部署

### 1. 安装 Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# CentOS
yum install -y docker docker-compose
systemctl start docker
systemctl enable docker
```

### 2. 上传项目文件

将整个 `video-website` 目录上传到服务器

### 3. 启动服务

```bash
cd video-website
docker-compose up -d
```

### 4. 访问

- 电脑版: `http://你的IP:83`
- 手机版: `http://你的IP:83/mobile.html`
- API: `http://你的IP:83/api/videos`

## 配置说明

### 修改端口

编辑 `docker-compose.yml`：

```yaml
video-nginx:
  ports:
    - "80:80"    # 改成 80 端口
```

### Nginx 反向代理（不占用额外端口）

如果你想用现有的 Nginx（80端口），添加配置：

```nginx
# /etc/nginx/conf.d/video.conf
server {
    listen 80;
    server_name video.yourdomain.com;  # 或你的IP

    client_max_body_size 500M;

    location / {
        proxy_pass http://127.0.0.1:83;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:83/api/;
        proxy_read_timeout 300s;
    }
}
```

然后访问：`http://video.yourdomain.com`

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/videos | 获取视频列表 |
| GET | /api/videos/:id | 获取单个视频 |
| POST | /api/videos | 上传视频 |
| POST | /api/videos/:id/like | 点赞 |
| DELETE | /api/videos/:id | 删除视频 |
| GET | /api/stats | 统计信息 |

## 数据存储

- 视频文件: `backend/uploads/videos/`
- 缩略图: `backend/uploads/thumbnails/`
- 数据库: MongoDB Docker 卷

## 备份

```bash
# 备份数据库
docker exec video-mongo mongodump --out /backup

# 备份视频文件
tar -czf videos-backup.tar.gz backend/uploads/
```
