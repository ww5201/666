const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 模拟数据
const mockVideos = [
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
  },
  {
    _id: '2',
    title: '示例视频 2',
    description: '这是另一个示例视频',
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    thumbnail: 'https://via.placeholder.com/300x200?text=视频封面',
    duration: 180,
    category: '娱乐',
    tags: ['娱乐', '搞笑'],
    views: 2000,
    likes: 100,
    uploader: { username: '示例用户' },
    uploadDate: new Date().toISOString()
  }
];

const mockUsers = [
  {
    _id: '1',
    username: 'demo',
    email: 'demo@example.com',
    avatar: '',
    bio: '这是一个演示用户'
  }
];

// 路由
app.get('/', (req, res) => {
  res.json({ message: '视频网站 API 服务器运行中' });
});

// 获取视频列表
app.get('/api/videos', (req, res) => {
  const { page = 1, limit = 10, category, search } = req.query;
  let filteredVideos = mockVideos;

  if (category) {
    filteredVideos = filteredVideos.filter(video => video.category === category);
  }

  if (search) {
    filteredVideos = filteredVideos.filter(video => 
      video.title.toLowerCase().includes(search.toLowerCase()) ||
      video.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedVideos = filteredVideos.slice(startIndex, endIndex);

  res.json({
    videos: paginatedVideos,
    totalPages: Math.ceil(filteredVideos.length / limit),
    currentPage: parseInt(page),
    total: filteredVideos.length
  });
});

// 获取单个视频
app.get('/api/videos/:id', (req, res) => {
  const video = mockVideos.find(v => v._id === req.params.id);
  if (!video) {
    return res.status(404).json({ message: '视频未找到' });
  }
  
  // 增加观看次数
  video.views += 1;
  
  res.json(video);
});

// 用户登录
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    return res.status(400).json({ message: '邮箱或密码错误' });
  }

  // 模拟登录成功
  const token = 'demo-token-' + Date.now();
  res.json({
    message: '登录成功',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: 'user'
    }
  });
});

// 用户注册
app.post('/api/users/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // 检查用户是否已存在
  const existingUser = mockUsers.find(u => u.email === email || u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: '用户名或邮箱已存在' });
  }

  // 创建新用户
  const newUser = {
    _id: (mockUsers.length + 1).toString(),
    username,
    email,
    avatar: '',
    bio: ''
  };

  mockUsers.push(newUser);

  // 生成token
  const token = 'demo-token-' + Date.now();
  res.status(201).json({
    message: '注册成功',
    token,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      role: 'user'
    }
  });
});

// 获取当前用户信息
app.get('/api/users/me', (req, res) => {
  // 模拟用户信息
  const user = mockUsers[0];
  res.json(user);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`访问地址: http://localhost:${PORT}`);
  console.log(`API测试: http://localhost:${PORT}/api/videos`);
});