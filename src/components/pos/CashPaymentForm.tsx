
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CashPaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onPaymentComplete: () => void;
}

const CashPaymentForm = ({ 
  open, 
  onOpenChange, 
  total, 
  onPaymentComplete 
}: CashPaymentFormProps) => {
  const { toast } = useToast();
  const [cashAmount, setCashAmount] = useState('');
  const [change, setChange] = useState(0);
  
  useEffect(() => {
    if (open) {
      setCashAmount(total.toFixed(2)); // Default to exact amount
      setChange(0);
    }
  }, [open, total]);
  
  const handleCashAmountChange = (value: string) => {
    // Remove non-numeric characters except decimal point
    value = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = `${parts[0]}.${parts.slice(1).join('')}`;
    }
    
    setCashAmount(value);
    
    // Calculate change
    const amount = parseFloat(value || '0');
    setChange(Math.max(0, amount - total));
  };
  
  const handleComplete = () => {
    const amount = parseFloat(cashAmount || '0');
    
    if (amount < total) {
      toast({
        title: "Insufficient Amount",
        description: "Cash amount must be equal to or greater than the total.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Payment Successful",
      description: `Cash payment of $${amount.toFixed(2)} received with $${change.toFixed(2)} change.`,
    });
    
    // Close dialog and notify parent component
    onOpenChange(false);
    onPaymentComplete();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cash Payment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Amount</Label>
            <Input 
              id="totalAmount" 
              value={`$${total.toFixed(2)}`}
              disabled
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cashAmount">Cash Received</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="cashAmount" 
                value={cashAmount}
                onChange={(e) => handleCashAmountChange(e.target.value)}
                className="pl-8 font-mono"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="changeAmount">Change</Label>
            <Input 
              id="changeAmount" 
              value={`$${change.toFixed(2)}`}
              disabled
              className="font-mono"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleComplete}
              disabled={parseFloat(cashAmount || '0') < total}
            >
              <Check className="mr-2 h-4 w-4" />
              Complete Sale
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CashPaymentForm;
