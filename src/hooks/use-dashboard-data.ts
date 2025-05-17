
import { useEffect, useState } from 'react';
import { demoDashboardStats, demoSalesData, demoRecommendations } from '@/data/demoData';
import { fetchWithFallback } from '@/utils/supabaseHelpers';
import { supabase } from '@/integrations/supabase/client';

export type DashboardStat = {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  newCustomers: number;
  customersChange: number;
  activeProducts: number;
  newProducts: number;
};

export type SalesData = {
  name: string;
  total: number;
};

export type Recommendation = {
  title: string;
  description: string;
  icon: string;
};

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStat>(demoDashboardStats);
  const [salesData, setSalesData] = useState<SalesData[]>(demoSalesData);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(demoRecommendations);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  
  const fetchDashboardData = async () => {
    setLoading(true);
    
    try {
      // Attempt to fetch sales data - note we're using a string for the table name
      // since 'sales_data' is not in the typed schema
      const salesResult = await fetchWithFallback<SalesData>(
        'sales_data', 
        demoSalesData,
        { orderBy: { column: 'name' } }
      );
      
      setSalesData(salesResult.data);
      
      // Check if we're in demo mode
      if (salesResult.isDemo) {
        setIsDemo(true);
        setStats(demoDashboardStats);
        setRecommendations(demoRecommendations);
        return;
      }
      
      // Since we're connected to actual database, fetch other data
      // In a real app, you'd have separate tables for these
      // For this sample, we'll simulate with orders and product counts
      
      // Fetch order metrics - in a real app this would be from orders table
      const ordersMetrics = await fetchWithFallback(
        'orders', 
        [], 
        { select: 'id, total, created_at' }
      );
      
      if (!ordersMetrics.isDemo) {
        const orders = ordersMetrics.data;
        const totalRevenue = orders.reduce((sum: number, order: any) => sum + (parseFloat(order.total) || 0), 0);
        
        // Get new customers count - would be a separate query in real app
        const { data: customers } = await supabase
          .from('profiles')
          .select('id')
          .filter('created_at', 'gte', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
        
        // Get products count
        const { data: products } = await supabase
          .from('products')
          .select('id, created_at')
          .filter('status', 'eq', 'active');
        
        const newProducts = products?.filter((product: any) => 
          new Date(product.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length || 0;
        
        setStats({
          totalRevenue: totalRevenue || demoDashboardStats.totalRevenue,
          revenueChange: 5.2, // Hardcoded for demo, would calculate in real app
          totalOrders: orders.length || demoDashboardStats.totalOrders,
          ordersChange: 3.8, // Hardcoded for demo
          newCustomers: customers?.length || demoDashboardStats.newCustomers,
          customersChange: 7.4, // Hardcoded for demo
          activeProducts: products?.length || demoDashboardStats.activeProducts,
          newProducts: newProducts || demoDashboardStats.newProducts
        });
      } else {
        setIsDemo(true);
        setStats(demoDashboardStats);
      }
      
      // For recommendations, in a real app this would come from an AI analysis table
      // Here we'll use demo data since it's more complex
      setRecommendations(demoRecommendations);
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setIsDemo(true);
      setStats(demoDashboardStats);
      setSalesData(demoSalesData);
      setRecommendations(demoRecommendations);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
    
    // Optional: Set up a refresh interval
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5 * 60 * 1000); // Refresh every 5 minutes
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    stats,
    salesData,
    recommendations,
    loading,
    isDemo,
    refresh: fetchDashboardData
  };
};
