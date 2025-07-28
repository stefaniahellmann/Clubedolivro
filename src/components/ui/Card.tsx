import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}