'use client';

import React, { useState } from 'react';
import { Layout, Input, Button, Avatar, Typography, Space } from 'antd';
import { SendOutlined, CommentOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import type { Comment } from '@/app/types/task';

const { Sider } = Layout;
const { TextArea } = Input;
const { Text } = Typography;

interface TaskSidebarProps {
  comments: Comment[];
  collapsed: boolean;
  onToggle: () => void;
  onAddComment: (content: string) => void;
}

export const TaskSidebar: React.FC<TaskSidebarProps> = ({
  comments,
  collapsed,
  onToggle,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Sider
      width={350}
      collapsed={collapsed}
      collapsedWidth={0}
      theme="light"
      style={{
        borderLeft: '1px solid #f0f0f0',
        position: 'relative',
      }}
    >
      {/* Toggle Button */}
      <Button
        icon={collapsed ? <LeftOutlined /> : <RightOutlined />}
        type="text"
        onClick={onToggle}
        style={{
          position: 'absolute',
          left: collapsed ? '-32px' : '-16px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          background: '#fff',
          border: '1px solid #f0f0f0',
        }}
      />
      
      {!collapsed && (
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          padding: '16px'
        }}>
          {/* Header */}
          <div style={{ 
            marginBottom: '16px', 
            paddingBottom: '16px', 
            borderBottom: '1px solid #f0f0f0' 
          }}>
            <Space>
              <CommentOutlined />
              <Text strong>코멘트</Text>
              <Text type="secondary">({comments.length})</Text>
            </Space>
          </div>
          
          {/* Comments List */}
          <div style={{ 
            flex: 1, 
            overflow: 'auto',
            marginBottom: '16px'
          }}>
            {comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: '16px' }}>
                <Space align="start">
                  <Avatar style={{ backgroundColor: '#87d068' }}>
                    {comment.author[0]}
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '4px' }}>
                      <Text strong>{comment.author}</Text>
                      <Text 
                        type="secondary" 
                        style={{ fontSize: '12px', marginLeft: '8px' }}
                      >
                        {new Date(comment.createdAt).toLocaleString()}
                      </Text>
                    </div>
                    <div>{comment.content}</div>
                  </div>
                </Space>
              </div>
            ))}
          </div>
          
          {/* Comment Input */}
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
            <TextArea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="코멘트를 입력하세요..."
              autoSize={{ minRows: 3, maxRows: 6 }}
              style={{ marginBottom: '8px' }}
            />
            <Button 
              type="primary" 
              icon={<SendOutlined />}
              onClick={handleSubmit}
              block
            >
              전송
            </Button>
          </div>
        </div>
      )}
    </Sider>
  );
};