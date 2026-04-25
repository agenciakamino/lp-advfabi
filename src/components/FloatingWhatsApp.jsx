import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { WHATSAPP_CONFIG } from '../constants/contact';

const FloatingWhatsApp = ({ phoneNumber = WHATSAPP_CONFIG.phoneNumber, message = WHATSAPP_CONFIG.defaultMessage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let timeoutId;

    // Show button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Logic for random tooltip appearance
    const scheduleNext = (currentVisible) => {
      // If currently visible, stay visible for 6s. 
      // If currently hidden, stay hidden for 6s to 12s.
      const delay = currentVisible ? 6000 : (Math.random() * 6000 + 6000); 
      timeoutId = setTimeout(() => {
        setShowTooltip(prev => {
          const nextState = !prev;
          scheduleNext(nextState);
          return nextState;
        });
      }, delay);
    };

    // Start the cycle after 4 seconds
    const initialTimer = setTimeout(() => {
      setShowTooltip(true);
      scheduleNext(true);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(initialTimer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[99] flex flex-col items-end transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      {/* Tooltip/Message Bubble */}
      <div 
        className={`mb-4 bg-white px-4 py-2 rounded-2xl shadow-xl border border-brand-medium/30 text-brand-dark text-sm font-bold transition-all duration-500 transform origin-bottom-right ${showTooltip ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        Dra. Fabiana online agora <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse"></span>
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-brand-medium/30 transform rotate-45"></div>
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        aria-label="Falar pelo WhatsApp"
      >
        {/* Main button */}
        <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-bounce-slow">
          <Icon name="MessageCircle" size={32} fill="currentColor" />
          
          {/* Notification dot (subtle) */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </div>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
