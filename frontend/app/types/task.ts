export interface TaskDetail {
  id: string;
  moduleId: string;
  name: string;
  status: 'todo' | 'in_progress' | 'in_review' | 'done';
  createdAt: string;
  updatedAt: string;
  teamId: string;
  teamName: string;
  assignees: string[];
  guide: string;
  prompt: string;
  output: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  avatar?: string;
}

export type TabType = 'guide' | 'prompt' | 'output';