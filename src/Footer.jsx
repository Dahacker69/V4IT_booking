import React from 'react';
import { Twitter, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import Logo from './Logo.jsx'; // Assuming you have a Logo component

const Footer = () => {
  const footerLinks = {
    Services: ['Managed IT', 'IT Consultancy', 'Cloud Computing'],
    Industries: ['Domains and Hosting'],
    Company: ['About Us', 'Careers'],
    Support: ['Help & FAQ', 'Contact Us', 'Cookies Policy', 'Privacy Policy'],
  };

  return (
    <footer className="bg-white text-gray-700 pt-16 pb-8 px-4 sm:px-8">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Logo and Contact Info */}
          <div className="md:col-span-4 lg:col-span-2">
            <Logo />
            <div className="mt-6 text-sm">
              <p>4/11-15 Leicester Avenue,</p>
              <p>Glen Waverley, 3150</p>
              <p className="mt-2">P: 13 84 00</p>
              <p className="mt-2">M: info@v4it.com.au</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-blue-600"><Twitter /></a>
              <a href="#" className="text-gray-500 hover:text-blue-600"><Facebook /></a>
              <a href="#" className="text-gray-500 hover:text-blue-600"><Instagram /></a>
              <a href="#" className="text-gray-500 hover:text-blue-600"><Youtube /></a>
              <a href="#" className="text-gray-500 hover:text-blue-600"><Linkedin /></a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-4">{title}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link}><a href="#" className="hover:underline">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Section - Rating */}
        <div className="text-center md:text-left mt-12">
            <p className="font-bold text-lg">Rated 4.9 out of 5</p>
            <div className="flex justify-center md:justify-start items-center space-x-1 mt-2">
                {/* Star SVGs */}
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ))}
                <span className="text-sm ml-2">21205 Ratings</span>
            </div>
        </div>
        
        {/* Divider */}
        <div className="border-t my-12"></div>

        {/* Bottom Section */}
        <div className="text-center text-xs text-gray-500 space-y-4">
            <div className="flex justify-center items-center space-x-2">
                {/* Placeholder for flags */}
                <div className="w-6 h-4 bg-red-500 border border-black"></div>
                <div className="w-6 h-4 bg-blue-800 border border-black"></div>
            </div>
            <p>V4 Services (V4) acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.</p>
            <p>Copyright © 2022 V4, V4 Accounting, V4 Digital Services and V4 Migration Services are a part of V4 Services Pty Ltd ABN (71659611462 ACN 659611462). *V4 is an independent third party company, not to be confused with other brands. We explicitly deny any affiliations/partnership with any brands.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
