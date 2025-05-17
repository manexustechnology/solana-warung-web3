
// Demo data for when Supabase connection fails

export const demoDashboardStats = {
  totalRevenue: 12234,
  revenueChange: 14.5,
  totalOrders: 346,
  ordersChange: 5.2,
  newCustomers: 124,
  customersChange: 10.1,
  activeProducts: 78,
  newProducts: 2
};

export const demoSalesData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 1900 },
  { name: 'Mar', total: 1500 },
  { name: 'Apr', total: 2200 },
  { name: 'May', total: 2600 },
  { name: 'Jun', total: 1800 }
];

export const demoRecommendations = [
  {
    title: "Increase Jewelry Inventory",
    description: "Market trends show a 20% rise in jewelry demand this month",
    icon: "TrendingUp"
  },
  {
    title: "Low Electronics Stock",
    description: "Only 5 units of smartphones left, consider restocking",
    icon: "AlertCircle"
  },
  {
    title: "Seasonal Promotion",
    description: "Schedule a summer promotion to boost sales by an estimated 15%",
    icon: "Calendar"
  }
];

export const demoOrders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    date: '2023-04-15',
    total: 125.99,
    status: 'completed',
    items: 3
  },
  {
    id: 'ORD-002',
    customer: 'Emily Johnson',
    date: '2023-04-16',
    total: 89.50,
    status: 'processing',
    items: 2
  },
  {
    id: 'ORD-003',
    customer: 'Michael Brown',
    date: '2023-04-16',
    total: 212.75,
    status: 'completed',
    items: 5
  },
  {
    id: 'ORD-004',
    customer: 'Emma Wilson',
    date: '2023-04-17',
    total: 45.25,
    status: 'pending',
    items: 1
  },
  {
    id: 'ORD-005',
    customer: 'James Miller',
    date: '2023-04-18',
    total: 178.00,
    status: 'completed',
    items: 4
  },
  {
    id: 'ORD-006',
    customer: 'Sophia Davis',
    date: '2023-04-18',
    total: 132.49,
    status: 'processing',
    items: 3
  },
  {
    id: 'ORD-007',
    customer: 'Liam Wilson',
    date: '2023-04-19',
    total: 67.89,
    status: 'cancelled',
    items: 2
  },
  {
    id: 'ORD-008',
    customer: 'Olivia Moore',
    date: '2023-04-20',
    total: 210.15,
    status: 'pending',
    items: 3
  }
];

export const demoStoreUsers = [
  {
    id: '1',
    email: 'john.cashier@example.com',
    name: 'John Cashier',
    role: 'cashier',
    avatar: 'https://ui-avatars.com/api/?name=John+Cashier&background=random',
    status: 'active'
  },
  {
    id: '2',
    email: 'mary.inventory@example.com',
    name: 'Mary Inventory',
    role: 'inventory',
    avatar: 'https://ui-avatars.com/api/?name=Mary+Inventory&background=random',
    status: 'active'
  }
];

export const demoProducts = [
  {
    id: 'prod-001',
    name: 'Premium Smartphone',
    description: 'High-end smartphone with advanced features',
    price: 899.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300',
    stock: 15,
    barcode: '123456789',
    status: 'active'
  },
  {
    id: 'prod-002',
    name: 'Designer Watch',
    description: 'Luxury wristwatch with premium materials',
    price: 299.99,
    category: 'Fashion',
    image: 'https://via.placeholder.com/300',
    stock: 8,
    barcode: '987654321',
    status: 'active'
  },
  {
    id: 'prod-003',
    name: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with rich sound',
    price: 79.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300',
    stock: 24,
    barcode: '456789123',
    status: 'active'
  }
];
