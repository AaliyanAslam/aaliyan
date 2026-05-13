import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Button = ({ 
  children, 
  onClick, 
  className = "", 
  size = "sm", 
  variant = "colorful",
  disabled = false,
  ...props 
}) => {
  const buttonRef = useRef(null);

  // Smooth GSAP Hover Animations
  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onMouseEnter = contextSafe(() => {
    gsap.to(buttonRef.current, {
      backgroundPosition: "100% 0%",
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(buttonRef.current, {
      backgroundPosition: "0% 0%",
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut"
    });
  });

  const onMouseDown = contextSafe(() => {
    gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1 });
  });

  const onMouseUp = contextSafe(() => {
    gsap.to(buttonRef.current, { scale: 1.05, duration: 0.1 });
  });

  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-medium select-none disabled:opacity-50 disabled:pointer-events-none rounded-md cursor-pointer";
  
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 py-2 text-sm",
  };

  const variants = {
    colorful: "text-slate-800 shadow-sm border-none",
    outline: "border border-slate-200 bg-white text-slate-700",
  };

  const gradientStyle = variant === 'colorful' ? {
    // Colors directly from image_551ba1.png
    backgroundImage: 'linear-gradient(135deg, #bae6fd 0%, #d9f99d 50%, #fecaca 100%)',
    backgroundSize: '200% 100%',
    backgroundPosition: '0% 0%'
  } : {};

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={gradientStyle}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 text-gray-900">{children}</span>
    </button>
  );
};

export default Button;