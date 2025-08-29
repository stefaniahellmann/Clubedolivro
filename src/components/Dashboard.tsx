import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Sparkles } from 'lucide-react';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Boa noite';
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function WelcomeBanner() {
  const greeting = getGreeting();
  return (
    <div
      className="
        rounded-2xl border shadow-sm p-6 sm:p-7 mb-8
        bg-gradient-to-r from-emerald-100 via-emerald-50 to-teal-100
        text-emerald-900 border-emerald-200
        dark:bg-zinc-800/60 dark:text-zinc-100 dark:border-zinc-700
      "
      role="region"
      aria-label="Boas-vindas"
    >
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        <Sparkles className="h-6 w-6 text-emerald-700 dark:text-amber-300 mt-0.5 sm:mt-0" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            {greeting}, bem-vindo ao Clube do Livro 👋
          </h2>
          <p className="mt-1 text-sm sm:text-base text-emerald-800/80 dark:text-zinc-300">
            Explore os acessos rápidos abaixo.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Banner com degradê verde pastel (claro) / cinza (escuro) */}
      <WelcomeBanner />

      {/* Exemplo de conteúdo qualquer abaixo — mantenha o que você já tinha */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold">Conteúdo de exemplo</h3>
          <p className="subtle mt-1">
            Substitua por seus cards/atalhos existentes.
          </p>
          <Button className="mt-4" variant="primary">Ação</Button>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Outro bloco</h3>
          <p className="subtle mt-1">…</p>
          <Button className="mt-4" variant="secondary">Ação</Button>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Mais um</h3>
          <p className="subtle mt-1">…</p>
          <Button className="mt-4">Ação</Button>
        </Card>
      </div>
    </div>
  );
}
