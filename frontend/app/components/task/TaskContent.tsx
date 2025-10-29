'use client';

import React, { useState } from 'react';
import { Tabs, Input, Button, Space, Avatar, Badge, Tooltip } from 'antd';
import { UserOutlined, LockOutlined, UnlockOutlined, TeamOutlined } from '@ant-design/icons';
import type { TaskDetail, TabType } from '@/app/types/task';

const { TextArea } = Input;

interface MemberPrompt {
  memberId: string;
  memberName: string;
  prompt: string;
  updatedAt: string;
  isLocked: boolean;
}

interface TaskContentProps {
  task: TaskDetail;
  currentUserId?: string; // 현재 로그인한 사용자 ID (옵션)
  onSave: (task: TaskDetail) => void;
}

export const TaskContent: React.FC<TaskContentProps> = ({ 
  task, 
  currentUserId = 'kim', // 기본값 설정 (실제로는 로그인 정보에서 가져옴)
  onSave 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('prompt');
  const [guide, setGuide] = useState(task.guide);
  const [prompt, setPrompt] = useState(task.prompt);
  const [output, setOutput] = useState(task.output);
  const [hasChanges, setHasChanges] = useState(false);
  
  // 멤버별 프롬프트 상태
  const [memberPrompts, setMemberPrompts] = useState<MemberPrompt[]>([
    { memberId: 'kim', memberName: '김철수', prompt: '', updatedAt: '', isLocked: false },
    { memberId: 'lee', memberName: '이영희', prompt: '', updatedAt: '', isLocked: false },
    { memberId: 'park', memberName: '박민수', prompt: '', updatedAt: '', isLocked: false },
  ]);
  
  const [activePromptTab, setActivePromptTab] = useState('team');
  const [teamPrompt, setTeamPrompt] = useState('');

  const handleMemberPromptChange = (memberId: string, value: string) => {
    setMemberPrompts(prev => 
      prev.map(mp => 
        mp.memberId === memberId 
          ? { ...mp, prompt: value, updatedAt: new Date().toISOString() }
          : mp
      )
    );
    setHasChanges(true);
  };

  const togglePromptLock = (memberId: string) => {
    setMemberPrompts(prev => 
      prev.map(mp => 
        mp.memberId === memberId 
          ? { ...mp, isLocked: !mp.isLocked }
          : mp
      )
    );
  };

  const handleSave = () => {
    onSave({
      ...task,
      guide,
      prompt: teamPrompt || prompt, // 팀 프롬프트가 있으면 우선 사용
      output,
      updatedAt: new Date().toISOString(),
    });
    setHasChanges(false);
  };

  const handleSubmit = () => {
    handleSave();
    // 제출 로직 추가
    console.log('Task submitted');
  };

  // Prompt 탭의 Sub Tabs
  const promptSubTabs = [
    {
      key: 'team',
      label: (
        <Space>
          <TeamOutlined />
          <span>팀 통합</span>
        </Space>
      ),
      children: (
        <div style={{ padding: '16px', height: '100%' }}>
          {/* Guide 요약 섹션 */}
          <div style={{ 
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            padding: '16px',
            background: '#fafafa',
            marginBottom: '16px'
          }}>
            <div style={{ marginBottom: '8px', fontWeight: 500 }}>
              Guide 요약:
            </div>
            <div style={{ color: '#8c8c8c', fontSize: '14px' }}>
              {guide ? guide.substring(0, 200) + '...' : '가이드를 먼저 작성해주세요.'}
            </div>
          </div>

          {/* 팀원 프롬프트 요약 */}
          <div style={{ 
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            padding: '16px',
            background: '#f5f5f5',
            marginBottom: '16px'
          }}>
            <div style={{ fontWeight: 500, marginBottom: '12px' }}>
              팀원들의 프롬프트 요약:
            </div>
            {memberPrompts.filter(mp => mp.prompt).length > 0 ? (
              memberPrompts.map(mp => mp.prompt && (
                <div key={mp.memberId} style={{ marginBottom: '8px' }}>
                  <Badge 
                    status={mp.isLocked ? "success" : "processing"} 
                    text={
                      <span>
                        <strong>{mp.memberName}:</strong> {mp.prompt.substring(0, 50)}
                        {mp.prompt.length > 50 && '...'}
                      </span>
                    }
                  />
                </div>
              ))
            ) : (
              <div style={{ color: '#8c8c8c', fontSize: '14px' }}>
                아직 작성된 개인 프롬프트가 없습니다.
              </div>
            )}
          </div>
          
          <TextArea
            value={teamPrompt}
            onChange={(e) => {
              setTeamPrompt(e.target.value);
              setHasChanges(true);
            }}
            placeholder="팀 통합 프롬프트를 작성하세요..."
            style={{ 
              minHeight: '250px',
              resize: 'none',
            }}
          />
        </div>
      ),
    },
    ...memberPrompts.map(member => ({
      key: member.memberId,
      label: (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#87d068' }}>
            {member.memberName[0]}
          </Avatar>
          <span>{member.memberName}</span>
          {member.isLocked && <LockOutlined style={{ color: '#52c41a', fontSize: '12px' }} />}
        </Space>
      ),
      children: (
        <div style={{ padding: '16px', height: '100%' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <Space>
              <span>작성자: {member.memberName}</span>
              {member.updatedAt && (
                <span style={{ color: '#8c8c8c', fontSize: '12px' }}>
                  마지막 수정: {new Date(member.updatedAt).toLocaleString()}
                </span>
              )}
            </Space>
            
            {/* 본인만 수정 가능 */}
            {currentUserId === member.memberId && (
              <Tooltip title={member.isLocked ? "잠금 해제" : "제출 (잠금)"}>
                <Button
                  icon={member.isLocked ? <LockOutlined /> : <UnlockOutlined />}
                  onClick={() => togglePromptLock(member.memberId)}
                  type={member.isLocked ? "primary" : "default"}
                  size="small"
                >
                  {member.isLocked ? "제출됨" : "작성 중"}
                </Button>
              </Tooltip>
            )}
          </div>

          {/* Guide 요약 (개인 탭에서도 표시) */}
          <div style={{ 
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            padding: '12px',
            background: '#fafafa',
            marginBottom: '16px',
            fontSize: '13px'
          }}>
            <strong>Guide 요약:</strong> {guide ? guide.substring(0, 150) + '...' : '가이드를 먼저 작성해주세요.'}
          </div>
          
          <TextArea
            value={member.prompt}
            onChange={(e) => handleMemberPromptChange(member.memberId, e.target.value)}
            placeholder={`${member.memberName}님의 프롬프트를 입력하세요...`}
            disabled={member.isLocked || currentUserId !== member.memberId}
            style={{ 
              minHeight: '300px',
              resize: 'none',
              background: member.isLocked ? '#f5f5f5' : '#fff',
              cursor: (member.isLocked || currentUserId !== member.memberId) ? 'not-allowed' : 'text',
            }}
          />
          
          {member.isLocked && currentUserId !== member.memberId && (
            <div style={{ 
              marginTop: '8px', 
              color: '#8c8c8c', 
              fontSize: '12px' 
            }}>
              * 이 프롬프트는 제출되어 수정할 수 없습니다.
            </div>
          )}

          {currentUserId !== member.memberId && !member.isLocked && (
            <div style={{ 
              marginTop: '8px', 
              color: '#8c8c8c', 
              fontSize: '12px' 
            }}>
              * 다른 팀원의 프롬프트는 읽기만 가능합니다.
            </div>
          )}
        </div>
      ),
    })),
  ];

  const tabItems = [
    {
      key: 'guide',
      label: 'Guide',
      children: (
        <div style={{ padding: '24px', height: '100%' }}>
          <TextArea
            value={guide}
            onChange={(e) => {
              setGuide(e.target.value);
              setHasChanges(true);
            }}
            placeholder="가이드를 입력하세요..."
            style={{ 
              minHeight: '400px',
              resize: 'none',
            }}
          />
        </div>
      ),
    },
    {
      key: 'prompt',
      label: (
        <Badge count={memberPrompts.filter(mp => mp.isLocked).length} size="small" offset={[10, 0]}>
          <span>Prompt</span>
        </Badge>
      ),
      children: (
        <Tabs
          activeKey={activePromptTab}
          onChange={setActivePromptTab}
          items={promptSubTabs}
          type="card"
          size="small"
          style={{ height: '100%' }}
        />
      ),
    },
    {
      key: 'output',
      label: 'Product',
      children: (
        <div style={{ padding: '24px', height: '100%' }}>
          <TextArea
            value={output}
            onChange={(e) => {
              setOutput(e.target.value);
              setHasChanges(true);
            }}
            placeholder="결과물을 입력하세요..."
            style={{ 
              minHeight: '400px',
              resize: 'none',
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as TabType)}
        items={tabItems}
        style={{ flex: 1, paddingLeft: '24px', paddingRight: '24px' }}
      />
      
      {/* Bottom Action Bar */}
      <div style={{ 
        padding: '16px 24px', 
        borderTop: '1px solid #f0f0f0',
        background: '#fafafa',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ color: '#8c8c8c', fontSize: '12px' }}>
          마지막 저장: {new Date(task.updatedAt).toLocaleString()}
        </div>
        
        <Space>
          {hasChanges && (
            <Button onClick={handleSave}>
              저장
            </Button>
          )}
          <Button type="primary" onClick={handleSubmit}>
            제출하기
          </Button>
          <span style={{ marginLeft: '16px', color: '#8c8c8c' }}>
            (과제로 일찍)
          </span>
        </Space>
      </div>
    </div>
  );
};