'use client';

import React from 'react';
import { Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Module, Team } from '@/app/types/space';

// TeamColumn을 같은 폴더에서 직접 import
import { TeamColumn } from './TeamColumn';

interface TeamViewProps {
  teams: Team[];
  modules: Module[];
  onAddTeam: () => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  teams,
  modules,
  onAddTeam,
}) => {
  return (
    <div style={{ padding: '24px', background: '#f8f9fa', minHeight: 'calc(100vh - 128px)' }}>
      <Row gutter={16}>
        {teams.map((team) => (
          <Col key={team.id} xs={24} sm={12} md={8} lg={6}>
            <TeamColumn team={team} modules={modules} />
          </Col>
        ))}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={onAddTeam}
            style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            팀 추가
          </Button>
        </Col>
      </Row>
    </div>
  );
};