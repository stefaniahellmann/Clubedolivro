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

const allSummaries: Summary[] = Array.from({ length: 31 }, (_, i) => ({
  id: i + 1,
  title: `Livro Transformador ${i + 1}`,
  author: `Autor Exemplar ${i + 1}`,
  rating: (Math.random() * 1 + 4).toFixed(1) as unknown as number,
  content: `Este é o resumo completo do livro ${i + 1}. `.repeat(20).trim(),
}));

export function DailySummaries() {
  const [selected, setSelected] = useState<Summary | null>(null);
  const [readIds, setReadIds] = useState<number[]>([]);
  const [userRating, setUserRating] = useState<{ [key: number]: number }>({});
  const [page, setPage] = useState(1);

  const currentUnlockedId = readIds.length + 1;

  useEffect(() => {
    const storedRead = localStorage.getItem('readSummaries');
    const storedRatings = localStorage.getItem('userRatings');
    if (storedRead) setReadIds(JSON.parse(storedRead));
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

  const readSummaries = allSummaries.filter((s) => readIds.includes(s.id));
  const currentSummary = allSummaries.find((s) => s.id === currentUnlockedId);
  const lockedSummaries = allSummaries.filter((s) => s.id > currentUnlockedId);

  const paginatedRead = readSummaries.slice((page - 1) * 10, page * 10);
  const totalPages = Math.ceil(readSummaries.length / 10);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-white text-center">Leitura Diária</h1>

      {/* ✅ Resumo de hoje */}
      {currentSummary && (
        <div
          className="w-full max-w-lg mx-auto bg-gray-800 border border-amber-400 rounded-lg p-4 text-center cursor-pointer hover:border-white"
          onClick={() => setSelected(currentSummary)}
        >
          <h2 className="text-lg text-white font-semibold">{currentSummary.title}</h2>
          <p className="text-sm text-gray-400">{currentSummary.author}</p>
          <p className="text-xs text-gray-500 mt-1 italic">Clique para ler o resumo completo</p>
        </div>
      )}

      {/* 🔒 Próximos bloqueados */}
      <div className="space-y-2">
        <h2 className="text-xl text-gray-400 font-semibold text-center">Próximos Resumos Diários</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {lockedSummaries.slice(0, 6).map((summary) => (
            <div
              key={summary.id}
              className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-left opacity-60"
            >
              <Lock className="text-gray-500 mb-1" />
              <h3 className="text-white text-sm font-medium text-left">{summary.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Já lidos */}
      {readSummaries.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl text-gray-300 font-semibold text-center">Resumos Lidos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {paginatedRead.map((summary) => (
              <div
                key={summary.id}
                className="bg-gray-800 border border-green-400 rounded-lg p-3 cursor-pointer hover:border-amber-400"
                onClick={() => setSelected(summary)}
              >
                <h3 className="text-white font-semibold text-sm text-left">{summary.title}</h3>
                <p className="text-xs text-gray-400">✔️ Lido</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm ${
                    page === i + 1
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 📖 Modal de Leitura */}
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
                <span className="mr-2">Avalie sua leitura:</span>
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
