'use client';

import React from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface AddSpaceCardProps {
  onClick?: () => void;
}

export const AddSpaceCard: React.FC<AddSpaceCardProps> = ({ onClick }) => {
  const cardStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '270px',
    border: '1px dashed #d9d9d9',
    background: '#fafafa'
  };

  return (
    <Card 
      hoverable 
      variant="borderless"
      style={cardStyle}
      onClick={onClick}
    >
      <div style={{ textAlign: 'center' }}>
        <PlusOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />
        <p style={{ color: '#8c8c8c', marginTop: '8px' }}>스페이스 추가</p>
      </div>
    </Card>
  );
};