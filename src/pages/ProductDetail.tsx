import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Shield, ArrowLeft, ChevronRight, ShoppingCart, Share2 } from 'lucide-react';
import AIAssistant from '../components/ui/AIAssistant';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../hooks/use-toast';
import { useCurrencyRates } from '@/hooks/use-currency-rates';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Digital Art Collection',
    description: 'Exclusive NFT art collection from renowned digital artists, featuring limited edition pieces that showcase cutting-edge digital techniques and creative expression. Each piece is authenticated on the blockchain, ensuring provenance and ownership.',
    price: 120,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1633267538438-2d49aeb844f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    category: 'Digital',
    isNew: true,
    seller: 'ArtisticVisions',
    sellerRating: 4.9,
    totalSales: 128,
    features: [
      'Limited edition digital art',
      'Blockchain authenticated',
      'Includes commercial rights',
      'High-resolution files'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1633267538438-2d49aeb844f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      'https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      'https://images.unsplash.com/photo-1618172193622-ae2d025f2c95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
    ]
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Next-generation smartwatch with advanced health tracking features, including heart rate monitoring, sleep analysis, and workout detection. The sleek design and long battery life make it perfect for daily use and active lifestyles.',
    price: 45,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    category: 'Physical',
    timeLeft: '2 days',
    seller: 'TechGadgets',
    sellerRating: 4.7,
    totalSales: 356,
    features: [
      'Advanced health tracking',
      'Water resistant to 50m',
      '7-day battery life',
      'Compatible with iOS and Android'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80'
    ]
  },
  {
    id: '3',
    name: 'DeFi Investment Bundle',
    description: 'Curated collection of high-performing DeFi tokens and assets, selected by financial experts to maximize your returns while minimizing risk. This bundle provides exposure to various DeFi protocols and strategies.',
    price: 75,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80',
    category: 'DeFi',
    isNew: true,
    seller: 'CryptoExperts',
    sellerRating: 4.6,
    totalSales: 212,
    features: [
      'Professionally curated tokens',
      'Diversified DeFi exposure',
      'Rebalanced quarterly',
      'Detailed investment guide included'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80',
      'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1642542188912-18bf2596a810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
    ]
  },
  {
    id: '4',
    name: 'Premium Headphones',
    description: 'Noise-cancelling wireless headphones with superior sound quality that provide an immersive audio experience. Featuring comfortable ear cups, long battery life, and premium materials, these headphones are perfect for music enthusiasts and professionals.',
    price: 35,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Physical',
    seller: 'AudioPhiles',
    sellerRating: 4.8,
    totalSales: 487,
    features: [
      'Active noise cancellation',
      '40-hour battery life',
      'Hi-Fi audio quality',
      'Comfortable memory foam ear cups'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e0e7269861?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
    ]
  },
  {
    id: '5',
    name: 'Fresh Tomatoes',
    description: 'Organically grown fresh tomatoes, perfect for salads, sauces, or daily cooking. Grown without pesticides and harvested at peak ripeness for the best flavor.',
    price: 3,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    category: 'Vegetables',
    seller: 'OrganicFarms',
    sellerRating: 4.8,
    totalSales: 320,
    features: [
      'Organically grown',
      'Fresh harvested',
      'No pesticides',
      'High in vitamins'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      'https://images.unsplash.com/photo-1598170845053-a6b5985412ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
    ]
  },
  {
    id: '6',
    name: 'Premium Rice (5kg)',
    description: 'High-quality rice perfect for daily meals. This premium variety cooks perfectly every time, with fluffy texture and delightful aroma.',
    price: 8,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=806&q=80',
    category: 'Staple Foods',
    seller: 'QualityGrocers',
    sellerRating: 4.7,
    totalSales: 542,
    features: [
      'Premium quality',
      'Long grain',
      'No preservatives',
      'Locally sourced'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=806&q=80',
      'https://images.unsplash.com/photo-1595751866979-de6e9d606220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
    ]
  },
  {
    id: '7',
    name: 'Organic Apples (1kg)',
    description: 'Fresh, crisp organic apples. Perfect for snacking, baking, or adding to your favorite recipes. Grown without synthetic pesticides or fertilizers.',
    price: 5,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1567306226408-c302e61a8fc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    category: 'Fruits',
    seller: 'OrganicFarms',
    sellerRating: 4.8,
    totalSales: 218,
    features: [
      'Organic certified',
      'Fresh harvested',
      'Rich in antioxidants',
      'Great for health'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1567306226408-c302e61a8fc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ]
  }
];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);
  const { isConnected, connect } = useWallet();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { solanaRate, idrRate } = useCurrencyRates();

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (!isConnected) {
      try {
        await connect('Phantom');
        toast({
          title: "Wallet Connected",
          description: "You can now proceed with the purchase.",
        });
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: "Failed to connect wallet. Please try again.",
          variant: "destructive",
        });
      }
      return;
    }

    setIsLoading(true);
    // Simulate purchase process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Purchase Successful!",
        description: `You have successfully purchased ${product.name}.`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link to={`/products?category=${product.category.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition-colors">{product.category}</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="glass rounded-2xl overflow-hidden aspect-square animate-fade-in">
              <img 
                src={product.gallery[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden w-20 h-20 transition-all ${
                    selectedImage === index ? 'ring-2 ring-accent' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="tag mb-3">{product.category}</span>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">{product.rating} ({product.totalSales} sales)</span>
              </div>
            </div>

            <div className="price-container space-y-2">
              <div className="text-3xl font-bold flex items-center space-x-2">
                <span>{product.price} USDC</span>
                <span className="text-lg text-muted-foreground">
                  ({(product.price * solanaRate).toFixed(4)} SOL)
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                ≈ Rp {(product.price * idrRate).toLocaleString()} IDR
              </div>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div>
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-accent mr-3 mt-1">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4 py-4 border-y border-border">
              <img 
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${product.seller}`}
                alt={product.seller}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{product.seller}</div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{product.sellerRating} · {product.totalSales} sales</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePurchase}
                className="btn-accent flex items-center justify-center flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <span>{isConnected ? 'Buy Now' : 'Connect Wallet to Buy'}</span>
                  </>
                )}
              </button>
              <button className="btn-outline flex items-center justify-center">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>

            <div className="glass p-4 rounded-xl flex items-center">
              <Shield className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
              <p className="text-sm">
                <span className="font-medium">Secure Transaction:</span> All purchases are protected by our escrow system and blockchain validation on Solana.
              </p>
            </div>
          </div>
        </div>

        {/* Related products section would go here */}
        
        {/* Back to products button */}
        <div className="mt-16 text-center">
          <Link to="/products" className="btn-secondary inline-flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
};

export default ProductDetail;
