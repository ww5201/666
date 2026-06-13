import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Input, Button, Avatar, Upload, message, Spin, List, Tag } from 'antd';
import { UserOutlined, UploadOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { auth, users } from '../services/auth';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchUserFavorites();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await users.getProfile();
      setUser(response);
      form.setFieldsValue({
        username: response.username,
        bio: response.bio
      });
    } catch (error) {
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const response = await users.getFavorites();
      setFavorites(response);
    } catch (error) {
      message.error('获取收藏列表失败');
    }
  };

  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);
      await users.updateProfile(values);
      message.success('个人信息更新成功');
      fetchUserProfile();
    } catch (error) {
      message.error('更新失败：' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      setLoading(true);
      await users.updatePassword(values);
      message.success('密码修改成功');
      form.resetFields(['currentPassword', 'newPassword', 'confirmPassword']);
    } catch (error) {
      message.error('密码修改失败：' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (videoId) => {
    try {
      await users.removeFavorite(videoId);
      message.success('已取消收藏');
      fetchUserFavorites();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const uploadProps = {
    name: 'avatar',
    maxCount: 1,
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB！');
        return false;
      }
      return false; // 阻止自动上传
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('头像上传成功');
        fetchUserProfile();
      } else if (info.file.status === 'error') {
        message.error('头像上传失败');
      }
    },
  };

  const renderProfileTab = () => (
    <Card title="个人信息">
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center' }}>
            <Upload {...uploadProps}>
              <Avatar
                src={user?.avatar}
                icon={<UserOutlined />}
                size={100}
                style={{ cursor: 'pointer', marginBottom: '16px' }}
              />
            </Upload>
            <Text type="secondary">点击更换头像</Text>
          </div>
        </Col>
        <Col xs={24} md={16}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateProfile}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="bio"
              label="个人简介"
            >
              <TextArea rows={4} placeholder="介绍一下你自己..." />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
              >
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );

  const renderPasswordTab = () => (
    <Card title="修改密码">
      <Form
        layout="vertical"
        onFinish={handleChangePassword}
      >
        <Form.Item
          name="currentPassword"
          label="当前密码"
          rules={[{ required: true, message: '请输入当前密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '密码至少6个字符' }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="确认新密码"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '请确认新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
          >
            修改密码
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  const renderFavoritesTab = () => (
    <Card title="我的收藏">
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Text type="secondary">暂无收藏视频</Text>
        </div>
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
          }}
          dataSource={favorites}
          renderItem={(video) => (
            <List.Item>
              <Card
                size="small"
                cover={
                  <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <Image
                      src={video.thumbnail || `https://via.placeholder.com/300x200?text=视频封面`}
                      alt={video.title}
                      style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '2px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>
                      {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                    </div>
                  </div>
                }
                actions={[
                  <Button
                    type="text"
                    size="small"
                    icon={<EyeOutlined />}
                  >
                    {video.views}
                  </Button>,
                  <Button
                    type="text"
                    size="small"
                    icon={<HeartOutlined />}
                    danger
                    onClick={() => handleRemoveFavorite(video._id)}
                  >
                    取消收藏
                  </Button>
                ]}
              >
                <div>
                  <Text ellipsis={{ rows: 2 }}>
                    {video.title}
                  </Text>
                  <div style={{ marginTop: '8px' }}>
                    <Tag color="blue">{video.category}</Tag>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </Card>
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <div style={{ textAlign: 'center' }}>
              <Avatar
                src={user?.avatar}
                icon={<UserOutlined />}
                size={80}
                style={{ marginBottom: '16px' }}
              />
              <Title level={4} style={{ marginBottom: '8px' }}>
                {user?.username}
              </Title>
              <Text type="secondary">{user?.email}</Text>
              <div style={{ marginTop: '16px' }}>
                <Tag color="blue">用户</Tag>
              </div>
            </div>
          </Col>
          <Col xs={24} md={18}>
            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ marginBottom: '16px' }}>
                账户信息
              </Title>
              <Row gutter={16}>
                <Col>
                  <Text strong>加入时间：</Text>
                  <Text>{new Date(user?.createdAt).toLocaleDateString('zh-CN')}</Text>
                </Col>
                <Col>
                  <Text strong>收藏数：</Text>
                  <Text>{favorites.length}</Text>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>

      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Button
            type={activeTab === 'profile' ? 'primary' : 'default'}
            onClick={() => setActiveTab('profile')}
            style={{ marginRight: '8px' }}
          >
            个人信息
          </Button>
          <Button
            type={activeTab === 'password' ? 'primary' : 'default'}
            onClick={() => setActiveTab('password')}
            style={{ marginRight: '8px' }}
          >
            修改密码
          </Button>
          <Button
            type={activeTab === 'favorites' ? 'primary' : 'default'}
            onClick={() => setActiveTab('favorites')}
          >
            我的收藏
          </Button>
        </div>

        <div style={{ marginTop: '24px' }}>
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'password' && renderPasswordTab()}
          {activeTab === 'favorites' && renderFavoritesTab()}
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;