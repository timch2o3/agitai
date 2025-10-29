'use client';

import React, { useState } from 'react';
import { Card, Collapse, Tag, Button } from 'antd';
import { MoreOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import type { Module, Team, Task } from '@/app/types/space';

interface TeamColumnProps {
  team: Team;
  modules: Module[];
}

export const TeamColumn: React.FC<TeamColumnProps> = ({ team, modules }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['progress']);

  const getTasksByStatus = (module: Module, isCompleted: boolean) => {
    return module.tasks.filter(task => {
      const isTaskCompleted = task.status === 'done';
      return isTaskCompleted === isCompleted;
    });
  };

  const getTaskColor = (status: Task['status']) => {
    const colors = {
      todo: '#d9d9d9',
      in_progress: '#52c41a',
      in_review: '#faad14',
      done: '#1890ff',
    };
    return colors[status];
  };

  const toggleSection = (key: string) => {
    setExpandedSections(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  return (
    <Card
      title={team.name}
      extra={<Button icon={<MoreOutlined />} type="text" />}
      style={{ marginBottom: '16px' }}
    >
      {/* 진행 중 Section */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: '8px',
          }}
          onClick={() => toggleSection('progress')}
        >
          {expandedSections.includes('progress') ? <DownOutlined /> : <RightOutlined />}
          <span style={{ marginLeft: '8px', fontWeight: 500 }}>진행 중</span>
        </div>
        
        {expandedSections.includes('progress') && (
          <div style={{ paddingLeft: '20px' }}>
            {modules.map(module => {
              const progressTasks = getTasksByStatus(module, false);
              if (progressTasks.length === 0) return null;
              
              return (
                <div key={module.id} style={{ marginBottom: '12px' }}>
                  <div style={{ 
                    background: '#f0f0f0', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    marginBottom: '4px',
                    fontSize: '12px',
                  }}>
                    ({module.name})
                  </div>
                  {progressTasks.map(task => (
                    <div
                      key={task.id}
                      style={{
                        background: getTaskColor(task.status),
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        marginBottom: '4px',
                        fontSize: '12px',
                      }}
                    >
                      {task.name}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 완료 Section */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: '8px',
          }}
          onClick={() => toggleSection('completed')}
        >
          {expandedSections.includes('completed') ? <DownOutlined /> : <RightOutlined />}
          <span style={{ marginLeft: '8px', fontWeight: 500 }}>완료</span>
        </div>
        
        {expandedSections.includes('completed') && (
          <div style={{ paddingLeft: '20px' }}>
            {modules.map(module => {
              const completedTasks = getTasksByStatus(module, true);
              if (completedTasks.length === 0) return null;
              
              return (
                <div key={module.id} style={{ marginBottom: '12px' }}>
                  <div style={{ 
                    background: '#f0f0f0', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    marginBottom: '4px',
                    fontSize: '12px',
                  }}>
                    ({module.name})
                  </div>
                  {completedTasks.map(task => (
                    <div
                      key={task.id}
                      style={{
                        background: '#f0f0f0',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        marginBottom: '4px',
                        fontSize: '12px',
                      }}
                    >
                      {task.name}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};