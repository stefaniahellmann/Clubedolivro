import React from 'react';
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
    { id: 'materials', label: 'Materiais', icon: FileText }
  ];

  return (
    <nav className="bg-gray-800/90 backdrop-blur-sm shadow-lg border-b border-gray-700 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-1 overflow-x-auto py-4">
        {navItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            variant={activeView === item.id ? 'primary' : 'ghost'}
            size="sm"
            className={`flex items-center space-x-2 whitespace-nowrap transition-all duration-200 ${
              activeView === item.id 
                ? 'bg-gradient-to-r from-amber-600 to-green-600 text-white shadow-lg' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}