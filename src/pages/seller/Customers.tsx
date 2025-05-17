
import React, { useState } from 'react';
import SellerLayout from '@/components/layout/SellerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MoreHorizontal, Filter, UserPlus, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample customer data
const customers = [
  {
    id: 'CUST-001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    orders: 12,
    totalSpent: 1250.80,
    lastOrder: '2023-04-10',
    avatar: ''
  },
  {
    id: 'CUST-002',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    orders: 8,
    totalSpent: 890.50,
    lastOrder: '2023-04-15',
    avatar: ''
  },
  {
    id: 'CUST-003',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1 (555) 345-6789',
    status: 'inactive',
    orders: 3,
    totalSpent: 320.75,
    lastOrder: '2023-03-22',
    avatar: ''
  },
  {
    id: 'CUST-004',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '+1 (555) 456-7890',
    status: 'active',
    orders: 15,
    totalSpent: 1875.25,
    lastOrder: '2023-04-18',
    avatar: ''
  },
  {
    id: 'CUST-005',
    name: 'James Miller',
    email: 'james.miller@example.com',
    phone: '+1 (555) 567-8901',
    status: 'active',
    orders: 7,
    totalSpent: 780.00,
    lastOrder: '2023-04-12',
    avatar: ''
  },
  {
    id: 'CUST-006',
    name: 'Sophia Davis',
    email: 'sophia.davis@example.com',
    phone: '+1 (555) 678-9012',
    status: 'inactive',
    orders: 2,
    totalSpent: 150.49,
    lastOrder: '2023-02-28',
    avatar: ''
  },
  {
    id: 'CUST-007',
    name: 'Liam Wilson',
    email: 'liam.wilson@example.com',
    phone: '+1 (555) 789-0123',
    status: 'active',
    orders: 9,
    totalSpent: 975.89,
    lastOrder: '2023-04-05',
    avatar: ''
  },
  {
    id: 'CUST-008',
    name: 'Olivia Moore',
    email: 'olivia.moore@example.com',
    phone: '+1 (555) 890-1234',
    status: 'active',
    orders: 6,
    totalSpent: 720.15,
    lastOrder: '2023-04-14',
    avatar: ''
  }
];

const CustomersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleViewCustomer = (customerId: string) => {
    toast({
      title: "Customer Profile",
      description: `Viewing profile for customer ${customerId}`,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const filteredCustomers = customers.filter(
    (customer) => 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SellerLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Customers</h1>
            <p className="text-muted-foreground">Manage your customer relationships</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Segments
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search customers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Sort by
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                    <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                    <DropdownMenuItem>Most Orders</DropdownMenuItem>
                    <DropdownMenuItem>Highest Spend</DropdownMenuItem>
                    <DropdownMenuItem>Most Recent</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewCustomer(customer.id)}>
                              View profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit customer</DropdownMenuItem>
                            <DropdownMenuItem>View orders</DropdownMenuItem>
                            <DropdownMenuItem>Send message</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredCustomers.length}</strong> of <strong>{customers.length}</strong> customers
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-sm font-medium">
                  Page 1 of 1
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Analytics</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{customers.length}</p>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{customers.filter(c => c.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{customers.filter(c => c.status === 'inactive').length}</p>
                <p className="text-sm text-muted-foreground">Inactive</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">+3</p>
              <p className="text-sm text-muted-foreground">New customers this week</p>
              <div className="text-xs text-muted-foreground mt-2">
                <span className="text-green-500 font-medium">+25%</span> from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Import Customers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Segment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Send Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SellerLayout>
  );
};

export default CustomersPage;
