
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard, { Product } from '../components/ui/ProductCard';
import AIAssistant from '../components/ui/AIAssistant';
import { Filter, Search, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(categoryFilter || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('rating', { ascending: false });

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
          
          setAllProducts(formattedProducts);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.map(product => product.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: 'Error',
          description: 'Failed to load products',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  useEffect(() => {
    // Filter products based on category from URL or selected filter
    let filtered = allProducts;
    
    if (activeFilter && activeFilter !== 'all') {
      filtered = allProducts.filter(product => 
        product.category.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured' - no sorting needed
        break;
    }
    
    setProducts(filtered);
  }, [activeFilter, searchTerm, sortBy, allProducts]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Products</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a wide range of digital and physical products available on our decentralized Solana marketplace.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full py-3 rounded-full border border-border focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full bg-white border border-border rounded-full px-4 py-3 pr-10 focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <button 
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-full border border-border hover:bg-secondary transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
          
          {/* Filter options */}
          <div className={`glass p-6 rounded-2xl mb-8 transition-all duration-300 overflow-hidden ${isFiltersOpen ? 'max-h-96' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="font-medium mb-4">Categories</div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'all' ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setActiveFilter(category.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === category.toLowerCase() ? 'bg-accent text-white' : 'bg-secondary hover:bg-secondary/80'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="glass-card h-80 animate-pulse">
                <div className="bg-gray-200 h-44 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass p-8 text-center rounded-2xl">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <AIAssistant />
    </div>
  );
};

export default Products;
