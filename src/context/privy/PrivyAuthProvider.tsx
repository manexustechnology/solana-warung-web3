import React, { createContext, useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole } from '@/types/auth';
import { PrivyAuthContextType } from './types';
import { demoUsers } from './constants';
import { loadUserDataFromSupabase, fetchManagedUsers, createStoreUser } from './userManagement';
import { supabase } from '@/integrations/supabase/client';

// Create the context
export const PrivyAuthContext = createContext<PrivyAuthContextType | undefined>(undefined);

// Inner provider that has access to Privy hooks
export const PrivyAuthInnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ready, authenticated, user: privyUser, login: privyLogin, logout: privyLogout } = usePrivy();
  const [user, setUser] = useState<User | null>(null);
  const [userLoadError, setUserLoadError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  // Load user data on auth change
  useEffect(() => {
    const loadUserData = async () => {
      if (!ready) return;
      
      setIsLoading(true);
      setUserLoadError(false);
      
      // Check if there's user data in localStorage (for demo users)
      const localUser = localStorage.getItem('defi_store_user');
      if (localUser) {
        try {
          const userData = JSON.parse(localUser);
          setUser(userData);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error("Error parsing local user data:", error);
          localStorage.removeItem('defi_store_user');
        }
      }

      // Handle Privy authentication
      if (authenticated && privyUser) {
        try {
          // Get user's email from Privy
          const email = privyUser.email?.address;
          
          if (email) {
            try {
              const userData = await loadUserDataFromSupabase(email, toast);
              
              if (userData) {
                console.log("User data loaded successfully:", userData);
                setUser(userData);
              } else {
                console.error("Failed to load user data from Supabase");
                // Create a default seller user if data is not found
                const defaultUser: User = {
                  id: privyUser.id,
                  email: email,
                  name: email.split('@')[0],
                  role: 'seller',
                  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
                };
                setUser(defaultUser);
                
                toast({
                  title: 'Using default user profile',
                  description: 'We created a default seller profile for you',
                });
              }
            } catch (error) {
              console.error("Error in loadUserDataFromSupabase:", error);
              setUserLoadError(true);
              
              // Create a fallback user to allow access
              const fallbackUser: User = {
                id: privyUser.id,
                email: email,
                name: email.split('@')[0],
                role: 'seller',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
              };
              setUser(fallbackUser);
              
              toast({
                title: 'Error loading user data',
                description: 'Using fallback profile to maintain access',
                variant: 'destructive',
              });
            }
          } else {
            console.error("No email found in Privy user");
            setUserLoadError(true);
          }
        } catch (error) {
          console.error("Error in authentication process:", error);
          setUserLoadError(true);
          
          toast({
            title: 'Authentication error',
            description: 'An error occurred but you can continue using the app',
            variant: 'destructive',
          });
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    };
    
    loadUserData();
  }, [ready, authenticated, privyUser, toast]);
  
  // Load users for admin - only when user is loaded and is admin
  useEffect(() => {
    const loadUsers = async () => {
      if (!user || user.role !== 'admin') {
        setUsers([]);
        return;
      }
      
      try {
        const managedUsers = await fetchManagedUsers(user.id);
        setUsers(managedUsers);
      } catch (error) {
        console.error("Error fetching managed users:", error);
        // Don't block the UI, just show a toast
        toast({
          title: 'Error loading users',
          description: 'Could not load managed users',
          variant: 'destructive',
        });
      }
    };
    
    if (user) {
      loadUsers();
    }
  }, [user, toast]);

  // Email login (with support for demo users)
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Demo user login logic
      if ((email === 'demoseller@gmail.com' && password === 'demoseller123') || 
          (email === 'demobuyer@gmail.com' && password === 'demobuyer123')) {
        
        const demoUser = demoUsers[email as keyof typeof demoUsers];
        localStorage.setItem('defi_store_user', JSON.stringify(demoUser));
        setUser(demoUser);
        
        toast({
          title: 'Signed in successfully',
          description: `Welcome back, ${demoUser.name}`,
        });
        
        return { success: true, data: { user: demoUser } };
      }
      
      // Regular Privy login - this will trigger the auth state change effect
      try {
        await privyLogin();
        return { success: true };
      } catch (error) {
        console.error("Privy login error:", error);
        throw error;
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout
  const logout = async () => {
    try {
      // Clear local storage for demo users
      localStorage.removeItem('defi_store_user');
      
      // Privy logout
      if (authenticated) {
        await privyLogout();
      }
      
      setUser(null);
      
      toast({
        title: 'Signed out successfully',
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: 'Failed to sign out',
        description: error.message || 'An error occurred while signing out',
        variant: 'destructive',
      });
      return { success: false, error };
    }
  };
  
  // Update user profile
  const updateProfile = async (updates: Record<string, any>) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // For demo users
      const demoUserData = localStorage.getItem('defi_store_user');
      if (demoUserData) {
        const demoUser = JSON.parse(demoUserData);
        const updatedUser = { ...demoUser, ...updates };
        
        // Update local storage
        localStorage.setItem('defi_store_user', JSON.stringify(updatedUser));
        
        // Update state
        setUser(updatedUser);
        
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully',
        });
        
        return { success: true, data: updatedUser };
      }
      
      // Update in Supabase
      const { data, error } = await supabase
        .from('store_users')
        .update(updates)
        .eq('id', user.id)
        .select('*')
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        const updatedUser: User = {
          id: data.id,
          email: data.email,
          name: data.name || data.email.split('@')[0],
          role: data.role as UserRole,
          avatar: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || data.email)}&background=random`,
          managedBy: data.managed_by
        };
        
        setUser(updatedUser);
        
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully',
        });
        
        return { success: true, data: updatedUser };
      } else {
        // If no data returned, keep the current user
        toast({
          title: 'Profile update note',
          description: 'No changes were applied',
        });
        return { success: true, data: user };
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      toast({
        title: 'Update failed',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
      return { success: false, error };
    }
  };
  
  // Create a new user for the store
  const createUser = async (name: string, email: string, role: 'cashier' | 'inventory'): Promise<void> => {
    if (!user || (user.role !== 'admin' && user.role !== 'seller')) {
      toast({
        title: 'User creation failed',
        description: 'Unauthorized',
        variant: 'destructive',
      });
      return;
    }
    
    const newUser = await createStoreUser(name, email, role, user.id, toast);
    if (newUser) {
      setUsers(prev => [...prev, newUser]);
    }
  };
  
  // Get user details
  const getUserDetails = (): User | null => {
    return user;
  };
  
  // Get users (for admins)
  const getUsers = (): User[] => {
    return users;
  };
  
  // For debugging
  useEffect(() => {
    if (user) {
      console.log("Current authenticated user:", user);
    }
  }, [user]);
  
  return (
    <PrivyAuthContext.Provider 
      value={{
        isAuthenticated: !!user,
        isLoading,
        userLoadError,
        user,
        login,
        logout,
        signUp: login, // Use login for signup
        updateProfile,
        getUserDetails,
        getUsers,
        createUser
      }}
    >
      {children}
    </PrivyAuthContext.Provider>
  );
};
