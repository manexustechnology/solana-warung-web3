
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface UserMenuProps {
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { getUserDetails } = useAuth();
  const userDetails = getUserDetails();

  if (!userDetails) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>{userDetails.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          Logged in as {userDetails.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userDetails && (userDetails.role === 'seller' || userDetails.role === 'admin') && (
          <DropdownMenuItem onClick={() => navigate('/seller/dashboard')}>
            <User className="mr-2 h-4 w-4" />
            <span>Seller Dashboard</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
