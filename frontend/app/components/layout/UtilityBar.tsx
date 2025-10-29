'use client';

import React from 'react';
import { Layout, Button, Tooltip } from 'antd';
import {
  MessageOutlined,
  CloudOutlined,
  VideoCameraOutlined,
  TeamOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export const UtilityBar: React.FC = () => {
  const utilities = [
    { icon: <MessageOutlined />, tooltip: '메시지', key: 'message' },
    { icon: <CloudOutlined />, tooltip: '클라우드', key: 'cloud' },
    { icon: <VideoCameraOutlined />, tooltip: '화상회의', key: 'video' },
    { icon: <TeamOutlined />, tooltip: '팀 협업', key: 'team' },
    { icon: <FileTextOutlined />, tooltip: '문서', key: 'docs' },
    { icon: <QuestionCircleOutlined />, tooltip: '도움말', key: 'help' },
  ];

  return (
    <Sider 
      width={64} 
      theme="light"
      style={{
        borderLeft: '1px solid #f0f0f0',
        height: 'calc(100vh - 64px)',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '24px',
        gap: '16px',
      }}>
        {utilities.map(item => (
          <Tooltip key={item.key} title={item.tooltip} placement="left">
            <Button 
              icon={item.icon} 
              type="text"
              shape="circle"
              size="large"
              style={{ 
                width: '40px',
                height: '40px',
              }}
            />
          </Tooltip>
        ))}
      </div>
    </Sider>
  );
};