const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Video = require('../models/Video');
const auth = require('../middleware/auth');

const router = express.Router();

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB 限制
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('不支持的文件类型'));
    }
  }
});

// 获取所有视频
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (search) {
      query.$text = { $search: search };
    }
    
    const videos = await Video.find(query)
      .populate('uploader', 'username avatar')
      .sort({ uploadDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Video.countDocuments(query);
    
    res.json({
      videos,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个视频
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('uploader', 'username avatar bio');
    
    if (!video) {
      return res.status(404).json({ message: '视频未找到' });
    }
    
    // 增加观看次数
    video.views += 1;
    await video.save();
    
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 上传视频
router.post('/', auth, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '请选择视频文件' });
    }
    
    const { title, description, category, tags } = req.body;
    
    const video = new Video({
      title,
      description,
      url: `/uploads/${req.file.filename}`,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      uploader: req.user.id,
      duration: 0 // TODO: 使用FFmpeg获取实际时长
    });
    
    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新视频
router.put('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: '视频未找到' });
    }
    
    if (video.uploader.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权限修改此视频' });
    }
    
    const { title, description, category, tags } = req.body;
    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.tags = tags ? tags.split(',').map(tag => tag.trim()) : video.tags;
    
    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 删除视频
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: '视频未找到' });
    }
    
    if (video.uploader.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权限删除此视频' });
    }
    
    // 删除物理文件
    const filePath = path.join(__dirname, '../uploads', path.basename(video.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: '视频删除成功' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 点赞视频
router.post('/:id/like', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: '视频未找到' });
    }
    
    video.likes += 1;
    await video.save();
    
    res.json({ likes: video.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 取消点赞
router.post('/:id/unlike', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: '视频未找到' });
    }
    
    video.likes = Math.max(0, video.likes - 1);
    await video.save();
    
    res.json({ likes: video.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;