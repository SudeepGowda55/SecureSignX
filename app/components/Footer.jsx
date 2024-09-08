import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between">
        {/* Quick Links Section */}
        <div className="mb-8 lg:mb-0">
          <button
            onClick={() => setShowQuickLinks(!showQuickLinks)}
            className="text-lg font-semibold mb-4 focus:outline-none"
          >
            {showQuickLinks ? 'Hide Quick Links' : 'Quick Links'}
          </button>
          {showQuickLinks && (
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/features" className="hover:underline">Features</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          )}
        </div>
        
        {/* Contact Us Section */}
        <div className="mb-8 lg:mb-0">
          <button
            onClick={() => setShowContactUs(!showContactUs)}
            className="text-lg font-semibold mb-4 focus:outline-none"
          >
            {showContactUs ? 'Hide Contact Us' : 'Contact Us'}
          </button>
          {showContactUs && (
            <div>
              <p className="mb-2">Email: <a href="mailto:info@signprotocol.com" className="hover:underline">info@signprotocol.com</a></p>
              <p>Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></p>
            </div>
          )}
        </div>
        
        {/* Social Media Section */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
              <path d="M23 3a10.43 10.43 0 0 1-2.83.77A4.96 4.96 0 0 0 22.4 2a9.94 9.94 0 0 1-3.16 1.21A4.96 4.96 0 0 0 16.8.8a4.96 4.96 0 0 0-5 5.05c0 .4.04.8.1 1.19A14.09 14.09 0 0 1 1.67 2.85a4.97 4.97 0 0 0-.67 2.51c0 1.74.87 3.27 2.18 4.17A4.95 4.95 0 0 1 .97 8v.06a4.99 4.99 0 0 0 3.97 4.9A5.05 5.05 0 0 1 .97 13a4.99 4.99 0 0 0 4.67 3.46A9.99 9.99 0 0 1 0 20.09a14.08 14.08 0 0 0 7.68 2.24c9.24 0 14.29-7.64 14.29-14.29 0-.22-.01-.43-.02-.65A10.16 10.16 0 0 0 23 3z" />
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
              <path d="M22.676 0H1.324C.59 0 0 .59 0 1.324v21.352C0 23.41.59 24 1.324 24h11.47V14.708h-3.2v-3.6h3.2V8.41c0-3.2 1.94-4.9 4.76-4.9 1.33 0 2.48.1 2.81.14v3.26h-1.93c-1.5 0-1.8.72-1.8 1.78v2.32h3.6l-.47 3.6h-3.13V24h6.21c.73 0 1.324-.59 1.324-1.324V1.324C24 .59 23.41 0 22.676 0z" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
              <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11 18H6v-8h2v8zm-1-9.17c-.65 0-1.18-.53-1.18-1.18s.53-1.18 1.18-1.18c.65 0 1.18.53 1.18 1.18s-.53 1.18-1.18 1.18zm13 9.17h-2v-4.5c0-1.07-.42-1.8-1.47-1.8-.8 0-1.27.54-1.48 1.06-.08.19-.1.46-.1.73v4.51h-2v-8h2v1.12c.27-.42.74-1.02 1.8-1.02 1.33 0 2.2.87 2.2 2.74v5.16h-.01z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Sign Protocol. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
