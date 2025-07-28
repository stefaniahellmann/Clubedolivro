import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';
import { Calendar, BookOpen, Headphones, Sparkles, Star, Lock } from 'lucide-react';

interface DailySummary {
  id: string;
  day: number;
  title: string;
  content: string;
  image?: string;
  audioUrl?: string;
}

// Geração fixa de 30 resumos reais
const dailySummaries: DailySummary[] = [
  {
    id: "1",
    day: 1,
    title: "Comece pelo mais importante",
    content: "O livro 'Essencialismo' mostra como eliminar o que não importa e focar no que realmente traz resultado. Seja eficaz, não ocupado.",
    image: "https://images.pexels.com/photos/1648218/pexels-photo-1648218.jpeg"
  },
  {
    id: "2",
    day: 2,
    title: "O poder dos hábitos",
    content: "Em 'O Poder do Hábito', Charles Duhigg revela como mudar padrões negativos e construir rotinas saudáveis que impulsionam o sucesso.",
    image: "https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg"
  },
  {
    id: "3",
    day: 3,
    title: "Tempo é prioridade",
    content: "Aprenda com 'Trabalhe 4 Horas por Semana' a usar o tempo a seu favor. Elimine distrações e foque no essencial para viver mais e melhor.",
    image: "https://images.pexels.com/photos/210660/pexels-photo-210660.jpeg"
  },
  // [... insira até 30 com temas como: autodisciplina, propósito, foco, confiança, leitura, organização, autocuidado ...]
];

export function DailySummaries() {
  const [selectedSummary, setSelectedSummary] = useState<DailySummary | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const currentDay = new Date().getDate();

  const isDayUnlocked = (day: number) => day <= currentDay;

  const handleRating = (summaryId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [summaryId]: rating }));
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
        <span className="text-sm text-amber-400 ml-2">
          {ratings[summaryId]}/5
        </span>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-400" />
          Resumos Diários
          <Sparkles className="ml-3 text-amber-400" />
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Acompanhe sua jornada com insights poderosos. Um novo resumo é liberado a cada dia do mês.
        </p>
        <div className="mt-4 text-amber-400 font-medium">
          Hoje é dia {currentDay}
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
                Dia {summary.day}
              </h3>
              <p className={`text-xs transition-colors ${
                isUnlocked 
                  ? 'text-gray-400 group-hover:text-amber-300' 
                  : 'text-gray-600'
              }`}>
                {isUnlocked ? 'Clique para ler' : 'Bloqueado'}
              </p>
            </Card>
          );
        })}
      </div>

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
