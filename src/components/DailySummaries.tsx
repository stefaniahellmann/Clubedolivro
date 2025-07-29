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
  rating: (Math.random() * 1 + 4).toFixed(1) as unknown as number, // de 4.0 a 5.0
  content: `Este é o resumo do livro ${i + 1}. `.repeat(30).trim(),
}));

export function DailySummaries() {
  const [selected, setSelected] = useState<Summary | null>(null);
  const [readIds, setReadIds] = useState<number[]>([]);
  const [userRating, setUserRating] = useState<{ [key: number]: number }>({});

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

  const readSummaries = allSummaries.filter((s) => readIds.includes(s.id)).slice(-7).reverse();
  const currentSummary = allSummaries.find((s) => s.id === currentUnlockedId);
  const lockedSummaries = allSummaries.filter((s) => s.id > currentUnlockedId);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white text-center">Leitura Diária</h1>

      {/* ✅ Já lidos */}
      {readSummaries.length > 0 && (
        <div>
          <h2 className="text-xl text-gray-300 font-semibold mb-2">Últimas leituras</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {readSummaries.map((summary) => (
              <div
                key={summary.id}
                className="bg-gray-800 border border-green-400 rounded-lg p-3 cursor-pointer hover:border-amber-400"
                onClick={() => setSelected(summary)}
              >
                <h3 className="text-white font-semibold text-sm">{summary.title}</h3>
                <p className="text-xs text-gray-400">✔️ Lido</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Resumo atual liberado */}
      {currentSummary && (
        <div>
          <h2 className="text-xl text-amber-400 font-semibold mb-2">Resumo disponível hoje</h2>
          <div
            className="bg-gray-800 border border-amber-400 rounded-lg p-4 cursor-pointer hover:border-white"
            onClick={() => setSelected(currentSummary)}
          >
            <h3 className="text-white font-semibold">{currentSummary.title}</h3>
            <p className="text-sm text-gray-400">Clique para ler</p>
          </div>
        </div>
      )}

      {/* 🔒 Bloqueados */}
      <div>
        <h2 className="text-xl text-gray-400 font-semibold mb-2">Aguardando liberação</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {lockedSummaries.slice(0, 6).map((summary) => (
            <div
              key={summary.id}
              className="bg-gray-900 border border-gray-700 rounded-lg p-3 opacity-60 text-center"
            >
              <Lock className="text-gray-500 mx-auto mb-1" />
              <h3 className="text-white text-sm font-medium">{summary.title}</h3>
              <p className="text-xs text-gray-500">Bloqueado</p>
            </div>
          ))}
        </div>
      </div>

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
