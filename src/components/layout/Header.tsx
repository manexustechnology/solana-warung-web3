import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import WalletButton from '../ui/WalletButton';
import UserMenu from './UserMenu';
import LoginMenu from './LoginMenu';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, getUserDetails } = useAuth();
  const { isConnected, walletAddress, disconnect, balance } = useWallet();
  const navigate = useNavigate();
  const userDetails = getUserDetails();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    disconnect();
    navigate('/');
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Warung AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <DesktopNav />
        </div>

        {/* Desktop User Menu and Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Show wallet status and connect button */}
          {user ? (
            <>
              {isConnected ? (
                <div className="flex items-center space-x-2 p-2 rounded-md bg-green-50 border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)} 
                    {balance !== null && ` (${balance.toFixed(2)} SOL)`}
                  </span>
                </div>
              ) : (
                <WalletButton />
              )}
              
              <UserMenu onLogout={handleLogout} />
            </>
          ) : (
            <Button onClick={() => navigate('/login')} variant="default">
              Login
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav 
          isOpen={isMobileMenuOpen} 
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onLogout={handleLogout}
          isLoggedIn={!!user}
        />
      </div>
    </header>
  );
};

export default Header;
