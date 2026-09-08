import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  pulse = false,
  href,
  onClick,
  ...props
}) => {
  const baseStyles = "action-button inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 w-full sm:w-auto text-center relative overflow-hidden";
  
  const variants = {
    primary: "bg-brand-wine text-brand-light border border-brand-accent/40 hover:brightness-110 active:scale-95",
    outline: "bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-dark transform hover:-translate-y-1 active:scale-95",
    dark: "bg-brand-dark text-brand-light border border-white/10 shadow-lg hover:brightness-110 transform hover:-translate-y-1 active:scale-95",
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

  const sharedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (onClick) {
    return (
      <button type="button" className={sharedClassName} onClick={onClick} {...props}>
        {pulseElement}
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={sharedClassName}
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
