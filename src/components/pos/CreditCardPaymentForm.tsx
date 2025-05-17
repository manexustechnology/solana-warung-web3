
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreditCardPaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onPaymentComplete: () => void;
}

const CreditCardPaymentForm = ({ 
  open, 
  onOpenChange, 
  total, 
  onPaymentComplete 
}: CreditCardPaymentFormProps) => {
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!cardNumber || !cardName || !expiry || !cvv) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `Credit card payment of $${total.toFixed(2)} was successful.`,
      });
      
      // Reset form
      setCardNumber('');
      setCardName('');
      setExpiry('');
      setCvv('');
      
      // Close dialog and notify parent component
      onOpenChange(false);
      onPaymentComplete();
    }, 2000);
  };
  
  // Format card number with spaces every 4 digits
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(' ') : digits;
  };
  
  // Format expiry date as MM/YY
  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Credit Card Payment
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input 
              id="cardNumber" 
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="font-mono"
              disabled={isProcessing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input 
              id="cardName" 
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              disabled={isProcessing}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input 
                id="expiry" 
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="font-mono"
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv" 
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength={3}
                className="font-mono"
                type="password"
                disabled={isProcessing}
              />
            </div>
          </div>
          
          <div className="pt-4 font-semibold text-right">
            Total: ${total.toFixed(2)}
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
              type="submit"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Pay ${total.toFixed(2)}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreditCardPaymentForm;
