
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  barcode?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
          {product.category}
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>
            <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
            {product.barcode && (
              <p className="text-muted-foreground text-xs mt-1">
                {product.barcode}
              </p>
            )}
          </div>
          <div className="mt-4">
            {isMobile ? (
              <Button 
                onClick={() => onAddToCart(product)} 
                size="sm" 
                className="w-full"
                variant="secondary"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add
              </Button>
            ) : (
              <Button 
                onClick={() => onAddToCart(product)} 
                className="w-full"
                variant="default"
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
