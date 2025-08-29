import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** opcional: conteúdo do rodapé (botão de acesso) */
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, size = 'md', footer }: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black/75" onClick={onClose} />
        <div
          className={`inline-block w-full ${sizeClasses[size]} p-6 my-8 overflow-hidden text-left align-middle transition-all bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-2xl`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white">{title}</h3>
            <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition">
              <X size={24} />
            </button>
          </div>

          <div className="text-zinc-700 dark:text-zinc-200">{children}</div>

          {footer && (
            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
