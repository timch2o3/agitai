'use client';

import React from 'react';
import { Breadcrumb, Button, Space, Avatar, Badge, Dropdown, Segmented } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  NotificationOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import type { ViewType } from '@/app/types/space';

interface SpaceHeaderProps {
  spaceName: string;
  currentPath?: string[];
  viewType: ViewType;
  onViewChange: (view: ViewType) => void;
  memberCount: { owners: number; experts: number; participants: number };
}

export const SpaceHeader: React.FC<SpaceHeaderProps> = ({
  spaceName,
  currentPath = [],
  viewType,
  onViewChange,
  memberCount,
}) => {
  const breadcrumbItems = [
    { title: <HomeOutlined />, href: '/' },
    { title: spaceName },
    ...currentPath.map(path => ({ title: path })),
  ];

  const viewOptions = [
    { label: '목록', value: 'list', icon: <UnorderedListOutlined /> },
    { label: '팀', value: 'team', icon: <TeamOutlined /> },
    { label: '대시보드', value: 'dashboard', icon: <DashboardOutlined /> },
  ];

  return (
    <div style={{
      background: '#fff',
      padding: '16px 24px',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 64,
      zIndex: 99,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Breadcrumb items={breadcrumbItems} />
        
        <Segmented
          options={viewOptions}
          value={viewType}
          onChange={(value) => onViewChange(value as ViewType)}
        />
      </div>

      <Space size="middle">
        <Badge count={5}>
          <Button icon={<NotificationOutlined />} type="text" />
        </Badge>
        
        <Dropdown
          menu={{
            items: [
              { key: 'owners', label: `Owners (${memberCount.owners})` },
              { key: 'experts', label: `Experts (${memberCount.experts})` },
              { key: 'participants', label: `Participants (${memberCount.participants})` },
            ]
          }}
        >
          <Button icon={<TeamOutlined />}>
            멤버 ({memberCount.owners + memberCount.experts + memberCount.participants})
          </Button>
        </Dropdown>
        
        <Button icon={<SettingOutlined />} type="text" />
      </Space>
    </div>
  );
};