
import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import CreditCardPaymentForm from './CreditCardPaymentForm';
import CryptoPaymentForm from './CryptoPaymentForm';
import QRCodePaymentForm from './QRCodePaymentForm';
import CashPaymentForm from './CashPaymentForm';
import ReceiptDialog from './ReceiptDialog';
import BarcodeScanner from './BarcodeScanner';
import { CartItem } from '@/utils/pos';

interface PaymentHandlerProps {
  showScanner: boolean;
  setShowScanner: (show: boolean) => void;
  showCreditCardPayment: boolean;
  setShowCreditCardPayment: (show: boolean) => void;
  showCryptoPayment: boolean;
  setShowCryptoPayment: (show: boolean) => void;
  showQRCodePayment: boolean;
  setShowQRCodePayment: (show: boolean) => void;
  showCashPayment: boolean;
  setShowCashPayment: (show: boolean) => void;
  showReceiptDialog: boolean;
  setShowReceiptDialog: (show: boolean) => void;
  completedOrder: {
    cart: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
  } | null;
  total: number;
  completePayment: () => void;
  handleBarcodeDetected: (barcode: string) => void;
  telegramUsername: string;
  setTelegramUsername: (username: string) => void;
  handlePrintReceipt: () => void;
  handleSendToTelegram: () => void;
  isProcessing: boolean;
}

const PaymentHandler = ({
  showScanner,
  setShowScanner,
  showCreditCardPayment,
  setShowCreditCardPayment,
  showCryptoPayment,
  setShowCryptoPayment,
  showQRCodePayment,
  setShowQRCodePayment,
  showCashPayment,
  setShowCashPayment,
  showReceiptDialog,
  setShowReceiptDialog,
  completedOrder,
  total,
  completePayment,
  handleBarcodeDetected,
  telegramUsername,
  setTelegramUsername,
  handlePrintReceipt,
  handleSendToTelegram,
  isProcessing
}: PaymentHandlerProps) => {
  return (
    <>
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <BarcodeScanner onDetected={handleBarcodeDetected} />
      </Dialog>
      
      <CreditCardPaymentForm 
        open={showCreditCardPayment} 
        onOpenChange={setShowCreditCardPayment}
        total={total}
        onPaymentComplete={completePayment}
      />
      
      <CryptoPaymentForm 
        open={showCryptoPayment} 
        onOpenChange={setShowCryptoPayment}
        total={total}
        onPaymentComplete={completePayment}
      />
      
      <QRCodePaymentForm 
        open={showQRCodePayment} 
        onOpenChange={setShowQRCodePayment}
        total={total}
        onPaymentComplete={completePayment}
      />
      
      <CashPaymentForm 
        open={showCashPayment} 
        onOpenChange={setShowCashPayment}
        total={total}
        onPaymentComplete={completePayment}
      />
      
      <ReceiptDialog
        open={showReceiptDialog}
        onOpenChange={setShowReceiptDialog}
        cart={completedOrder?.cart || []}
        subtotal={completedOrder?.subtotal || 0}
        tax={completedOrder?.tax || 0}
        total={completedOrder?.total || 0}
        onPrint={handlePrintReceipt}
        onSendToTelegram={handleSendToTelegram}
        telegramUsername={telegramUsername}
        onTelegramUsernameChange={setTelegramUsername}
        isProcessing={isProcessing}
      />
    </>
  );
};

export default PaymentHandler;
