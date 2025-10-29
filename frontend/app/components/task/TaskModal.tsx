'use client';

import React, { useState } from 'react';
import { Modal, Layout } from 'antd';
import { TaskHeader } from './TaskHeader';
import { TaskContent } from './TaskContent';
import { TaskSidebar } from './TaskSidebar';
import type { TaskDetail, Comment } from '@/app/types/task';

interface TaskModalProps {
  visible: boolean;
  task: TaskDetail | null;
  onClose: () => void;
  onStatusChange: (status: TaskDetail['status']) => void;
  onSave: (task: TaskDetail) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  task,
  onClose,
  onStatusChange,
  onSave,
}) => {
  const [comments, setComments] = useState<Comment[]>(task?.comments || []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!task) return null;

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: '현재 사용자',
      content,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
  };

  const modalStyle = {
    top: 80,
    maxWidth: '90vw',
    padding: 0,
  };

  const bodyStyle = {
    padding: 0,
    height: 'calc(100vh - 160px)',
    overflow: 'hidden',
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90vw"
      style={modalStyle}
      bodyStyle={bodyStyle}
      closable={false}
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
    >
      <Layout style={{ height: '100%', background: '#fff' }}>
        {/* Task Header */}
        <TaskHeader
          task={task}
          onClose={onClose}
          onStatusChange={onStatusChange}
        />
        
        <Layout style={{ flex: 1 }}>
          {/* Task Content */}
          <Layout.Content style={{ flex: 1, overflow: 'hidden' }}>
            <TaskContent
              task={task}
              onSave={onSave}
            />
          </Layout.Content>
          
          {/* Task Sidebar */}
          <TaskSidebar
            comments={comments}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            onAddComment={handleAddComment}
          />
        </Layout>
      </Layout>
    </Modal>
  );
};