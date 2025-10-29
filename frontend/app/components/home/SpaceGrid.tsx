'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { SpaceCard } from './SpaceCard';
import { AddSpaceCard } from './AddSpaceCard';
import type { SpaceData } from '@/app/types';

interface SpaceGridProps {
  spaces: SpaceData[];
  onSpaceMoreClick?: (spaceId: string) => void;
  onAddSpace?: () => void;
}

export const SpaceGrid: React.FC<SpaceGridProps> = ({
  spaces,
  onSpaceMoreClick,
  onAddSpace
}) => {
  return (
    <Row gutter={[24, 24]}>
      {spaces.map((space) => (
        <Col key={space.id} xs={24} sm={12} md={8} lg={6}>
          <SpaceCard 
            space={space} 
            onMoreClick={onSpaceMoreClick}
          />
        </Col>
      ))}
      
      <Col xs={24} sm={12} md={8} lg={6}>
        <AddSpaceCard onClick={onAddSpace} />
      </Col>
    </Row>
  );
};