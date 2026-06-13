import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Input, Select, Button, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { videos } from '../services/auth';
import VideoCard from '../components/VideoCard';

const { Search } = Input;
const { Option } = Select;

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

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

  const sortOptions = [
    { value: 'relevance', label: '相关度' },
    { value: 'date', label: '上传时间' },
    { value: 'views', label: '观看次数' },
    { value: 'likes', label: '点赞数' }
  ];

  const handleSearch = async (term, page = 1) => {
    if (!term.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      return;
    }

    try {
      setLoading(true);
      const params = {
        search: term,
        page,
        limit: 12,
        ...(category && { category }),
        ...(sortBy && { sort: sortBy })
      };
      
      const response = await videos.getAll(params);
      setSearchResults(response.videos);
      setTotalResults(response.total);
      setCurrentPage(response.currentPage);
    } catch (error) {
      console.error('搜索失败:', error);
      message.error('搜索失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    handleSearch(searchTerm, 1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const timeoutId = setTimeout(() => {
        handleSearch(searchTerm);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, category, sortBy]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* 搜索区域 */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={16} md={10}>
            <Search
              placeholder="搜索视频..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              onSearch={handleSearchSubmit}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="选择分类"
              style={{ width: '100%' }}
              size="large"
              value={category}
              onChange={setCategory}
            >
              <Option value="">全部分类</Option>
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={6}>
            <Select
              placeholder="排序方式"
              style={{ width: '100%' }}
              size="large"
              value={sortBy}
              onChange={setSortBy}
            >
              {sortOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      {/* 搜索结果 */}
      <div>
        {searchTerm && (
          <div style={{ marginBottom: '16px' }}>
            <Text strong>
              搜索 "{searchTerm}" 的结果 ({totalResults} 个)
            </Text>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : searchResults.length === 0 ? (
          <Empty
            description={searchTerm ? "未找到相关视频" : "请输入搜索关键词"}
            style={{ margin: '50px 0' }}
          >
            {searchTerm && (
              <Button type="primary" onClick={() => setSearchTerm('')}>
                清除搜索
              </Button>
            )}
          </Empty>
        ) : (
          <>
            <Row gutter={[24, 24]}>
              {searchResults.map(video => (
                <Col xs={24} sm={12} md={8} lg={6} key={video._id}>
                  <VideoCard video={video} />
                </Col>
              ))}
            </Row>

            {/* 分页 */}
            {totalResults > 12 && (
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Button
                  type="primary"
                  disabled={currentPage === 1}
                  onClick={() => handleSearch(searchTerm, currentPage - 1)}
                  style={{ marginRight: '8px' }}
                >
                  上一页
                </Button>
                <span style={{ margin: '0 16px' }}>
                  第 {currentPage} 页
                </span>
                <Button
                  type="primary"
                  disabled={currentPage * 12 >= totalResults}
                  onClick={() => handleSearch(searchTerm, currentPage + 1)}
                  style={{ marginLeft: '8px' }}
                >
                  下一页
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;