
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader, Mail } from 'lucide-react';

interface EmailSignInButtonProps {
  isLoading: boolean;
  authLoading: boolean;
  onClick: () => Promise<void>;
}

const EmailSignInButton = ({ isLoading, authLoading, onClick }: EmailSignInButtonProps) => {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center space-x-2 h-12"
      onClick={onClick}
      disabled={isLoading || authLoading}
    >
      {isLoading || authLoading ? (
        <Loader className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Mail className="h-5 w-5 mr-2" />
      )}
      <span>{isLoading || authLoading ? 'Signing in...' : 'Sign in with Email'}</span>
    </Button>
  );
};

export default EmailSignInButton;
