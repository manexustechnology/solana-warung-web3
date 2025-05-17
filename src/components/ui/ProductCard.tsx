
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  isNew?: boolean;
  timeLeft?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, description, price, rating, image, category, isNew, timeLeft } = product;

  return (
    <div className="glass-card overflow-hidden group animate-fade-in">
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {isNew && (
            <div className="absolute top-3 left-3 bg-accent text-white text-xs font-medium px-2 py-1 rounded-full">
              New
            </div>
          )}
          {timeLeft && (
            <div className="absolute bottom-3 left-3 glass-dark text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {timeLeft}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="tag mb-2">{category}</span>
              <h3 className="font-medium text-lg mt-1">{name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm">{rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">{price} NEAR</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
