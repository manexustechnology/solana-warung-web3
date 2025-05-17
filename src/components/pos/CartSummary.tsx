
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Wallet, QrCode, DollarSign } from 'lucide-react';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  onCreditCardPayment: () => void;
  onCryptoPayment: () => void;
  onQRCodePayment: () => void;
  onCashPayment: () => void;
  isCartEmpty: boolean;
}

const CartSummary = ({ 
  subtotal, 
  tax, 
  total, 
  onCreditCardPayment, 
  onCryptoPayment,
  onQRCodePayment,
  onCashPayment,
  isCartEmpty
}: CartSummaryProps) => {
  return (
    <div className="border-t p-4">
      <div className="space-y-1.5 pb-4">
        <div className="flex justify-between">
          <span className="text-sm">Subtotal</span>
          <span className="text-sm font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Tax (10%)</span>
          <span className="text-sm font-semibold">${tax.toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={onCreditCardPayment}
          disabled={isCartEmpty}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Pay with Credit Card
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={onCryptoPayment}
          disabled={isCartEmpty}
        >
          <Wallet className="mr-2 h-4 w-4" />
          Pay with Crypto Wallet
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={onQRCodePayment}
          disabled={isCartEmpty}
        >
          <QrCode className="mr-2 h-4 w-4" />
          Pay with QR Code
        </Button>
        <Button 
          className="w-full mt-2" 
          onClick={onCashPayment}
          disabled={isCartEmpty}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Complete Sale
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
