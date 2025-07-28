import React, { useState } from 'react';
import { Calendar, Lock, Star, BookOpen } from 'lucide-react';
import { Modal } from './ui/Modal';

interface Summary {
  id: number;
  day: number;
  title: string;
  author: string;
  rating: number;
  content: string;
}

const summaries: Summary[] = [
  {
    id: 1,
    day: 1,
    title: 'O Poder do Hábito',
    author: 'Charles Duhigg',
    rating: 4.5,
    content:
      'Este livro explora como os hábitos moldam nossa vida pessoal e profissional. Charles Duhigg revela a ciência por trás da formação de hábitos e como podemos mudá-los de forma consciente. Ele introduz o conceito do "loop do hábito" – uma rotina composta por deixa, rotina e recompensa – e mostra como identificar e transformar hábitos prejudiciais. Com exemplos reais e histórias envolventes, a leitura é uma jornada para quem deseja assumir o controle da própria rotina e alcançar mudanças duradouras.',
  },
  {
    id: 2,
    day: 2,
    title: 'Mindset: A Nova Psicologia do Sucesso',
    author: 'Carol S. Dweck',
    rating: 4.8,
    content:
      'Carol Dweck apresenta os conceitos de mindset fixo e mindset de crescimento. O primeiro acredita que habilidades são inatas; o segundo que elas podem ser desenvolvidas com esforço e aprendizado. O livro mostra como adotar um mindset de crescimento pode transformar sua abordagem nos estudos, no trabalho e nos relacionamentos. Com insights valiosos, é uma leitura fundamental para quem quer destravar seu potencial.',
  },
  // ... Adicione os outros 29 resumos aqui ou use JSON externo depois
];

export function DailySummaries() {
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

  // Novo: separação entre lidos e não lidos
  const unreadSummaries = summaries.filter((s) => !read[s.id]);
  const readSummaries = summaries.filter((s) => read[s.id]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Leitura Diária</h1>

      {/* Não lidos (um por vez) */}
      <div className="mb-8">
        <h2 className="text-xl text-white font-semibold mb-4">📘 Próximo resumo disponível</h2>
        {unreadSummaries.length > 0 ? (
          <div
            className="rounded-lg p-4 border border-amber-500 bg-gray-800 cursor-pointer hover:border-amber-400 transition"
            onClick={() => setSelected(unreadSummaries[0])}
          >
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <BookOpen />
              <h3 className="text-white font-semibold">Dia {unreadSummaries[0].day} — {unreadSummaries[0].title}</h3>
            </div>
            <p className="text-gray-400 text-sm">Clique para abrir o resumo do dia.</p>
          </div>
        ) : (
          <p className="text-gray-400">Parabéns! Você já leu todos os resumos disponíveis 🎉</p>
        )}
      </div>

      {/* Já lidos */}
      {readSummaries.length > 0 && (
        <div>
          <h2 className="text-xl text-white font-semibold mb-4">✅ Resumos já lidos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {readSummaries.map((summary) => (
              <div
                key={summary.id}
                className="rounded-lg p-4 text-center border border-gray-700 bg-gray-900 opacity-80 hover:opacity-100 transition cursor-pointer"
                onClick={() => setSelected(summary)}
              >
                <div className="flex justify-center mb-2">
                  <Calendar className="text-green-400" />
                </div>
                <h3 className="text-white font-semibold text-sm">Dia {summary.day}</h3>
                <p className="text-xs text-gray-400">✔️ Já lido</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal com o conteúdo do resumo */}
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
