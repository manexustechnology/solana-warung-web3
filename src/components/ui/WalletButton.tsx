
import React from 'react';
import { Wallet, ChevronDown, Loader } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

type WalletButtonProps = {
  fullWidth?: boolean;
  navigateToLogin?: boolean;
};

const WalletButton = ({ fullWidth = false, navigateToLogin = false }: WalletButtonProps) => {
  const { isConnected, connect, disconnect, walletAddress, walletType, isLoading } = useWallet();
  const { setVisible } = useWalletModal();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, user } = useAuth();

  const handleConnect = async (walletType: 'Phantom' | 'Solflare' | 'Clover') => {
    if (navigateToLogin) {
      navigate('/login');
      return;
    }

    try {
      await connect(walletType);
      // Auto login as buyer when connecting wallet
      if (!user) {
        await signIn('wallet@example.com', 'walletauth');
      }
      
      toast({
        title: `${walletType} Wallet Connected`,
        description: `Your ${walletType} wallet has been successfully connected and you are now logged in.`,
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOpenWalletModal = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (isConnected) {
    return (
      <button
        className={`btn-primary flex items-center justify-center space-x-2 ${fullWidth ? 'w-full' : ''}`}
        onClick={handleDisconnect}
        disabled={isLoading}
      >
        <Wallet className="h-5 w-5" />
        <span>{`${walletAddress?.substring(0, 6)}...${walletAddress?.substring(walletAddress.length - 4)}`}</span>
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`btn-primary flex items-center justify-center space-x-2 ${fullWidth ? 'w-full' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
              Connecting...
            </span>
          ) : (
            <>
              <Wallet className="h-5 w-5" />
              <span>Connect Wallet</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleConnect('Phantom')}>
          Phantom Wallet
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleConnect('Solflare')}>
          Solflare Wallet
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleConnect('Clover')}>
          Clover Wallet
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenWalletModal}>
          More Wallets
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletButton;
