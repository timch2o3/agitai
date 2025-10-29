'use client';

import React from 'react';
import { Layout, Avatar, Dropdown, Button, Space } from 'antd';
import type { MenuProps } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '프로필 설정',
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: '로그아웃',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const headerStyle: React.CSSProperties = {
    background: '#fff',
    padding: '0 24px',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    height: '64px',
  };

  return (
    <Header style={headerStyle}>
      {/* 좌측: 브랜드 - WorkSpace 제거 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
          AGIT P-LXP
        </div>
        <Button 
          icon={<SearchOutlined />} 
          type="text" 
          shape="circle"
        />
      </div>
      
      {/* 우측: 알림, 설정, 프로필 */}
      <Space size="middle" align="center">
        <Button 
          icon={<BellOutlined />} 
          type="text" 
          shape="circle" 
        />
        <Button 
          icon={<SettingOutlined />} 
          type="text" 
          shape="circle" 
        />
        
        <Dropdown 
          menu={{ items: userMenuItems }} 
          placement="bottomRight" 
          arrow
        >
          <Avatar 
            size={36}
            style={{ 
              backgroundColor: '#87d068', 
              cursor: 'pointer',
            }} 
            icon={<UserOutlined />} 
          />
        </Dropdown>
      </Space>
    </Header>
  );
};