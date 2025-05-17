import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SellerLayout from '@/components/layout/SellerLayout';
import SearchBar from '@/components/pos/SearchBar';
import CategoryTabs from '@/components/pos/CategoryTabs';
import CartItem from '@/components/pos/CartItem';
import EmptyCart from '@/components/pos/EmptyCart';
import CartSummary from '@/components/pos/CartSummary';
import PaymentHandler from '@/components/pos/PaymentHandler';
import MobileCartDrawer from '@/components/pos/MobileCartDrawer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { ShoppingCart } from 'lucide-react';
import { CartItem as CartItemType, Product, products, fetchProducts } from '@/utils/pos';
import { useIsMobile } from '@/hooks/use-mobile';
import useSidebar from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

const POS = () => {
  const isMobile = useIsMobile();
  const { isCollapsed } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isMobileCartVisible, setIsMobileCartVisible] = useState(false);
  
  // Payment related states
  const [showScanner, setShowScanner] = useState(false);
  const [showCreditCardPayment, setShowCreditCardPayment] = useState(false);
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);
  const [showQRCodePayment, setShowQRCodePayment] = useState(false);
  const [showCashPayment, setShowCashPayment] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    cart: CartItemType[];
    subtotal: number;
    tax: number;
    total: number;
  } | null>(null);
  const [telegramUsername, setTelegramUsername] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Fetch products
  const { data: productsData = [], isLoading, error } = useQuery({
    queryKey: ['posProducts'],
    queryFn: fetchProducts
  });
  
  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(['All', ...productsData.map(product => product.category)])
    );
    return uniqueCategories;
  }, [productsData]);
  
  // Filter products by search term and category
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.barcode?.includes(searchTerm);
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [productsData, searchTerm, selectedCategory]);
  
  // Calculate cart totals
  const { subtotal, tax, total } = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [cart]);
  
  // Handle adding a product to the cart
  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === product.id
      );
      
      if (existingItemIndex >= 0) {
        // Product already in cart, increment quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        // Add new product to cart
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };
  
  // Handle removing one unit of a product from cart
  const handleRemoveFromCart = (productId: string) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === productId
      );
      
      if (existingItemIndex >= 0 && prevCart[existingItemIndex].quantity > 1) {
        // Decrease quantity if more than 1
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity -= 1;
        return newCart;
      } else {
        // Remove product if quantity would become 0
        return prevCart.filter(item => item.product.id !== productId);
      }
    });
  };
  
  // Handle completely removing a product from cart
  const handleDeleteFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };
  
  // Handle manual quantity change
  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = parseFloat(value);
    
    if (isNaN(quantity) || quantity <= 0) return;
    
    setCart(prevCart => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex(item => item.product.id === productId);
      
      if (itemIndex >= 0) {
        newCart[itemIndex].quantity = quantity;
      }
      
      return newCart;
    });
  };
  
  // Handle barcode scanning
  const handleBarcodeDetected = (barcode: string) => {
    setShowScanner(false);
    
    // Find product with matching barcode
    const product = productsData.find(p => p.barcode === barcode);
    
    if (product) {
      handleAddToCart(product);
      toast({
        title: "Product Added",
        description: `${product.name} added to cart.`,
      });
    } else {
      toast({
        title: "Product Not Found",
        description: `No product found with barcode ${barcode}.`,
        variant: "destructive",
      });
    }
  };
  
  // Handle payment completion
  const handleCompletePayment = () => {
    // Store order details for receipt
    setCompletedOrder({
      cart: [...cart],
      subtotal,
      tax,
      total
    });
    
    // Show receipt dialog
    setShowReceiptDialog(true);
    
    // Clear cart
    setCart([]);
  };
  
  // Handle printing receipt
  const handlePrintReceipt = () => {
    setIsProcessing(true);
    
    // Simulate printing delay
    setTimeout(() => {
      setIsProcessing(false);
      window.print();
      toast({
        title: "Receipt Printed",
        description: "Receipt has been sent to the printer.",
      });
    }, 1500);
  };
  
  // Handle sending receipt to Telegram
  const handleSendToTelegram = () => {
    setIsProcessing(true);
    
    // Simulate sending delay
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Receipt Sent",
        description: `Receipt has been sent to ${telegramUsername}.`,
      });
      setShowReceiptDialog(false);
    }, 1500);
  };

  return (
    <SellerLayout>
      <div className="h-full flex flex-col md:flex-row">
        {/* Main content area */}
        <div className={cn(
          "flex-1 p-4 overflow-auto w-full",
          isCollapsed 
            ? "transition-all duration-300" 
            : "transition-all duration-300"
        )}>
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-6">Point of Sale</h1>
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm}
              onScanBarcode={() => setShowScanner(true)}
            />
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">
              Error loading products. Please try again.
            </div>
          ) : (
            <CategoryTabs
              categories={categories}
              activeCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
        
        {/* Mobile cart button */}
        {isMobile && (
          <div className="fixed bottom-4 right-4">
            <MobileCartDrawer
              open={isMobileCartVisible}
              onOpenChange={setIsMobileCartVisible}
              cart={cart}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onRemoveFromCart={handleRemoveFromCart}
              onAddToCart={handleAddToCart}
              onDeleteFromCart={handleDeleteFromCart}
              onQuantityChange={handleQuantityChange}
              onCreditCardPayment={() => {
                setIsMobileCartVisible(false);
                setShowCreditCardPayment(true);
              }}
              onCryptoPayment={() => {
                setIsMobileCartVisible(false);
                setShowCryptoPayment(true);
              }}
              onQRCodePayment={() => {
                setIsMobileCartVisible(false);
                setShowQRCodePayment(true);
              }}
              onCashPayment={() => {
                setIsMobileCartVisible(false);
                setShowCashPayment(true);
              }}
            />
            
            <Button 
              onClick={() => setIsMobileCartVisible(true)}
              size="lg"
              className="rounded-full shadow-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {cart.length > 0 && (
                <span className="flex items-center justify-center">
                  Cart ({cart.length})
                </span>
              )}
            </Button>
          </div>
        )}
        
        {/* Desktop cart sidebar */}
        {!isMobile && (
          <div className="hidden md:flex md:flex-col w-80 border-l bg-white">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Current Order</h2>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {cart.length === 0 ? (
                <EmptyCart />
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <React.Fragment key={item.product.id}>
                      <CartItem
                        item={item}
                        onRemove={handleRemoveFromCart}
                        onAdd={handleAddToCart}
                        onDelete={handleDeleteFromCart}
                        onQuantityChange={handleQuantityChange}
                      />
                      <Separator />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            
            <CartSummary 
              subtotal={subtotal}
              tax={tax}
              total={total}
              onCreditCardPayment={() => setShowCreditCardPayment(true)}
              onCryptoPayment={() => setShowCryptoPayment(true)}
              onQRCodePayment={() => setShowQRCodePayment(true)}
              onCashPayment={() => setShowCashPayment(true)}
              isCartEmpty={cart.length === 0}
            />
          </div>
        )}
      </div>
      
      {/* Payment Dialogs */}
      <PaymentHandler
        showScanner={showScanner}
        setShowScanner={setShowScanner}
        showCreditCardPayment={showCreditCardPayment}
        setShowCreditCardPayment={setShowCreditCardPayment}
        showCryptoPayment={showCryptoPayment}
        setShowCryptoPayment={setShowCryptoPayment}
        showQRCodePayment={showQRCodePayment}
        setShowQRCodePayment={setShowQRCodePayment}
        showCashPayment={showCashPayment}
        setShowCashPayment={setShowCashPayment}
        showReceiptDialog={showReceiptDialog}
        setShowReceiptDialog={setShowReceiptDialog}
        completedOrder={completedOrder}
        total={total}
        completePayment={handleCompletePayment}
        handleBarcodeDetected={handleBarcodeDetected}
        telegramUsername={telegramUsername}
        setTelegramUsername={setTelegramUsername}
        handlePrintReceipt={handlePrintReceipt}
        handleSendToTelegram={handleSendToTelegram}
        isProcessing={isProcessing}
      />
    </SellerLayout>
  );
};

export default POS;
