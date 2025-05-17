
import { Connection, clusterApiUrl } from '@solana/web3.js';

// Create a Solana connection
export const solanaConnection = new Connection(clusterApiUrl('devnet'));

// Constants
export const SOL_DECIMALS = 9;

/**
 * Convert lamports to SOL
 */
export const lamportsToSol = (lamports: number | bigint): number => {
  // Handle the case where lamports is a bigint
  const amount = typeof lamports === 'bigint' ? Number(lamports) : lamports;
  return amount / Math.pow(10, SOL_DECIMALS);
};

/**
 * Convert SOL to lamports
 */
export const solToLamports = (sol: number): number => {
  return sol * Math.pow(10, SOL_DECIMALS);
};
