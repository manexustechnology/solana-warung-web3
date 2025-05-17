
import React from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { CartItem as CartItemType } from '@/utils/pos';

interface MobileCartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItemType[];
  subtotal: number;
  tax: number;
  total: number;
  onRemoveFromCart: (productId: string) => void;
  onAddToCart: (product: CartItemType['product']) => void;
  onDeleteFromCart: (productId: string) => void;
  onQuantityChange: (productId: string, value: string) => void;
  onCreditCardPayment: () => void;
  onCryptoPayment: () => void;
  onQRCodePayment: () => void;
  onCashPayment: () => void;
}

const MobileCartDrawer = ({
  open,
  onOpenChange,
  cart,
  subtotal,
  tax,
  total,
  onRemoveFromCart,
  onAddToCart,
  onDeleteFromCart,
  onQuantityChange,
  onCreditCardPayment,
  onCryptoPayment,
  onQRCodePayment,
  onCashPayment
}: MobileCartDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b">
          <DrawerTitle>Shopping Cart</DrawerTitle>
        </DrawerHeader>
        
        <div className="overflow-auto flex-1 p-4">
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onRemove={onRemoveFromCart}
                  onAdd={onAddToCart}
                  onDelete={onDeleteFromCart}
                  onQuantityChange={onQuantityChange}
                />
              ))}
            </div>
          )}
        </div>
        
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
            <div className="my-2 border-t pt-2 flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={onCreditCardPayment}
              disabled={cart.length === 0}
            >
              Pay with Credit Card
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={onCryptoPayment}
              disabled={cart.length === 0}
            >
              Pay with Crypto Wallet
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={onQRCodePayment}
              disabled={cart.length === 0}
            >
              Pay with QR Code
            </Button>
            <Button 
              className="w-full mt-2" 
              onClick={onCashPayment}
              disabled={cart.length === 0}
            >
              Complete Sale
            </Button>
          </div>
        </div>
        
        <DrawerFooter className="border-t pt-2 pb-4">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileCartDrawer;
