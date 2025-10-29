'use client';

import React from 'react';
import { Space, Typography, Tag, Button, Avatar, Dropdown } from 'antd';
import {
  CloseOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { TaskDetail } from '@/app/types/task';
import type { MenuProps } from 'antd';

interface TaskHeaderProps {
  task: TaskDetail;
  onClose: () => void;
  onStatusChange: (status: TaskDetail['status']) => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
  task,
  onClose,
  onStatusChange,
}) => {
  const statusColors = {
    todo: 'default',
    in_progress: 'processing',
    in_review: 'warning',
    done: 'success',
  };

  const statusLabels = {
    todo: 'To Do',
    in_progress: 'In Progress',
    in_review: 'In Review',
    done: 'Done',
  };

  const statusMenuItems: MenuProps['items'] = Object.entries(statusLabels).map(
    ([key, label]) => ({
      key,
      label,
      onClick: () => onStatusChange(key as TaskDetail['status']),
    })
  );

  return (
    <div style={{
      padding: '16px 24px',
      borderBottom: '1px solid #f0f0f0',
      background: '#fafafa',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* 좌측: 제목과 정보 */}
        <Space size="large">
          <Typography.Title level={4} style={{ margin: 0 }}>
            📋 {task.name}
          </Typography.Title>
          
          <Space size="small" style={{ color: '#8c8c8c', fontSize: '12px' }}>
            <CalendarOutlined />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </Space>
          
          <Dropdown menu={{ items: statusMenuItems }} placement="bottomLeft">
            <Tag 
              color={statusColors[task.status]} 
              style={{ cursor: 'pointer' }}
            >
              {statusLabels[task.status]}
            </Tag>
          </Dropdown>
        </Space>
        
        {/* 우측: 팀원과 액션 버튼 */}
        <Space>
          <Avatar.Group maxCount={4}>
            {task.assignees.map((assignee, idx) => (
              <Avatar key={idx} style={{ backgroundColor: '#87d068' }}>
                {assignee[0]}
              </Avatar>
            ))}
          </Avatar.Group>
          
          <Button icon={<TeamOutlined />} type="text" />
          <Button icon={<SettingOutlined />} type="text" />
          <Button 
            icon={<CloseOutlined />} 
            type="text"
            onClick={onClose}
          />
        </Space>
      </div>
    </div>
  );
};