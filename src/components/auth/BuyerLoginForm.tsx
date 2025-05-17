
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AtSign, KeyRound, Loader } from 'lucide-react';

interface BuyerLoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  authLoading: boolean;
  handleEmailLogin: (e: React.FormEvent) => Promise<void>;
}

const BuyerLoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  authLoading,
  handleEmailLogin,
}: BuyerLoginFormProps) => {
  return (
    <form onSubmit={handleEmailLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <AtSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            placeholder="your@email.com"
            type="email"
            className="pl-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <KeyRound className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
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
          'Sign in as Buyer'
        )}
      </Button>
    </form>
  );
};

export default BuyerLoginForm;
