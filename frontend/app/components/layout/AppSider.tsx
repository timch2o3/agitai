'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface AppSiderProps {
  selectedKey?: string;
  onMenuClick?: (key: string) => void;
}

export const AppSider: React.FC<AppSiderProps> = ({ 
  selectedKey = 'home',
  onMenuClick 
}) => {
  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: '홈' },
    { key: 'my-space', icon: <UserOutlined />, label: '내 스페이스' },
    {
      key: 'space',
      icon: <AppstoreOutlined />,
      label: '스페이스',
      children: [
        { key: 'agit-basic', label: 'AGIT Basic' },
        { key: 'agit-advanced', label: 'AGIT Advanced' },
      ],
    },
    { key: 'add-space', icon: <PlusOutlined />, label: '스페이스 추가' },
  ];

  return (
    <Sider width={200} theme="light">
      <div style={{ padding: '16px', fontWeight: 'bold', fontSize: '18px' }}>
        WorkSpace
      </div>
      
      <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        items={menuItems}
        onClick={({ key }) => onMenuClick?.(key)}
      />
      
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        padding: '16px' 
      }}>
        스페이스 보관함
      </div>
    </Sider>
  );
};