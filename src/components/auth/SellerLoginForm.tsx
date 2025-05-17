
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AtSign, KeyRound, Loader } from 'lucide-react';

interface SellerLoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  authLoading: boolean;
  handleEmailLogin: (e: React.FormEvent) => Promise<void>;
}

const SellerLoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  authLoading,
  handleEmailLogin,
}: SellerLoginFormProps) => {
  return (
    <form onSubmit={handleEmailLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="seller-email">Email</Label>
        <div className="relative">
          <AtSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="seller-email"
            placeholder="your@email.com"
            type="email"
            className="pl-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="seller-password">Password</Label>
        <div className="relative">
          <KeyRound className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="seller-password"
            type="password"
            className="pl-8"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || authLoading}>
        {isLoading || authLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in as Seller'
        )}
      </Button>
    </form>
  );
};

export default SellerLoginForm;
