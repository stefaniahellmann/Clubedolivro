import React, { useEffect } from 'react';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
type Backdrop = 'none' | 'light' | 'dark';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  /** Intensidade do fundo por trás do modal */
  backdrop?: Backdrop; // default: 'light'
  children: React.ReactNode;
}

const sizeMap: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  backdrop = 'light',
  children,
}: ModalProps) {
  // trava o scroll do body enquanto o modal está aberto
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const backdropClass =
    backdrop === 'none'
      ? 'bg-transparent'
      : backdrop === 'dark'
      ? // fundo mais escuro
        'bg-black/60 dark:bg-black/70'
      : // fundo leve (recomendado)
        'bg-black/15 dark:bg-black/25'; // <<< mais claro que antes

  return (
    <div
      className={`fixed inset-0 z-50 ${backdropClass} flex items-start justify-center px-4 py-8`}
      // Removido qualquer backdrop-blur
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`w-full ${sizeMap[size]} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Fechar"
              title="Fechar"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
