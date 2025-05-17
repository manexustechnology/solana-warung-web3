
import { useContext } from 'react';
import { PrivyAuthContext } from './PrivyAuthProvider';
import { PrivyAuthContextType } from './types';

// Hook to access the auth context
export const usePrivyAuth = (): PrivyAuthContextType => {
  const context = useContext(PrivyAuthContext);
  
  if (context === undefined) {
    throw new Error('usePrivyAuth must be used within a PrivyAuthProvider');
  }
  
  return context;
};
