
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { WalletProvider } from "./context/WalletContext";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SellerDashboard from "./pages/seller/Dashboard";
import SellerPOS from "./pages/seller/POS";
import SellerProducts from "./pages/seller/Products";
import SellerAIAgent from "./pages/seller/AIAgent";
import SellerDeFi from "./pages/seller/DeFi";
import SellerOrders from "./pages/seller/Orders";
import SellerCustomers from "./pages/seller/Customers";
import SellerAnalytics from "./pages/seller/Analytics";
import SellerReports from "./pages/seller/Reports";
import SellerSettings from "./pages/seller/Settings";
import SellerUsers from "./pages/seller/Users";
import AIAssistant from "./components/ui/AIAssistant";
import { PrivyAuthProvider } from "./context/privy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    <AIAssistant />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PrivyAuthProvider>
        <BrowserRouter>
          <AuthProvider>
            <WalletProvider>
              <div className="flex flex-col min-h-screen">
                <Routes>
                  {/* Routes with main layout (Header + Footer) */}
                  <Route path="/" element={<MainLayout><Index /></MainLayout>} />
                  <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
                  <Route path="/product/:productId" element={<MainLayout><ProductDetail /></MainLayout>} />
                  <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
                  <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
                  
                  {/* Seller Dashboard Routes (No Header/Footer) */}
                  <Route path="/seller/dashboard" element={<SellerDashboard />} />
                  <Route path="/seller/pos" element={<SellerPOS />} />
                  <Route path="/seller/products" element={<SellerProducts />} />
                  <Route path="/seller/ai-agent" element={<SellerAIAgent />} />
                  <Route path="/seller/defi" element={<SellerDeFi />} />
                  <Route path="/seller/orders" element={<SellerOrders />} />
                  <Route path="/seller/customers" element={<SellerCustomers />} />
                  <Route path="/seller/analytics" element={<SellerAnalytics />} />
                  <Route path="/seller/reports" element={<SellerReports />} />
                  <Route path="/seller/settings" element={<SellerSettings />} />
                  <Route path="/seller/users" element={<SellerUsers />} />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
                </Routes>
              </div>
            </WalletProvider>
          </AuthProvider>
        </BrowserRouter>
      </PrivyAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;