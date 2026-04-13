import React from 'react';

function MethodStep({ number, title, desc }) {
  return (
    <div className="relative z-10 flex flex-col items-center group method-step">
      <div className="w-16 h-16 bg-[#3A3532] border-4 border-[#2C2826] shadow-xl rounded-full flex items-center justify-center text-2xl font-serif font-bold text-brand-accent mb-6 group-hover:-translate-y-2 transition-transform">
        {number}
      </div>
      <h3 className="font-serif font-bold text-white mb-2 text-xl">{title}</h3>
      <p className="text-brand-medium text-base leading-relaxed">{desc}</p>
    </div>
  );
}

export default MethodStep;