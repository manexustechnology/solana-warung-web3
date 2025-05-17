
import { faker } from '@faker-js/faker';

// Define product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  barcode?: string;
  description?: string;
  stock?: number;
}

// Define cart item interface
export interface CartItem {
  product: Product;
  quantity: number;
}

// DEMO PRODUCTS

// Grocery store categories
const categories = [
  'Vegetables', 
  'Fruits', 
  'Staple Foods', 
  'Dairy', 
  'Snacks', 
  'Beverages',
  'Household',
  'Personal Care'
];

// Demo products data
export const products: Product[] = [
  // Vegetables
  {
    id: 'v-1',
    name: 'Fresh Tomatoes',
    price: 2.99,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
    barcode: '1234567890123',
    stock: 50
  },
  {
    id: 'v-2',
    name: 'Carrots (1kg)',
    price: 1.99,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1598170845053-a6b5985412ab',
    barcode: '1234567890124',
    stock: 40
  },
  {
    id: 'v-3',
    name: 'Fresh Spinach',
    price: 2.49,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    barcode: '1234567890125',
    stock: 30
  },
  {
    id: 'v-4',
    name: 'Kang Kong',
    price: 1.79,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5',
    barcode: '1234567890126',
    stock: 25
  },
  {
    id: 'v-5',
    name: 'Onions (500g)',
    price: 1.29,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31',
    barcode: '1234567890127',
    stock: 60
  },
  {
    id: 'v-6',
    name: 'Potatoes (1kg)',
    price: 2.19,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
    barcode: '1234567890128',
    stock: 45
  },
  
  // Fruits
  {
    id: 'f-1',
    name: 'Apples (4 pcs)',
    price: 3.99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1567306226408-c302e61a8fc1',
    barcode: '2234567890123',
    stock: 40
  },
  {
    id: 'f-2',
    name: 'Oranges (4 pcs)',
    price: 4.49,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e',
    barcode: '2234567890124',
    stock: 35
  },
  {
    id: 'f-3',
    name: 'Bananas (1kg)',
    price: 1.99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1543218024-57a70143c369',
    barcode: '2234567890125',
    stock: 50
  },
  {
    id: 'f-4',
    name: 'Mangoes (2 pcs)',
    price: 5.99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078',
    barcode: '2234567890126',
    stock: 20
  },
  {
    id: 'f-5',
    name: 'Grapes (500g)',
    price: 4.29,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f',
    barcode: '2234567890127',
    stock: 25
  },
  
  // Staple Foods
  {
    id: 's-1',
    name: 'Rice (5kg)',
    price: 7.99,
    category: 'Staple Foods',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
    barcode: '3234567890123',
    stock: 30
  },
  {
    id: 's-2',
    name: 'Cooking Oil (1L)',
    price: 6.49,
    category: 'Staple Foods',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
    barcode: '3234567890124',
    stock: 40
  },
  {
    id: 's-3',
    name: 'Sugar (1kg)',
    price: 2.99,
    category: 'Staple Foods',
    image: 'https://images.unsplash.com/photo-1550082586-c35914829626',
    barcode: '3234567890125',
    stock: 45
  },
  {
    id: 's-4',
    name: 'Flour (1kg)',
    price: 3.49,
    category: 'Staple Foods',
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a',
    barcode: '3234567890126',
    stock: 35
  },
  
  // Dairy
  {
    id: 'd-1',
    name: 'Fresh Milk (1L)',
    price: 2.49,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b',
    barcode: '4234567890123',
    stock: 40
  },
  {
    id: 'd-2',
    name: 'Eggs (10 pcs)',
    price: 3.99,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03',
    barcode: '4234567890124',
    stock: 35
  },
  {
    id: 'd-3',
    name: 'Cheese (250g)',
    price: 5.99,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1552767059-ce182eda88cc',
    barcode: '4234567890125',
    stock: 30
  },
  {
    id: 'd-4',
    name: 'Yogurt (500g)',
    price: 3.99,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1584278773681-ca4542775182',
    barcode: '4234567890126',
    stock: 25
  },
  
  // Snacks
  {
    id: 'sn-1',
    name: 'Potato Chips',
    price: 2.99,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b',
    barcode: '5234567890123',
    stock: 50
  },
  {
    id: 'sn-2',
    name: 'Chocolate Bar',
    price: 1.99,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52',
    barcode: '5234567890124',
    stock: 60
  },
  {
    id: 'sn-3',
    name: 'Cookies (200g)',
    price: 4.49,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32',
    barcode: '5234567890125',
    stock: 40
  },
  
  // Beverages
  {
    id: 'b-1',
    name: 'Mineral Water (12 pcs)',
    price: 5.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4',
    barcode: '6234567890123',
    stock: 35
  },
  {
    id: 'b-2',
    name: 'Soda Can (6 pcs)',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846',
    barcode: '6234567890124',
    stock: 40
  },
  {
    id: 'b-3',
    name: 'Fruit Juice (1L)',
    price: 3.49,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
    barcode: '6234567890125',
    stock: 30
  },
  
  // Household
  {
    id: 'h-1',
    name: 'Dish Soap',
    price: 2.99,
    category: 'Household',
    image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90',
    barcode: '7234567890123',
    stock: 40
  },
  {
    id: 'h-2',
    name: 'Laundry Detergent',
    price: 8.99,
    category: 'Household',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce',
    barcode: '7234567890124',
    stock: 35
  },
  {
    id: 'h-3',
    name: 'Trash Bags (20 pcs)',
    price: 4.99,
    category: 'Household',
    image: 'https://images.unsplash.com/photo-1610557892484-291b682feea0',
    barcode: '7234567890125',
    stock: 45
  },
  
  // Personal Care
  {
    id: 'pc-1',
    name: 'Shampoo (250ml)',
    price: 5.99,
    category: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232',
    barcode: '8234567890123',
    stock: 40
  },
  {
    id: 'pc-2',
    name: 'Toothpaste',
    price: 2.99,
    category: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1558014333-89ed0deacaa0',
    barcode: '8234567890124',
    stock: 50
  },
  {
    id: 'pc-3',
    name: 'Soap (3 bars)',
    price: 3.99,
    category: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1584305574647-83dce690d1a3',
    barcode: '8234567890125',
    stock: 45
  }
];

// Function to fetch products (simulate API call)
export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

// Function to fetch a product by ID
export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find(p => p.id === id);
      resolve(product);
    }, 300);
  });
};

// Function to fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = category === 'All'
        ? products
        : products.filter(p => p.category === category);
      resolve(filteredProducts);
    }, 300);
  });
};

// Function to search products
export const searchProducts = async (term: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchResults = products.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) || 
        p.category.toLowerCase().includes(term.toLowerCase()) ||
        (p.barcode && p.barcode.includes(term))
      );
      resolve(searchResults);
    }, 300);
  });
};

// Function to generate a mock order ID
export const generateOrderId = (): string => {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
};
