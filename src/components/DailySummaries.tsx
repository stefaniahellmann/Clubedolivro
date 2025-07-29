import React, { useEffect, useState } from 'react';
import { Lock, Star } from 'lucide-react';
import { Modal } from './ui/Modal';

interface Summary {
  id: number;
  day: number;
  title: string;
  author: string;
  rating: number;
  content: string;
}

const allSummaries: Summary[] = [
  { id: 1, day: 1, title: 'O Poder do Hábito', author: 'Charles Duhigg', rating: 4.0, content: 'Como os hábitos funcionam e como podemos mudá-los.' },
  { id: 2, day: 2, title: 'A Coragem de Ser Imperfeito', author: 'Brené Brown', rating: 4.1, content: 'Vulnerabilidade como caminho para autenticidade.' },
  { id: 3, day: 3, title: 'Mindset: A Nova Psicologia do Sucesso', author: 'Carol S. Dweck', rating: 4.2, content: 'Mentalidade fixa vs. mentalidade de crescimento.' },
  { id: 4, day: 4, title: 'Os 7 Hábitos das Pessoas Altamente Eficazes', author: 'Stephen R. Covey', rating: 4.3, content: 'Hábitos poderosos para eficácia pessoal.' },
  { id: 5, day: 5, title: 'O Milagre da Manhã', author: 'Hal Elrod', rating: 4.2, content: 'Transforme sua manhã e sua vida com novos rituais.' },
  { id: 6, day: 6, title: 'A Sutil Arte de Ligar o F*da-se', author: 'Mark Manson', rating: 4.4, content: 'Uma abordagem honesta sobre viver melhor.' },
  { id: 7, day: 7, title: 'O Jeito Harvard de Ser Feliz', author: 'Shawn Achor', rating: 4.1, content: 'Ciência da felicidade e performance.' },
  { id: 8, day: 8, title: 'Como Fazer Amigos e Influenciar Pessoas', author: 'Dale Carnegie', rating: 4.5, content: 'Princípios para relações duradouras.' },
  { id: 9, day: 9, title: 'Quem Pensa Enriquece', author: 'Napoleon Hill', rating: 4.3, content: 'Poder do pensamento na realização de metas.' },
  { id: 10, day: 10, title: 'A Única Coisa', author: 'Gary Keller', rating: 4.2, content: 'Foco extremo para obter resultados extraordinários.' },
  { id: 11, day: 11, title: 'Desperte Seu Gigante Interior', author: 'Tony Robbins', rating: 4.4, content: 'Estratégias de vida e sucesso pessoal.' },
  { id: 12, day: 12, title: 'A Mente Organizada', author: 'Daniel Levitin', rating: 4.0, content: 'Como pensar com clareza em tempos de excesso.' },
  { id: 13, day: 13, title: 'Roube Como Um Artista', author: 'Austin Kleon', rating: 4.3, content: 'Criatividade como combinação de referências.' },
  { id: 14, day: 14, title: 'A Coragem de Não Agradar', author: 'Ichiro Kishimi', rating: 4.1, content: 'Liberdade psicológica e autenticidade.' },
  { id: 15, day: 15, title: 'Essencialismo', author: 'Greg McKeown', rating: 4.4, content: 'Menos, porém melhor.' },
  { id: 16, day: 16, title: 'O Ego É Seu Inimigo', author: 'Ryan Holiday', rating: 4.3, content: 'Superar o ego para crescer.' },
  { id: 17, day: 17, title: 'O Obstáculo é o Caminho', author: 'Ryan Holiday', rating: 4.3, content: 'Estoicismo prático para superar dificuldades.' },
  { id: 18, day: 18, title: 'A Arte da Guerra', author: 'Sun Tzu', rating: 4.0, content: 'Estratégia atemporal para qualquer área da vida.' },
  { id: 19, day: 19, title: 'Os Segredos da Mente Milionária', author: 'T. Harv Eker', rating: 4.4, content: 'Mentalidade financeira poderosa.' },
  { id: 20, day: 20, title: 'O Homem Mais Rico da Babilônia', author: 'George S. Clason', rating: 4.2, content: 'Lições eternas sobre finanças.' },
  { id: 21, day: 21, title: 'Mais Esperto que o Diabo', author: 'Napoleon Hill', rating: 4.3, content: 'Conversas com o medo e a procrastinação.' },
  { id: 22, day: 22, title: 'Pense como um Monge', author: 'Jay Shetty', rating: 4.2, content: 'Sabedoria monástica aplicada à vida moderna.' },
  { id: 23, day: 23, title: 'Nunca Divida a Diferença', author: 'Chris Voss', rating: 4.5, content: 'Negociação de alto nível com empatia e técnica.' },
  { id: 24, day: 24, title: 'A Mágica da Arrumação', author: 'Marie Kondo', rating: 4.0, content: 'Transforme seu espaço e sua vida.' },
  { id: 25, day: 25, title: 'Trabalhe 4 Horas por Semana', author: 'Tim Ferriss', rating: 4.1, content: 'Produtividade radical e estilo de vida livre.' },
  { id: 26, day: 26, title: 'O Andar do Bêbado', author: 'Leonard Mlodinow', rating: 4.2, content: 'Como o acaso influencia nossas vidas.' },
  { id: 27, day: 27, title: 'Antifrágil', author: 'Nassim Taleb', rating: 4.3, content: 'Ganhar com o caos e a incerteza.' },
  { id: 28, day: 28, title: 'O Lado Difícil das Situações Difíceis', author: 'Ben Horowitz', rating: 4.1, content: 'Gestão em tempos críticos.' },
  { id: 29, day: 29, title: 'Limite Zero', author: 'Joe Vitale', rating: 4.0, content: 'Ho’oponopono e cura interior.' },
  { id: 30, day: 30, title: 'O Livro do Ego', author: 'Osho', rating: 4.1, content: 'Desconstruindo a identidade limitada.' },
  { id: 31, day: 31, title: 'Inteligência Emocional', author: 'Daniel Goleman', rating: 4.4, content: 'Dominar emoções para viver melhor.' },
];

export function DailySummaries() {
  const [selected, setSelected] = useState<Summary | null>(null);
  const [read, setRead] = useState<number[]>([]);
  const [userRating, setUserRating] = useState<{ [key: number]: number }>({});

  const currentUnlockedId = read.length + 1;

  useEffect(() => {
    const stored = localStorage.getItem('readSummaries');
    if (stored) setRead(JSON.parse(stored));
  }, []);

  const markAsRead = (id: number) => {
    const updated = [...read, id];
    setRead(updated);
    localStorage.setItem('readSummaries', JSON.stringify(updated));
    setSelected(null);
  };

  const current = allSummaries.find((s) => s.id === currentUnlockedId);
  const locked = allSummaries.filter((s) => s.id > currentUnlockedId);
  const readList = allSummaries.filter((s) => read.includes(s.id)).slice(-7).reverse();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white text-center">Leitura Diária</h1>

      {current && (
        <div className="border border-amber-500 bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl text-amber-400 font-semibold">📖 Resumo liberado hoje</h2>
          <div onClick={() => setSelected(current)} className="cursor-pointer mt-2">
            <h3 className="text-white font-semibold">{current.title}</h3>
            <p className="text-sm text-gray-400">{current.content}</p>
          </div>
        </div>
      )}

      {readList.length > 0 && (
        <div>
          <h2 className="text-lg text-green-400 font-semibold mb-2">✔️ Leituras anteriores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {readList.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelected(s)}
                className="p-3 bg-gray-800 rounded-lg border border-green-400 cursor-pointer hover:border-amber-400"
              >
                <h3 className="text-white text-sm font-medium">{s.title}</h3>
                <p className="text-xs text-gray-400">✔️ Lido</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-gray-400 font-semibold text-md">🔒 Resumos bloqueados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {locked.slice(0, 6).map((s) => (
            <div key={s.id} className="p-3 bg-gray-900 rounded-lg border border-gray-700 opacity-60 text-center">
              <Lock className="text-gray-500 mx-auto mb-1" />
              <h3 className="text-white text-sm font-medium">{s.title}</h3>
              <p className="text-xs text-gray-500">Bloqueado</p>
            </div>
          ))}
        </div>
      </div>

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
            <div className="bg-gray-800 text-sm p-4 rounded-lg max-h-[300px] overflow-y-auto">
              {selected.content}
            </div>
            {!read.includes(selected.id) && (
              <button
                onClick={() => markAsRead(selected.id)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 mt-4 rounded"
              >
                Marcar como lido
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
