
import { User, UserRole } from '@/types/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

// Save user data to localStorage
export const saveUserData = (user: User): void => {
  localStorage.setItem(`user_data_${user.id}`, JSON.stringify(user));
};

// Load user data from localStorage
export const loadUserData = (userId: string): User | null => {
  const userData = localStorage.getItem(`user_data_${userId}`);
  return userData ? JSON.parse(userData) : null;
};

// Create a user object from Firebase user
export const createUserFromFirebase = (firebaseUser: any): User => {
  return {
    id: firebaseUser.uid || `temp-user-${Date.now()}`,
    name: firebaseUser.displayName || 'User',
    email: firebaseUser.email || 'dummy@example.com',
    role: 'seller', // Changed default role to 'seller' to give access to dashboard
    avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=User&background=random`
  };
};

// Handle Google sign in
export const signInWithGoogle = async (): Promise<User> => {
  try {
    // Try actual Google sign in first
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    const newUser: User = createUserFromFirebase(result.user);
    saveUserData(newUser);
    
    return newUser;
  } catch (error) {
    console.error('Google login failed, using fallback mock login:', error);
    
    // If Google login fails for any reason (API key issues, etc), create a mock seller user
    const mockUser: User = {
      id: `mock-user-${Date.now()}`,
      name: 'Demo Seller',
      email: 'demo@seller.com',
      role: 'seller',
      avatar: `https://ui-avatars.com/api/?name=Demo+Seller&background=random`,
    };
    
    // Save mock user to localStorage for persistence
    saveUserData(mockUser);
    localStorage.setItem('defi_store_user', JSON.stringify(mockUser));
    
    return mockUser;
  }
};

// Legacy functions for mock authentication
export const mockLogin = async (email: string, role: UserRole): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500)); // Reduced delay time
  
  const mockUser: User = {
    id: `user-${Date.now()}`,
    name: role === 'buyer' ? 'Sample Buyer' : `Sample ${role?.[0].toUpperCase() + role?.slice(1)}`,
    email,
    role,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random`,
  };
  
  localStorage.setItem('defi_store_user', JSON.stringify(mockUser));
  return mockUser;
};

export const mockSignup = async (name: string, email: string, role: UserRole): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create a new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    role,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
  };
  
  // Add user to our mock database
  const users = JSON.parse(localStorage.getItem('defi_store_users') || '[]');
  users.push(newUser);
  localStorage.setItem('defi_store_users', JSON.stringify(users));
  
  // Auto login after signup
  localStorage.setItem('defi_store_user', JSON.stringify(newUser));
  
  return newUser;
};

export const mockCreateUser = async (name: string, email: string, role: UserRole, adminId: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    role,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    managedBy: adminId,
  };
  
  // Add user to our mock database
  const users = JSON.parse(localStorage.getItem('defi_store_users') || '[]');
  users.push(newUser);
  localStorage.setItem('defi_store_users', JSON.stringify(users));
  
  return newUser;
};

export const getManagedUsers = (adminId: string): User[] => {
  const users = JSON.parse(localStorage.getItem('defi_store_users') || '[]');
  return users.filter((u: User) => u.managedBy === adminId);
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
  // Clear any local user data
  if (auth.currentUser) {
    localStorage.removeItem(`user_data_${auth.currentUser.uid}`);
  }
  localStorage.removeItem('defi_store_user'); // Legacy
};
