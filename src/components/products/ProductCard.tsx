import React from 'react';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    // ... other product properties
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { solanaRate, idrRate } = useCurrencyRates();

  return (
    <div className="product-card">
      {/* ... other product card content ... */}
      
      <div className="price-container">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">{product.price.toFixed(2)} USDC</span>
          <span className="text-sm text-muted-foreground">
            ({(product.price * solanaRate).toFixed(4)} SOL)
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          ≈ Rp {(product.price * idrRate).toLocaleString()} IDR
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 