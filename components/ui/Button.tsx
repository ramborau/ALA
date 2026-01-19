import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative font-heading font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transform active:scale-[0.98] btn-3d disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0";
  
  const variants = {
    primary: "bg-primary text-white border-primary",
    secondary: "bg-gray-800 text-white shadow-gray-900",
    outline: "bg-white text-gray-700 border-2 border-gray-200 shadow-gray-200 hover:bg-gray-50",
  };

  const shadowColor = variant === 'primary' ? '#009e06' : (variant === 'secondary' ? '#0f172a' : '#cbd5e1');
  
  // Custom style to override the class based shadow for dynamic colors if needed, but using class util for now
  const dynamicStyle = {
    boxShadow: `0px 4px 0px 0px ${shadowColor}`,
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={dynamicStyle}
      {...props}
    >
      {children}
    </button>
  );
};