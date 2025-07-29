import React, { useEffect, useState } from 'react';
import { Lock, Star } from 'lucide-react';
import { Modal } from './ui/Modal';

interface Summary {
  id: number;
  title: string;
  author: string;
  rating: number;
  content: string;
}

const summaries: Summary[] = Array.from({ length: 31 }, (_, i) => ({
  id: i + 1,
  title: `Livro Exemplo ${i + 1}`,
  author: `Autor ${i + 1}`,
  rating: (Math.random() * 1 + 4).toFixed(1) as unknown as number,
  content: `Este é o resumo completo do livro ${i + 1}. `.repeat(25).trim(),
}));

export function DailySummaries() {
  const [selected, setSelected] = useState<Summary | null>(null);
  const [readIds, setReadIds] = useState<number[]>([]);
  const [userRating, setUserRating] = useState<{ [key: number]: number }>({});
  const [page, setPage] = useState(1);

  const currentUnlockedId = readIds.length + 1;

  useEffect(() => {
    const stored = localStorage.getItem('readSummaries');
    const storedRatings = localStorage.getItem('userRatings');
    if (stored) setReadIds(JSON.parse(stored));
    if (storedRatings) setUserRating(JSON.parse(storedRatings));
  }, []);

  const markAsRead = (id: number) => {
    const updated = [...readIds, id];
    setReadIds(updated);
    localStorage.setItem('readSummaries', JSON.stringify(updated));
    setSelected(null);
  };

  const handleRate = (id: number, rating: number) => {
    const updated = { ...userRating, [id]: rating };
    setUserRating(updated);
    localStorage.setItem('userRatings', JSON.stringify(updated));
  };

  const currentSummary = summaries.find((s) => s.id === currentUnlockedId);
  const lockedSummaries = summaries.filter((s) => s.id > currentUnlockedId).slice(0, 6);
  const readSummaries = summaries.filter((s) => readIds.includes(s.id));
  const paginatedRead = readSummaries.slice((page - 1) * 10, page * 10);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-white text-center">Leitura Diária</h1>

     {currentSummary && (
  <div className="max-w-lg mx-auto bg-gray-800 border border-amber-400 rounded-lg p-4 text-center">
    <h2 className="text-lg text-white font-semibold">{currentSummary.title}</h2>
    <p className="text-sm text-gray-400">{currentSummary.author}</p>
    <button
      onClick={() => setSelected(currentSummary)}
      className="mt-3 text-amber-400 hover:underline"
    >
      Ler resumo completo
    </button>
  </div>
)}


      <div>
        <h2 className="text-xl font-semibold text-gray-300 mb-2">Próximos Resumos Diários</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {lockedSummaries.map((s) => (
            <div
              key={s.id}
              className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-left"
            >
              <h3 className="text-white text-sm font-medium">{s.title}</h3>
              <p className="text-xs text-gray-500"><Lock className="inline w-4 h-4 mr-1" /> Aguardando</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-300 mb-2">Resumos Lidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {paginatedRead.map((s) => (
            <div
              key={s.id}
              className="bg-gray-800 border border-green-400 rounded-lg p-3 text-left cursor-pointer"
              onClick={() => setSelected(s)}
            >
              <h3 className="text-white font-medium text-sm">{s.title}</h3>
              <p className="text-xs text-gray-400">✔️ Lido</p>
            </div>
          ))}
        </div>
        {readSummaries.length > 10 && (
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 bg-gray-700 text-white rounded"
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-700 text-white rounded"
              disabled={page * 10 >= readSummaries.length}
            >
              Próximo
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title || ''}
        size="xl"
      >
        {selected && (
          <div className="text-gray-300 space-y-4">
            <div className="flex justify-between text-sm text-gray-400">
              <span><strong>Autor:</strong> {selected.author}</span>
              <span><strong>Média das Avaliações:</strong> {selected.rating.toFixed(1)} ⭐</span>
            </div>
            <div className="bg-gray-800 text-sm p-4 rounded-lg leading-relaxed max-h-[300px] overflow-y-auto">
              {selected.content}
            </div>
            <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
              <div className="flex items-center text-sm">
                <span className="mr-2">Avalie:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => handleRate(selected.id, star)}>
                    <Star
                      className={`w-5 h-5 mx-1 ${
                        (userRating[selected.id] || 0) >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-500'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {!readIds.includes(selected.id) && (
                <button
                  onClick={() => markAsRead(selected.id)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
                >
                  Marcar como lido
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
