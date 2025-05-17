
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRCodePaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onPaymentComplete: () => void;
}

const QRCodePaymentForm = ({ 
  open, 
  onOpenChange, 
  total, 
  onPaymentComplete 
}: QRCodePaymentFormProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (open && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open, timeLeft]);
  
  useEffect(() => {
    if (open) {
      setTimeLeft(300); // Reset timer when dialog opens
    }
  }, [open]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleCheckPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment verification
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `QR code payment of $${total.toFixed(2)} was successful.`,
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
            <QrCode className="h-5 w-5" />
            QR Code Payment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Scan this QR code to pay</p>
            <div className="font-bold text-lg mb-4">${total.toFixed(2)}</div>
            
            <div className="bg-white p-4 mx-auto w-48 h-48 relative">
              {/* This would be a real QR code in production */}
              <div className="absolute inset-0 grid place-items-center">
                <QrCode className="w-32 h-32 text-black" />
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">QR code expires in</p>
              <p className="font-mono font-semibold">{formatTime(timeLeft)}</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-700">
            <p>For demo purposes, click "Check Payment Status" to simulate a successful transaction.</p>
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
              onClick={handleCheckPayment}
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
                  Check Payment Status
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodePaymentForm;
