import React from 'react';
import Button from './Button';
import Icon from './Icon';

const WhatsAppButton = ({ 
  text, 
  outline = false, 
  size = "md", 
  icon = false, 
  pulse = false,
  href = "#",
  className = "",
  ariaLabel
}) => {
  return (
    <Button 
      variant={outline ? 'outline' : 'primary'}
      size={size}
      pulse={pulse}
      href={href}
      className={className}
      aria-label={ariaLabel || text}
    >
      {icon && <Icon name="MessageCircle" size={size === 'sm' ? 18 : 22} />}
      {!icon && size === "sm" && <Icon name="MessageCircle" size={18} />}
      <span>{text}</span>
      {icon && <Icon name="ArrowRight" size={20} className="ml-1" />}
    </Button>
  );
};

export default WhatsAppButton;