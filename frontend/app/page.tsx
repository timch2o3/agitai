'use client';

import React, { useState } from 'react';
import { WorkspaceLayout } from '@/app/components/layout/WorkspaceLayout';
import { SpaceGrid } from '@/app/components/home';
import { MOCK_SPACES } from '@/app/constants';

export default function HomePage() {
  const [spaces] = useState(MOCK_SPACES);

  const handleSpaceMore = (spaceId: string) => {
    console.log('More clicked for space:', spaceId);
  };

  const handleAddSpace = () => {
    console.log('Add space clicked');
  };

  return (
    <WorkspaceLayout>
      <div style={{ padding: '24px' }}>
        <h2>홈</h2>
        <SpaceGrid 
          spaces={spaces}
          onSpaceMoreClick={handleSpaceMore}
          onAddSpace={handleAddSpace}
        />
      </div>
    </WorkspaceLayout>
  );
}
// http://localhost:3000/space/agit-basic (직접입력)