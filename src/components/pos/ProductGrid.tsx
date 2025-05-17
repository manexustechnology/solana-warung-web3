
import React from 'react';
import ProductCard from './ProductCard';
import { useIsMobile } from '@/hooks/use-mobile';
import useSidebar from '@/hooks/use-sidebar';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  barcode?: string;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  const isMobile = useIsMobile();
  const { isCollapsed } = useSidebar();
  
  return (
    <div className={`grid gap-3 w-full ${
      isCollapsed 
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5"
    }`}>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart} 
        />
      ))}
      
      {products.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
