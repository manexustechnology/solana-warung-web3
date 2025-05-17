
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerLayout from '@/components/layout/SellerLayout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import UserTable from '@/components/seller/UserTable';
import CreateUserDialog from '@/components/seller/CreateUserDialog';
import { useUsersData } from '@/hooks/use-users-data';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Users = () => {
  const { user, getUserDetails } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userDetails = getUserDetails();
  const { users, loading, isDemo, createUser } = useUsersData();
  
  React.useEffect(() => {
    // Only redirect if not admin AND user is loaded
    if (user && userDetails && userDetails.role !== 'admin' && userDetails.role !== 'seller') {
      navigate('/seller/dashboard');
      return;
    }
  }, [user, navigate, userDetails]);

  const handleCreateUser = async (name: string, email: string, role: 'cashier' | 'inventory') => {
    const result = await createUser(name, email, role);
    
    if (result.success) {
      toast({
        title: "User created successfully",
        description: `${name} has been added as a ${role}`,
      });
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Failed to create user",
        description: result.error || "An unknown error occurred",
        variant: "destructive",
      });
    }
  };
  
  // Return null while checking permissions, before redirect happens
  if (!user) {
    return null;
  }
  
  return (
    <SellerLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage your store staff and assign roles
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        
        {isDemo && (
          <Alert className="mb-4 bg-amber-50">
            <AlertDescription className="text-amber-800">
              Currently displaying demo data. Database connection issues detected.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Store Users</CardTitle>
            <CardDescription>
              All users that have access to your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <UserTable users={users} currentUser={userDetails} />
            )}
          </CardContent>
        </Card>
      </div>
      
      <CreateUserDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateUser={handleCreateUser}
      />
    </SellerLayout>
  );
};

export default Users;
