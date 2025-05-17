
import { PublicKey } from '@solana/web3.js';
import { solanaConnection, lamportsToSol } from './client';

/**
 * Get account balance in SOL
 */
export const getAccountBalance = async (address: string): Promise<number> => {
  try {
    const publicKey = new PublicKey(address);
    const balance = await solanaConnection.getBalance(publicKey);
    return lamportsToSol(balance);
  } catch (error) {
    console.error('Error getting account balance:', error);
    throw error;
  }
};

/**
 * Get account tokens
 */
export const getAccountTokens = async (address: string): Promise<any[]> => {
  try {
    const publicKey = new PublicKey(address);
    // To get token balances would require additional Solana SPL Token logic
    // This is a simplified version that would need to be expanded with @solana/spl-token
    const tokenAccounts = await solanaConnection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    );

    return tokenAccounts.value.map(account => {
      const parsedInfo = account.account.data.parsed.info;
      return {
        mint: parsedInfo.mint,
        owner: parsedInfo.owner,
        tokenAmount: parsedInfo.tokenAmount,
      };
    });
  } catch (error) {
    console.error('Error getting account tokens:', error);
    // Return empty array as fallback
    return [];
  }
};
