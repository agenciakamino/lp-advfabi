import React from 'react';

function MethodStep({ number, title, desc, light = false }) {
  return (
    <div className="method-step relative z-10 grid grid-cols-[4rem_1fr] gap-x-5 text-left lg:flex lg:flex-col lg:items-center lg:text-center">
      <div className={`method-marker row-span-2 w-16 h-16 shrink-0 ${light ? 'bg-white border-brand-dark/20 text-brand-dark' : 'bg-brand-dark border-brand-accent/50 text-brand-accent'} border rounded-full flex items-center justify-center text-2xl font-serif font-bold lg:mb-6`}>
        {number}
      </div>
      <h3 className={`font-serif font-bold ${light ? 'text-brand-dark' : 'text-white'} mb-2 text-xl`}>{title}</h3>
      <p className={`${light ? 'text-brand-muted' : 'text-white/70'} text-base leading-relaxed`}>{desc}</p>
    </div>
  );
}

export default MethodStep;
