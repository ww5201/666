import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, message, Spin, Row, Col } from 'antd';
import { UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { videos } from '../services/auth';

const { TextArea } = Input;
const { Dragger } = Upload;

const UploadPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      message.error('只能上传视频文件！');
      return false;
    }
    
    const isLt500M = file.size / 1024 / 1024 < 500;
    if (!isLt500M) {
      message.error('视频文件大小不能超过 500MB！');
      return false;
    }
    
    return true;
  };

  const handleUpload = async (values) => {
    if (fileList.length === 0) {
      message.error('请选择视频文件！');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('video', fileList[0]);
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('tags', values.tags || '');

      // 模拟上传进度
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const response = await videos.upload(formData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      message.success('视频上传成功！');
      navigate(`/video/${response._id}`);
    } catch (error) {
      message.error('视频上传失败：' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadProps = {
    name: 'video',
    multiple: false,
    fileList,
    beforeUpload,
    onChange: ({ fileList }) => {
      setFileList(fileList.slice(-1)); // 只保留最后一个文件
    },
    accept: 'video/*',
    showUploadList: false,
  };

  const categories = [
    '科技',
    '娱乐',
    '教育',
    '音乐',
    '游戏',
    '体育',
    '新闻',
    '生活',
    '其他'
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card title="上传视频" style={{ marginBottom: '24px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpload}
          size="large"
        >
          <Form.Item
            name="title"
            label="视频标题"
            rules={[{ required: true, message: '请输入视频标题' }]}
          >
            <Input 
              placeholder="请输入视频标题" 
              size="large"
              maxLength={100}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="category"
                label="视频分类"
                rules={[{ required: true, message: '请选择视频分类' }]}
              >
                <select style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}>
                  <option value="">请选择分类</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="tags"
                label="标签（用逗号分隔）"
              >
                <Input 
                  placeholder="例如：教程,技术,编程" 
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="视频描述"
          >
            <TextArea 
              placeholder="请输入视频描述（可选）"
              rows={4}
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            label="视频文件"
            rules={[{ required: true, message: '请选择视频文件' }]}
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <VideoCameraOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">
                支持的视频格式：MP4, WebM, OGG, QuickTime
                <br />
                文件大小限制：500MB
              </p>
            </Dragger>
          </Form.Item>

          {fileList.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <Text strong>已选择文件：</Text>
              <Text>{fileList[0].name}</Text>
              <Text type="secondary" style={{ marginLeft: '8px' }}>
                ({(fileList[0].size / 1024 / 1024).toFixed(2)} MB)
              </Text>
            </div>
          )}

          {uploading && (
            <div style={{ marginBottom: '16px' }}>
              <Text>上传进度：</Text>
              <Progress percent={uploadProgress} status={uploadProgress === 100 ? 'success' : 'active'} />
            </div>
          )}

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={uploading}
                size="large"
                icon={<UploadOutlined />}
              >
                {uploading ? '上传中...' : '上传视频'}
              </Button>
              <Button 
                size="large"
                onClick={() => navigate('/')}
              >
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UploadPage;