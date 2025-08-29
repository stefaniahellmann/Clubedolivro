import React, { useCallback } from 'react';
import { Button } from './ui/Button';
import { Home, Calendar, BookOpen, Users, FileText, Gift, User } from 'lucide-react';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'summaries', label: 'Resumos', icon: Calendar },
    { id: 'books', label: 'Livros', icon: BookOpen },
    { id: 'partners', label: 'Parceiros', icon: Users },
    { id: 'materials', label: 'Materiais', icon: FileText },
    { id: 'raffle', label: 'Rifa', icon: Gift },
    { id: 'settings', label: 'Perfil', icon: User },
  ] as const;

  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const idx = navItems.findIndex((i) => i.id === activeView);
      if (idx < 0) return;

      if (e.key === 'ArrowRight') {
        const next = (idx + 1) % navItems.length;
        onViewChange(navItems[next].id);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        const prev = (idx - 1 + navItems.length) % navItems.length;
        onViewChange(navItems[prev].id);
        e.preventDefault();
      }
    },
    [activeView, navItems, onViewChange]
  );

  return (
    <nav
      aria-label="Seções principais"
      className="
        bar
        mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8
      "
    >
      {/* container centralizado */}
      <div className="max-w-7xl mx-auto">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="flex justify-center gap-2 md:gap-3 overflow-x-auto py-4"
          onKeyDown={handleKey}
        >
          {navItems.map((item) => {
            const isActive = activeView === item.id;

            // base neutra (sem verde). Escuro cinza igual modais.
            const base =
              'border rounded-lg px-4 md:px-5 py-2.5 ' +
              'inline-flex items-center gap-2 whitespace-nowrap text-sm ' +
              'transition-colors duration-200 ' +
              'bg-white border-zinc-200 text-zinc-700 ' +
              'dark:bg-zinc-800/60 dark:border-zinc-700 dark:text-zinc-300';

            // hover verde pastel
            const hover =
              'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 ' +
              'dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 dark:hover:border-emerald-700/40';

            // ativo (verde pastel)
            const active =
              'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm ' +
              'dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-700/40';

            return (
              <Button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'page' : undefined}
                // usamos variant="ghost" para não interferir na nossa paleta
                variant="ghost"
                size="sm"
                className={[base, hover, isActive ? active : ''].join(' ')}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
