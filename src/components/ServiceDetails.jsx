import React, { useId, useState } from 'react';

function ServiceDetails({ title, services }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="service-details">
      <button
        className="service-toggle w-full text-left font-bold text-brand-wine py-2"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(open => !open)}
      >
        <span>{isOpen ? 'Recolher serviços' : 'Conheça os serviços'}<span className="sr-only"> para {title.toLowerCase()}</span></span>
        <span className="details-indicator" aria-hidden="true" />
      </button>
      <div id={panelId} className="disclosure-panel" data-open={isOpen} aria-hidden={!isOpen}>
        <div className="min-h-0 overflow-hidden">
          <ul className="list-disc pl-5 space-y-3 text-brand-muted leading-relaxed pt-4">
            {services.map(service => <li key={service}>{service}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
