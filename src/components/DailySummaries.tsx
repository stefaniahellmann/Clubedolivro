import React, { useState } from 'react';
import { Calendar, Lock, Star } from 'lucide-react';
import { Modal } from './ui/Modal';

interface Summary {
  id: number;
  day: number;
  title: string;
  author: string;
  rating: number;
  content: string;
}

const summaries: Summary[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  day: i + 1,
  title: `Livro Inspirador ${i + 1}`,
  author: `Autor Exemplo ${i + 1}`,
  rating: Math.floor(Math.random() * 2) + 4.0, // de 4.0 a 5.0
  content: `Este é o resumo do livro ${i + 1}. Ele traz reflexões práticas e profundas... `.repeat(20).slice(0, 1200),
}));

export function DailySummaries() {
  const today = new Date().getDate();
  const [selected, setSelected] = useState<Summary | null>(null);
  const [read, setRead] = useState<{ [key: number]: boolean }>({});
  const [userRating, setUserRating] = useState<{ [key: number]: number }>({});

  const handleMarkAsRead = (id: number) => {
    setRead((prev) => ({ ...prev, [id]: true }));
    setSelected(null);
  };

  const handleRate = (id: number, rating: number) => {
    setUserRating((prev) => ({ ...prev, [id]: rating }));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-4">Resumos Diários</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {summaries.map((summary) => {
          const isUnlocked = summary.day <= today;
          const isRead = read[summary.id];

          return (
            <div
              key={summary.id}
              className={`rounded-lg p-4 text-center border ${
                isUnlocked
                  ? 'border-gray-500 bg-gray-800 cursor-pointer hover:border-amber-400'
                  : 'border-gray-700 bg-gray-900 opacity-60'
              }`}
              onClick={() => isUnlocked && setSelected(summary)}
            >
              <div className="flex justify-center mb-2">
                {isUnlocked ? (
                  <Calendar className="text-amber-400" />
                ) : (
                  <Lock className="text-gray-500" />
                )}
              </div>
              <h3 className="text-white font-semibold">Dia {summary.day}</h3>
              <p className="text-sm text-gray-400">
                {isUnlocked ? (isRead ? '✔️ Lido' : 'Clique para ler') : 'Bloqueado'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Modal com layout otimizado */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={`Dia ${selected?.day} | ${selected?.title || ''}`}
        size="xl"
      >
        {selected && (
          <div className="text-gray-300 space-y-4">
            <div className="flex flex-wrap justify-between text-sm text-gray-400">
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

              <button
                onClick={() => handleMarkAsRead(selected.id)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
              >
                Marcar como lido
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
