import { useState, useEffect } from 'react';
import type { SpaceData } from '@/app/types';
import { MOCK_SPACES } from '@/app/constants'; // import 추가
import { SpaceService } from '@/app/services/spaceService';

export const useSpaces = () => {
  const [spaces, setSpaces] = useState<SpaceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 실제 API 호출 시
      // const response = await SpaceService.getSpaces();
      // setSpaces(response.data);
      
      // 현재는 MOCK 데이터 사용
      setSpaces(MOCK_SPACES);
    } catch (err) {
      setError(err instanceof Error ? err.message : '스페이스를 불러오는데 실패했습니다.');
      console.error('Failed to fetch spaces:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSpace = async (spaceData: Partial<SpaceData>) => {
    try {
      // 실제 API 호출 시
      // const response = await SpaceService.createSpace(spaceData);
      // setSpaces(prev => [...prev, response.data]);
      
      // 현재는 MOCK 추가
      const newSpace: SpaceData = {
        id: `space-${Date.now()}`,
        title: spaceData.title || '새 스페이스',
        period: spaceData.period || '미정',
        location: spaceData.location || '미정',
        progress: 0,
        memberCount: 0,
        members: [],
        instructor: spaceData.instructor || { name: '미지정' },
        bgColor: spaceData.bgColor || '#f0f0f0',
      };
      
      setSpaces(prev => [...prev, newSpace]);
      return newSpace;
    } catch (err) {
      setError(err instanceof Error ? err.message : '스페이스 추가에 실패했습니다.');
      throw err;
    }
  };

  const updateSpace = async (id: string, spaceData: Partial<SpaceData>) => {
    try {
      // 실제 API 호출 시
      // const response = await SpaceService.updateSpace(id, spaceData);
      // setSpaces(prev => prev.map(space => 
      //   space.id === id ? response.data : space
      // ));
      
      // 현재는 MOCK 업데이트
      setSpaces(prev => prev.map(space => 
        space.id === id ? { ...space, ...spaceData } : space
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : '스페이스 수정에 실패했습니다.');
      throw err;
    }
  };

  const deleteSpace = async (id: string) => {
    try {
      // 실제 API 호출 시
      // await SpaceService.deleteSpace(id);
      
      // 현재는 MOCK 삭제
      setSpaces(prev => prev.filter(space => space.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '스페이스 삭제에 실패했습니다.');
      throw err;
    }
  };

  return { 
    spaces, 
    loading, 
    error,
    addSpace, 
    updateSpace,
    deleteSpace,
    refetch: fetchSpaces 
  };
};