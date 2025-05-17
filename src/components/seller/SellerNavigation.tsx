
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  User, 
  BarChart, 
  FileText, 
  Settings, 
  LogOut,
  Bot
} from 'lucide-react';

import { User as UserType } from '@/types/auth';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  active: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, title, active, isCollapsed, onClick }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
        active ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground",
        isCollapsed && "justify-center"
      )}
      title={isCollapsed ? title : undefined}
    >
      <Icon className="h-4 w-4" />
      {!isCollapsed && <span>{title}</span>}
    </Link>
  );
};

interface SellerNavigationProps {
  user: UserType;
  onLogout: () => void;
  isCollapsed?: boolean;
  onNavItemClick?: () => void;
}

const SellerNavigation: React.FC<SellerNavigationProps> = ({ user, onLogout, isCollapsed, onNavItemClick }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className={cn("space-y-1 py-2", isCollapsed ? "px-1" : "px-2")}>
      <NavItem 
        href="/seller/dashboard" 
        icon={LayoutDashboard} 
        title="Dashboard" 
        active={currentPath === '/seller/dashboard'}
        isCollapsed={isCollapsed}
        onClick={onNavItemClick}
      />
      
      {(user.role === 'seller' || user.role === 'admin' || user.role === 'inventory') && (
        <NavItem 
          href="/seller/products" 
          icon={ShoppingBag} 
          title="Products" 
          active={currentPath === '/seller/products'}
          isCollapsed={isCollapsed}
          onClick={onNavItemClick}
        />
      )}
      
      {(user.role === 'seller' || user.role === 'admin' || user.role === 'cashier') && (
        <NavItem 
          href="/seller/pos" 
          icon={ShoppingCart} 
          title="Point of Sale" 
          active={currentPath === '/seller/pos'}
          isCollapsed={isCollapsed}
          onClick={onNavItemClick}
        />
      )}
      
      {(user.role === 'seller' || user.role === 'admin') && (
        <>
          <NavItem 
            href="/seller/customers" 
            icon={Users} 
            title="Customers" 
            active={currentPath === '/seller/customers'}
            isCollapsed={isCollapsed}
            onClick={onNavItemClick}
          />
          
          <NavItem 
            href="/seller/users" 
            icon={User} 
            title="User Management" 
            active={currentPath === '/seller/users'}
            isCollapsed={isCollapsed}
            onClick={onNavItemClick}
          />
          
          <NavItem 
            href="/seller/analytics" 
            icon={BarChart} 
            title="Analytics" 
            active={currentPath === '/seller/analytics'}
            isCollapsed={isCollapsed}
            onClick={onNavItemClick}
          />
          
          <NavItem 
            href="/seller/reports" 
            icon={FileText} 
            title="Reports" 
            active={currentPath === '/seller/reports'}
            isCollapsed={isCollapsed}
            onClick={onNavItemClick}
          />
          
          <NavItem 
            href="/seller/defi" 
            icon={Bot} 
            title="DeFi Agent" 
            active={currentPath === '/seller/defi'}
            isCollapsed={isCollapsed}
            onClick={onNavItemClick}
          />
        </>
      )}
      
      <NavItem 
        href="/seller/settings" 
        icon={Settings} 
        title="Settings" 
        active={currentPath === '/seller/settings'}
        isCollapsed={isCollapsed}
        onClick={onNavItemClick}
      />
      
      <button
        onClick={() => {
          if (onNavItemClick) onNavItemClick();
          onLogout();
        }}
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:text-destructive",
          isCollapsed && "justify-center"
        )}
      >
        <LogOut className="h-4 w-4" />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default SellerNavigation;
