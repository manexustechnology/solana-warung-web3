
import React from 'react';
import { ArrowRight, ShoppingBag, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div>
              <span className="tag bg-accent/10 text-accent font-medium">Blockchain Powered Marketplace</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 leading-tight">
                The Future of <span className="text-accent">Commerce</span> is Decentralized
              </h1>
              <p className="text-xl text-muted-foreground mt-6">
              WarungAI brings your neighborhood shop on-chain with AI-driven insights and DeFi services—letting micro-merchants accept crypto, stablecoins, e-wallets or cash, with instant WhatsApp receipts. 
              </p>
            </div>
            <p className="text-accent font-semibold text-lg">Starting on <span className="text-2xl">Solana</span>.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-primary flex items-center justify-center">
                <span>Explore Products</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link> 
              <Link to="/about" className="btn-outline flex items-center justify-center">
                Learn More
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-accent/10 text-accent">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Easy Transactions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-accent/10 text-accent">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-accent/10 text-accent">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">AI Powered</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-down">
            <div className="relative z-10 glass rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1550082586-c35914829626?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Decentralized Shopping on Solana" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 -z-10 rounded-2xl w-full h-full bg-accent/30 blur-2xl opacity-50"></div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <div className="glass flex flex-col md:flex-row items-center justify-between p-8 rounded-2xl animate-scale-in">
            <div className="space-y-2 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">Ready to join the future?</h3>
              <p className="text-muted-foreground">Connect your Solana wallet to start browsing and shopping</p>
            </div>
            <Link to="/products" className="btn-accent">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
