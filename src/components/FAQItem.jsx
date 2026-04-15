import React, { useState } from 'react';
import Icon from './Icon';

function FAQItem({ question, answer, highlight }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item border rounded-xl bg-white overflow-hidden transition-colors duration-200 ${highlight ? 'border-brand-accent' : 'border-brand-medium/60'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full text-left px-6 py-6 flex justify-between items-center gap-4 focus:outline-none hover:bg-brand-light"
      >
        <span className={`font-serif font-bold text-lg ${highlight ? 'text-brand-accent' : 'text-brand-dark'}`}>{question}</span>
        {isOpen ? (
          <Icon name="ChevronUp" className="flex-shrink-0 text-brand-accent" size={24} />
        ) : (
          <Icon name="ChevronDown" className="flex-shrink-0 text-brand-accent" size={24} />
        )}
      </button>
      
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-slate-600 text-base leading-relaxed pt-4 border-t border-brand-medium/20">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default FAQItem;