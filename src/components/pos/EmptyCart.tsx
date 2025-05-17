
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-center">
      <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
      <p className="text-muted-foreground">Your cart is empty</p>
      <p className="text-xs text-muted-foreground mt-1">Add products to start a new order</p>
    </div>
  );
};

export default EmptyCart;
