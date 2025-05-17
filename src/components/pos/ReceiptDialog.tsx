
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, ExternalLink, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface ReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onPrint: () => void;
  onSendToTelegram: () => void;
  telegramUsername: string;
  onTelegramUsernameChange: (value: string) => void;
  isProcessing: boolean;
}

const ReceiptDialog = ({ 
  open, 
  onOpenChange, 
  cart,
  subtotal,
  tax,
  total,
  onPrint,
  onSendToTelegram,
  telegramUsername,
  onTelegramUsernameChange,
  isProcessing
}: ReceiptDialogProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  
  const generateReceiptText = () => {
    const formattedDate = new Date().toLocaleString();
    const transactionNumber = Math.floor(Math.random() * 1000000);
    
    let messageText = `🧾 *DeFi Agent Store Receipt*\n`;
    messageText += `📅 ${formattedDate}\n`;
    messageText += `🔢 Transaction #${transactionNumber}\n\n`;
    messageText += `*Items:*\n`;
    
    cart.forEach((item) => {
      messageText += `- ${item.product.name} x${item.quantity}: $${(item.product.price * item.quantity).toFixed(2)}\n`;
    });
    
    messageText += `\n*Subtotal:* $${subtotal.toFixed(2)}\n`;
    messageText += `*Tax (10%):* $${tax.toFixed(2)}\n`;
    messageText += `*TOTAL:* $${total.toFixed(2)}\n\n`;
    messageText += `Thank you for shopping with us!`;
    
    return encodeURIComponent(messageText);
  };
  
  const handleSendToTelegram = () => {
    if (!telegramUsername) {
      toast({
        title: "Missing Information",
        description: "Please enter a Telegram username.",
        variant: "destructive",
      });
      return;
    }
    
    // Open Telegram web/app with pre-filled message
    const username = telegramUsername.startsWith('@') 
      ? telegramUsername.substring(1) 
      : telegramUsername;
      
    const receiptText = generateReceiptText();
    const telegramUrl = `https://t.me/${username}?text=${receiptText}`;
    
    // Open in new tab
    window.open(telegramUrl, '_blank');
    
    toast({
      title: "Telegram Opening",
      description: "Redirecting to Telegram to send the receipt.",
    });
  };
  
  const handleSendToWhatsApp = () => {
    if (!phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter a phone number.",
        variant: "destructive",
      });
      return;
    }
    
    // Format phone number (remove non-digits)
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    if (formattedPhone.length < 10) {
      toast({
        title: "Invalid Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }
    
    const receiptText = generateReceiptText();
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${receiptText}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Opening",
      description: "Redirecting to WhatsApp to send the receipt.",
    });
  };
  
  const directTelegramLink = telegramUsername ? 
    `https://t.me/${telegramUsername.startsWith('@') ? telegramUsername.substring(1) : telegramUsername}` : 
    null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transaction Receipt</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-96 overflow-auto">
          <div className="receipt" ref={receiptRef}>
            <div className="receipt-header text-center mb-4">
              <h2 className="font-bold">DeFi Agent Store</h2>
              <p className="text-sm">123 Market Street</p>
              <p className="text-sm">Transaction #{Math.floor(Math.random() * 1000000)}</p>
              <p className="text-sm">{new Date().toLocaleString()}</p>
            </div>
            
            <div className="receipt-items space-y-2 mb-4">
              <div className="text-sm font-semibold flex justify-between pb-1 border-b">
                <span>Item</span>
                <span>Qty</span>
                <span>Price</span>
              </div>
              {cart.map((item) => (
                <div key={item.product.id} className="text-sm flex justify-between">
                  <span className="w-1/2 truncate">{item.product.name}</span>
                  <span className="w-1/6 text-center">{item.quantity}</span>
                  <span className="w-1/3 text-right">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="receipt-total space-y-1 pt-2 border-t">
              <div className="text-sm flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="text-sm font-bold flex justify-between pt-1 border-t mt-1">
                <span>TOTAL:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm">
              <p>Thank you for shopping with us!</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mt-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="telegram" className="w-24">Telegram ID:</Label>
            <Input 
              id="telegram" 
              value={telegramUsername} 
              onChange={(e) => onTelegramUsernameChange(e.target.value)} 
              placeholder="@username"
              className="flex-1"
            />
            {directTelegramLink && (
              <a href={directTelegramLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="whatsapp" className="w-24">WhatsApp:</Label>
            <Input 
              id="whatsapp" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              placeholder="+1 234 567 8900"
              className="flex-1"
            />
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleSendToWhatsApp}
            disabled={!phoneNumber}
          >
            <Phone className="mr-2 h-4 w-4" />
            Send to WhatsApp
          </Button>
          <Button 
            onClick={handleSendToTelegram} 
            disabled={!telegramUsername}
            className="w-full sm:w-auto"
          >
            <Send className="mr-2 h-4 w-4" />
            Send to Telegram
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;
