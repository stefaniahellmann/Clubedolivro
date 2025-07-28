import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Download, FileText, Sparkles, Tag } from 'lucide-react';
import { freeMaterials } from '../data/mockData';

export function FreeMaterials() {
  const handleDownload = (url: string, title: string) => {
    // Em produção, você pode adicionar tracking de downloads aqui
    window.open(url, '_blank');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Produtividade': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Listas': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Guias': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Ferramentas': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      'Resumos': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-400" />
          Materiais Gratuitos
          <Sparkles className="ml-3 text-amber-400" />
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Baixe gratuitamente nossos materiais exclusivos para potencializar sua jornada de leitura e desenvolvimento pessoal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeMaterials.map((material) => (
          <Card key={material.id} hover className="group cursor-pointer bg-gray-800/50 backdrop-blur-sm border-gray-600 hover:border-amber-500 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="bg-gradient-to-br from-amber-500 to-green-500 p-4 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <FileText size={32} className="text-white" />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(material.category)}`}>
                  <Tag size={12} className="inline mr-1" />
                  {material.category}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xl line-clamp-2 group-hover:text-amber-300 transition-colors">
                  {material.title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
                  {material.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>PDF • {material.fileSize}</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    Gratuito
                  </span>
                </div>
              </div>

              <Button
                onClick={() => handleDownload(material.downloadUrl, material.title)}
                fullWidth
                className="mt-4 group-hover:bg-amber-600 group-hover:border-amber-500 group-hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Download size={18} />
                <span>Baixar PDF</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <div className="bg-gradient-to-r from-amber-900/30 to-green-900/30 border border-amber-700/50 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="font-bold text-amber-300 mb-2 flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Novos materiais toda semana!
          </h3>
          <p className="text-gray-300 text-sm">
            Fique atento às atualizações. Sempre adicionamos novos PDFs exclusivos para nossos membros.
          </p>
        </div>
      </div>
    </div>
  );
}