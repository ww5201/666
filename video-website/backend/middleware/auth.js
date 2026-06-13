const jwt = require('jsonwebtoken');

// 验证JWT令牌的中间件
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: '访问被拒绝，需要认证' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: '无效的令牌' });
  }
};

// 管理员权限中间件
const admin = (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: '需要管理员权限' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: '权限不足' });
  }
};

module.exports = { auth, admin };