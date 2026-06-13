const http = require('http');

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
  
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: '服务器运行正常', timestamp: new Date().toISOString() }));
  } else if (req.url === '/api/videos' && req.method === 'GET') {
    const videos = [
      {
        _id: '1',
        title: '示例视频 1',
        description: '这是一个示例视频',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://via.placeholder.com/300x200?text=视频封面',
        duration: 120,
        category: '科技',
        tags: ['教程', '技术'],
        views: 1000,
        likes: 50,
        uploader: { username: '示例用户' },
        uploadDate: new Date().toISOString()
      }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ videos, total: 1 }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: '接口未找到' }));
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`访问地址: http://localhost:${PORT}`);
  console.log(`API测试: http://localhost:${PORT}/api/videos`);
});