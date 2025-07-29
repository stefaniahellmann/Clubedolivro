import React, { useEffect, useState } from 'react';
import { Lock, Star, Heart, RefreshCcw } from 'lucide-react';
import { Modal } from './ui/Modal';

interface Summary {
  id: number;
  title: string;
  author: string;
  rating: number;
  content: string;
  quote: string;
}

const allSummariesBase: Summary[] = Array.from({ length: 31 }, (_, i) => ({
  id: i + 1,
  title: `Livro Transformador ${i + 1}`,
  author: `Autor Exemplar ${i + 1}`,
  rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
  content: `Este é o resumo completo do livro ${i + 1}. `.repeat(20).trim(),
  quote: `Frase impactante do livro ${i + 1} para compartilhar.`
}));

export function DailySummaries() {
  const [selected, setSelected] = useState<Summary | null>(null);
  const [readIds, setReadIds] = useState<number[]>([]);
  const [userRating, setUserRating] = useState<{ [key: number]: number }>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [round, setRound] = useState(1);

  const currentUnlockedId = readIds.length % 31 + 1;
  const summaries = allSummariesBase.map(s => ({ ...s, id: ((round - 1) * 31) + s.id }));
  const allSummaries = summaries;

  const now = new Date();
  const brtNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const currentHour = brtNow.getHours();
  const currentMinute = brtNow.getMinutes();
  const releaseHour = 4;

  const nextRelease = new Date(brtNow);
nextRelease.setHours(releaseHour, 0, 0, 0);
if (brtNow >= nextRelease) nextRelease.setDate(nextRelease.getDate() + 1);

const diffMs = nextRelease.getTime() - brtNow.getTime();
const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  useEffect(() => {
    const storedRead = localStorage.getItem('readSummaries');
    const storedRatings = localStorage.getItem('userRatings');
    const storedFavorites = localStorage.getItem('favoriteSummaries');
    const storedRound = localStorage.getItem('round');

    if (storedRead) setReadIds(JSON.parse(storedRead));
    if (storedRatings) setUserRating(JSON.parse(storedRatings));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedRound) setRound(parseInt(storedRound));
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

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('favoriteSummaries', JSON.stringify(updated));
  };

  const restartJourney = () => {
    setReadIds([]);
    setUserRating({});
    setFavorites([]);
    setRound(round + 1);
    localStorage.setItem('readSummaries', '[]');
    localStorage.setItem('userRatings', '{}');
    localStorage.setItem('favoriteSummaries', '[]');
    localStorage.setItem('round', String(round + 1));
  };

  const readSummaries = allSummaries.filter((s) => readIds.includes(s.id));
  const currentSummary = currentHour >= releaseHour
    ? allSummaries.find((s) => s.id === ((round - 1) * 31) + currentUnlockedId)
    : null;
  const lockedSummaries = allSummaries.filter((s) => s.id > ((round - 1) * 31) + currentUnlockedId);
  const paginatedRead = readSummaries.slice((page - 1) * 10, page * 10);
  const totalPages = Math.ceil(readSummaries.length / 10);
  const favoriteSummaries = allSummaries.filter((s) => favorites.includes(s.id));

  return (
    <div className="p-6 space-y-10 text-white">
      <div className="flex flex-col items-center space-y-1">
        <h1 className="text-3xl font-bold">Leitura Diária</h1>
        <p className="text-sm italic text-gray-400">
          Falta apenas {diffHours} horas {diffMinutes} minutos para o próximo resumo.
        </p>
      </div>

      <hr className="border-gray-700 my-4" />

      {currentSummary && (
       <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
  {/* Resumo Liberado */}
<div
  className="w-full max-w-3xl mx-auto bg-gray-900 border border-green-500 rounded-xl p-8 text-center cursor-pointer hover:border-white shadow-lg"
  onClick={() => setSelected(currentSummary)}
>
  <h2 className="text-2xl md:text-3xl font-bold text-white">{currentSummary.title}</h2>
  <p className="text-md md:text-lg text-gray-400 mt-1">{currentSummary.author}</p>
  <p className="text-sm text-gray-500 mt-3 italic">Clique para ler o resumo completo</p>
</div>

  {/* Resumos Lidos - Estilo quadrado */}
  <div className="w-full md:w-1/3 bg-gray-900 border border-green-500 rounded-lg p-5 text-center">
    <div className="text-3xl mb-2">🏆</div>
    <h3 className="text-md font-semibold text-white mb-1">Resumos Lidos</h3>
    <p className="text-sm text-amber-400 font-medium">{readIds.length} de {allSummaries.length}</p>
  </div>
</div>

      )}
      
      <hr className="border-gray-700 my-4" />

      {favorites.length > 0 && (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-center">Favoritos 💛</h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {favoriteSummaries
        .slice((page - 1) * 15, page * 15)
        .map((summary) => (
          <div
            key={summary.id}
            className="bg-gray-800 border border-yellow-400 rounded-lg p-3 cursor-pointer hover:border-white"
            onClick={() => setSelected(summary)}
          >
            <h3 className="font-semibold text-sm text-left">{summary.title}</h3>
          </div>
        ))}
    </div>

    {Math.ceil(favoriteSummaries.length / 15) > 1 && (
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(favoriteSummaries.length / 15) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded text-sm ${
              page === i + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    )}
  </div>
)}

      <hr className="border-gray-700 my-4" />

      <h2 className="text-xl font-semibold">Resumos Lidos</h2>
      {readSummaries.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {paginatedRead.map((summary) => (
              <div
                key={summary.id}
                className="bg-gray-800 border border-green-400 rounded-lg p-3 cursor-pointer hover:border-amber-400"
                onClick={() => setSelected(summary)}
              >
                <h3 className="font-semibold text-sm text-left">{summary.title}</h3>
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
                    page === i + 1 ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-sm italic text-gray-500">Você ainda não leu nenhum resumo.</p>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title || ''} size="xl">
        {selected && (
          <div className="text-gray-300 space-y-4">
            <div className="flex justify-between text-sm text-gray-400">
              <span><strong>Autor:</strong> {selected.author}</span>
              <span><strong>Média das Avaliações:</strong> {selected.rating.toFixed(1)} ⭐</span>
            </div>

            <div className="bg-gray-800 text-sm p-4 rounded-lg leading-relaxed max-h-[300px] overflow-y-auto">
              {selected.content}
            </div>

            <div className="bg-gray-900 p-3 text-sm rounded-md italic border-l-4 border-amber-400">
              📌 Frase marcante: “{selected.quote}”
              <button
                onClick={() => navigator.clipboard.writeText(selected.quote)}
                className="text-amber-400 ml-2 text-xs underline"
              >
                Copiar
              </button>
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

              <button onClick={() => toggleFavorite(selected.id)} className="text-amber-400 text-sm">
                {favorites.includes(selected.id) ? '💛 Remover Favorito' : '🤍 Marcar como Favorito'}
              </button>

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
