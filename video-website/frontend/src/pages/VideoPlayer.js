import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Typography, 
  Space, 
  message,
  Spin,
  Avatar,
  Tag,
  Divider
} from 'antd';
import { 
  ArrowLeftOutlined, 
  LikeOutlined, 
  DislikeOutlined, 
  ShareAltOutlined,
  HeartOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { videos, users } from '../services/auth';

const { Title, Text, Paragraph } = Typography;

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await videos.getById(id);
        setVideo(response);
        
        // 检查用户是否已点赞
        if (currentUser) {
          // 这里应该检查用户是否已点赞，暂时模拟
          setLiked(false);
          setFavorited(false);
        }
      } catch (error) {
        message.error('获取视频失败');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    const getCurrentUser = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(user);
      return user;
    };

    const user = getCurrentUser();
    fetchVideo();
  }, [id, navigate, currentUser]);

  const handleLike = async () => {
    if (!currentUser) {
      message.warning('请先登录');
      navigate('/login');
      return;
    }

    try {
      if (liked) {
        await videos.unlike(id);
        setLiked(false);
        video.likes -= 1;
      } else {
        await videos.like(id);
        setLiked(true);
        video.likes += 1;
      }
      setVideo({ ...video });
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleFavorite = async () => {
    if (!currentUser) {
      message.warning('请先登录');
      navigate('/login');
      return;
    }

    try {
      if (favorited) {
        await users.removeFavorite(id);
        setFavorited(false);
        message.success('已取消收藏');
      } else {
        await users.addFavorite(id);
        setFavorited(true);
        message.success('已添加到收藏');
      }
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    message.success('链接已复制到剪贴板');
  };

  const formatViews = (views) => {
    if (views >= 10000) {
      return `${(views / 10000).toFixed(1)}万`;
    }
    return views.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!video) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Text type="danger">视频不存在</Text>
        <Button 
          type="primary" 
          onClick={() => navigate('/')}
          style={{ marginTop: '16px' }}
        >
          返回首页
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* 返回按钮 */}
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
        style={{ marginBottom: '16px' }}
      >
        返回首页
      </Button>

      <Row gutter={[24, 24]}>
        {/* 视频播放区域 */}
        <Col xs={24} lg={16}>
          <Card>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <video
                src={video.url}
                controls
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: '#000'
                }}
                poster={video.thumbnail || 'https://via.placeholder.com/800x450?text=视频封面'}
              />
            </div>
          </Card>

          {/* 视频信息 */}
          <Card style={{ marginTop: '16px' }}>
            <Title level={2} style={{ marginBottom: '16px' }}>
              {video.title}
            </Title>
            
            <Row gutter={16} align="middle" style={{ marginBottom: '16px' }}>
              <Col>
                <Avatar 
                  src={video.uploader?.avatar} 
                  icon={<ArrowLeftOutlined />}
                  style={{ marginRight: '8px' }}
                />
                <Text strong>{video.uploader?.username || '未知用户'}</Text>
              </Col>
              <Col>
                <Text type="secondary">{formatDate(video.uploadDate)}</Text>
              </Col>
              <Col>
                <Text type="secondary">
                  <EyeOutlined style={{ marginRight: '4px' }} />
                  {formatViews(video.views)} 次观看
                </Text>
              </Col>
            </Row>

            {/* 视频描述 */}
            <Paragraph style={{ marginBottom: '16px' }}>
              {video.description || '暂无描述'}
            </Paragraph>

            {/* 标签 */}
            {video.tags && video.tags.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ marginRight: '8px' }}>标签：</Text>
                {video.tags.map(tag => (
                  <Tag key={tag} style={{ marginBottom: '4px' }}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}

            {/* 分类 */}
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ marginRight: '8px' }}>分类：</Text>
              <Tag color="blue">{video.category}</Tag>
            </div>

            {/* 操作按钮 */}
            <Space size="large">
              <Button
                type={liked ? 'primary' : 'default'}
                icon={<LikeOutlined />}
                onClick={handleLike}
              >
                {video.likes} 赞
              </Button>
              
              <Button
                type={favorited ? 'primary' : 'default'}
                icon={<HeartOutlined />}
                onClick={handleFavorite}
              >
                收藏
              </Button>
              
              <Button
                type="default"
                icon={<ShareAltOutlined />}
                onClick={handleShare}
              >
                分享
              </Button>
            </Space>
          </Card>
        </Col>

        {/* 侧边栏 */}
        <Col xs={24} lg={8}>
          {/* 上传者信息 */}
          <Card style={{ marginBottom: '16px' }}>
            <Row gutter={16}>
              <Col>
                <Avatar 
                  src={video.uploader?.avatar} 
                  icon={<ArrowLeftOutlined />}
                  size="large"
                />
              </Col>
              <Col>
                <div>
                  <Text strong>{video.uploader?.username || '未知用户'}</Text>
                  <br />
                  <Text type="secondary">
                    {formatDate(video.uploadDate)} 加入
                  </Text>
                </div>
              </Col>
            </Row>
          </Card>

          {/* 相关视频 */}
          <Card title="相关视频">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Text type="secondary">暂无相关视频</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VideoPlayer;