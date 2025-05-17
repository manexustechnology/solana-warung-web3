
import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import AIAssistant from '../components/ui/AIAssistant';
import { ArrowRight, Zap, Shield, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedProducts />

      {/* How it works section */}
      <section className="section-padding bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="tag bg-white mb-3">How It Works</span>
            <h2 className="text-3xl font-bold mb-4">Blockchain Shopping Made Simple</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines the power of blockchain technology and artificial intelligence to create a seamless shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center hover-scale">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse & Choose</h3>
              <p className="text-muted-foreground">
                Explore our marketplace filled with digital and physical products from verified sellers.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center hover-scale">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Pay</h3>
              <p className="text-muted-foreground">
                Connect your wallet and pay with NEAR tokens in a secure and transparent transaction.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center hover-scale">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive & Enjoy</h3>
              <p className="text-muted-foreground">
                Get immediate access to digital goods or fast shipping for physical products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant feature highlight */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="glass overflow-hidden rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="tag bg-accent/10 text-accent mb-4">AI Assistant</span>
                <h2 className="text-3xl font-bold mb-4">Your Personal Shopping Guide</h2>
                <p className="text-muted-foreground mb-6">
                  Our AI assistant helps you find the perfect products, offers personalized recommendations, and answers your questions in real-time.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="text-accent mr-3 mt-1">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Intelligent product recommendations based on your preferences</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-accent mr-3 mt-1">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Real-time market trend analysis and insights</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-accent mr-3 mt-1">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Assistance with wallet connections and transactions</span>
                  </li>
                </ul>
                <Link to="/about" className="btn-accent self-start flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="relative hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=806&q=80" 
                  alt="AI Assistant" 
                  className="w-full h-full object-cover object-center rounded-r-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent rounded-r-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AIAssistant />
    </div>
  );
};

export default Index;
