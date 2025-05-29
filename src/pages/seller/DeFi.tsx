import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SellerLayout from '@/components/layout/SellerLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  BarChart, 
  RefreshCw, 
  CreditCard, 
  TrendingUp, 
  Lock,
  LineChart,
  Timer,
  Users,
  Activity
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useWallet } from '@/context/WalletContext';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DeFi = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected, connect } = useWallet();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  React.useEffect(() => {
    if (!user || user.role !== 'seller') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'seller') {
    return null;
  }

  const handleConnect = async () => {
    try {
      await connect('Phantom');
      toast({
        title: "Wallet Connected",
        description: "Your Solana wallet has been successfully connected.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect your Solana wallet.",
        variant: "destructive",
      });
    }
  };

  const handleDeposit = () => {
    toast({
      title: "Funds Deposited",
      description: "Your SOL tokens have been successfully deposited.",
    });
  };

  const handleWithdraw = () => {
    toast({
      title: "Funds Withdrawn",
      description: "Your SOL tokens have been successfully withdrawn.",
    });
  };

  const handleStake = () => {
    toast({
      title: "Tokens Staked",
      description: "Your SOL tokens have been successfully staked.",
    });
  };

  return (
    <SellerLayout>
      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Solana DeFi Integration</h1>
            <p className="text-sm text-muted-foreground">Manage your Solana DeFi investments and earnings</p>
          </div>
          {!isConnected && (
            <Button onClick={handleConnect}>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Solana Wallet
            </Button>
          )}
        </div>

        <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 md:w-fit">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
            <TabsTrigger value="lending">Lending</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,234.25 SOL</div>
                  <p className="text-xs text-muted-foreground">
                    +5.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Staking Rewards</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">345.88 SOL</div>
                  <p className="text-xs text-muted-foreground">
                    Earned this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Yield Farming</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,123.50 SPT</div>
                  <p className="text-xs text-muted-foreground">
                    12.5% APY
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lending Interest</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">267.42 SOL</div>
                  <p className="text-xs text-muted-foreground">
                    8.3% APR
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Portfolio Overview</CardTitle>
                  <CardDescription>
                    Your Solana DeFi investment distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Staking (40%)</span>
                        <span>3,293.70 SOL</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Liquidity Pools (25%)</span>
                        <span>2,058.56 SOL</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Lending (20%)</span>
                        <span>1,646.85 SOL</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>SPT Yield Farming (15%)</span>
                        <span>1,235.14 SOL</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="pt-6 space-y-2">
                    <h4 className="text-sm font-medium">Recent Transactions</h4>
                    <Separator />
                    
                    <div className="space-y-3 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <ArrowDownLeft className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Received Staking Rewards</p>
                            <p className="text-xs text-muted-foreground">12 hours ago</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-green-600">+45.20 SOL</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-full bg-blue-100">
                            <RefreshCw className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Swapped SOL for USDC</p>
                            <p className="text-xs text-muted-foreground">1 day ago</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">500.00 SOL</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-amber-100 p-2 rounded-full">
                            <ArrowUpRight className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Added Liquidity to Pool</p>
                            <p className="text-xs text-muted-foreground">3 days ago</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-amber-600">-1,000.00 SOL</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-2 w-full">
                    <Button className="flex-1" onClick={handleDeposit}>
                      <ArrowDownLeft className="mr-2 h-4 w-4" />
                      Deposit
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleWithdraw}>
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Withdraw
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>
                    Personalized Solana DeFi strategies for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <LineChart className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Liquidity Opportunity</h4>
                          <p className="text-xs mt-1">
                            Adding liquidity to the SOL/USDC pool could yield an estimated 18.5% APY based on current market conditions.
                          </p>
                          <Button size="sm" variant="outline" className="mt-2 text-xs h-7">
                            Explore Pool
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Timer className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Staking Alert</h4>
                          <p className="text-xs mt-1">
                            Stake your SOL tokens for a current 6.5% APY. Lock period of 30 days provides an additional 2% bonus.
                          </p>
                          <Button size="sm" variant="outline" className="mt-2 text-xs h-7">
                            Start Staking
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Activity className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Market Insight</h4>
                          <p className="text-xs mt-1">
                            Based on your transaction history and market trends, a diversified SPT portfolio could increase your returns by up to 15%.
                          </p>
                          <Button size="sm" variant="outline" className="mt-2 text-xs h-7">
                            View Strategy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solana Staking Dashboard</CardTitle>
                <CardDescription>
                  Earn rewards by staking your SOL assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pure SOL Staking</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">APY: 6.5%</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Popular</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Min. stake: 1 SOL</p>
                    </div>
                    <div className="mt-4 md:mt-0 space-y-2">
                      <p className="text-sm">Your stake: <span className="font-medium">125 SOL</span></p>
                      <p className="text-sm">Earned: <span className="font-medium text-green-600">13.75 SOL</span></p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button onClick={handleStake}>Stake More</Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">Marinade Liquid Staking</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">APY: 8.7%</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Governance</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Min. stake: 100 SOL</p>
                    </div>
                    <div className="mt-4 md:mt-0 space-y-2">
                      <p className="text-sm">Your stake: <span className="font-medium">250 SOL</span></p>
                      <p className="text-sm">Earned: <span className="font-medium text-green-600">8.25 SOL</span></p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button onClick={handleStake}>Stake More</Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">USDC Yield on Solana</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">APY: 8.5%</span>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Stable</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Min. stake: 10 USDC</p>
                    </div>
                    <div className="mt-4 md:mt-0 space-y-2">
                      <p className="text-sm">Your stake: <span className="font-medium">500 USDC</span></p>
                      <p className="text-sm">Earned: <span className="font-medium text-green-600">10.62 USDC</span></p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button onClick={handleStake}>Stake More</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="liquidity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solana Liquidity Pools</CardTitle>
                <CardDescription>
                  Provide liquidity to Solana DEXs and earn trading fees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-20">
                  Solana liquidity pool interface will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solana Lending & Borrowing</CardTitle>
                <CardDescription>
                  Lend your Solana assets or borrow against your collateral
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-20">
                  Solana lending and borrowing interface will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solana DeFi Analytics</CardTitle>
                <CardDescription>
                  Track your Solana DeFi performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-20">
                  Solana DeFi analytics dashboard will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mb-4">
          <Label>Select Currency</Label>
          <Select defaultValue="usdc">
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usdc">USDC</SelectItem>
              <SelectItem value="sol">SOL</SelectItem>
              <SelectItem value="idr">IDR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </SellerLayout>
  );
};

export default DeFi;
