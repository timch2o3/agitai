import { useState, useEffect } from 'react';
import type { SpaceDetail, Module, Task, Team } from '@/app/types/space';

export const useSpaceDetail = (spaceId: string) => {
  const [spaceDetail, setSpaceDetail] = useState<SpaceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockData: SpaceDetail = {
      id: spaceId,
      name: 'AGIT Basic',
      teams: [
        { id: 'team1', name: '창업 1팀', members: ['user1', 'user2'] },
        { id: 'team2', name: '창업 2팀', members: ['user3', 'user4'] },
        { id: 'team3', name: '창업 3팀', members: ['user5', 'user6'] },
      ],
      modules: [
        {
          id: 'module1',
          name: '(모듈 1) 문제정의',
          isExpanded: true,
          order: 0,
          tasks: [
            { id: 'task1-1', moduleId: 'module1', name: '(Task 1.1) 팀 구성', status: 'done', order: 0 },
            { id: 'task1-2', moduleId: 'module1', name: '(Task 1.2) 자기소개서', status: 'in_progress', order: 1 },
          ],
        },
        {
          id: 'module2',
          name: '(모듈 2) 아이디어 구체화',
          isExpanded: true,
          order: 1,
          tasks: [
            { id: 'task2-1', moduleId: 'module2', name: '(Task 2.1) 사업 아이템 탐색', status: 'in_review', order: 0 },
            { id: 'task2-2', moduleId: 'module2', name: '(Task 2.2) 사업 분석', status: 'todo', order: 1 },
          ],
        },
      ],
      members: {
        owners: ['owner1'],
        experts: ['expert1', 'expert2'],
        participants: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
      },
    };

    setTimeout(() => {
      setSpaceDetail(mockData);
      setLoading(false);
    }, 500);
  }, [spaceId]);

  const addTeam = (name: string) => {
    if (!spaceDetail) return;
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name,
      members: [],
    };
    setSpaceDetail({
      ...spaceDetail,
      teams: [...spaceDetail.teams, newTeam],
    });
  };

  const addModule = (name: string) => {
    if (!spaceDetail) return;
    const newModule: Module = {
      id: `module-${Date.now()}`,
      name,
      tasks: [],
      isExpanded: true,
      order: spaceDetail.modules.length,
    };
    setSpaceDetail({
      ...spaceDetail,
      modules: [...spaceDetail.modules, newModule],
    });
  };

  const addTask = (moduleId: string, name: string) => {
    if (!spaceDetail) return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      moduleId,
      name,
      status: 'todo',
      order: 0,
    };
    
    setSpaceDetail({
      ...spaceDetail,
      modules: spaceDetail.modules.map(module =>
        module.id === moduleId
          ? { ...module, tasks: [...module.tasks, newTask] }
          : module
      ),
    });
  };

  const toggleModule = (moduleId: string) => {
    if (!spaceDetail) return;
    setSpaceDetail({
      ...spaceDetail,
      modules: spaceDetail.modules.map(module =>
        module.id === moduleId
          ? { ...module, isExpanded: !module.isExpanded }
          : module
      ),
    });
  };

  return {
    spaceDetail,
    loading,
    addTeam,
    addModule,
    addTask,
    toggleModule,
  };
};