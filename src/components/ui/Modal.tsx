import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  // Não renderiza nada se estiver fechado
  if (!isOpen) return null;

  // Bloqueia scroll do body enquanto o modal está aberto
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, []);

  // Fecha no ESC
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Conteúdo do modal
  const node = (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Caixa */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={[
            'w-full', SIZE[size],
            'rounded-2xl shadow-lg border',
            'bg-white dark:bg-zinc-900',
            'border-zinc-200 dark:border-zinc-800',
            'p-6',
          ].join(' ')}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              aria-label="Fechar"
            >
              <X size={22} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  // Portal garante isolamento e evita quirks de layout
  return createPortal(node, document.body);
}
