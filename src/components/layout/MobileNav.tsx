
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Menu, Search } from 'lucide-react';
import WalletButton from '../ui/WalletButton';
import { useWallet } from '@/context/WalletContext';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ 
  isOpen, 
  onToggle, 
  onLogout,
  isLoggedIn
}) => {
  const { isConnected, walletAddress, balance } = useWallet();

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors duration-200"
        onClick={onToggle}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-white pt-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="container mx-auto px-6 py-4 flex flex-col">
          <Link 
            to="/" 
            className="py-3 border-b border-gray-100"
            onClick={onToggle}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="py-3 border-b border-gray-100"
            onClick={onToggle}
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className="py-3 border-b border-gray-100"
            onClick={onToggle}
          >
            About
          </Link>
          <div className="mt-4 flex flex-col space-y-4">
            <button className="flex items-center space-x-2 p-2 rounded-full bg-secondary w-full justify-center" aria-label="Search">
              <Search className="h-5 w-5" /> <span>Search</span>
            </button>
            {isConnected && (
              <div className="flex items-center justify-center space-x-2 p-2 rounded-md bg-green-50 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">
                  {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress?.length - 4)} 
                  {balance !== null && ` (${balance.toFixed(2)} ALGO)`}
                </span>
              </div>
            )}
            {isLoggedIn ? (
              <button className="w-full p-2 bg-red-500 text-white rounded-md" onClick={onLogout}>
                Logout
              </button>
            ) : (
              <div className="p-2">
                <WalletButton fullWidth navigateToLogin={true} />
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
