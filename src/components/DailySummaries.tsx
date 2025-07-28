import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';
import { Calendar, BookOpen, Headphones, Sparkles, Star, Lock } from 'lucide-react';
import { DailySummary } from '../types';

// Gerar resumos dinamicamente
const generateDailySummaries = (): DailySummary[] => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  return Array.from({ length: daysInMonth }, (_, i) => ({
    id: (i + 1).toString(),
    day: i + 1,
    title: `Reflexão do Dia ${i + 1}`,
    content: `Este é o resumo e reflexão do dia ${i + 1}. Aqui exploramos conceitos importantes sobre leitura, desenvolvimento pessoal e como os livros podem transformar nossa perspectiva de vida. Cada dia traz uma nova oportunidade de aprendizado e crescimento através da literatura.`,
    image: `https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg`,
    audioUrl: `https://example.com/audio/day${i + 1}.mp3`
  }));
};

export function DailySummaries() {
  const dailySummaries = generateDailySummaries();
  const [selectedSummary, setSelectedSummary] = useState<typeof dailySummaries[0] | null>(null);
  const [ratings, setRatings] = useState<{[key: string]: number}>({});

  const getCurrentDay = () => {
    return new Date().getDate();
  };

  const getDaysInMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  };

  const isDayUnlocked = (day: number) => {
    return day <= getCurrentDay();
  };

  const handleRating = (summaryId: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [summaryId]: rating
    }));
  };

  const renderStars = (summaryId: string, currentRating: number = 0) => {
    return (
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
          <span className="text-sm text-amber-400 ml-2">
            {ratings[summaryId]}/5
          </span>
        )}
      </div>
    );
  };

  const daysInMonth = getDaysInMonth();
  const currentDay = getCurrentDay();

  return (
    <div className="space-y-6">
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
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const summary = dailySummaries[i];
          const isUnlocked = isDayUnlocked(day);
          
          return (
            <Card
              key={day}
              hover={isUnlocked}
              className={`cursor-pointer text-center p-4 group transition-all duration-300 ${
                isUnlocked
                  ? 'bg-gray-800/50 backdrop-blur-sm border-gray-600 hover:border-amber-500'
                  : 'bg-gray-900/50 border-gray-700 opacity-60'
              }`}
              onClick={() => {
                if (isUnlocked && summary) {
                  console.log('Clicou no dia:', day, 'Summary:', summary);
                  setSelectedSummary(summary);
                }
              }}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform shadow-lg ${
                isUnlocked
                  ? 'bg-gradient-to-br from-amber-500 to-green-500 group-hover:scale-110'
                  : 'bg-gray-600'
              }`}>
                {isUnlocked ? (
                  <Calendar className="text-white" size={22} />
                ) : (
                  <Lock className="text-gray-400" size={22} />
                )}
              </div>
              <h3 className={`font-semibold mb-1 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                Dia {day}
              </h3>
              <p className={`text-xs transition-colors ${
                isUnlocked 
                  ? 'text-gray-400 group-hover:text-amber-300' 
                  : 'text-gray-600'
              }`}>
                {isUnlocked ? 'Clique para ler' : 'Bloqueado'}
              </p>
              {isUnlocked && ratings[summary?.id || ''] && (
                <div className="flex justify-center mt-2">
                  {[...Array(ratings[summary?.id || ''])].map((_, i) => (
                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Summary Modal */}
      <Modal
        isOpen={!!selectedSummary}
        onClose={() => setSelectedSummary(null)}
        title={selectedSummary?.title || ''}
        size="lg"
      >
        {selectedSummary && (
          <div className="space-y-6">
            {selectedSummary.image && (
              <img
                src={selectedSummary.image}
                alt={selectedSummary.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            )}
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg">
                {selectedSummary.content}
              </p>
            </div>

            {selectedSummary.audioUrl && (
              <div className="bg-amber-900/30 border border-amber-700 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <Headphones className="text-amber-400" size={20} />
                  <span className="font-medium text-amber-300">Áudio disponível</span>
                </div>
                <audio controls className="w-full">
                  <source src={selectedSummary.audioUrl} type="audio/mpeg" />
                  Seu navegador não suporta o elemento de áudio.
                </audio>
              </div>
            )}

            {renderStars(selectedSummary.id)}

            <div className="flex items-center space-x-2 text-sm text-gray-400 pt-4 border-t border-gray-700">
              <BookOpen size={16} />
              <span>Resumo do Dia {selectedSummary.day}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}