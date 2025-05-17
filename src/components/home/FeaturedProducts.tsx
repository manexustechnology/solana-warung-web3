
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard, { Product } from '../ui/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('rating', { ascending: false })
          .limit(4);

        if (error) {
          throw error;
        }

        if (data) {
          const formattedProducts = data.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description || '',
            price: Number(product.price),
            rating: Number(product.rating) || 4.0,
            image: product.image || '',
            category: product.category,
            isNew: product.is_new || false,
            timeLeft: product.time_left || undefined
          }));
          setFeaturedProducts(formattedProducts);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
        toast({
          title: 'Error',
          description: 'Failed to load featured products',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [toast]);

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <span className="tag bg-secondary mb-3">Featured Products</span>
            <h2 className="text-3xl font-bold">Trending on DeFi Warung WEB3</h2>
          </div>
          <Link to="/products" className="mt-4 md:mt-0 group flex items-center text-accent font-medium hover-scale">
            View all products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="glass-card h-80 animate-pulse">
                <div className="bg-gray-200 h-44 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
