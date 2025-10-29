export interface SpaceData {
  id: string;
  title: string;
  period: string;
  location: string;
  progress: number;
  memberCount: number;
  members: Array<{
    name: string;
    color: string;
  }>;
  instructor: {
    name: string;
    avatarColor?: string;
  };
  bgColor: string;
}

// DTO 타입 추가
export interface CreateSpaceDto {
  title: string;
  period: string;
  location: string;
  instructorId?: string;
  bgColor?: string;
}

export interface UpdateSpaceDto {
  title?: string;
  period?: string;
  location?: string;
  progress?: number;
  instructorId?: string;
  bgColor?: string;
}

export interface UserMenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  danger?: boolean;
}