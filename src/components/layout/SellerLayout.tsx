
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import UserProfile from '@/components/seller/UserProfile';
import SellerNavigation from '@/components/seller/SellerNavigation';
import MobileSidebar from '@/components/seller/MobileSidebar';
import SidebarToggle from '@/components/seller/SidebarToggle';
import useSidebar from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

interface SellerLayoutProps {
  children: React.ReactNode;
}

const SellerLayout: React.FC<SellerLayoutProps> = ({ children }) => {
  const { user, logout, getUserDetails, userLoadError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isCollapsed } = useSidebar();
  const userDetails = getUserDetails();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    navigate('/login');
  };

  // If no user, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  // Simplified role check that works even with fallback user
  // Allow access to dashboard if there's a user object, even with errors
  const role = userDetails?.role || 'seller';
  
  // Role-based redirects - only apply if we have valid user data without errors
  if (!userLoadError) {
    if (role === 'cashier' && !window.location.pathname.startsWith('/seller/pos')) {
      navigate('/seller/pos');
    } else if (role === 'inventory' && !window.location.pathname.startsWith('/seller/products')) {
      navigate('/seller/products');
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div 
        className={cn(
          "fixed top-0 left-0 h-full z-10 bg-white border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarToggle />
        <div className={cn("p-4", isCollapsed && "flex justify-center")}>
          <Link to="/" className={cn("flex items-center", isCollapsed ? "justify-center" : "space-x-2")}>
            {!isCollapsed ? (
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">DeFi Warung WEB3</span>
            ) : (
              <span className="text-xl font-bold">DW</span>
            )}
          </Link>
        </div>
        
        {!isCollapsed && userDetails && <UserProfile user={userDetails} />}

        <Separator className="my-2" />

        <SellerNavigation user={userDetails || { id: '0', name: 'User', email: '', role: 'seller' }} onLogout={handleLogout} isCollapsed={isCollapsed} />
      </div>

      <div className={cn(
        "flex flex-col flex-1 overflow-hidden w-full transition-all duration-300 ease-in-out",
        isCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <MobileSidebar user={userDetails || { id: '0', name: 'User', email: '', role: 'seller' }} />
        
        {userLoadError && (
          <Alert variant="destructive" className="mb-4 mx-4 mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading complete user data</AlertTitle>
            <AlertDescription>
              There was an issue loading your full user profile. Some functionality might be limited.
            </AlertDescription>
          </Alert>
        )}
        
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default SellerLayout;
