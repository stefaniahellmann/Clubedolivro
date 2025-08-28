import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { BookOpen, ShoppingCart, Download, Quote, Star, Sparkles, Lock } from 'lucide-react';
import { books } from '../data/mockData';

export function Books() {
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);

  const getCurrentWeek = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfWeek = firstDay.getDay();
    const currentDay = now.getDate();
    const adjustedDay = currentDay + firstDayOfWeek;
    return Math.ceil(adjustedDay / 7);
  };

  const isBookUnlocked = (bookIndex: number) => {
    return bookIndex === getCurrentWeek() - 1;
  };

  const unlockedIndex = getCurrentWeek() - 1;

  const sortedBooks = [
    ...(books[unlockedIndex] ? [books[unlockedIndex]] : []),
    ...books.filter((_, i) => i !== unlockedIndex)
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-600 dark:text-amber-400" />
          Livros Indicados
          <Sparkles className="ml-3 text-amber-600 dark:text-amber-400" />
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Descubra nossa seleção cuidadosa de livros que podem transformar sua perspectiva e enriquecer sua jornada de conhecimento.
          Uma nova indicação é liberada a cada domingo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {sortedBooks.slice(0, 4).map((book, index) => {
          const isUnlocked = books.indexOf(book) === unlockedIndex;

          return (
            <Card
              key={book.id}
              hover={isUnlocked}
              className={[
                'group cursor-pointer transition-all duration-300 flex flex-col justify-between',
                'card', // usa o utilitário .card do index.css
                isUnlocked
                  ? 'border-emerald-200 dark:border-emerald-700/40'
                  : 'opacity-80 border-zinc-200 dark:border-zinc-700',
              ].join(' ')}
            >
              <div className="flex flex-col h-full">
                <div className="space-y-4 flex-grow">
                  <div className="relative">
                    <div className="aspect-w-3 aspect-h-4 relative overflow-hidden rounded-lg">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className={[
                          'w-full h-64 object-cover rounded-lg shadow-sm transition-transform duration-300',
                          isUnlocked ? 'group-hover:scale-105' : 'grayscale',
                        ].join(' ')}
                      />
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-white/70 dark:bg-black/50 flex items-center justify-center rounded-lg">
                          <Lock className="text-zinc-500 dark:text-zinc-400" size={44} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3
                      className={[
                        'font-bold text-xl line-clamp-2 text-center transition-colors',
                        isUnlocked
                          ? 'text-zinc-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-amber-300'
                          : 'text-zinc-500 dark:text-zinc-500',
                      ].join(' ')}
                    >
                      {book.title}
                    </h3>
                    <p
                      className={[
                        'text-sm line-clamp-3 leading-relaxed text-center',
                        isUnlocked
                          ? 'text-zinc-600 dark:text-zinc-300'
                          : 'text-zinc-500 italic dark:text-zinc-500',
                      ].join(' ')}
                    >
                      {isUnlocked ? book.miniSummary : 'Aguarde...'}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={() => isUnlocked && setSelectedBook(book)}
                    variant="outline"
                    fullWidth
                    disabled={!isUnlocked}
                    className={[
                      'transition-all duration-300',
                      isUnlocked
                        ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-amber-500/60 dark:text-amber-300 dark:hover:bg-amber-500/10'
                        : 'opacity-50 cursor-not-allowed',
                    ].join(' ')}
                  >
                    {isUnlocked ? 'Ver Sinopse' : 'Aguarde...'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        title=""
        size="xl"
      >
        {selectedBook && (
          <div className="space-y-6">
            <div className="flex space-x-6">
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                className="w-32 h-44 object-cover rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  {selectedBook.title}
                </h3>
                <p className="text-emerald-700 dark:text-amber-300 font-medium mb-4 flex items-center text-lg">
                  <Star className="w-5 h-5 mr-2" />
                  {selectedBook.author}
                </p>
              </div>
            </div>

            <div className="prose max-w-none prose-zinc dark:prose-invert">
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3 flex items-center">
                <BookOpen className="mr-2" size={24} />
                Resumo
              </h4>
              <p className="leading-relaxed text-zinc-700 dark:text-zinc-300 text-lg">
                {selectedBook.fullSummary}
              </p>
            </div>

            {selectedBook.quotes.length > 0 && (
              <div>
                <h4 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 flex items-center">
                  <Quote className="mr-2" size={24} />
                  Frases Marcantes
                </h4>
                <div className="space-y-4">
                  {selectedBook.quotes.map((quote, index) => (
                    <blockquote
                      key={index}
                      className="border-l-4 border-amber-300 dark:border-amber-500 pl-6 py-3 bg-amber-50 dark:bg-amber-500/10 rounded-r-lg"
                    >
                      <p className="italic text-zinc-700 dark:text-zinc-200 text-lg">"{quote}"</p>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              {selectedBook.purchaseLink && (
                <Button
                  as="a"
                  href={selectedBook.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={18} />
                  <span>Comprar</span>
                </Button>
              )}

              {selectedBook.downloadLink && (
                <Button
                  as="a"
                  href={selectedBook.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="flex items-center justify-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
