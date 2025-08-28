import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  // Fecha no Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-zinc-900/40 dark:bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Conteúdo */}
      <div className="relative min-h-full flex items-center justify-center p-4">
        <div
          className={[
            'w-full', sizeClasses[size],
            'rounded-2xl border shadow-xl overflow-hidden',
            'bg-white dark:bg-zinc-900',
            'border-zinc-200 dark:border-zinc-800',
          ].join(' ')}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h3 id="modal-title" className="text-lg font-semibold text-zinc-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100
                         dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition"
            >
              <X size={22} />
            </button>
          </div>

          <div className="px-6 py-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
