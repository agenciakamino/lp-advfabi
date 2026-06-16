import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  pulse = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 w-full sm:w-auto text-center relative overflow-hidden";
  
  const variants = {
    primary: "bg-brand-accent text-brand-dark shadow-lg hover:bg-brand-hover hover:shadow-[0_8px_18px_-4px_rgba(201,160,82,0.35)] transform hover:-translate-y-1 active:scale-95",
    outline: "bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-hover hover:border-brand-hover hover:text-brand-dark transform hover:-translate-y-1 active:scale-95",
    dark: "bg-brand-dark text-white border border-white/10 shadow-lg hover:bg-[#1a2333] transform hover:-translate-y-1 active:scale-95",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-4 text-lg",
    lg: "px-10 py-5 text-xl",
  };

  const pulseElement = pulse && (
    <span className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
    </span>
  );

  return (
    <a 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {pulseElement}
      {children}
    </a>
  );
};

export default Button;