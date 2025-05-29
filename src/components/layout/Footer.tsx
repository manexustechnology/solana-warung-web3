import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Warung AI</h3>
            <p className="text-sm text-muted-foreground">
              A marketplace powered by blockchain technology and AI agents, 
              designed to make transactions seamless and intelligent.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Solana</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Have questions or suggestions? 
              <a href="mailto:info@defiagentstore.com" className="text-accent ml-1">Contact us</a>
            </p>
            <form className="mt-2">
              <label htmlFor="newsletter" className="text-sm text-muted-foreground block mb-2">Subscribe to our newsletter</label>
              <div className="flex">
                <input 
                  type="email" 
                  id="newsletter" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 rounded-l-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-accent" 
                />
                <button type="submit" className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-r-full transition-colors">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DeFi Agent Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
