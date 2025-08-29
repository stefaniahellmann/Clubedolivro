import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Ticket, Users, Gift, Download, RefreshCw, ShieldCheck, Search } from 'lucide-react';

type TicketOwner = {
  number: number;
  owner: string;      // nome/apelido
  at: string;         // ISO date
};

type RaffleState = {
  price: number;      // 2
  owners: Record<number, TicketOwner | undefined>;
};

const TOTAL = 1000;
const PRICE = 2;
const LS_KEY = 'clube:raffle:v1';

function loadState(): RaffleState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as RaffleState;
  } catch {}
  return { price: PRICE, owners: {} };
}

function saveState(s: RaffleState) {
  localStorage.setItem(LS_KEY, JSON.stringify(s));
}

export function Raffle() {
  const { user, isAdmin } = useAuth();
  const [state, setState] = useState<RaffleState>(() => loadState());
  const [selected, setSelected] = useState<number[]>([]);
  const [buyer, setBuyer] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [showWinner, setShowWinner] = useState<null | TicketOwner>(null);

  // carrega apelido salvo no perfil
  useEffect(() => {
    const raw = localStorage.getItem('clube:userProfile');
    if (raw) {
      const p = JSON.parse(raw);
      if (!buyer) setBuyer(p.nickname || user?.firstName || '');
    } else if (!buyer) {
      setBuyer(user?.firstName || '');
    }
  }, [user]);

  // persiste
  useEffect(() => saveState(state), [state]);

  const numbers = useMemo(() => Array.from({ length: TOTAL }, (_, i) => i + 1), []);
  const sold = useMemo(
    () => Object.values(state.owners).filter(Boolean).length,
    [state.owners]
  );
  const percent = Math.round((sold / TOTAL) * 100);

  const isSold = (n: number) => Boolean(state.owners[n]);
  const toggleNumber = (n: number) => {
    if (isSold(n)) return; // não deixa selecionar vendidos
    setSelected((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  };

  const confirmPurchase = () => {
    if (!buyer.trim() || selected.length === 0) return;
    const owners = { ...state.owners };
    const now = new Date().toISOString();
    selected.forEach((n) => {
      if (!owners[n]) owners[n] = { number: n, owner: buyer.trim(), at: now };
    });
    setState((s) => ({ ...s, owners }));
    setSelected([]);
  };

  const clearAll = () => {
    if (!confirm('Tem certeza que deseja limpar TODA a rifa?')) return;
    setState({ price: PRICE, owners: {} });
    setSelected([]);
  };

  const ownersList = useMemo(() => {
    const byName: Record<string, number[]> = {};
    for (const n of Object.keys(state.owners)) {
      const own = state.owners[Number(n)];
      if (!own) continue;
      if (!byName[own.owner]) byName[own.owner] = [];
      byName[own.owner].push(own.number);
    }
    return Object.entries(byName)
      .map(([name, nums]) => ({ name, nums: nums.sort((a, b) => a - b) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [state.owners]);

  const filteredNumbers = useMemo(() => {
    if (!filter.trim()) return numbers;
    // se digitar nome, mostra apenas os números do nome; se digitar número, filtra por número
    const f = filter.trim().toLowerCase();
    const fromName = ownersList
      .filter((o) => o.name.toLowerCase().includes(f))
      .flatMap((o) => o.nums);
    const asNumber = Number.isFinite(Number(f)) ? [Number(f)] : [];
    const set = new Set([...fromName, ...asNumber]);
    return set.size ? [...set] : numbers;
  }, [filter, numbers, ownersList]);

  const canDraw = isAdmin && percent >= 90 && sold > 0;

  const drawWinner = () => {
    const soldOwners = Object.values(state.owners).filter(Boolean) as TicketOwner[];
    if (!soldOwners.length) return;
    const idx = Math.floor(Math.random() * soldOwners.length);
    setShowWinner(soldOwners[idx]);
  };

  const exportCSV = () => {
    const rows = [['numero', 'dono', 'data']];
    for (const n of Object.keys(state.owners)) {
      const own = state.owners[Number(n)];
      if (own) rows.push([String(own.number), own.owner, own.at]);
    }
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rifa.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Rifa do Clube</h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            {TOTAL} números • R$ {PRICE.toFixed(2)} cada
          </p>
        </div>

        <div className="min-w-[260px]">
          <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-1">
            <span>Progresso</span>
            <span>{percent}% ({sold}/{TOTAL})</span>
          </div>
          <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* compra */}
      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          {/* painel esquerdo: seleção */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filtrar por número ou por nome…"
                  className="w-full pl-9 pr-3 py-2 rounded-lg transition
                             bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400
                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                             dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              </div>

              {isAdmin && (
                <>
                  <Button variant="ghost" onClick={exportCSV} title="Exportar CSV"
                    className="text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-500/10">
                    <Download size={16} />
                  </Button>
                  <Button variant="ghost" onClick={clearAll} title="Limpar rifa"
                    className="text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10">
                    <RefreshCw size={16} />
                  </Button>
                </>
              )}
            </div>

            {/* legenda */}
            <div className="flex items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400 mb-3">
              <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-zinc-200 dark:bg-zinc-700 inline-block" /> Livre</span>
              <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500/25 ring-2 ring-emerald-400 inline-block" /> Selecionado</span>
              <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-400 inline-block" /> Vendido</span>
            </div>

            {/* grid */}
            <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-1">
              {filteredNumbers.map((n) => {
                const soldOwner = state.owners[n];
                const isSelected = selected.includes(n);
                return (
                  <button
                    key={n}
                    onClick={() => toggleNumber(n)}
                    disabled={Boolean(soldOwner)}
                    title={soldOwner ? `${n} – ${soldOwner.owner}` : `Número ${n}`}
                    className={[
                      'h-9 rounded-md text-xs font-medium transition select-none',
                      'flex items-center justify-center',
                      soldOwner
                        ? 'bg-rose-400 text-white cursor-not-allowed'
                        : isSelected
                          ? 'bg-emerald-500/25 ring-2 ring-emerald-400 text-emerald-800 dark:text-emerald-300'
                          : 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600',
                    ].join(' ')}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>

          {/* painel direito: comprar / admin */}
          <div className="w-full md:w-80 space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <Ticket size={18} /> Reservar números
              </h4>

              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Seu nome/Apelido
              </label>
              <input
                type="text"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                className="w-full px-3 py-2 rounded-lg mb-3 transition
                           bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
              />

              <div className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                Selecionados: <strong>{selected.length}</strong> • Total: <strong>R$ {(selected.length * PRICE).toFixed(2)}</strong>
              </div>

              <Button
                fullWidth
                onClick={confirmPurchase}
                disabled={!buyer.trim() || selected.length === 0}
              >
                Confirmar reserva
              </Button>
            </Card>

            {/* admin */}
            {isAdmin && (
              <Card className="p-4">
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <ShieldCheck size={18} /> Admin
                </h4>

                <div className="text-sm text-zinc-700 dark:text-zinc-300 mb-3">
                  Vendidos: <strong>{sold}</strong> / {TOTAL} — <strong>{percent}%</strong>
                </div>

                <Button
                  fullWidth
                  onClick={drawWinner}
                  disabled={!canDraw}
                  className={canDraw ? '' : 'opacity-60 cursor-not-allowed'}
                >
                  <Gift size={16} className="mr-2" />
                  Sortear (habilita a 90%)
                </Button>
                <p className="text-xs text-zinc-500 mt-2">
                  O sorteio escolhe aleatoriamente entre os números já vendidos.
                </p>
              </Card>
            )}
          </div>
        </div>
      </Card>

      {/* participantes */}
      <Card>
        <h4 className="font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
          <Users size={18} /> Participantes
        </h4>

        {ownersList.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">Ainda não há reservas.</p>
        ) : (
          <div className="space-y-4">
            {ownersList.map((o) => (
              <div key={o.name} className="border-b border-zinc-200 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
                <div className="font-medium text-zinc-900 dark:text-white">{o.name}</div>
                <div className="text-sm text-zinc-700 dark:text-zinc-300">
                  {o.nums.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Modal vencedor */}
      <Modal
        isOpen={!!showWinner}
        onClose={() => setShowWinner(null)}
        title="Resultado do Sorteio"
        size="md"
      >
        {showWinner && (
          <div className="space-y-3">
            <p className="text-zinc-700 dark:text-zinc-300">
              Número sorteado:
            </p>
            <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {showWinner.number}
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">
              Ganhador(a): <span className="font-semibold">{showWinner.owner}</span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
