export interface Team {
  id: string;
  name: string;
  members: string[];
  color?: string;
}

export interface Task {
  id: string;
  moduleId: string;
  name: string;
  status: 'todo' | 'in_progress' | 'in_review' | 'done';
  teamId?: string;
  assignees?: string[];
  order: number;
}

export interface Module {
  id: string;
  name: string;
  tasks: Task[];
  isExpanded: boolean;
  order: number;
}

export interface SpaceDetail {
  id: string;
  name: string;
  teams: Team[];
  modules: Module[];
  members: {
    owners: string[];
    experts: string[];
    participants: string[];
  };
}

export type ViewType = 'list' | 'team' | 'dashboard';