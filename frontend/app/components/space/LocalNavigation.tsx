'use client';

import React from 'react';
import { Breadcrumb, Button, Space, Badge, Dropdown, Segmented } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  NotificationOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import type { ViewType } from '@/app/types/space';

interface LocalNavigationProps {
  spaceName: string;
  currentPath?: string[];
  viewType: ViewType;
  onViewChange: (view: ViewType) => void;
  memberCount: { owners: number; experts: number; participants: number };
}

export const LocalNavigation: React.FC<LocalNavigationProps> = ({
  spaceName,
  currentPath = [],
  viewType,
  onViewChange,
  memberCount,
}) => {
  const breadcrumbItems = [
    { title: <><HomeOutlined /> 홈</>, href: '/' },
    { title: spaceName },
    ...currentPath.map(path => ({ title: path })),
  ];

  const viewOptions = [
    { label: '목록', value: 'list', icon: <UnorderedListOutlined /> },
    { label: '팀', value: 'team', icon: <TeamOutlined /> },
    { label: '대시보드', value: 'dashboard', icon: <DashboardOutlined /> },
  ];

  const totalMembers = memberCount.owners + memberCount.experts + memberCount.participants;

  return (
    <div style={{
      background: '#fff',
      padding: '16px 24px',
      borderBottom: '1px solid #f0f0f0',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      {/* 한 줄에 모든 요소 배치 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* 좌측: Breadcrumb과 View Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Breadcrumb items={breadcrumbItems} />
          
          {/* View Type Selector - 경로 오른쪽에 배치 */}
          <Segmented
            options={viewOptions}
            value={viewType}
            onChange={(value) => onViewChange(value as ViewType)}
          />
        </div>
        
        {/* 우측: 알림, 멤버, 설정 */}
        <Space size="middle">
          <Badge count={5} dot>
            <Button icon={<NotificationOutlined />} type="text">게시판</Button>
          </Badge>
          
          <Button icon={<UsergroupAddOutlined />}>
            멤버 ({totalMembers})
          </Button>
          
          <Button icon={<SettingOutlined />} type="text" />
        </Space>
      </div>
    </div>
  );
};