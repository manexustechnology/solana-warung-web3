
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Wallet, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CryptoPaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onPaymentComplete: () => void;
}

const CryptoPaymentForm = ({ 
  open, 
  onOpenChange, 
  total, 
  onPaymentComplete 
}: CryptoPaymentFormProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Fake crypto addresses
  const solAddress = "FgSN4yxRzUvehCxVQgxs6J3BrtJLXpWqe4SBqAvPRgEF";
  const sptAddress = "SPT6J8oFNJ1zHGiQKDUyfMJwj9Gw2G5TVwcoZ9uFPNF";
  
  // Convert USD to estimated crypto amounts (just for display)
  const estimatedSOL = (total / 80).toFixed(6); // Assuming 1 SOL = $80
  const estimatedSPT = (total / 0.05).toFixed(6); // Assuming 1 SPT token = $0.05
  
  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "The Solana address has been copied to clipboard.",
    });
  };
  
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment verification
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `Solana payment of $${total.toFixed(2)} was successful.`,
      });
      
      // Close dialog and notify parent component
      onOpenChange(false);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Solana Payment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">Send exactly</p>
              <div className="text-xl font-bold">${total.toFixed(2)} USD</div>
              <p className="text-sm text-muted-foreground">Approximately</p>
              <div className="text-md">SOL: {estimatedSOL}</div>
              <div className="text-md">SPT: {estimatedSPT}</div>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs">Solana Address</Label>
                <div className="flex items-center">
                  <Input 
                    value={solAddress}
                    readOnly
                    className="font-mono text-xs pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-6"
                    onClick={() => handleCopy(solAddress)}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">SPT Token Address</Label>
                <div className="flex items-center">
                  <Input 
                    value={sptAddress}
                    readOnly
                    className="font-mono text-xs pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-6"
                    onClick={() => handleCopy(sptAddress)}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-700">
            <p>For demo purposes, click "Confirm Payment" to simulate a successful transaction.</p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Confirm Payment
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CryptoPaymentForm;
