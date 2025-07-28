<Modal
  isOpen={!!selectedSummary}
  onClose={() => setSelectedSummary(null)}
  title=""
  size="lg"
>
  {selectedSummary && (
    <div className="space-y-6">
      <div className="flex space-x-6">
        <img
          src={selectedSummary.image}
          alt={selectedSummary.title}
          className="w-32 h-44 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">
            {selectedSummary.title}
          </h3>
          <p className="text-gray-400 font-medium mb-4 flex items-center text-sm">
            Dia {selectedSummary.day} da Jornada de Reflexões
          </p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 leading-relaxed text-lg">
          {selectedSummary.content}
        </p>
      </div>

      <div>
        <h4 className="text-md text-gray-300 mb-2">Avalie seu aprendizado:</h4>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(selectedSummary.id, star)}
              className="transition-transform hover:scale-110"
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
      </div>

      <div className="pt-4 border-t border-gray-700">
        <button
          onClick={() => handleMarkAsRead(selectedSummary.id)}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700 text-white rounded transition"
        >
          Marcar como lido
        </button>
      </div>
    </div>
  )}
</Modal>
