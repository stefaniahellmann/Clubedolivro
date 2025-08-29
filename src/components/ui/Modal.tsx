import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
type Backdrop = 'none' | 'light' | 'dark';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  backdrop?: Backdrop; // 'light' | 'dark' | 'none'
  children: React.ReactNode;
}

const sizeMap: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
};

function ModalInner({
  isOpen,
  onClose,
  title,
  size = 'md',
  backdrop = 'light',
  children,
}: ModalProps) {
  // fecha com ESC
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', onKey);
    // trava scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onKey]);

  if (!isOpen) return null;

  const overlayTone =
    backdrop === 'none'
      ? 'bg-transparent'
      : backdrop === 'dark'
      ? 'bg-black/60 dark:bg-black/70'
      : 'bg-black/20 dark:bg-black/30'; // leve e visível

  return (
    <>
      {/* OVERLAY (z-50) */}
      <div
        className={`fixed inset-0 z-50 ${overlayTone}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* PAINEL (z-60) */}
      <div className="fixed inset-0 z-60 flex items-start justify-center px-4 py-8">
        <div
          role="dialog"
          aria-modal="true"
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
    </>
  );
}

export function Modal(props: ModalProps) {
  // Portal para evitar conflitos de z-index/stacking-context
  const mount = typeof document !== 'undefined' ? document.body : null;
  if (!props.isOpen || !mount) return null;
  return ReactDOM.createPortal(<ModalInner {...props} />, mount);
}
