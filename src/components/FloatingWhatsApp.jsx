import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { WHATSAPP_CONFIG } from '../constants/contact';

const FloatingWhatsApp = () => {
  const handleClick = () => {
    window.open(WHATSAPP_CONFIG.link(), '_blank', 'noopener,noreferrer');
  };
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let active = true;
    let timerId = null;

    function schedule(fn, delay) {
      clearTimeout(timerId);
      timerId = setTimeout(fn, delay);
    }

    function hide() {
      if (!active) return;
      setShowTooltip(false);
      // Fica escondido entre 12 e 22 segundos antes de aparecer de novo
      schedule(show, Math.random() * 10000 + 12000);
    }

    function show() {
      if (!active) return;
      setShowTooltip(true);
      // Fica visível por 6 segundos
      schedule(hide, 6000);
    }

    const buttonTimer = setTimeout(() => {
      if (active) setIsVisible(true);
    }, 2000);

    // Primeira aparição do tooltip após 4 segundos
    const startTimer = setTimeout(show, 4000);

    return () => {
      active = false;
      clearTimeout(buttonTimer);
      clearTimeout(startTimer);
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[99] flex flex-col items-end transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      {/* Tooltip/Message Bubble */}
      <div
        className={`mb-4 bg-white px-4 py-2 rounded-2xl shadow-xl border border-brand-medium/30 text-brand-dark text-sm font-bold transition-all duration-500 transform origin-bottom-right ${showTooltip ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        Dra. Fabiana online agora <span className="inline-block w-2 h-2 bg-brand-accent rounded-full ml-1 animate-pulse"></span>
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-brand-medium/30 transform rotate-45"></div>
      </div>

      {/* Floating Button */}
      <button
        type="button"
        onClick={handleClick}
        className="relative group"
        aria-label="Falar pelo WhatsApp"
      >
        <div className="relative bg-brand-accent text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-bounce-slow">
          <Icon name="MessageCircle" size={32} fill="currentColor" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-brand-accent border-2 border-white rounded-full"></span>
        </div>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
