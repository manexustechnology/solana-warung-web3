
import { User, UserRole } from '@/types/auth';

export interface PrivyAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userLoadError?: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean, data?: any, error?: any }>;
  logout: () => Promise<{ success: boolean, error?: any }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean, data?: any, error?: any }>;
  updateProfile: (updates: Record<string, any>) => Promise<{ success: boolean, data?: any, error?: any }>;
  getUserDetails: () => User | null;
  getUsers: () => User[];
  createUser: (name: string, email: string, role: 'cashier' | 'inventory') => Promise<void>;
}

export interface PrivyProviderProps {
  children: React.ReactNode;
}

export const PRIVY_APP_ID = "clt37qg280016l108rd1v8r3w";
