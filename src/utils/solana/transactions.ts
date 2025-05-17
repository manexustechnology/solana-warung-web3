
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  Keypair,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { solanaConnection, solToLamports } from './client';

/**
 * Send SOL from one account to another
 */
export const sendSol = async (
  senderKeypair: Keypair,
  receiverAddress: string,
  amount: number
) => {
  try {
    // Convert from SOL to lamports
    const amountInLamports = solToLamports(amount);
    
    // Create a new transaction for the transfer
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: new PublicKey(receiverAddress),
        lamports: amountInLamports,
      })
    );
    
    // Get recent blockhash
    const { blockhash } = await solanaConnection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = senderKeypair.publicKey;
    
    // Sign and send the transaction
    const signature = await sendAndConfirmTransaction(
      solanaConnection,
      transaction,
      [senderKeypair]
    );
    
    return {
      txId: signature
    };
  } catch (error) {
    console.error('Error sending SOL:', error);
    throw error;
  }
};
