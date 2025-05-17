
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductGrid from './ProductGrid';
import { Product } from '@/utils/pos';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const CategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
  products,
  onAddToCart
}: CategoryTabsProps) => {
  return (
    <Tabs defaultValue={activeCategory} onValueChange={onCategoryChange}>
      <TabsList className="mb-4 inline-flex w-auto">
        {categories.map(category => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={activeCategory}>
        <ProductGrid products={products} onAddToCart={onAddToCart} />
      </TabsContent>
    </Tabs>
  );
};

export default CategoryTabs;
