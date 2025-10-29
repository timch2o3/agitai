'use client';

import React, { useState } from 'react';
import { Spin } from 'antd';
import { useParams } from 'next/navigation';
import { WorkspaceLayout } from '@/app/components/layout/WorkspaceLayout';
import { LocalNavigation, ListView, TeamView } from '@/app/components/space';
import { useSpaceDetail } from '@/app/hooks/useSpaceDetail';
import type { ViewType } from '@/app/types/space';

export default function SpaceDetailPage() {
  const params = useParams();
  const spaceId = params.id as string;
  const [viewType, setViewType] = useState<ViewType>('list');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  
  const {
    spaceDetail,
    loading,
    addTeam,
    addModule,
    addTask,
    toggleModule,
  } = useSpaceDetail(spaceId);

  const handleReorder = (result: any) => {
    console.log('Reorder:', result);
  };

  const handleTaskClick = (moduleName: string, taskName: string) => {
    setCurrentPath([moduleName, taskName]);
  };

  if (loading || !spaceDetail) {
    return (
      <WorkspaceLayout>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 'calc(100vh - 64px)'
        }}>
          <Spin size="large" />
        </div>
      </WorkspaceLayout>
    );
  }

  const memberCount = {
    owners: spaceDetail.members.owners.length,
    experts: spaceDetail.members.experts.length,
    participants: spaceDetail.members.participants.length,
  };

  return (
    <WorkspaceLayout>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Local Navigation */}
        <LocalNavigation
          spaceName={spaceDetail.name}
          currentPath={currentPath}
          viewType={viewType}
          onViewChange={setViewType}
          memberCount={memberCount}
        />
        
        {/* Content Area */}
        <div style={{ flex: 1, overflow: 'auto', background: '#f8f9fa' }}>
          {viewType === 'list' && (
            <ListView
              teams={spaceDetail.teams}
              modules={spaceDetail.modules}
              onAddTeam={addTeam}
              onAddModule={addModule}
              onAddTask={addTask}
              onToggleModule={toggleModule}
              onReorder={handleReorder}
            />
          )}
          
          {viewType === 'team' && (
            <TeamView
              teams={spaceDetail.teams}
              modules={spaceDetail.modules}
              onAddTeam={() => {
                const name = prompt('팀 이름을 입력하세요:');
                if (name) addTeam(name);
              }}
            />
          )}
          
          {viewType === 'dashboard' && (
            <div style={{ padding: '24px' }}>
              <h3>Dashboard View</h3>
              <p>대시보드 뷰 구현 예정</p>
            </div>
          )}
        </div>
      </div>
    </WorkspaceLayout>
  );
}