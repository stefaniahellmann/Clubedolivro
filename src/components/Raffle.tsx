import React, { useMemo, useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

type Buyer = { name: string; numbers: number[] };

function RaffleInner() {
  // mock simples em memória
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);

  const taken = useMemo(() => new Set(buyers.flatMap(b => b.numbers)), [buyers]);

  const availableNumbers = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= 1000; i++) if (!taken.has(i)) arr.push(i);
    return arr;
  }, [taken]);

  const buy = () => {
    if (!name.trim() || qty < 1) return;
    const chosen = availableNumbers.slice(0, qty);
    setBuyers(prev => [...prev, { name: name.trim(), numbers: chosen }]);
    setName('');
    setQty(1);
  };

  const progress = Math.round((taken.size / 1000) * 100);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Rifa</h2>

        <div className="mb-4">
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {taken.size}/1000 números vendidos ({progress}%)
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-sm mb-1 text-zinc-700 dark:text-zinc-300">Nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-200
                         dark:bg-zinc-800 dark:border-zinc-700"
              placeholder="Fulano"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-zinc-700 dark:text-zinc-300">Quantidade</label>
            <input
              type="number"
              min={1}
              max={availableNumbers.length}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-200
                         dark:bg-zinc-800 dark:border-zinc-700"
            />
          </div>
          <Button onClick={buy}>Reservar</Button>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-zinc-900 dark:text-white">Participantes</h3>
          <div className="space-y-2">
            {buyers.map((b, i) => (
              <div key={i} className="text-sm text-zinc-800 dark:text-zinc-200">
                <span className="font-medium">{b.name}:</span> {b.numbers.join(', ')}
              </div>
            ))}
            {buyers.length === 0 && (
              <div className="text-sm text-zinc-500">Ninguém ainda.</div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export function Raffle() {
  return <RaffleInner />;
}
export default Raffle;
