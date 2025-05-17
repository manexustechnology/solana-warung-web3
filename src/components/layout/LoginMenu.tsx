
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrivy } from '@privy-io/react-auth';

const LoginMenu: React.FC = () => {
  const navigate = useNavigate();
  const { login: privyLogin } = usePrivy();
  
  const handleLogin = async () => {
    try {
      // Try to use Privy directly for login, falling back to navigation
      await privyLogin();
    } catch (error) {
      // If direct login fails, navigate to login page
      navigate('/login');
    }
  };
  
  return (
    <Button 
      variant="outline" 
      className="flex items-center space-x-2"
      onClick={handleLogin}
    >
      <LogIn className="h-5 w-5" />
      <span>Login</span>
    </Button>
  );
};

export default LoginMenu;
