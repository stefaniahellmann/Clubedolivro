import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
};

type ButtonProps =
  & CommonProps
  & React.ButtonHTMLAttributes<HTMLButtonElement>
  & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  as = 'button',
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2';
  const ring = 'focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-900';

  // Tons mais suaves no claro; contraste no escuro
  const variants: Record<Variant, string> = {
    primary:
      'bg-emerald-600/90 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500',
    secondary:
      'bg-amber-600/90 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-500',
    outline:
      'border border-emerald-300 text-emerald-700 hover:bg-emerald-50 ' +
      'dark:border-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-500/10',
    ghost:
      'text-zinc-700 hover:bg-zinc-100 ' +
      'dark:text-zinc-300 dark:hover:bg-zinc-800',
    danger:
      'bg-red-600/90 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-500',
  };

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const width = fullWidth ? 'w-full' : '';

  const classes = [base, ring, variants[variant], sizes[size], width, className].join(' ');

  if (as === 'a') {
    return (
      <a href={href} target={target} rel={rel} className={classes} {...(props as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as any)}>
      {children}
    </button>
  );
}
