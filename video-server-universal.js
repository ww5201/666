const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;

// 使用绝对路径指向video-website目录
const WWW_DIR = 'D:\\666\\video-website';

const server = http.createServer((req, res) => {
    // 设置CORS头，允许跨域访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // 检测用户代理，自动选择合适的页面
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    // 根据设备类型选择页面
    let filePath;
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(WWW_DIR, isMobile ? 'demo-mobile.html' : 'demo.html');
    } else {
        // 移除URL中的前导斜杠
        const cleanUrl = req.url.startsWith('/') ? req.url.slice(1) : req.url;
        filePath = path.join(WWW_DIR, cleanUrl);
    }

    // 检查文件是否存在
    if (fs.existsSync(filePath)) {
        const extname = path.extname(filePath).toLowerCase();
        const contentType = {
            '.html': 'text/html; charset=utf-8',
            '.js': 'text/javascript; charset=utf-8',
            '.css': 'text/css; charset=utf-8',
            '.json': 'application/json; charset=utf-8',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.ico': 'image/x-icon'
        }[extname] || 'text/plain';

        // 设置响应头
        res.setHeader('Content-Type', contentType);
        
        // 读取文件并发送
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('服务器错误');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else {
        // 文件不存在时返回404
        res.writeHead(404);
        res.end('页面不存在: ' + filePath);
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🎬 视频网站服务器已启动！`);
    console.log(`📱 手机访问: http://localhost:${PORT}`);
    console.log(`💻 电脑访问: http://localhost:${PORT}`);
    console.log(`🌐 自动适配设备类型`);
    console.log(`按 Ctrl+C 停止服务器`);
});

process.on('SIGINT', () => {
    console.log('\n👋 服务器已停止');
    process.exit(0);
});