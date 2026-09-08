import React, { useId, useState } from 'react';
import Icon from './Icon';

function FAQItem({ question, answer, highlight }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`faq-item border rounded-xl bg-white overflow-hidden transition-colors duration-200 ${highlight ? 'border-brand-accent' : 'border-brand-medium/60'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full text-left px-6 py-6 flex justify-between items-center gap-4 hover:bg-brand-light"
      >
        <span className={`font-serif font-bold text-lg ${highlight ? 'text-brand-dark underline decoration-brand-accent/30 underline-offset-4' : 'text-brand-dark'}`}>{question}</span>
        <Icon name="ChevronDown" className={`flex-shrink-0 text-brand-dark transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={24} />
      </button>
      
      <div 
        id={panelId}
        className="faq-answer disclosure-panel"
        data-open={isOpen}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mx-6 pb-6 text-brand-muted text-base leading-relaxed pt-4 border-t border-brand-medium/20">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQItem;
