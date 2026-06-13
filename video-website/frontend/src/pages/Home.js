import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Input, Select, Button, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { videos as videosAPI } from '../services/auth';
import VideoCard from '../components/VideoCard';

const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const [videoList, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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

  const fetchVideos = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        ...(searchTerm && { search: searchTerm }),
        ...(category && { category })
      };
      
      const response = await videosAPI.getAll(params);
      setVideos(response.videos);
      setTotalVideos(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error) {
      console.error('获取视频失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [searchTerm, category]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    fetchVideos(page);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* 搜索和筛选区域 */}
      <div style={{ 
        marginBottom: '24px', 
        padding: '24px', 
        background: '#f8f9fa', 
        borderRadius: '8px' 
      }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={16} md={10}>
            <Search
              placeholder="搜索视频..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="选择分类"
              style={{ width: '100%' }}
              size="large"
              onChange={handleCategoryChange}
              value={category}
            >
              <Option value="">全部分类</Option>
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <div style={{ textAlign: 'right', marginTop: '8px' }}>
              <span style={{ color: '#666' }}>
                共 {totalVideos} 个视频
              </span>
            </div>
          </Col>
        </Row>
      </div>

      {/* 视频列表 */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : videos.length === 0 ? (
        <Empty
          description="暂无视频"
          style={{ margin: '50px 0' }}
        >
          <Button type="primary" onClick={() => fetchVideos()}>
            重新加载
          </Button>
        </Empty>
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {videoList.map(video => (
              <Col xs={24} sm={12} md={8} lg={6} key={video._id}>
                <VideoCard video={video} />
              </Col>
            ))}
          </Row>

          {/* 分页 */}
          {totalPages > 1 && (
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Button
                type="primary"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ marginRight: '8px' }}
              >
                上一页
              </Button>
              <span style={{ margin: '0 16px' }}>
                第 {currentPage} 页，共 {totalPages} 页
              </span>
              <Button
                type="primary"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ marginLeft: '8px' }}
              >
                下一页
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;