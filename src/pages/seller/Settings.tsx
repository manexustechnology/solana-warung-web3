import React, { useState } from 'react';
import SellerLayout from '@/components/layout/SellerLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsPage = () => {
  const { getUserDetails } = useAuth();
  const { toast } = useToast();
  
  const [storeDetails, setStoreDetails] = useState({
    name: 'My Store',
    email: 'store@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Commerce St, City, State, 12345',
    description: 'We sell high-quality products for affordable prices.',
    currency: 'IDR',
    timezone: 'Asia/Jakarta',
    logo: '',
  });

  const userDetails = getUserDetails();

  const currencies = [
    { value: 'IDR', label: 'Indonesian Rupiah (IDR)' },
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'CNY', label: 'Chinese Yuan (CNY)' },
    { value: 'SGD', label: 'Singapore Dollar (SGD)' },
    { value: 'MYR', label: 'Malaysian Ringgit (MYR)' },
  ];

  const handleSaveStoreDetails = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your store settings have been updated successfully.",
    });
  };

  const handleSaveAccountDetails = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account Updated",
      description: "Your account settings have been updated successfully.",
    });
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Reset Email Sent",
      description: "Check your email for instructions to reset your password.",
    });
  };

  const handleUpdatePaymentMethods = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment Methods Updated",
      description: "Your payment methods have been updated successfully.",
    });
  };

  return (
    <SellerLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your store and account settings</p>
          </div>
        </div>

        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="store">
            <Card>
              <form onSubmit={handleSaveStoreDetails}>
                <CardHeader>
                  <CardTitle>Store Settings</CardTitle>
                  <CardDescription>
                    Manage your store information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-logo">Store Logo</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={storeDetails.logo} alt="Store Logo" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">Upload Logo</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="store-name">Store Name</Label>
                      <Input 
                        id="store-name" 
                        value={storeDetails.name}
                        onChange={(e) => setStoreDetails({...storeDetails, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-email">Contact Email</Label>
                      <Input 
                        id="store-email" 
                        type="email" 
                        value={storeDetails.email}
                        onChange={(e) => setStoreDetails({...storeDetails, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-phone">Contact Phone</Label>
                      <Input 
                        id="store-phone" 
                        value={storeDetails.phone}
                        onChange={(e) => setStoreDetails({...storeDetails, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-currency">Currency</Label>
                      <Select 
                        value={storeDetails.currency}
                        onValueChange={(value) => setStoreDetails({...storeDetails, currency: value})}
                      >
                        <SelectTrigger id="store-currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="store-address">Store Address</Label>
                    <Input 
                      id="store-address" 
                      value={storeDetails.address}
                      onChange={(e) => setStoreDetails({...storeDetails, address: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="store-description">Store Description</Label>
                    <Textarea 
                      id="store-description" 
                      rows={4}
                      value={storeDetails.description}
                      onChange={(e) => setStoreDetails({...storeDetails, description: e.target.value})}
                    />
                  </div>

                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Store Preferences</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Inventory Management</Label>
                        <p className="text-sm text-muted-foreground">
                          Track stock levels and get low stock alerts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Out of Stock Products</Label>
                        <p className="text-sm text-muted-foreground">
                          Display products that are currently out of stock
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Tax Calculation</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically calculate taxes based on location
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <form onSubmit={handleSaveAccountDetails}>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your personal account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={userDetails?.avatar} alt={userDetails?.name} />
                        <AvatarFallback>{userDetails?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-name">Full Name</Label>
                      <Input id="account-name" defaultValue={userDetails?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-email">Email</Label>
                      <Input id="account-email" type="email" defaultValue={userDetails?.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-phone">Phone Number</Label>
                      <Input id="account-phone" defaultValue="+1 (555) 987-6543" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-role">Role</Label>
                      <Input id="account-role" defaultValue={userDetails?.role} disabled />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-bio">Bio</Label>
                    <Textarea id="account-bio" rows={4} defaultValue="Store owner and manager with 5 years of experience in retail." />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Preferences</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Enhance your account security with 2FA
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Marketing</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive newsletters and promotional emails
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="destructive">Delete Account</Button>
                  <div className="flex gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <form onSubmit={handleSaveNotifications}>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Order Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Orders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when a new order is placed
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Order Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about order status changes
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Order Cancellations</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when an order is cancelled
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Inventory Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when products are running low
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Out of Stock Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when products are out of stock
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Marketing Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Promotions & Discounts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new promotions and discounts
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Product Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about product updates and new features
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Delivery</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Switch id="email-notifications" defaultChecked />
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="sms-notifications" />
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="push-notifications" defaultChecked />
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Save Preferences</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <form onSubmit={handleResetPassword}>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and authentication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session Management</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">Chrome on Windows • Active Now</p>
                        </div>
                        <Button variant="outline" size="sm" disabled>Current</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Last Active Session</p>
                          <p className="text-sm text-muted-foreground">Safari on iPhone • 2 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">Revoke</Button>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-2">Revoke All Other Sessions</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Login History</h3>
                    
                    <div className="space-y-2">
                      <div className="rounded-md border p-4">
                        <div className="flex flex-col space-y-2">
                          <p className="font-medium">Login from new device</p>
                          <p className="text-sm text-muted-foreground">Chrome on Windows • IP: 192.168.1.1 • Today, 10:30 AM</p>
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex flex-col space-y-2">
                          <p className="font-medium">Login from new location</p>
                          <p className="text-sm text-muted-foreground">Safari on iPhone • IP: 192.168.1.2 • 2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Update Password</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <form onSubmit={handleUpdatePaymentMethods}>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>
                    Manage your payment methods and payout settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center">Card</div>
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline">Add Payment Method</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payout Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bank-name">Bank Name</Label>
                        <Input id="bank-name" defaultValue="Example Bank" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-name">Account Holder Name</Label>
                        <Input id="account-name" defaultValue="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-number">Account Number</Label>
                        <Input id="account-number" defaultValue="•••• •••• 1234" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routing-number">Routing Number</Label>
                        <Input id="routing-number" defaultValue="•••• 5678" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payout Schedule</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Payouts</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically transfer funds to your bank account
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payout-frequency">Payout Frequency</Label>
                      <select 
                        id="payout-frequency" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="weekly"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tax Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Tax ID / Business Number</Label>
                      <Input id="tax-id" defaultValue="123-45-6789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-type">Business Type</Label>
                      <select 
                        id="business-type" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="individual"
                      >
                        <option value="individual">Individual / Sole Proprietor</option>
                        <option value="llc">LLC</option>
                        <option value="corporation">Corporation</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SellerLayout>
  );
};

export default SettingsPage;
