import React from 'react';
import Icon from './Icon';
import { WHATSAPP_CONFIG } from '../constants/contact';

const FloatingWhatsApp = () => {
  const handleClick = () => {
    window.open(WHATSAPP_CONFIG.link(), '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="floating-contact fixed bottom-6 right-6 z-[99] flex flex-col items-end">
      <div className="contact-tooltip mb-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-brand-medium/30 text-brand-dark text-sm font-bold" aria-hidden="true">
        Fale com nossa equipe
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="contact-button relative bg-brand-wine text-brand-light p-4 rounded-full shadow-lg"
        aria-label="Falar pelo WhatsApp"
      >
        <Icon name="MessageCircle" size={28} />
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
