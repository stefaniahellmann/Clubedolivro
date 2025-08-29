import React, { useMemo, useState } from 'react';
import { useConfig, RAFFLE_PRICE, RAFFLE_TOTAL } from '../contexts/ConfigContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Gift, Ticket, Users, Trophy, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export function Raffle() {
  const { raffle, buyNumbers, releaseNumber, clearRaffle, drawWinner } = useConfig();
  const { user } = useAuth();

  const [buyerName, setBuyerName] = useState(user?.firstName || '');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [showWinner, setShowWinner] = useState<null | { number: number; name: string }>(null);

  const perPage = 100; // 10x10 grade
  const pages = Math.ceil(RAFFLE_TOTAL / perPage);

  const soldCount = useMemo(() => Object.values(raffle).filter(Boolean).length, [raffle]);
  const progress = soldCount / RAFFLE_TOTAL;
  const revenue = soldCount * RAFFLE_PRICE;

  const pageNumbers = useMemo(() => {
    const start = (page - 1) * perPage + 1;
    const end = Math.min(page * perPage, RAFFLE_TOTAL);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page]);

  const toggleNumber = (n: number) => {
    if (raffle[n]) return; // já vendido
    const next = new Set(selected);
    next.has(n) ? next.delete(n) : next.add(n);
    setSelected(next);
  };

  const confirmPurchase = () => {
    const nums = Array.from(selected);
    if (!buyerName.trim() || nums.length === 0) return;

    const res = buyNumbers(buyerName.trim(), nums);
    if (res.ok) setSelected(new Set());
    else alert(`Falhou para: ${res.failed?.join(', ')}`);
  };

  const buyersList = useMemo(() => {
    const map: Record<string, number[]> = {};
    Object.entries(raffle).forEach(([numStr, who]) => {
      if (!who) return;
      const num = Number(numStr);
      if (!map[who]) map[who] = [];
      map[who].push(num);
    });
    // ordena números para cada comprador
    Object.keys(map).forEach((k) => map[k].sort((a, b) => a - b));
    // transforma em array ordenado por nome
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [raffle]);

  const canDraw = progress >= 0.9;

  return (
    <div className="space-y-6">
      {/* Header + métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Ticket className="text-emerald-600 dark:text-emerald-300" />
            <div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Vendidos</div>
              <div className="text-xl font-bold text-zinc-900 dark:text-white">{soldCount}/{RAFFLE_TOTAL}</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="text-blue-600 dark:text-blue-300" />
            <div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Participantes</div>
              <div className="text-xl font-bold text-zinc-900 dark:text-white">{buyersList.length}</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Gift className="text-amber-600 dark:text-amber-300" />
            <div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Preço por nº</div>
              <div className="text-xl font-bold text-zinc-900 dark:text-white">R$ {RAFFLE_PRICE.toFixed(2)}</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Trophy className="text-purple-600 dark:text-purple-300" />
            <div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Arrecadado</div>
              <div className="text-xl font-bold text-zinc-900 dark:text-white">R$ {revenue.toFixed(2)}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Barra de progresso */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-zinc-600 dark:text-zinc-300">Progresso da Rifa</span>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {(progress * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            disabled={!canDraw}
            onClick={() => {
              const w = drawWinner();
              if (w) setShowWinner(w);
            }}
            className={canDraw ? '' : 'opacity-60 cursor-not-allowed'}
          >
            <Trophy className="mr-2" size={16} />
            Sortear (≥90%)
          </Button>
          <Button variant="ghost" onClick={clearRaffle} className="text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10">
            <Trash2 className="mr-2" size={16} />
            Limpar rifa
          </Button>
        </div>
      </Card>

      {/* Comprar números */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Seu nome
            </label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg transition
                         bg-white border border-zinc-200 text-zinc-900
                         focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                         dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              placeholder="Ex.: João"
            />
          </div>

          <div className="flex items-end gap-2">
            <Button onClick={confirmPurchase}>
              Comprar {selected.size} nº (R$ {(selected.size * RAFFLE_PRICE).toFixed(2)})
            </Button>
            {selected.size > 0 && (
              <Button variant="ghost" onClick={() => setSelected(new Set())}>
                Limpar seleção
              </Button>
            )}
          </div>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Página {page} de {pages}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft size={16} />
              Anterior
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.min(pages, p + 1))}>
              Próxima
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        {/* Grade 10x10 */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {pageNumbers.map((n) => {
            const sold = Boolean(raffle[n]);
            const sel = selected.has(n);
            return (
              <button
                key={n}
                onClick={() => toggleNumber(n)}
                disabled={sold}
                className={[
                  'text-sm rounded-lg px-2 py-2 border transition',
                  sold
                    ? 'bg-zinc-200 text-zinc-500 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-700 cursor-not-allowed'
                    : sel
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-white border-zinc-200 hover:bg-emerald-50 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-emerald-500/10'
                ].join(' ')}
                title={sold ? `Vendido para ${raffle[n]}` : `Disponível`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Lista de compradores */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Compradores</h3>
        {buyersList.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">Ninguém comprou ainda.</p>
        ) : (
          <div className="space-y-3">
            {buyersList.map(([name, nums]) => (
              <div key={name} className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-medium text-zinc-900 dark:text-white">{name}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-300">
                    {nums.length} nº — R$ {(nums.length * RAFFLE_PRICE).toFixed(2)}
                  </div>
                </div>
                <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 break-words">
                  {nums.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Modal vencedor */}
      <Modal isOpen={!!showWinner} onClose={() => setShowWinner(null)} title="Resultado do Sorteio" size="sm">
        {showWinner && (
          <div className="space-y-3">
            <p className="text-zinc-700 dark:text-zinc-300">
              Número sorteado: <span className="font-bold">{showWinner.number}</span>
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              Vencedor: <span className="font-bold">{showWinner.name}</span>
            </p>
            <div className="pt-2">
              <Button onClick={() => setShowWinner(null)}>Fechar</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
