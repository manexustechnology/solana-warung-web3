
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BuyerSignupForm from '@/components/auth/BuyerSignupForm';
import SellerSignupForm from '@/components/auth/SellerSignupForm';
import WalletConnection from '@/components/auth/WalletConnection';
import { z } from 'zod';

// Schema definition for form validation
const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin' || user.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (values: SignupFormValues) => {
    if (values.password !== values.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await signUp(values.email, values.password, { 
        name: values.name, 
        role: activeTab === 'seller' ? 'admin' : 'buyer'
      });
      
      if (!result.success) {
        throw new Error("Signup failed");
      }
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      
      // Navigate based on user role
      if (activeTab === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "There was a problem creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Demo credentials helper
  const fillDemoCredentials = (type: 'seller' | 'buyer') => {
    const values = {
      name: type === 'seller' ? 'Demo Seller' : 'Demo Buyer',
      email: type === 'seller' ? 'demoseller@gmail.com' : 'demobuyer@gmail.com',
      password: type === 'seller' ? 'demoseller123' : 'demobuyer123',
      confirmPassword: type === 'seller' ? 'demoseller123' : 'demobuyer123'
    };
    
    handleSubmit(values);
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Sign up to DeFi Warung WEB3
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buyer" onValueChange={(value) => setActiveTab(value as 'buyer' | 'seller')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">As Buyer</TabsTrigger>
              <TabsTrigger value="seller">As Seller</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyer">
              <BuyerSignupForm isLoading={isLoading} onSubmit={handleSubmit} />
              <div className="mt-2 text-center">
                <button 
                  className="text-xs text-primary hover:underline"
                  onClick={() => fillDemoCredentials('buyer')}
                >
                  Use demo buyer account
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="seller">
              <SellerSignupForm isLoading={isLoading} onSubmit={handleSubmit} />
              <div className="mt-2 text-center">
                <button 
                  className="text-xs text-primary hover:underline"
                  onClick={() => fillDemoCredentials('seller')}
                >
                  Use demo seller account
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
