
import { useState, useEffect } from 'react';
import { demoProducts } from '@/data/demoData';
import { fetchWithFallback, submitWithFallback } from '@/utils/supabaseHelpers';
import { useAuth } from '@/context/AuthContext';

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  barcode?: string;
  status: 'active' | 'inactive' | 'out_of_stock';
};

export function useProductsData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const { user: currentUser } = useAuth();

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const result = await fetchWithFallback<Product>(
        'products', 
        demoProducts as Product[],
        { 
          select: 'id, name, description, price, category, image, stock, barcode, status',
          orderBy: { column: 'name' }
        }
      );

      setProducts(result.data);
      setIsDemo(result.isDemo);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(demoProducts as Product[]);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: Omit<Product, 'id'>) => {
    if (isDemo) {
      // Create a demo product with a generated ID
      const newProduct = {
        id: `demo-${Date.now()}`,
        ...product
      };

      setProducts(prevProducts => [...prevProducts, newProduct]);
      
      return { success: true, isDemo: true, data: newProduct };
    }

    const newProduct = {
      ...product,
      seller_id: currentUser?.id
    };

    const result = await submitWithFallback<any>(
      'products',
      newProduct,
      (data) => {
        // On success, add to the products list
        setProducts(prevProducts => [...prevProducts, data as Product]);
      },
      () => {
        // Fallback action for demo mode
        const demoProduct = {
          id: `demo-${Date.now()}`,
          ...product
        };
        setProducts(prevProducts => [...prevProducts, demoProduct as Product]);
        setIsDemo(true);
      }
    );

    return result;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    if (isDemo) {
      // Update in the local state if we're in demo mode
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === id ? { ...product, ...updates } : product
        )
      );
      
      return { success: true, isDemo: true };
    }

    const result = await submitWithFallback<any>(
      'products',
      { id, ...updates },
      () => {
        // On success, update the products list
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === id ? { ...product, ...updates } : product
          )
        );
      },
      () => {
        // Fallback action for demo mode
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === id ? { ...product, ...updates } : product
          )
        );
        setIsDemo(true);
      }
    );

    return result;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    isDemo,
    refresh: fetchProducts,
    createProduct,
    updateProduct
  };
}
