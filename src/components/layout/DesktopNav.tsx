
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';

const DesktopNav: React.FC = () => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-1">
        <Link to="/" className="px-4 py-2 rounded-full hover:bg-secondary transition-colors duration-200">
          Home
        </Link>
        <div className="relative group">
          <button className="px-4 py-2 rounded-full hover:bg-secondary transition-colors duration-200 flex items-center">
            Products <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          <div className="absolute left-0 mt-2 w-48 glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
            <div className="py-2">
              <Link to="/products" className="block px-4 py-2 hover:bg-white/40 transition-colors">All Products</Link>
              <Link to="/products?category=digital" className="block px-4 py-2 hover:bg-white/40 transition-colors">Digital Goods</Link>
              <Link to="/products?category=vegetables" className="block px-4 py-2 hover:bg-white/40 transition-colors">Fresh Vegetables</Link>
              <Link to="/products?category=fruits" className="block px-4 py-2 hover:bg-white/40 transition-colors">Fresh Fruits</Link>
              <Link to="/products?category=staple foods" className="block px-4 py-2 hover:bg-white/40 transition-colors">Staple Foods</Link>
              <Link to="/products?category=electronics" className="block px-4 py-2 hover:bg-white/40 transition-colors">Electronics</Link>
            </div>
          </div>
        </div>
        <Link to="/about" className="px-4 py-2 rounded-full hover:bg-secondary transition-colors duration-200">
          About
        </Link>
      </nav>

      <button className="p-2 rounded-full hover:bg-secondary transition-colors duration-200" aria-label="Search">
        <Search className="h-5 w-5" />
      </button>
    </>
  );
};

export default DesktopNav;
