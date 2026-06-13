const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    // 设置CORS头
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

    const url = req.url;
    const filePath = path.join(__dirname, 'video-website', url === '/' ? 'demo.html' : url);

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
        res.writeHead(404);
        res.end('页面不存在');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🎬 视频网站服务器已启动！`);
    console.log(`访问地址: http://localhost:${PORT}`);
    console.log(`按 Ctrl+C 停止服务器`);
});

process.on('SIGINT', () => {
    console.log('\n服务器已停止');
    process.exit(0);
});