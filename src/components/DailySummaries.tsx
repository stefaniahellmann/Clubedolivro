import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Calendar, Sparkles, Star, Lock, BookOpen, X } from 'lucide-react';

interface DailySummary {
  id: string;
  day: number;
  title: string;
  content: string;
  image: string;
}

const generateDailySummaries = (): DailySummary[] => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => ({
    id: (i + 1).toString(),
    day: i + 1,
    title: `Reflexão do Dia ${i + 1}`,
    content: `Este é o resumo e reflexão do dia ${i + 1}. Aqui exploramos conceitos importantes sobre leitura, desenvolvimento pessoal e como os livros podem transformar nossa perspectiva de vida. Cada dia traz uma nova oportunidade de aprendizado e crescimento através da literatura.`,
    image: `https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg`,
  }));
};

export function DailySummaries() {
  const dailySummaries = generateDailySummaries();
  const [selectedSummary, setSelectedSummary] = useState<DailySummary | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const getCurrentDay = () => new Date().getDate();
  const getDaysInMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  };

  const isDayUnlocked = (day: number) => day <= getCurrentDay();

  const handleRating = (summaryId: string, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [summaryId]: rating,
    }));
  };

  const renderStars = (summaryId: string, currentRating: number = 0) => (
    <div className="flex items-center space-x-1 mt-4">
      <span className="text-sm text-gray-300 mr-2">Avalie:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(summaryId, star)}
          className="transition-colors hover:scale-110 transform"
        >
          <Star
            size={20}
            className={`${
              star <= (ratings[summaryId] || currentRating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-400'
            } transition-all`}
          />
        </button>
      ))}
      {ratings[summaryId] && (
        <span className="text-sm text-amber-400 ml-2">{ratings[summaryId]}/5</span>
      )}
    </div>
  );

  const daysInMonth = getDaysInMonth();
  const currentDay = getCurrentDay();

  return (
    <div className="space-y-6 relative">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-400" />
          Resumos Diários
          <Sparkles className="ml-3 text-amber-400" />
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Acompanhe sua jornada de leitura com reflexões e insights preparados especialmente para você.
          Um novo resumo é liberado a cada dia do mês.
        </p>
        <div className="mt-4 text-amber-400 font-medium">
          Hoje é dia {currentDay} - {daysInMonth - currentDay} resumos restantes este mês
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {dailySummaries.map((summary) => {
          const isUnlocked = isDayUnlocked(summary.day);

          return (
            <Card
              key={summary.day}
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
                {isUnlocked ? 'Clique para ler' : 'Bloqueado'}
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

      {/* Modal manual como nos livros indicados */}
      {selectedSummary && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-[#1c1c1c] border border-gray-600 rounded-xl p-6 w-full max-w-2xl relative shadow-xl space-y-5">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedSummary(null)}
            >
              <X size={22} />
            </button>

            <img
              src={selectedSummary.image}
              alt="Resumo"
              className="w-full h-56 object-cover rounded-md border border-gray-700"
            />

            <h2 className="text-xl font-bold text-white">{selectedSummary.title}</h2>
            <p className="text-gray-300 leading-relaxed">{selectedSummary.content}</p>

            {renderStars(selectedSummary.id)}

            <div className="flex items-center gap-2 text-gray-500 text-sm pt-2 border-t border-gray-700">
              <BookOpen size={16} />
              <span>Resumo do Dia {selectedSummary.day}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
