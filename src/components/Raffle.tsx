import React, { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRaffle } from '../contexts/RaffleContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Check, Phone, Copy, Ticket } from 'lucide-react';

const PIX_KEY = 'chavepix@exemplo.com';          // ajuste
const WHATS_APP_NUMBER = '5599999999999';        // ajuste (com DDI 55 + DDD + número)

export function Raffle() {
  const { user } = useAuth();
  const { pricePerNumber, state, createReservation } = useRaffle();
  const [selected, setSelected] = useState<number[]>([]);
  const total = selected.length * pricePerNumber;

  const statusMap = useMemo(() => {
    const m = new Map<number, { s: 'free'|'pending'|'sold'; by?: string }>();
    state.numbers.forEach((x) => m.set(x.n, { s: x.status, by: x.userName }));
    return m;
  }, [state.numbers]);

  const toggle = (n: number) => {
    const st = statusMap.get(n)?.s ?? 'free';
    if (st !== 'free') return;
    setSelected((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  const handleReserveAndWhats = () => {
    if (!user || selected.length === 0) return;

    // cria reserva PENDENTE (bloqueia os números)
    const reservationId = createReservation(user.id, user.firstName, selected, total);
    if (!reservationId) return;

    // mensagem pro Whats
    const msg =
`Olá! Quero confirmar a compra dos números da rifa.

Nome: ${user.firstName}
Números: ${[...selected].sort((a,b)=>a-b).join(', ')}
Total: R$ ${total.toFixed(2).replace('.', ',')}

Chave PIX: ${PIX_KEY}
(Enviei o comprovante em anexo.)`;

    const url = `https://wa.me/${WHATS_APP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSelected([]); // limpa seleção local
  };

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center justify-center gap-2">
          <Ticket className="text-amber-600 dark:text-amber-400" />
          Rifa do Clube
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Selecione seus números disponíveis (R$ {pricePerNumber.toFixed(2).replace('.', ',')} cada).
        </p>
      </header>

      {/* Resumo + Ações */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-zinc-800 dark:text-zinc-200">
            <div>Selecionados: <strong>{selected.length}</strong></div>
            <div>Total: <strong>R$ {total.toFixed(2).replace('.', ',')}</strong></div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => copy(PIX_KEY)}
              className="flex items-center gap-2"
              title="Copiar chave PIX"
            >
              <Copy size={16} />
              Copiar PIX
            </Button>
            <Button
              onClick={handleReserveAndWhats}
              disabled={selected.length === 0}
              className="flex items-center gap-2"
              title="Reservar e abrir WhatsApp"
            >
              <Phone size={16} />
              Enviar no WhatsApp
            </Button>
          </div>
        </div>
      </Card>

      {/* Legenda */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700" />
          Livre
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-amber-100 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-600" />
          Pendente
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-rose-100 border border-rose-200 dark:bg-rose-500/10 dark:border-rose-600" />
          Vendido
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-emerald-100 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-600" />
          Selecionado
        </span>
      </div>

      {/* GRID 1..1000 */}
      <Card className="p-3">
        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 xl:grid-cols-25 gap-2">
          {Array.from({ length: 500 }, (_, i) => i + 1).map((n) => {
            const info = statusMap.get(n);
            const st = info?.s ?? 'free';
            const isSel = selected.includes(n);
            const base =
              'text-xs rounded-md px-2 py-1 border transition select-none text-center';

            const cls =
              st === 'sold'
                ? 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-700/40 cursor-not-allowed'
                : st === 'pending'
                ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-700/40 cursor-not-allowed'
                : isSel
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-700/40'
                : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 cursor-pointer dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700';

            return (
              <button
                key={n}
                onClick={() => toggle(n)}
                className={`${base} ${cls}`}
                title={
                  st === 'sold'
                    ? `Vendido ${info?.by ? `para ${info.by}` : ''}`
                    : st === 'pending'
                    ? `Pendente ${info?.by ? `por ${info.by}` : ''}`
                    : `Selecionar ${n}`
                }
              >
                {n}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Minhas compras (opcional) */}
      {user && (
        <Card className="p-4">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Minhas compras aprovadas</h3>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">
            {state.numbers.some((x) => x.userId === user.id && x.status === 'sold') ? (
              <div className="flex flex-wrap gap-2">
                {state.numbers
                  .filter((x) => x.userId === user.id && x.status === 'sold')
                  .map((x) => (
                    <span
                      key={x.n}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-700/40"
                    >
                      <Check size={14} />
                      {x.n}
                    </span>
                  ))}
              </div>
            ) : (
              <span>Nenhum número aprovado ainda.</span>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
