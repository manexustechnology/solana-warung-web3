
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Separator } from '@/components/ui/separator';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  Calendar,
  AlertCircle,
  Loader2
} from 'lucide-react';
import SellerLayout from '@/components/layout/SellerLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDashboardData } from '@/hooks/use-dashboard-data';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    stats, 
    salesData, 
    recommendations, 
    loading, 
    isDemo 
  } = useDashboardData();

  React.useEffect(() => {
    if (!user || user.role !== 'seller') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'seller') {
    return null;
  }

  return (
    <SellerLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Seller Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <span className="font-semibold">AI Agent</span>
          </div>
        </div>
        
        {isDemo && (
          <Alert className="mb-4 bg-amber-50">
            <AlertDescription className="text-amber-800">
              Currently displaying demo data. Database connection issues detected.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        +{stats.revenueChange}% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalOrders}</div>
                      <p className="text-xs text-muted-foreground">
                        +{stats.ordersChange}% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.newCustomers}</div>
                      <p className="text-xs text-muted-foreground">
                        +{stats.customersChange}% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.activeProducts}</div>
                      <p className="text-xs text-muted-foreground">
                        +{stats.newProducts} new products this week
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Sales Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={salesData}>
                          <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Bar
                            dataKey="total"
                            fill="#8884d8"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>AI Agent Recommendations</CardTitle>
                      <CardDescription>
                        AI-powered insights to improve your business
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recommendations.map((item, index) => (
                        <React.Fragment key={index}>
                          <div className="flex items-start space-x-4">
                            {/* Dynamically render icon based on recommendation type */}
                            {item.icon === "TrendingUp" && <TrendingUp className="h-5 w-5 text-accent mt-0.5" />}
                            {item.icon === "AlertCircle" && <AlertCircle className="h-5 w-5 text-accent mt-0.5" />}
                            {item.icon === "Calendar" && <Calendar className="h-5 w-5 text-accent mt-0.5" />}
                            <div>
                              <h4 className="font-semibold">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          {index < recommendations.length - 1 && <Separator />}
                        </React.Fragment>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>
                  In-depth analysis of your store performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-20 text-muted-foreground">
                  Detailed analytics will be available here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights & Recommendations</CardTitle>
                <CardDescription>
                  Intelligent insights to optimize your sales strategy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-20 text-muted-foreground">
                  AI insights and recommendations will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SellerLayout>
  );
};

export default Dashboard;
