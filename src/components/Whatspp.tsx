import type { FC } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import { useState, useEffect } from 'react';

// Floating WhatsApp Component
const FloatingWhatsApp: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Your WhatsApp number (replace with your actual number)
  const whatsappNumber = "919653775333"; // ✅ Correct format
// Format: country code + number without +
  const whatsappMessage = "Hi! I'm interested in the DevOps course. Can you provide more details?";

  // Show button after user scrolls a bit
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Show tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const hideTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 mr-2 animate-bounce">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg relative max-w-xs">
            <button
              onClick={hideTooltip}
              className="absolute -top-2 -right-2 bg-gray-600 hover:bg-gray-700 rounded-full p-1 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm">
              Need help? Chat with us on WhatsApp! 💬
            </p>
            <div className="absolute bottom-0 right-4 transform translate-y-1">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110"
        title="Chat with us on WhatsApp"
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></div>
        
        {/* WhatsApp Icon */}
          <FaWhatsapp className="w-6 h-6 relative z-10" />
        
        {/* Online Status Indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    </div>
  );
};

// Example of how to use in your main layout/app
const MainLayout: FC = () => {
  return (
    <div className="">
      {/* Your existing content */}
      <div className="p-0">
        {/* <h1 className="text-4xl font-bold text-white mb-8">DevOps Course</h1> */}
        
        {/* Sample content to demonstrate scrolling */}
        {/* <div className="space-y-8">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">
                Section {i + 1}
              </h2>
              <p className="text-gray-300">
                This is sample content to demonstrate the floating WhatsApp button. 
                Scroll down to see the button appear after 300px of scrolling.
              </p>
            </div>
          ))}
        </div> */}
      </div>

      {/* Floating WhatsApp Button - Add this to your layout */}
      <FloatingWhatsApp />
    </div>
  );
};

export default MainLayout;