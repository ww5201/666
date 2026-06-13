const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// ==================== 配置 ====================
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/videodb';
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 500 * 1024 * 1024; // 500MB

// 确保上传目录存在
[UPLOAD_DIR, path.join(UPLOAD_DIR, 'videos'), path.join(UPLOAD_DIR, 'thumbnails')].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ==================== 中间件 ====================
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));

// ==================== 数据库 ====================
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: '其他' },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    duration: { type: Number, default: 0 },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

// ==================== 文件上传 ====================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = file.fieldname === 'thumbnail'
            ? path.join(UPLOAD_DIR, 'thumbnails')
            : path.join(UPLOAD_DIR, 'videos');
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + '-' + Math.random().toString(36).substr(2, 9) + ext;
        cb(null, name);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'video') {
            if (file.mimetype.startsWith('video/')) {
                cb(null, true);
            } else {
                cb(new Error('只允许上传视频文件'), false);
            }
        } else if (file.fieldname === 'thumbnail') {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('只允许上传图片文件'), false);
            }
        } else {
            cb(null, true);
        }
    }
});

// ==================== API 路由 ====================

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 获取视频列表
app.get('/api/videos', async (req, res) => {
    try {
        const { category, search, page = 1, limit = 50 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const total = await Video.countDocuments(query);
        const videos = await Video.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({
            videos,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 获取单个视频
app.get('/api/videos/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ error: '视频不存在' });

        // 增加播放次数
        video.views += 1;
        await video.save();

        res.json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 上传视频
app.post('/api/videos', upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
    try {
        if (!req.files || !req.files.video) {
            return res.status(400).json({ error: '请选择视频文件' });
        }

        const videoFile = req.files.video[0];
        const thumbFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

        const videoData = {
            title: req.body.title || videoFile.originalname.replace(/\.[^/.]+$/, ''),
            description: req.body.description || '',
            category: req.body.category || '其他',
            fileName: videoFile.originalname,
            fileSize: videoFile.size,
            fileType: videoFile.mimetype,
            duration: parseFloat(req.body.duration) || 0,
            videoUrl: `/uploads/videos/${videoFile.filename}`,
            thumbnailUrl: thumbFile ? `/uploads/thumbnails/${thumbFile.filename}` : ''
        };

        const video = new Video(videoData);
        await video.save();

        res.status(201).json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 点赞视频
app.post('/api/videos/:id/like', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ error: '视频不存在' });

        video.likes += 1;
        await video.save();

        res.json({ likes: video.likes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 删除视频
app.delete('/api/videos/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ error: '视频不存在' });

        // 删除文件
        const videoPath = path.join(UPLOAD_DIR, video.videoUrl.replace('/uploads/', ''));
        const thumbPath = video.thumbnailUrl
            ? path.join(UPLOAD_DIR, video.thumbnailUrl.replace('/uploads/', ''))
            : null;

        if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
        if (thumbPath && fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);

        await Video.findByIdAndDelete(req.params.id);

        res.json({ message: '视频已删除' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 获取统计信息
app.get('/api/stats', async (req, res) => {
    try {
        const total = await Video.countDocuments();
        const videos = await Video.find();
        const totalDuration = videos.reduce((s, v) => s + (v.duration || 0), 0);
        const totalSize = videos.reduce((s, v) => s + (v.fileSize || 0), 0);

        res.json({ total, totalDuration, totalSize });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==================== 错误处理 ====================
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ error: '文件太大，最大500MB' });
        }
        return res.status(400).json({ error: err.message });
    }
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    next();
});

// ==================== 启动服务器 ====================
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB 连接成功');
        app.listen(PORT, () => {
            console.log(`🚀 视频网站 API 运行在端口 ${PORT}`);
            console.log(`📁 上传目录: ${UPLOAD_DIR}`);
            console.log(`📊 最大文件: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB 连接失败:', err.message);
        process.exit(1);
    });
