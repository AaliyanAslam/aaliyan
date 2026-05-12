import React from 'react';
import { inter } from '../fonts';

const Footer = () => {
  const socialLinks = [
    { name: 'Dribbble', url: '#' },
    { name: 'Linkdin', url: '#' }, // Spelled as 'Linkdin' to match image_e10e97.png
    { name: 'Instagram', url: '#' },
    { name: 'Behance', url: '#' },
  ];

  return (
    <footer className={`w-full bg-white py-10 px-6 md:px-12 lg:px-24 ${inter.className}`}>
      <div className="max-w-420 mx-auto">
        
        {/* Logo/Icon Section */}
        <div className="mb-8">
          <div className="w-10 h-10 relative">
            {/* Custom Cross Icon from image_e10e97.png */}
            <div className="absolute inset-0 border-2 border-black rotate-45 transform origin-center"></div>
            <div className="absolute inset-0 border-2 border-black -rotate-45 transform origin-center"></div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="w-full h-px bg-gray-300 mb-6"></div>

        {/* Links and Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Social Links */}
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.url} 
                  className="text-[15px] font-medium text-black hover:text-gray-500 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Copyright Text */}
          <p className="text-[15px] font-medium text-black">
            Personal portfolio©2024
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;