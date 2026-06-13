import React from 'react';
import { Card, Image, Typography, Tag, Button, Space } from 'antd';
import { EyeOutlined, LikeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/video/${video._id}`);
  };

  const formatViews = (views) => {
    if (views >= 10000) {
      return `${(views / 10000).toFixed(1)}万`;
    }
    return views.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
    return `${Math.floor(diffDays / 365)}年前`;
  };

  return (
    <Card
      hoverable
      cover={
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handlePlay}>
          <Image
            src={video.thumbnail || `https://via.placeholder.com/300x200?text=视频封面`}
            alt={video.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '48px',
            color: 'white',
            opacity: 0.8
          }}>
            <PlayCircleOutlined />
          </div>
        </div>
      }
      actions={[
        <Button 
          type="text" 
          icon={<EyeOutlined />}
          size="small"
        >
          {formatViews(video.views)}
        </Button>,
        <Button 
          type="text" 
          icon={<LikeOutlined />}
          size="small"
        >
          {video.likes}
        </Button>,
      ]}
    >
      <div style={{ padding: '8px 0' }}>
        <Title level={5} ellipsis={{ rows: 2 }}>
          {video.title}
        </Title>
        <Text type="secondary" ellipsis={{ rows: 2 }}>
          {video.description}
        </Text>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <Tag color="blue">{video.category}</Tag>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {formatDate(video.uploadDate)}
        </Text>
      </div>
      
      <div style={{ marginTop: '8px' }}>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          by {video.uploader?.username || '未知用户'}
        </Text>
      </div>
      
      {video.tags && video.tags.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          {video.tags.slice(0, 3).map(tag => (
            <Tag key={tag} style={{ fontSize: '10px' }}>
              {tag}
            </Tag>
          ))}
          {video.tags.length > 3 && (
            <Tag style={{ fontSize: '10px' }}>
              +{video.tags.length - 3}
            </Tag>
          )}
        </div>
      )}
    </Card>
  );
};

export default VideoCard;