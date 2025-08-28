import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false, ...props }: CardProps) {
  const base =
    // usamos a utilitária .card (definida no index.css) + reforço explícito das cores
    'card rounded-2xl border bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-sm p-6';

  const hoverClasses = hover
    ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'
    : '';

  return (
    <div className={[base, hoverClasses, className].join(' ')} {...props}>
      {children}
    </div>
  );
}
