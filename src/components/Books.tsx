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
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-400" />
          Livros Indicados
          <Sparkles className="ml-3 text-amber-400" />
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Descubra nossa seleção cuidadosa de livros que podem transformar sua perspectiva e enriquecer sua jornada de conhecimento.
          Uma nova indicação é liberada a cada domingo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBooks.slice(0, 4).map((book, index) => {
          const isUnlocked = books.indexOf(book) === unlockedIndex;

          return (
            <Card 
              key={book.id} 
              hover={isUnlocked} 
              className={`group cursor-pointer transition-all duration-300 ${
                isUnlocked
                  ? 'bg-gray-800/50 backdrop-blur-sm border-gray-600 hover:border-amber-500'
                  : 'bg-gray-900/50 border-gray-700 opacity-60'
              }`}
            >
              <div className="space-y-4">
                <div className="relative">
                  <div className="aspect-[210/297] relative overflow-hidden rounded-lg">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className={`w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 ${
                        isUnlocked ? 'group-hover:scale-105' : 'grayscale'
                      }`}
                    />
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                        <Lock className="text-gray-400" size={48} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className={`font-bold text-xl line-clamp-2 text-center transition-colors ${
                    isUnlocked 
                      ? 'text-white group-hover:text-amber-300' 
                      : 'text-gray-500'
                  }`}>
                    {book.title}
                  </h3>
                  <p className={`text-sm line-clamp-3 leading-relaxed text-center ${
                    isUnlocked ? 'text-gray-300' : 'text-gray-600 italic'
                  }`}>
                    {isUnlocked ? book.miniSummary : 'Aguarde...'}
                  </p>
                </div>

                <Button
                  onClick={() => isUnlocked && setSelectedBook(book)}
                  variant="outline"
                  fullWidth
                  disabled={!isUnlocked}
                  className={`mt-4 transition-all duration-300 ${
                    isUnlocked
                      ? 'group-hover:bg-amber-600 group-hover:border-amber-500 group-hover:text-white'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isUnlocked ? 'Ver Sinopse' : 'Aguarde...'}
                </Button>
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
                className="w-32 h-44 object-cover rounded-lg shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedBook.title}
                </h3>
                <p className="text-amber-400 font-medium mb-4 flex items-center text-lg">
                  <Star className="w-5 h-5 mr-2" />
                  {selectedBook.author}
                </p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                <BookOpen className="mr-2" size={24} />
                Resumo
              </h4>
              <p className="text-gray-300 leading-relaxed text-lg">
                {selectedBook.fullSummary}
              </p>
            </div>

            {selectedBook.quotes.length > 0 && (
              <div>
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Quote className="mr-2" size={24} />
                  Frases Marcantes
                </h4>
                <div className="space-y-4">
                  {selectedBook.quotes.map((quote, index) => (
                    <blockquote
                      key={index}
                      className="border-l-4 border-amber-500 pl-6 py-3 bg-amber-900/20 rounded-r-lg backdrop-blur-sm"
                    >
                      <p className="text-gray-300 italic text-lg">"{quote}"</p>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-700">
              {selectedBook.purchaseLink && (
                <Button
                  as="a"
                  href={selectedBook.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-green-600 hover:from-amber-700 hover:to-green-700"
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
