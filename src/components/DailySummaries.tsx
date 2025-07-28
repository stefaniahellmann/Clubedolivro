import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';
import { Calendar, Sparkles, Star, Lock, BookOpen } from 'lucide-react';
import { DailySummary } from '../types';

// Gerar resumos dinamicamente
const generateDailySummaries = (): DailySummary[] => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => ({
    id: (i + 1).toString(),
    day: i + 1,
    title: `Reflexão do Dia ${i + 1}`,
    content: `Este é o resumo e reflexão do dia ${i + 1}. Aqui exploramos conceitos importantes sobre leitura, desenvolvimento pessoal e como os livros podem transformar nossa perspectiva de vida.`,
    image: `https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg`,
  }));
};

export function DailySummaries() {
  const [selectedSummary, setSelectedSummary] = useState<DailySummary | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [readSummaries, setReadSummaries] = useState<{ [key: string]: boolean }>({});

  const dailySummaries = generateDailySummaries();
  const currentDay = new Date().getDate();

  const handleRating = (id: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const handleMarkAsRead = (id: string) => {
    setReadSummaries((prev) => ({ ...prev, [id]: true }));
    setSelectedSummary(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-400" />
          Resumos Diários
          <Sparkles className="ml-3 text-amber-400" />
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Acompanhe sua jornada com reflexões diárias. Um novo resumo é liberado a cada dia do mês.
        </p>
        <div className="mt-4 text-amber-400 font-medium">
          Hoje é dia {currentDay} - {dailySummaries.length - currentDay} resumos restantes
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {dailySummaries.map((summary) => {
          const isUnlocked = summary.day <= currentDay;
          const isRead = readSummaries[summary.id];

          return (
            <Card
              key={summary.id}
              hover={isUnlocked}
              className={`cursor-pointer text-center p-4 group transition-all duration-300 ${
                isUnlocked
                  ? 'bg-gray-800/50 backdrop-blur-sm border-gray-600 hover:border-amber-500'
                  : 'bg-gray-900/50 border-gray-700 opacity-60'
              }`}
              onClick={() => isUnlocked && setSelectedSummary(summary)}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform shadow-lg ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-500 to-green-500 group-hover:scale-110'
                    : 'bg-gray-600'
                }`}
              >
                {isUnlocked ? (
                  <Calendar className="text-white" size={22} />
                ) : (
                  <Lock className="text-gray-400" size={22} />
                )}
              </div>
              <h3 className={`font-semibold mb-1 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                Dia {summary.day}
              </h3>
              <p
                className={`text-xs transition-colors ${
                  isUnlocked ? 'text-gray-400 group-hover:text-amber-300' : 'text-gray-600'
                }`}
              >
                {isUnlocked ? (isRead ? 'Lido' : 'Clique para ler') : 'Bloqueado'}
              </p>
              {isUnlocked && ratings[summary.id] && (
                <div className="flex justify-center mt-2">
                  {[...Array(ratings[summary.id])].map((_, i) => (
                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Modal de Resumo */}
      <Modal
        isOpen={!!selectedSummary}
        onClose={() => setSelectedSummary(null)}
        title={selectedSummary?.title || ''}
        size="lg"
      >
        {selectedSummary && (
          <div className="space-y-6">
            <img
              src={selectedSummary.image}
              alt={selectedSummary.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg">{selectedSummary.content}</p>
            </div>

            <div className="mt-4">
              <span className="text-sm text-gray-300 mr-2">Avalie:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(selectedSummary.id, star)}
                  className="transition-colors hover:scale-110 transform"
                >
                  <Star
                    size={20}
                    className={`${
                      star <= (ratings[selectedSummary.id] || 0)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => handleMarkAsRead(selectedSummary.id)}
              className="mt-6 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
            >
              Marcar como lido
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
