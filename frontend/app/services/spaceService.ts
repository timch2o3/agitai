import type { SpaceData, CreateSpaceDto, UpdateSpaceDto } from '@/app/types';

// API 클라이언트 설정 (예시)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// 임시 API 클라이언트 (실제로는 axios 등 사용)
const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return { data: await response.json() };
  },
  
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return { data: await response.json() };
  },
  
  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return { data: await response.json() };
  },
  
  delete: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return { data: await response.json() };
  },
};

export class SpaceService {
  static async getSpaces(): Promise<{ data: SpaceData[] }> {
    return await api.get('/spaces');
  }

  static async getSpace(id: string): Promise<{ data: SpaceData }> {
    return await api.get(`/spaces/${id}`);
  }

  static async createSpace(data: CreateSpaceDto): Promise<{ data: SpaceData }> {
    return await api.post('/spaces', data);
  }

  static async updateSpace(id: string, data: UpdateSpaceDto): Promise<{ data: SpaceData }> {
    return await api.put(`/spaces/${id}`, data);
  }

  static async deleteSpace(id: string): Promise<{ data: { success: boolean } }> {
    return await api.delete(`/spaces/${id}`);
  }
}