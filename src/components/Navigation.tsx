import React, { useCallback } from 'react';
import { Button } from './ui/Button';
import { Home, Calendar, BookOpen, Users, FileText } from 'lucide-react';

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
    [activeView, onViewChange]
  );

  return (
    <nav
      aria-label="Seções principais"
      className="bar mb-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
    >
      <div
        role="tablist"
        aria-orientation="horizontal"
        // Centralizado e com respiro. Faz wrap em telas pequenas.
        className="flex justify-center flex-wrap gap-3 md:gap-4 py-5"
        onKeyDown={handleKey}
      >
        {navItems.map((item) => {
          const isActive = activeView === item.id;

          // estados de cor:
          // - DEFAULT claro: chip cinza claro (sem verde); hover -> verde pastel
          // - DEFAULT escuro: chip cinza médio; hover -> verde translúcido
          // - ATIVO claro/escuro: verde pastel
          const base =
            'px-5 md:px-6 rounded-xl flex items-center gap-3 whitespace-nowrap transition-all duration-200 border';

          const neutralLight =
            'bg-white text-zinc-700 border-zinc-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200';

          const neutralDark =
            'dark:bg-zinc-800/70 dark:text-zinc-300 dark:border-zinc-700 ' +
            'dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 dark:hover:border-emerald-700/40';

          const activeLight =
            'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm';

          const activeDark =
            'dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-700/40';

          return (
            <Button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              // usamos "ghost" pra não forçar o verde do seu Button primário
              variant="ghost"
              size="md"
              className={[
                base,
                isActive
                  ? [activeLight, activeDark].join(' ')
                  : [neutralLight, neutralDark].join(' '),
              ].join(' ')}
            >
              <item.icon size={18} />
              <span className="text-sm md:text-base">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
