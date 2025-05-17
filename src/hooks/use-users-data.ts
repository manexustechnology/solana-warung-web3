
import { useState, useEffect } from 'react';
import { demoStoreUsers } from '@/data/demoData';
import { fetchWithFallback, submitWithFallback } from '@/utils/supabaseHelpers';
import { User, UserRole } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';

export function useUsersData() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    setLoading(true);

    try {
      if (!currentUser?.id) {
        setUsers(demoStoreUsers as User[]);
        setIsDemo(true);
        setLoading(false);
        return;
      }

      const result = await fetchWithFallback<User>(
        'store_users', 
        demoStoreUsers as User[],
        { 
          select: 'id, name, email, role, avatar, managed_by',
          filters: [{ column: 'managed_by', value: currentUser.id }]
        }
      );

      setUsers(result.data);
      setIsDemo(result.isDemo);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers(demoStoreUsers as User[]);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (name: string, email: string, role: UserRole) => {
    if (!currentUser?.id) {
      // If no current user, operate in demo mode
      const newUser = {
        id: `demo-${Date.now()}`,
        name,
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      };

      setUsers([...users, newUser as User]);
      
      return { success: true, isDemo: true, data: newUser };
    }

    const newUser = {
      name,
      email,
      role,
      managed_by: currentUser.id,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };

    const result = await submitWithFallback<any>(
      'store_users',
      newUser,
      (data) => {
        // On success, add to the users list
        setUsers(prevUsers => [...prevUsers, data as User]);
      },
      () => {
        // Fallback action for demo mode
        const demoUser = {
          id: `demo-${Date.now()}`,
          ...newUser
        };
        setUsers(prevUsers => [...prevUsers, demoUser as User]);
      }
    );

    return result;
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser?.id]);

  return {
    users,
    loading,
    isDemo,
    refresh: fetchUsers,
    createUser
  };
}
