
import React, { useState } from 'react';
import SellerLayout from '@/components/layout/SellerLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { 
  Search, MoreHorizontal, Filter, Download, 
  Calendar, ChevronDown, ChevronLeft, ChevronRight, Loader2 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useOrdersData, OrderStatus } from '@/hooks/use-orders-data';
import { Alert, AlertDescription } from '@/components/ui/alert';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const { orders, loading, isDemo, updateOrderStatus } = useOrdersData();

  const handleViewOrder = (orderId: string) => {
    toast({
      title: "Order Details",
      description: `Viewing details for order ${orderId}`,
    });
  };

  const handleProcessOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'processing').then(result => {
      toast({
        title: result.success ? "Order Updated" : "Update Failed",
        description: result.success 
          ? `Order ${orderId} is now being processed` 
          : `Failed to update order: ${result.error || 'Unknown error'}`,
        variant: result.success ? 'default' : 'destructive',
      });
    });
  };

  const handleCompleteOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'completed').then(result => {
      toast({
        title: result.success ? "Order Completed" : "Update Failed",
        description: result.success 
          ? `Order ${orderId} has been marked as completed` 
          : `Failed to update order: ${result.error || 'Unknown error'}`,
        variant: result.success ? 'default' : 'destructive',
      });
    });
  };

  const handleExportOrders = () => {
    toast({
      title: "Export Started",
      description: "Your orders are being exported to CSV",
    });
  };

  const filteredOrders = orders.filter(
    (order) => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SellerLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-muted-foreground">Manage and process your customer orders</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button onClick={handleExportOrders} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>New Order</Button>
          </div>
        </div>

        {isDemo && (
          <Alert className="mb-4 bg-amber-50">
            <AlertDescription className="text-amber-800">
              Currently displaying demo data. Database connection issues detected.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Status <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Processing</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)} variant="outline">
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>
                                View details
                              </DropdownMenuItem>
                              {order.status === 'pending' && (
                                <DropdownMenuItem onClick={() => handleProcessOrder(order.id)}>
                                  Process order
                                </DropdownMenuItem>
                              )}
                              {order.status === 'processing' && (
                                <DropdownMenuItem onClick={() => handleCompleteOrder(order.id)}>
                                  Mark as complete
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>Print invoice</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredOrders.length}</strong> of <strong>{orders.length}</strong> orders
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
};

export default OrdersPage;
