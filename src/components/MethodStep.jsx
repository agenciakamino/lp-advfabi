import React from 'react';

function MethodStep({ number, title, desc, light = false }) {
  return (
    <div className="relative z-10 flex flex-col items-center group method-step">
      <div className={`w-16 h-16 ${light ? 'bg-white border-brand-dark/20 text-brand-dark' : 'bg-brand-dark border-white/20 text-brand-accent'} border-4 shadow-xl rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6 group-hover:-translate-y-2 transition-transform`}>
        {number}
      </div>
      <h3 className={`font-serif font-bold ${light ? 'text-brand-dark' : 'text-white'} mb-2 text-xl`}>{title}</h3>
      <p className={`${light ? 'text-brand-muted' : 'text-white/70'} text-base leading-relaxed`}>{desc}</p>
    </div>
  );
}

export default MethodStep;