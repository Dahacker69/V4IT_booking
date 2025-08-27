import React from 'react';
import { MessageSquareText, Search } from 'lucide-react';
import companyLogo from './assets/logo.png'; // <-- 1. IMPORT YOUR LOGO

const Header = () => {
  const navLinks = ['Who are we', 'Services', 'Product Store', 'VOIP & Dialers', 'Domains and Hosting'];

  return (
    <header className="w-full bg-white shadow-sm font-['Inter']">
      {/* Top bar */}
      <div className="text-center py-2 border-b border-gray-200">
        <p className="text-sm text-gray-700">
          Now Hiring: Join the best & most loved IT Company.
          <a href="#" className="font-semibold text-indigo-600 hover:underline ml-1">
            Find out our open positions!
          </a>
        </p>
      </div>

      {/* Main navigation container */}
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div className="flex-shrink-0">
          {/* 2. USE THE <img> TAG WITH THE IMPORTED LOGO */}
          <img src={companyLogo} alt="V4IT Company Logo" className="h-20" />
        </div>

        {/* Center: Navigation Links (hidden on small screens) */}
        <nav className="hidden lg:flex">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-base text-blue-900 font-semibold hover:text-cyan-500 transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side: Contact & Search */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-2">
            <MessageSquareText className="text-gray-500 h-9 w-9" strokeWidth={1} />
            <div>
              <p className="text-sm font-bold text-gray-800">Get in Touch</p>
              <p className="text-xs text-gray-600 font-semibold">Call: 13 84 00</p>
            </div>
          </div>
          <Search className="text-gray-600 h-6 w-6 cursor-pointer hover:text-blue-800" />
        </div>
      </div>
    </header>
  );
};

export default Header;