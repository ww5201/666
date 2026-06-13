const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  duration: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'processing', 'rejected'],
    default: 'active'
  }
});

videoSchema.index({ title: 'text', description: 'text', tags: 'text' });
videoSchema.index({ category: 1 });
videoSchema.index({ uploadDate: -1 });
videoSchema.index({ views: -1 });

module.exports = mongoose.model('Video', videoSchema);