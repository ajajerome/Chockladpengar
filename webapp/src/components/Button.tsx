import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  loading = false,
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-md hover:shadow-lg';
  
  const variantClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    success: 'text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 shadow-none',
  };
  
  const variantStyles = {
    primary: { background: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)', color: '#8B5A3C' },
    secondary: { background: 'linear-gradient(135deg, #A67C52 0%, #8B5A3C 100%)', color: '#FFFFFF' },
    success: { background: 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)', color: '#FFFFFF' },
    danger: {},
    ghost: { color: '#8B5A3C' },
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass}`}
      style={variantStyles[variant]}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Laddar...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
