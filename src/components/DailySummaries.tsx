import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
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

  const brtNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
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
  const currentSummary =
    brtNow.getHours() >= releaseHour
      ? allSummaries.find((s) => s.id === ((round - 1) * 31) + currentUnlockedId)
      : null;

  const paginatedRead = readSummaries.slice((page - 1) * 10, page * 10);
  const totalPages = Math.ceil(readSummaries.length / 10);
  const favoriteSummaries = allSummaries.filter((s) => favorites.includes(s.id));

  return (
    <div className="p-6 space-y-10 text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col items-center space-y-1">
        <h1 className="text-3xl font-bold">Leitura Diária</h1>
        <p className="text-sm italic text-zinc-600 dark:text-zinc-400">
          Falta apenas {diffHours} horas {diffMinutes} minutos para o próximo resumo.
        </p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 my-4" />

      {currentSummary && (
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          {/* Resumo Liberado */}
          <div
            className="
              w-full max-w-3xl mx-auto
              rounded-xl p-8 text-center cursor-pointer shadow-sm
              border border-emerald-200 bg-emerald-50 text-emerald-900
              hover:border-emerald-300 transition
              dark:bg-zinc-900 dark:border-emerald-600 dark:text-zinc-100
              dark:hover:border-emerald-500
            "
            onClick={() => setSelected(currentSummary)}
          >
            <h2 className="text-2xl md:text-3xl font-bold">{currentSummary.title}</h2>
            <p className="text-md md:text-lg text-emerald-800 dark:text-zinc-400 mt-1">
              {currentSummary.author}
            </p>
            <p className="text-sm text-emerald-700/80 dark:text-zinc-500 mt-3 italic">
              Clique para ler o resumo completo
            </p>
          </div>

          {/* Resumos Lidos */}
          <div
            className="
              w-full md:w-1/3 rounded-lg p-5 text-center shadow-sm
              border border-amber-200 bg-amber-50
              dark:border-emerald-600 dark:bg-zinc-900
            "
          >
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-md font-semibold">Resumos Lidos</h3>
            <p className="text-sm text-amber-700 dark:text-emerald-300 font-medium">
              {readIds.length} de {allSummaries.length}
            </p>
          </div>
        </div>
      )}

      <hr className="border-zinc-200 dark:border-zinc-800 my-4" />

      {favorites.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-left">Favoritos 💛</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favoriteSummaries
              .slice((page - 1) * 15, page * 15)
              .map((summary) => (
                <div
                  key={summary.id}
                  className="
                    rounded-lg p-3 cursor-pointer shadow-sm
                    border border-yellow-200 bg-yellow-50
                    hover:border-yellow-300 transition
                    dark:border-yellow-500/40 dark:bg-zinc-900
                  "
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
                  className={`px-3 py-1 rounded text-sm transition
                    ${page === i + 1
                      ? 'bg-amber-500 text-white'
                      : 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <hr className="border-zinc-200 dark:border-zinc-800 my-4" />

      <h2 className="text-xl font-semibold text-left">Resumos Lidos</h2>
      {readSummaries.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {paginatedRead.map((summary) => (
              <div
                key={summary.id}
                className="
                  rounded-lg p-3 cursor-pointer shadow-sm
                  border border-emerald-200 bg-emerald-50 hover:border-emerald-300
                  transition
                  dark:border-emerald-600 dark:bg-zinc-900 dark:hover:border-emerald-500
                "
                onClick={() => setSelected(summary)}
              >
                <h3 className="font-semibold text-sm text-left">{summary.title}</h3>
                <p className="text-xs text-emerald-700/80 dark:text-zinc-500">✔️ Lido</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm transition
                    ${page === i + 1
                      ? 'bg-amber-500 text-white'
                      : 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-sm italic text-zinc-600 dark:text-zinc-500">
          Você ainda não leu nenhum resumo.
        </p>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title || ''} size="xl">
        {selected && (
          <div className="text-zinc-700 dark:text-zinc-300 space-y-4">
            <div className="flex justify-between text-sm">
              <span><strong>Autor:</strong> {selected.author}</span>
              <span><strong>Média das Avaliações:</strong> {selected.rating.toFixed(1)} ⭐</span>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-800 text-sm p-4 rounded-lg leading-relaxed max-h-[300px] overflow-y-auto">
              {selected.content}
            </div>

            <div className="bg-amber-50 dark:bg-amber-500/10 p-3 text-sm rounded-md italic border-l-4 border-amber-300 dark:border-amber-500">
              📌 Frase marcante: “{selected.quote}”
              <button
                onClick={() => navigator.clipboard.writeText(selected.quote)}
                className="text-amber-700 dark:text-amber-300 ml-2 text-xs underline"
              >
                Copiar
              </button>
            </div>

            <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
              <div className="flex items-center text-sm">
                <span className="mr-2">Avalie sua leitura:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => handleRate(selected.id, star)} aria-label={`Avaliar com ${star} estrelas`}>
                    <Star
                      className={`w-5 h-5 mx-1 ${
                        (userRating[selected.id] || 0) >= star
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-zinc-400 dark:text-zinc-500'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button onClick={() => toggleFavorite(selected.id)} className="text-amber-700 dark:text-amber-300 text-sm">
                {favorites.includes(selected.id) ? '💛 Remover Favorito' : '🤍 Marcar como Favorito'}
              </button>

              {!readIds.includes(selected.id) && (
                <button
                  onClick={() => markAsRead(selected.id)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition"
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
