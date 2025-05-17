
import { 
  PublicKey, 
  Transaction, 
  Keypair, 
  sendAndConfirmTransaction 
} from '@solana/web3.js';
import { 
  createMint, 
  getOrCreateAssociatedTokenAccount, 
  mintTo, 
  transfer,
  createAssociatedTokenAccountInstruction  
} from '@solana/spl-token';
import { solanaConnection } from './client';

/**
 * Create a new SPL token
 */
export const createToken = async (
  creatorKeypair: Keypair,
  tokenName: string,
  tokenSymbol: string,
  totalSupply: number,
  decimals: number
) => {
  try {
    // Create new token mint
    const mint = await createMint(
      solanaConnection,
      creatorKeypair,
      creatorKeypair.publicKey,
      creatorKeypair.publicKey,
      decimals
    );
    
    // Get the token account of the creator address, create it if it doesn't exist
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      solanaConnection,
      creatorKeypair,
      mint,
      creatorKeypair.publicKey
    );
    
    // Mint the total supply to the creator's token account
    const mintSignature = await mintTo(
      solanaConnection,
      creatorKeypair,
      mint,
      tokenAccount.address,
      creatorKeypair.publicKey,
      totalSupply * Math.pow(10, decimals)
    );
    
    return {
      tokenId: mint.toString(),
      ownerTokenAccount: tokenAccount.address.toString(),
      txId: mintSignature,
    };
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
};

/**
 * Transfer an SPL token from one account to another
 */
export const transferToken = async (
  senderKeypair: Keypair,
  receiverAddress: string,
  tokenMint: string,
  amount: number
) => {
  try {
    const mint = new PublicKey(tokenMint);
    const receiver = new PublicKey(receiverAddress);
    
    // Get the token account of the sender address, create it if it doesn't exist
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      solanaConnection,
      senderKeypair,
      mint,
      senderKeypair.publicKey
    );
    
    // Get the token account of the receiver address, create it if it doesn't exist
    const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
      solanaConnection,
      senderKeypair,
      mint,
      receiver
    );
    
    // Transfer the tokens
    const signature = await transfer(
      solanaConnection,
      senderKeypair,
      senderTokenAccount.address,
      receiverTokenAccount.address,
      senderKeypair.publicKey,
      amount
    );
    
    return {
      txId: signature
    };
  } catch (error) {
    console.error('Error transferring token:', error);
    throw error;
  }
};

/**
 * Opt-in to an SPL token (create associated token account)
 */
export const optInToToken = async (
  userKeypair: Keypair,
  tokenMint: string
) => {
  try {
    const mint = new PublicKey(tokenMint);
    
    // Create associated token account for the user if it doesn't exist
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      solanaConnection,
      userKeypair,
      mint,
      userKeypair.publicKey
    );
    
    return {
      tokenAccount: tokenAccount.address.toString()
    };
  } catch (error) {
    console.error('Error opting in to token:', error);
    throw error;
  }
};

/**
 * Get token information
 */
export const getTokenInfo = async (tokenMint: string): Promise<any> => {
  try {
    const mint = new PublicKey(tokenMint);
    const tokenInfo = await solanaConnection.getParsedAccountInfo(mint);
    
    if (tokenInfo && tokenInfo.value) {
      return tokenInfo.value.data;
    }
    throw new Error('Token info not found');
  } catch (error) {
    console.error('Error getting token info:', error);
    throw error;
  }
};
