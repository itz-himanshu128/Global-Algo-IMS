import api from './api';

export interface UserData {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'Admin' | 'TeamLead' | 'Agent' | 'User';
  status: 'active' | 'inactive' | 'blocked';
  createdAt: string;
}

export const usersService = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; data: UserData[] }>('/users');
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: UserData }>(`/users/${id}`);
    return response.data.data;
  },

  create: async (userData: Partial<UserData>) => {
    const response = await api.post<{ success: boolean; data: UserData }>('/users', userData);
    return response.data.data;
  },

  update: async (id: string, userData: Partial<UserData>) => {
    const response = await api.put<{ success: boolean; data: UserData }>(`/users/${id}`, userData);
    return response.data.data;
  },

  delete: async (id: string) => {
    await api.delete(`/users/${id}`);
  },

  resetPassword: async (userId: string, newPassword: string) => {
    const response = await api.post(`/users/${userId}/reset-password`, { newPassword });
    return response.data;
  },
};
