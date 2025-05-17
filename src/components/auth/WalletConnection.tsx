
import React from 'react';
import WalletButton from '@/components/ui/WalletButton';

const WalletConnection = () => {
  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-gray-600 mb-2">
        Connect with your Solana wallet
      </div>
      <WalletButton fullWidth />
    </div>
  );
};

export default WalletConnection;
