export const MOCK_SPACES = [
  {
    id: 'agit-basic',
    title: 'AGIT Basic',
    period: '2025.10.01 ~ 2025.12.31',
    location: '배재명 강의실 A',
    progress: 30,
    memberCount: 24,
    members: [
      { name: 'K', color: '#f56a00' },
      { name: 'U', color: '#1890ff' }
    ],
    instructor: { name: '홍길동', avatarColor: '#87d068' },
    bgColor: '#f6ffed'
  },
  {
    id: 'agit-advanced',
    title: 'AGIT Advanced',
    period: '2025.10.01 ~ 2025.12.31',
    location: '온라인 Zoom',
    progress: 10,
    memberCount: 15,
    members: [
      { name: 'A', color: '#13c2c2' }
    ],
    instructor: { name: '이순신', avatarColor: '#1890ff' },
    bgColor: '#fffbe6'
  },
  {
    id: 'agit-expert',
    title: 'AGIT Expert',
    period: '2025.11.01 ~ 2026.01.31',
    location: '본사 101호',
    progress: 0,
    memberCount: 0,
    members: [],
    instructor: { name: '미지정' },
    bgColor: '#e6f7ff'
  }
];