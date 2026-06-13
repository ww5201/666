const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // 检查用户是否已存在
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: '用户名或邮箱已存在' 
      });
    }
    
    // 创建新用户
    const user = new User({
      username,
      email,
      password
    });
    
    await user.save();
    
    // 生成JWT令牌
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '邮箱或密码错误' });
    }
    
    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: '邮箱或密码错误' });
    }
    
    // 检查账户是否激活
    if (!user.isActive) {
      return res.status(400).json({ message: '账户已被禁用' });
    }
    
    // 生成JWT令牌
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取当前用户信息
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新用户信息
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;
    const user = await User.findById(req.user.id);
    
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;
    
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 修改密码
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    
    // 验证当前密码
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: '当前密码错误' });
    }
    
    // 更新密码
    user.password = newPassword;
    await user.save();
    
    res.json({ message: '密码修改成功' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取用户收藏的视频
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites', 'title thumbnail views uploadDate');
    
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 添加收藏
router.post('/favorites/:videoId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const videoId = req.params.videoId;
    
    if (user.favorites.includes(videoId)) {
      return res.status(400).json({ message: '视频已在收藏中' });
    }
    
    user.favorites.push(videoId);
    await user.save();
    
    res.json({ message: '添加收藏成功' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 取消收藏
router.delete('/favorites/:videoId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const videoId = req.params.videoId;
    
    user.favorites = user.favorites.filter(id => id.toString() !== videoId);
    await user.save();
    
    res.json({ message: '取消收藏成功' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;