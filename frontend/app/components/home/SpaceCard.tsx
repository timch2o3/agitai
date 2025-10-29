'use client';

import React from 'react';
import { Card, Progress, Avatar, Button } from 'antd';
import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import type { SpaceData } from '@/app/types';

interface SpaceCardProps {
  space: SpaceData;
  onMoreClick?: (spaceId: string) => void;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, onMoreClick }) => {
  const router = useRouter();
  
  const handleCardClick = () => {
    router.push(`/space/${space.id}`);
  };

  const cardStyle: React.CSSProperties = {
    height: '100%',
    background: space.bgColor,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    cursor: 'pointer',
  };

  return (
    <Card
      title={space.title}
      extra={
        <Button 
          icon={<MoreOutlined />} 
          type="text"
          onClick={(e) => {
            e.stopPropagation();
            onMoreClick?.(space.id);
          }}
        />
      }
      variant="borderless"
      style={cardStyle}
      onClick={handleCardClick}
    >
      <p>기간: {space.period}</p>
      <p>장소: {space.location}</p>
      <Progress percent={space.progress} showInfo={false} />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: '16px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {space.members.length > 0 ? (
            <Avatar.Group max={{ count: 2 }}>
              {space.members.map((member, idx) => (
                <Avatar 
                  key={idx} 
                  style={{ backgroundColor: member.color }}
                >
                  {member.name}
                </Avatar>
              ))}
            </Avatar.Group>
          ) : (
            <Avatar.Group max={{ count: 2 }} />
          )}
          <span>{space.memberCount}명</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#8c8c8c', fontSize: '12px' }}>담당:</span>
          <Avatar 
            size="small" 
            style={{ backgroundColor: space.instructor.avatarColor }}
            icon={!space.instructor.avatarColor && <UserOutlined />} 
          />
          <span style={{ fontSize: '14px' }}>{space.instructor.name}</span>
        </div>
      </div>
    </Card>
  );
};