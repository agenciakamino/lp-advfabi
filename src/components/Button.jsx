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
    primary: "bg-brand-accent text-white shadow-lg shadow-brand-accent/30 hover:shadow-xl hover:shadow-brand-accent/40 hover:bg-brand-hover transform hover:-translate-y-1 active:scale-95",
    outline: "bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transform hover:-translate-y-1 active:scale-95",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-4 text-lg",
    lg: "px-10 py-5 text-xl",
  };

  const pulseElement = pulse && (
    <span className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
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