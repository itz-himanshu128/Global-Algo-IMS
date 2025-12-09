import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'Admin' | 'TeamLead' | 'Agent' | 'User' | null;

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Detect user role based on email domain or predefined mapping
  const detectRole = (email: string): UserRole => {
    // Role detection logic based on email patterns
    if (email.includes('admin')) return 'Admin';
    if (email.includes('lead')) return 'TeamLead';
    if (email.includes('agent')) return 'Agent';
    return 'User'; // Default role for generic users
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate email and password (in production, this would call a real API)
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Auto-detect role from email
      const detectedRole = detectRole(email);

      // Create user object
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0].split('.').join(' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        email,
        username: email.split('@')[0],
        role: detectedRole,
      };

      // Store user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('currentUser');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
  };

  const setRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
