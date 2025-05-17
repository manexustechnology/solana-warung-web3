
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { User } from '@/types/auth';
import UserProfile from '@/components/seller/UserProfile';
import SellerNavigation from '@/components/seller/SellerNavigation';
import { Separator } from '@/components/ui/separator';

interface MobileSidebarProps {
  user: User;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="md:hidden bg-white border-b py-4 px-4 flex items-center justify-between">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  DeFi Agent Store
                </span>
              </Link>
            </div>
            
            <UserProfile user={user} />
            
            <Separator className="my-2" />
            
            <div className="flex-1 overflow-auto">
              <SellerNavigation 
                user={user} 
                onLogout={() => {}} 
                onNavItemClick={() => setOpen(false)}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          DeFi Agent Store
        </span>
      </Link>
      
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default MobileSidebar;
