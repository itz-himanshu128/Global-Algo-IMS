import api from './api';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: string;
  priority?: 'High' | 'Medium' | 'Low';
  source?: string;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
}

export const leadsService = {
  getAll: async (filters?: any) => {
    const response = await api.get<{ success: boolean; data: Lead[] }>('/leads', {
      params: filters,
    });
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Lead }>(`/leads/${id}`);
    return response.data.data;
  },

  create: async (leadData: Partial<Lead>) => {
    const response = await api.post<{ success: boolean; data: Lead }>('/leads', leadData);
    return response.data.data;
  },

  update: async (id: string, leadData: Partial<Lead>) => {
    const response = await api.put<{ success: boolean; data: Lead }>(`/leads/${id}`, leadData);
    return response.data.data;
  },

  delete: async (id: string) => {
    await api.delete(`/leads/${id}`);
  },

  assignToAgent: async (leadIds: string[], agentId: string) => {
    const response = await api.post('/leads/assign', { leadIds, agentId });
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.patch<{ success: boolean; data: Lead }>(`/leads/${id}/status`, {
      status,
    });
    return response.data.data;
  },
};
