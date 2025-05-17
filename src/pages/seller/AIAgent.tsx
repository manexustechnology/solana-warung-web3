
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SellerLayout from '@/components/layout/SellerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Bot, Send, TrendingUp, AlertCircle, Package, Users, BrainCircuit, BarChart3 } from 'lucide-react';

interface Message {
  role: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

const AIAgent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'agent', 
      content: "Hello! I'm your AI assistant for your DeFi Agent Store. How can I help you today? I can provide market insights, product recommendations, or help with inventory management.", 
      timestamp: new Date() 
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!user || user.role !== 'seller') {
      navigate('/login');
    }
    
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [user, navigate, messages]);

  if (!user || user.role !== 'seller') {
    return null;
  }

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input, timestamp: new Date() }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('inventory') || input.toLowerCase().includes('stock')) {
        response = "Based on my analysis of your current inventory and market trends, I recommend increasing your stock of electronics products by 15%. There's been a growing demand in this category over the past month.";
      } else if (input.toLowerCase().includes('sales') || input.toLowerCase().includes('revenue')) {
        response = "Your sales have increased by 12% compared to last month. Your best-performing products are in the jewelry category. I recommend promoting these products more prominently.";
      } else if (input.toLowerCase().includes('customer') || input.toLowerCase().includes('buyers')) {
        response = "You have 120 active customers this month. Your customer retention rate is 65%. I suggest implementing a loyalty program to improve retention further.";
      } else if (input.toLowerCase().includes('trend') || input.toLowerCase().includes('market')) {
        response = "Current market trends show increased interest in sustainable products. Consider adding eco-friendly items to your inventory to capture this growing market segment.";
      } else {
        response = "I'm here to help with all aspects of your store management. Feel free to ask about inventory, sales analysis, customer insights, or market trends.";
      }
      
      setMessages(prev => [...prev, { role: 'agent', content: response, timestamp: new Date() }]);
    }, 1000);
  };

  return (
    <SellerLayout>
      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">AI Agent</h1>
            <p className="text-sm text-muted-foreground">Your intelligent assistant for store management</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
            <TabsTrigger value="insights">Business Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="settings">Agent Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <Card className="flex flex-col h-[calc(100vh-250px)]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-primary" />
                  AI Assistant
                </CardTitle>
                <CardDescription>
                  Ask questions about your store, inventory, sales, or market trends
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-auto mb-4 pt-0">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <div className="p-4 border-t mt-auto">
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    sendMessage(); 
                  }} 
                  className="flex space-x-2"
                >
                  <Input
                    placeholder="Ask about inventory, sales, customers..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Business Insights
                </CardTitle>
                <CardDescription>
                  AI-powered analysis of your store performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Sales Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Your sales have increased by 12% compared to last month. The jewelry category is performing exceptionally well with a 24% increase.
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="text-green-500 h-5 w-5 mr-2" />
                    <span className="text-sm font-medium text-green-500">12% increase in overall sales</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Inventory Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Several products are running low on stock. Consider restocking smartphones (5 units left) and leather wallets (3 units left).
                  </p>
                  <div className="flex items-center mt-2">
                    <AlertCircle className="text-amber-500 h-5 w-5 mr-2" />
                    <span className="text-sm font-medium text-amber-500">8 products require restocking</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Customer Behavior</h3>
                  <p className="text-sm text-muted-foreground">
                    65% of your customers are returning buyers. The average cart value has increased to $85.75, which is 5% higher than last month.
                  </p>
                  <div className="flex items-center mt-2">
                    <Users className="text-blue-500 h-5 w-5 mr-2" />
                    <span className="text-sm font-medium text-blue-500">65% customer retention rate</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BrainCircuit className="h-5 w-5 mr-2 text-primary" />
                  Smart Recommendations
                </CardTitle>
                <CardDescription>
                  AI-powered suggestions to optimize your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start">
                    <Package className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">Inventory Optimization</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Increase your inventory of jewelry items by 20% to meet rising demand. Current trends show increased interest in this category.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Apply Recommendation
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">Pricing Strategy</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Consider a 5% price reduction on electronics items to stimulate sales in this category. Competitors have recently adjusted their pricing.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Apply Recommendation
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">Customer Retention</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Implement a loyalty program offering 5% discount on every third purchase to improve customer retention and increase lifetime value.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Apply Recommendation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Settings</CardTitle>
                <CardDescription>
                  Customize your AI assistant's behavior and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-20 text-muted-foreground">
                  AI agent settings will be available here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SellerLayout>
  );
};

export default AIAgent;
