
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { User as CustomUser } from '@/types/auth';

export interface AuthContextType {
  user: SupabaseUser | CustomUser | null;
  session: Session | null;
  isLoading: boolean;
  userProfile: any;
  userLoadError?: boolean;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<{ success: boolean; data?: any; error?: any }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: any }>;
  signInWithOAuth: (provider: 'google' | 'github' | 'facebook') => Promise<{ success: boolean; data?: any; error?: any }>;
  signOut: () => Promise<{ success: boolean; error?: any }>;
  updateProfile: (updates: Record<string, any>) => Promise<{ success: boolean; data?: any; error?: any }>;
  
  // User management methods
  getUserDetails: () => CustomUser | null;
  getUsers: () => CustomUser[];
  createUser: (name: string, email: string, role: 'cashier' | 'inventory') => Promise<void>;
  
  // Aliases for better compatibility with existing code
  login: (email: string, password: string, role?: string) => Promise<{ success: boolean; data?: any; error?: any }>;
  loginWithGoogle: () => Promise<{ success: boolean; data?: any; error?: any }>;
  logout: () => Promise<{ success: boolean; error?: any }>;
}
