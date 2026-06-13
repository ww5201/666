import React from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  UploadOutlined, 
  UserOutlined, 
  SearchOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { auth } from '../services/auth';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = auth.getCurrentUser();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/search',
      icon: <SearchOutlined />,
      label: '搜索',
    },
    {
      key: '/upload',
      icon: <UploadOutlined />,
      label: '上传',
    },
  ];

  const userMenuItems = [
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        auth.logout();
        navigate('/login');
      },
    },
  ];

  const guestMenuItems = [
    {
      key: '/login',
      icon: <LoginOutlined />,
      label: '登录',
    },
    {
      key: '/register',
      icon: <UserAddOutlined />,
      label: '注册',
    },
  ];

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 24px',
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '40px' }}>
          视频网站
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ border: 'none' }}
        />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {currentUser ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Avatar 
              src={currentUser.avatar} 
              icon={<UserOutlined />} 
              style={{ 
                cursor: 'pointer',
                marginRight: '12px'
              }}
            />
          </Dropdown>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button 
              type="text" 
              icon={<LoginOutlined />}
              onClick={() => navigate('/login')}
            >
              登录
            </Button>
            <Button 
              type="primary" 
              icon={<UserAddOutlined />}
              onClick={() => navigate('/register')}
            >
              注册
            </Button>
          </div>
        )}
      </div>
    </Header>
  );
};

export default Navbar;