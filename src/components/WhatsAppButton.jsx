import React from 'react';
import Button from './Button';
import Icon from './Icon';
import { WHATSAPP_CONFIG } from '../constants/contact';

const WhatsAppButton = ({
  text,
  variant,
  outline = false,
  size = "md",
  icon = false,
  pulse = false,
  className = "",
  ariaLabel,
  onClick,
  message,
}) => {
  const handleClick = (e) => {
    window.open(WHATSAPP_CONFIG.link(message), '_blank', 'noopener,noreferrer');
    if (onClick) onClick(e);
  };

  return (
    <Button
      variant={variant || (outline ? 'outline' : 'primary')}
      size={size}
      pulse={pulse}
      onClick={handleClick}
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
