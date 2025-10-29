'use client';

import React, { useState } from 'react';
import { Button, Dropdown, Space, Tag, message } from 'antd';
import {
  PlusOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  FileOutlined,
  TeamOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskModal } from '../task/TaskModal';
import type { Module, Task, Team } from '@/app/types/space';
import type { TaskDetail } from '@/app/types/task';

interface ListViewProps {
  teams: Team[];
  modules: Module[];
  onAddTeam: (name: string) => void;
  onAddModule: (name: string) => void;
  onAddTask: (moduleId: string, name: string) => void;
  onToggleModule: (moduleId: string) => void;
  onReorder: (result: any) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  teams,
  modules,
  onAddTeam,
  onAddModule,
  onAddTask,
  onToggleModule,
  onReorder,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(teams[0]?.id || null);
  const [selectedTask, setSelectedTask] = useState<TaskDetail | null>(null);
  const [taskModalVisible, setTaskModalVisible] = useState(false);

  const addMenuItems = [
    {
      key: 'module',
      label: '모듈',
      icon: <FolderOutlined />,
      onClick: () => {
        const name = prompt('모듈 이름을 입력하세요:');
        if (name) onAddModule(name);
      },
    },
    {
      key: 'task',
      label: '태스크',
      icon: <FileOutlined />,
      onClick: () => {
        if (modules.length === 0) {
          message.warning('먼저 모듈을 추가해주세요.');
          return;
        }
        const moduleId = modules[0].id;
        const name = prompt('태스크 이름을 입력하세요:');
        if (name) onAddTask(moduleId, name);
      },
    },
    {
      key: 'team',
      label: '팀',
      icon: <TeamOutlined />,
      onClick: () => {
        const name = prompt('팀 이름을 입력하세요:');
        if (name) onAddTeam(name);
      },
    },
  ];

  const getTaskStatusColor = (status: Task['status']) => {
    const colors = {
      todo: 'default',
      in_progress: 'processing',
      in_review: 'warning',
      done: 'success',
    };
    return colors[status];
  };

  const handleTaskClick = (task: Task, module: Module) => {
    // Task 상세 정보 생성 (실제로는 API 호출로 데이터 가져옴)
    const taskDetail: TaskDetail = {
      id: task.id,
      moduleId: task.moduleId,
      name: task.name,
      status: task.status,
      teamId: selectedTeam || 'team1',
      teamName: teams.find(t => t.id === selectedTeam)?.name || '창업 1팀',
      createdAt: '2025-10-18T16:00:00Z',
      updatedAt: '2025-10-18T17:00:00Z',
      assignees: ['김철수', '이영희', '박민수'],
      guide: '이 태스크는 사업 분석을 위한 가이드입니다.\n\n1. 시장 조사\n2. 경쟁사 분석\n3. SWOT 분석',
      prompt: '우리 팀의 사업 아이템에 대한 상세한 분석을 작성해주세요.',
      output: '',
      comments: [
        {
          id: 'comment1',
          author: '김철수',
          content: '시장 조사 부분을 더 구체적으로 작성해주세요.',
          createdAt: '2025-10-18T16:30:00Z',
        },
      ],
    };
    
    setSelectedTask(taskDetail);
    setTaskModalVisible(true);
  };

  const handleTaskSave = (task: TaskDetail) => {
    console.log('Task saved:', task);
    // 실제로는 API 호출하여 저장
    message.success('저장되었습니다.');
  };

  const handleTaskStatusChange = (status: TaskDetail['status']) => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, status });
      // 실제로는 API 호출하여 상태 업데이트
      message.success('상태가 변경되었습니다.');
    }
  };

  return (
    <>
      <div style={{ padding: '24px' }}>
        {/* Teams Section - 추가 버튼을 위로 이동 */}
        <div style={{ marginBottom: '24px' }}>
          {/* 추가 버튼 - 팀 선택 버튼 위에 배치 */}
          <div style={{ marginBottom: '12px' }}>
            <Dropdown menu={{ items: addMenuItems }} placement="bottomLeft">
              <Button type="primary" icon={<PlusOutlined />}>
                추가
              </Button>
            </Dropdown>
          </div>
          
          {/* 팀 선택 버튼들 */}
          <Space wrap>
            {teams.map((team) => (
              <Button
                key={team.id}
                type={selectedTeam === team.id ? 'primary' : 'default'}
                onClick={() => setSelectedTeam(team.id)}
                style={{ borderRadius: '16px' }}
              >
                {team.name}
              </Button>
            ))}
          </Space>
        </div>

        {/* Modules and Tasks Section */}
        <DragDropContext onDragEnd={onReorder}>
          <Droppable droppableId="modules">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {modules.map((module, index) => (
                  <Draggable key={module.id} draggableId={module.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          marginBottom: '8px',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {/* Module Header */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 16px',
                            background: '#fafafa',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                          onClick={() => onToggleModule(module.id)}
                        >
                          <div {...provided.dragHandleProps} style={{ marginRight: '8px' }}>
                            {module.isExpanded ? <FolderOpenOutlined /> : <FolderOutlined />}
                          </div>
                          <span style={{ flex: 1, fontWeight: 500 }}>
                            {module.name}
                          </span>
                          <Button
                            icon={<MoreOutlined />}
                            type="text"
                            size="small"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        {/* Tasks */}
                        {module.isExpanded && (
                          <Droppable droppableId={`tasks-${module.id}`} type="task">
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ paddingLeft: '32px', marginTop: '4px' }}
                              >
                                {module.tasks.map((task, taskIndex) => (
                                  <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={taskIndex}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => handleTaskClick(task, module)}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          padding: '6px 12px',
                                          background: '#fff',
                                          border: '1px solid #f0f0f0',
                                          borderRadius: '4px',
                                          marginBottom: '4px',
                                          cursor: 'pointer',
                                          transition: 'all 0.3s',
                                          ...provided.draggableProps.style,
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.boxShadow = 'none';
                                        }}
                                      >
                                        <FileOutlined style={{ marginRight: '8px' }} />
                                        <span style={{ flex: 1 }}>{task.name}</span>
                                        <Tag color={getTaskStatusColor(task.status)}>
                                          {task.status.replace('_', ' ')}
                                        </Tag>
                                        <Button
                                          icon={<MoreOutlined />}
                                          type="text"
                                          size="small"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      
      {/* Task Modal */}
      <TaskModal
        visible={taskModalVisible}
        task={selectedTask}
        onClose={() => {
          setTaskModalVisible(false);
          setSelectedTask(null);
        }}
        onStatusChange={handleTaskStatusChange}
        onSave={handleTaskSave}
      />
    </>
  );
};