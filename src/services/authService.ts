import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  role: 'Admin' | 'TeamLead' | 'Agent' | 'User';
  createdAt?: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  message?: string;
}

// Mock user data for development
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@company.com': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Admin User',
      email: 'admin@company.com',
      username: 'admin',
      role: 'Admin',
      createdAt: new Date().toISOString(),
    },
  },
  'teamlead@company.com': {
    password: 'lead123',
    user: {
      id: '2',
      name: 'Team Lead',
      email: 'teamlead@company.com',
      username: 'teamlead',
      role: 'TeamLead',
      createdAt: new Date().toISOString(),
    },
  },
  'agent@company.com': {
    password: 'agent123',
    user: {
      id: '3',
      name: 'Agent User',
      email: 'agent@company.com',
      username: 'agent',
      role: 'Agent',
      createdAt: new Date().toISOString(),
    },
  },
  'user@company.com': {
    password: 'user123',
    user: {
      id: '4',
      name: 'Regular User',
      email: 'user@company.com',
      username: 'user',
      role: 'User',
      createdAt: new Date().toISOString(),
    },
  },
};

// Generate mock JWT token (for development)
const generateMockToken = (): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 86400 }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

export const authService = {
  // Login with credentials
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      // Fallback to mock authentication in development
      console.warn('Backend unavailable, using mock authentication');
      
      const mockUser = mockUsers[credentials.email];
      if (!mockUser || mockUser.password !== credentials.password) {
        throw new Error('Invalid email or password');
      }

      return {
        success: true,
        data: {
          user: mockUser.user,
          token: generateMockToken(),
        },
      };
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Get current user info
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<{ success: boolean; data: User }>('/auth/me');
      return response.data.data;
    } catch (error) {
      // Fallback: return user from localStorage if backend unavailable
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      throw error;
    }
  },

  // Refresh access token
  refreshToken: async (): Promise<string> => {
    const response = await api.post<{ success: boolean; data: { token: string } }>('/auth/refresh');
    return response.data.data.token;
  },

  // Change password
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await api.post('/auth/change-password', { oldPassword, newPassword });
  },
};
