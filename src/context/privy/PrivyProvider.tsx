
import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { PrivyAuthInnerProvider } from './PrivyAuthProvider';
import { PRIVY_APP_ID } from './constants';

// Root provider with Privy config
export const PrivyAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['email'],
        appearance: {
          theme: 'light',
          accentColor: '#10b981', // Green color to match the app's theme
          logo: 'https://i.ibb.co/MpP4LKS/defi-warung-logo.png',
          showWalletLoginFirst: false,
        },
        embeddedWallets: {
          noPromptOnSignature: false,
        },
      }}
    >
      <PrivyAuthInnerProvider>{children}</PrivyAuthInnerProvider>
    </PrivyProvider>
  );
};
