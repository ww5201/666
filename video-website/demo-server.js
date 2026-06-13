const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // 处理静态文件
    if (req.url === '/' || req.url === '/index.html') {
        serveFile(res, path.join(__dirname, 'demo.html'), 'text/html');
    } else if (req.url.startsWith('/api/')) {
        handleAPI(req, res);
    } else {
        serveFile(res, path.join(__dirname, req.url), getContentType(req.url));
    }
});

function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - 页面未找到</h1><p><a href="/">返回首页</a></p>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon'
    };
    return contentTypes[ext] || 'application/octet-stream';
}

function handleAPI(req, res) {
    if (req.url === '/api/videos' && req.method === 'GET') {
        const mockVideos = [
            {
                id: 1,
                title: "JavaScript 高级教程",
                description: "深入理解JavaScript的高级特性和最佳实践",
                category: "科技",
                duration: 1200,
                views: 15420,
                likes: 892,
                thumbnail: "https://via.placeholder.com/300x200?text=JS教程"
            },
            {
                id: 2,
                title: "React 项目实战",
                description: "从零开始构建一个完整的React应用",
                category: "教育",
                duration: 1800,
                views: 23150,
                likes: 1203,
                thumbnail: "https://via.placeholder.com/300x200?text=React实战"
            },
            {
                id: 3,
                title: "Node.js 后端开发",
                description: "使用Node.js和Express构建RESTful API",
                category: "科技",
                duration: 2400,
                views: 18970,
                likes: 956,
                thumbnail: "https://via.placeholder.com/300x200?text=Node.js"
            },
            {
                id: 4,
                title: "CSS 动画设计",
                description: "创建令人惊艳的CSS动画效果",
                category: "教育",
                duration: 900,
                views: 12430,
                likes: 678,
                thumbnail: "https://via.placeholder.com/300x200?text=CSS动画"
            },
            {
                id: 5,
                title: "Vue.js 入门指南",
                description: "Vue.js框架的完整入门教程",
                category: "教育",
                duration: 1500,
                views: 19860,
                likes: 1102,
                thumbnail: "https://via.placeholder.com/300x200?text=Vue.js"
            },
            {
                id: 6,
                title: "Python 数据分析",
                description: "使用Python进行数据分析和可视化",
                category: "科技",
                duration: 2100,
                views: 16780,
                likes: 845,
                thumbnail: "https://via.placeholder.com/300x200?text=Python数据分析"
            }
        ];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ videos: mockVideos, total: mockVideos.length }));
    } else if (req.url === '/api/categories' && req.method === 'GET') {
        const categories = ['科技', '娱乐', '教育', '音乐', '游戏', '体育'];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ categories }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '接口未找到' }));
    }
}

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`🚀 演示服务器运行在端口 ${PORT}`);
    console.log(`📱 访问地址: http://localhost:${PORT}`);
    console.log(`🎬 演示页面: http://localhost:${PORT}/demo.html`);
    console.log(`📡 API测试: http://localhost:${PORT}/api/videos`);
    console.log(`\n💡 这是一个纯前端的演示版本，无需安装依赖，直接打开即可使用！`);
});