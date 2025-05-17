
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyerLoginForm from '@/components/auth/BuyerLoginForm';
import SellerLoginForm from '@/components/auth/SellerLoginForm';
import { Button } from '@/components/ui/button';
import WalletConnection from '@/components/auth/WalletConnection';
import AuthDivider from '@/components/auth/AuthDivider';
import { Mail } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';

const Login = () => {
  const { signIn, isLoading: authLoading, user } = useAuth();
  const { login: privyLogin, ready: privyReady, authenticated: privyAuthenticated } = usePrivy();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('seller');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin' || user.role === 'seller') {
        console.log("User is seller/admin, redirecting to dashboard");
        navigate('/seller/dashboard');
      } else {
        console.log("User is buyer, redirecting to home");
        navigate('/');
      }
    }
  }, [user, navigate]);

  // Check Privy auth status for redirection
  useEffect(() => {
    if (privyReady && privyAuthenticated) {
      console.log("Privy authenticated, checking user details");
      // The PrivyAuthProvider will handle loading the user data
    }
  }, [privyReady, privyAuthenticated]);

  const handleEmailSignIn = async () => {
    try {
      setIsLoading(true);
      console.log("Initiating Privy email login");
      await privyLogin();
      
      toast({
        title: "Login initiated",
        description: "Please complete the login process in the popup.",
      });
    } catch (error) {
      console.error("Email login error:", error);
      toast({
        title: "Login failed",
        description: "Failed to start login process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Login failed",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log("Logging in with email and password");
      
      const result = await signIn(email, password);
      
      if (!result.success) {
        throw new Error("Login failed");
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      // Navigate based on user role
      const userDetails = result.data?.user;
      if (userDetails && (userDetails.role === 'admin' || userDetails.role === 'seller')) {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Demo credentials helper
  const fillDemoCredentials = (type: 'seller' | 'buyer') => {
    if (type === 'seller') {
      setEmail('demoseller@gmail.com');
      setPassword('demoseller123');
    } else {
      setEmail('demobuyer@gmail.com');
      setPassword('demobuyer123');
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login to DeFi Warung WEB3
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or connect your Solana wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="seller" onValueChange={(value) => setActiveTab(value as 'buyer' | 'seller')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">As Buyer</TabsTrigger>
              <TabsTrigger value="seller">As Seller</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyer">
              <BuyerLoginForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isLoading={isLoading}
                authLoading={authLoading}
                handleEmailLogin={handleEmailLogin}
              />
              <div className="mt-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-xs underline"
                  onClick={() => fillDemoCredentials('buyer')}
                >
                  Use demo buyer credentials
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="seller">
              <SellerLoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isLoading={isLoading}
                authLoading={authLoading}
                handleEmailLogin={handleEmailLogin}
              />
              <div className="mt-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-xs underline"
                  onClick={() => fillDemoCredentials('seller')}
                >
                  Use demo seller credentials
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <AuthDivider />

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 h-12"
              onClick={handleEmailSignIn}
              disabled={isLoading || authLoading}
            >
              {isLoading || authLoading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </span>
              ) : (
                <>
                  <Mail className="h-5 w-5 mr-2" />
                  <span>Sign in with Email</span>
                </>
              )}
            </Button>
          </div>

          <WalletConnection />
        </CardContent>
        <CardFooter className="flex justify-center text-center">
          <p className="text-sm text-muted-foreground">
            Sign in securely with your email or wallet
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
