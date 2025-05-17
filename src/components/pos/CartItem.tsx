
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
  onRemove: (productId: string) => void;
  onAdd: (product: Product) => void;
  onDelete: (productId: string) => void;
  onQuantityChange: (productId: string, value: string) => void;
}

const CartItem = ({ item, onRemove, onAdd, onDelete, onQuantityChange }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img 
          src={item.product.image} 
          alt={item.product.name} 
          className="h-12 w-12 rounded-md object-cover"
        />
        <div>
          <h3 className="text-sm font-medium">{item.product.name}</h3>
          <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          size="icon" 
          variant="outline" 
          className="h-7 w-7" 
          onClick={() => onRemove(item.product.id)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input 
          className="h-7 w-16 text-center px-1"
          value={item.quantity}
          type="number"
          min="0.1"
          step="0.1"
          onChange={(e) => onQuantityChange(item.product.id, e.target.value)}
        />
        <Button 
          size="icon" 
          variant="outline" 
          className="h-7 w-7" 
          onClick={() => onAdd(item.product)}
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-7 w-7 text-red-500" 
          onClick={() => onDelete(item.product.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
