
import { useState, useEffect } from 'react';
import { demoOrders } from '@/data/demoData';
import { fetchWithFallback, submitWithFallback } from '@/utils/supabaseHelpers';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
};

export function useOrdersData() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);

    try {
      const result = await fetchWithFallback<any>(
        'orders', 
        demoOrders,
        { 
          orderBy: { column: 'created_at', ascending: false },
          select: 'id, user_id, total, status, created_at'
        }
      );

      if (!result.isDemo) {
        // Transform the data from database format to our Order type
        const transformedOrders = await Promise.all(result.data.map(async (order: any) => {
          // Get customer name from profiles
          let customerName = 'Unknown Customer';
          if (order.user_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('name')
              .eq('id', order.user_id)
              .single();
            
            if (profile) {
              customerName = profile.name;
            }
          }

          // Count items in this order
          const { data: items } = await supabase
            .from('order_items')
            .select('id')
            .eq('order_id', order.id);

          return {
            id: order.id,
            customer: customerName,
            date: new Date(order.created_at).toISOString().split('T')[0],
            total: parseFloat(order.total),
            status: (order.status || 'pending') as OrderStatus,
            items: items?.length || 0
          };
        }));

        setOrders(transformedOrders);
        setIsDemo(false);
      } else {
        // Convert demo orders to match our Order type with proper status typing
        const typedDemoOrders: Order[] = result.data.map((order: any) => ({
          ...order,
          status: order.status as OrderStatus
        }));
        
        setOrders(typedDemoOrders);
        setIsDemo(true);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Convert demo orders to match our Order type with proper status typing
      const typedDemoOrders: Order[] = demoOrders.map((order: any) => ({
        ...order,
        status: order.status as OrderStatus
      }));
      
      setOrders(typedDemoOrders);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    if (isDemo) {
      // Update in the local state if we're in demo mode
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
      
      toast({
        title: "Demo Mode",
        description: "Currently displaying demo data - status updated in memory only",
      });
      
      return { success: true, isDemo: true };
    }

    const result = await submitWithFallback(
      'orders',
      { id: orderId, status },
      () => {
        // On success, refresh the orders list
        fetchOrders();
      },
      () => {
        // Fallback action for demo mode
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? { ...order, status } : order
          )
        );
      }
    );

    return result;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    isDemo,
    refresh: fetchOrders,
    updateOrderStatus
  };
}
