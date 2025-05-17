
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from '@/types/auth';
import { ToastProps } from '@/components/ui/toast';

// Define type for toast function
type Toast = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

/**
 * Load user data from Supabase based on Privy authentication
 */
export async function loadUserDataFromSupabase(
  email: string, 
  toast: (props: Toast) => void
): Promise<User | null> {
  try {
    console.log("Loading user data for email:", email);
    
    // Check if user exists in our store_users table
    const { data: existingUser, error } = await supabase
      .from('store_users')
      .select('id, email, name, role, avatar, managed_by')
      .eq('email', email)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching user:', error);
      toast({
        title: 'Error fetching user data',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
    
    if (existingUser) {
      console.log("Existing user found:", existingUser);
      // User exists, return user data
      const userData: User = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name || email.split('@')[0],
        role: existingUser.role as UserRole,
        avatar: existingUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(existingUser.name || email)}&background=random`,
        managedBy: existingUser.managed_by
      };
      return userData;
    } else {
      console.log("Creating new user with email:", email);
      // First time login, create a new user with seller role by default
      const { data: newUser, error: createError } = await supabase
        .from('store_users')
        .insert([
          { 
            email,
            name: email.split('@')[0],
            role: 'seller', // Auto set to seller for first-time logins
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
          }
        ])
        .select()
        .single();
      
      if (createError) {
        console.error('Error creating user:', createError);
        toast({
          title: 'Error creating user',
          description: createError.message,
          variant: 'destructive',
        });
        return null;
      } else if (newUser) {
        console.log("New user created:", newUser);
        const userData: User = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name || email.split('@')[0],
          role: newUser.role as UserRole,
          avatar: newUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name || email)}&background=random`,
        };
        
        toast({
          title: 'Welcome to DeFi Warung WEB3',
          description: 'Your account has been created successfully.',
        });
        
        return userData;
      }
    }
  } catch (error: any) {
    console.error('Error in auth process:', error);
    toast({
      title: 'Authentication error',
      description: error.message || 'An unexpected error occurred',
      variant: 'destructive',
    });
  }
  
  return null;
}

/**
 * Fetch users managed by the specified user ID
 */
export async function fetchManagedUsers(userId: string): Promise<User[]> {
  try {
    console.log("Fetching managed users for:", userId);
    
    const { data, error } = await supabase
      .from('store_users')
      .select('id, email, name, role, avatar, managed_by')
      .eq('managed_by', userId);
      
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    } else if (data) {
      return data.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name || u.email.split('@')[0],
        role: u.role as UserRole,
        avatar: u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || u.email)}&background=random`,
        managedBy: u.managed_by
      }));
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
  
  return [];
}

/**
 * Create a new user associated with a store
 */
export async function createStoreUser(
  name: string, 
  email: string, 
  role: 'cashier' | 'inventory', 
  managedById: string,
  toast: (props: Toast) => void
): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('store_users')
      .insert([
        {
          name,
          email,
          role,
          managed_by: managedById,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        }
      ])
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    // Format user data
    const newUser: User = {
      id: data.id,
      email: data.email,
      name: data.name || data.email.split('@')[0],
      role: data.role as UserRole,
      avatar: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || data.email)}&background=random`,
      managedBy: data.managed_by
    };
    
    toast({
      title: "User created successfully",
      description: `${name} has been added as a ${role}`,
    });
    
    return newUser;
  } catch (error: any) {
    console.error('Error creating user:', error);
    toast({
      title: 'User creation failed',
      description: error.message || 'Failed to create user',
      variant: 'destructive',
    });
    return null;
  }
}
