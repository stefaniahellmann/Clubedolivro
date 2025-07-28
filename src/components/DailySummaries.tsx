import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';
import { Calendar, BookOpen, Sparkles, Star, Lock } from 'lucide-react';

interface DailySummary {
  id: string;
  day: number;
  title: string;
  content: string;
  image: string;
}

const summaries: DailySummary[] = [
  {
    id: '1',
    day: 1,
    title: 'O Poder do Hábito',
    content: 'Entenda como hábitos moldam sua vida e como você pode transformá-los para alcançar resultados extraordinários.',
    image: 'https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg',
  },
  {
    id: '2',
    day: 2,
    title: 'Comece pelo Porquê',
    content: 'Descubra como o propósito impulsiona líderes e empresas de sucesso e como aplicar isso na sua vida.',
    image: 'https://images.pexels.com/photos/1005324/pexels-photo-1005324.jpeg',
  },
  {
    id: '3',
    day: 3,
    title: 'Essencialismo',
    content: 'Aprenda a eliminar o que é desnecessário e focar no que realmente importa para sua produtividade e paz.',
    image: 'https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg',
  },
  {
    id: '4',
    day: 4,
    title: 'A Única Coisa',
    content: 'Foco extremo em uma única tarefa pode gerar resultados incríveis. Menos é mais.',
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
  },
  {
    id: '5',
    day: 5,
    title: 'Mindset',
    content: 'Adote uma mentalidade de crescimento e transforme seus desafios em oportunidades de evolução.',
    image: 'https://images.pexels.com/photos/4145191/pexels-photo-4145191.jpeg',
  },
  {
    id: '6',
    day: 6,
    title: 'Trabalhe 4 Horas por Semana',
    content: 'Repense o trabalho e descubra formas mais inteligentes de gerar renda e viver com liberdade.',
    image: 'https://images.pexels.com/photos/4974916/pexels-photo-4974916.jpeg',
  },
  {
    id: '7',
    day: 7,
    title: 'Atenção Plena',
    content: 'Desacelere, observe o momento presente e recupere sua atenção das distrações.',
    image: 'https://images.pexels.com/photos/2531237/pexels-photo-2531237.jpeg',
  },
  {
    id: '8',
    day: 8,
    title: 'Roube Como um Artista',
    content: 'Toda criatividade é uma soma de referências. Saiba como transformar influência em inovação.',
    image: 'https://images.pexels.com/photos/32997/pexels-photo.jpg',
  },
  {
    id: '9',
    day: 9,
    title: 'A Mágica da Arrumação',
    content: 'Organizar sua casa é organizar sua mente. Descubra o impacto do ambiente no seu bem-estar.',
    image: 'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg',
  },
  {
    id: '10',
    day: 10,
    title: 'Milagre da Manhã',
    content: 'Uma rotina matinal pode transformar sua produtividade, foco e energia ao longo do dia.',
    image: 'https://images.pexels.com/photos/4050419/pexels-photo-4050419.jpeg',
  },
  // ... repita a lógica até o dia 30 (posso continuar se desejar)
];

export function DailySummaries() {
  const [selectedSummary, setSelectedSummary] = useState<DailySummary | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const currentDay = new Date().getDate();

  const handleRating = (summaryId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [summaryId]: rating }));
  };

  const renderStars = (summaryId: string) => {
    const currentRating = ratings[summaryId] || 0;
    return (
      <div className="flex items-center space-x-1 mt-4">
        <span className="text-sm text-gray-300 mr-2">Avalie:</span>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => handleRating(summaryId, star)}
            className="hover:scale-110 transition-transform"
          >
            <Star
              size={20}
              className={`${
                star <= currentRating ? 'text-amber-400 fill-amber-400' : 'text-gray-400'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-400" />
          Resumos Diários
          <Sparkles className="ml-3 text-amber-400" />
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Uma nova reflexão é liberada a cada dia do mês. Cultive o hábito da leitura e transforme sua vida.
        </p>
        <div className="mt-4 text-amber-400 font-medium">
          Hoje é dia {currentDay} – {30 - currentDay} resumos restantes
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {summaries.map((summary) => {
          const isUnlocked = summary.day <= currentDay;

          return (
            <Card
              key={summary.day}
              hover={isUnlocked}
              className={`cursor-pointer text-center p-4 group ${
                isUnlocked
                  ? 'bg-gray-800/50 hover:border-amber-500'
                  : 'bg-gray-900/50 border-gray-700 opacity-60'
              }`}
              onClick={() => isUnlocked && setSelectedSummary(summary)}
            >
              <div
                className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg ${
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
              <h3 className={`font-semibold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                Dia {summary.day}
              </h3>
              <p
                className={`text-xs ${
                  isUnlocked ? 'text-gray-400 group-hover:text-amber-300' : 'text-gray-600'
                }`}
              >
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
            <img
              src={selectedSummary.image}
              alt={selectedSummary.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg">{selectedSummary.content}</p>
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
