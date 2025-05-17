
import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletName } from '@solana/wallet-adapter-base';
import { useToast } from '@/hooks/use-toast';
import { getAccountBalance } from '@/utils/solana/account';
import { WalletContext } from './useWalletContext';
import { WalletType, InnerWalletProviderProps } from './types';

// This is the internal provider that uses the Solana wallet hooks
const InnerWalletProvider = ({ children }: InnerWalletProviderProps) => {
  const { connection } = useConnection();
  const { 
    connected, 
    publicKey, 
    select, 
    wallet, 
    connect: connectWallet, 
    disconnect: disconnectWallet 
  } = useWallet();
  
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Effect to sync Solana wallet state
  useEffect(() => {
    setIsConnected(connected);
    setWalletAddress(publicKey?.toString() || null);
    
    if (publicKey) {
      fetchBalance(publicKey.toString()).catch(console.error);
    } else {
      setBalance(null);
    }

    if (wallet) {
      // Determine the wallet type based on the adapter
      if (wallet.adapter instanceof PhantomWalletAdapter) {
        setWalletType('Phantom');
      } else if (wallet.adapter instanceof SolflareWalletAdapter) {
        setWalletType('Solflare');
      } else if (wallet.adapter instanceof CloverWalletAdapter) {
        setWalletType('Clover');
      }
    } else {
      setWalletType(null);
    }
  }, [connected, publicKey, wallet]);

  // Effect to check local storage for saved wallet type on initial load
  useEffect(() => {
    const savedWalletType = localStorage.getItem('walletType') as WalletType;
    if (savedWalletType) {
      setWalletType(savedWalletType);
    }
  }, []);

  // Function to fetch Solana balance
  const fetchBalance = async (address: string) => {
    try {
      const solBalance = await getAccountBalance(address);
      setBalance(solBalance);
      return solBalance;
    } catch (error) {
      console.error('Error fetching Solana balance:', error);
      // Use a mock balance for demo purposes
      setBalance(100);
      return 100;
    }
  };

  const connect = async (type: WalletType) => {
    try {
      setIsLoading(true);
      
      // Select the appropriate wallet adapter
      if (type) {
        // Instead of using type.toLowerCase(), we need to use the correct WalletName format
        // The WalletName is a special type, so we need to cast it properly
        select(type as unknown as WalletName);
        
        try {
          await connectWallet();
          
          // Save to local storage
          localStorage.setItem('walletType', type);
          
          toast({
            title: `${type} Wallet Connected`,
            description: `Your ${type} wallet has been successfully connected.`,
          });
          
          return Promise.resolve();
        } catch (error) {
          console.error(`${type} connection error:`, error);
          toast({
            title: `${type} Wallet Connection Failed`,
            description: "Make sure you have the wallet extension installed and try again.",
            variant: "destructive",
          });
          return Promise.reject(error);
        }
      } else {
        throw new Error('Invalid wallet type');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect your Solana wallet. Please try again.",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    disconnectWallet();
    localStorage.removeItem('walletType');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your Solana wallet has been disconnected.",
    });
  };

  const value = {
    isConnected,
    walletAddress,
    balance,
    walletType,
    connect,
    disconnect,
    isLoading
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default InnerWalletProvider;
