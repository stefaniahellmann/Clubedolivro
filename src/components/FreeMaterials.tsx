import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Download, FileText, Sparkles, Tag } from 'lucide-react';
import { freeMaterials } from '../data/mockData';

type Tone = {
  iconWrap: string;
  icon: string;
  badge: string;
};

function getTone(category: string): Tone {
  const base: Record<string, Tone> = {
    Produtividade: {
      iconWrap: 'bg-blue-50 dark:bg-blue-500/10',
      icon: 'text-blue-700 dark:text-blue-300',
      badge:
        'bg-blue-50 text-blue-700 border border-blue-200 ' +
        'dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-700/40',
    },
    Listas: {
      iconWrap: 'bg-emerald-50 dark:bg-emerald-500/10',
      icon: 'text-emerald-700 dark:text-emerald-300',
      badge:
        'bg-emerald-50 text-emerald-700 border border-emerald-200 ' +
        'dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-700/40',
    },
    Guias: {
      iconWrap: 'bg-purple-50 dark:bg-purple-500/10',
      icon: 'text-purple-700 dark:text-purple-300',
      badge:
        'bg-purple-50 text-purple-700 border border-purple-200 ' +
        'dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-700/40',
    },
    Ferramentas: {
      iconWrap: 'bg-amber-50 dark:bg-amber-500/10',
      icon: 'text-amber-700 dark:text-amber-300',
      badge:
        'bg-amber-50 text-amber-700 border border-amber-200 ' +
        'dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-700/40',
    },
    Resumos: {
      iconWrap: 'bg-rose-50 dark:bg-rose-500/10',
      icon: 'text-rose-700 dark:text-rose-300',
      badge:
        'bg-rose-50 text-rose-700 border border-rose-200 ' +
        'dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-700/40',
    },
  };

  return base[category] ?? {
    iconWrap: 'bg-zinc-100 dark:bg-zinc-800/60',
    icon: 'text-zinc-700 dark:text-zinc-300',
    badge:
      'bg-zinc-100 text-zinc-700 border border-zinc-200 ' +
      'dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700',
  };
}

export function FreeMaterials() {
  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-600 dark:text-amber-400" />
          Materiais Gratuitos
          <Sparkles className="ml-3 text-amber-600 dark:text-amber-400" />
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Baixe gratuitamente nossos materiais exclusivos para potencializar sua jornada de leitura e desenvolvimento pessoal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeMaterials.map((material) => {
          const tone = getTone(material.category);
          return (
            <Card
              key={material.id}
              hover
              className="group cursor-pointer card hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={['p-4 rounded-xl shadow-sm', tone.iconWrap].join(' ')}>
                    <FileText size={32} className={tone.icon} />
                  </div>
                  <div className={['px-2 py-1 rounded-full text-xs font-medium', tone.badge].join(' ')}>
                    <Tag size={12} className="inline mr-1" />
                    {material.category}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-zinc-900 dark:text-white text-xl line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-amber-300 transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-3 leading-relaxed">
                    {material.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">PDF • {material.fileSize}</span>
                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      Gratuito
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handleDownload(material.downloadUrl)}
                  fullWidth
                  variant="primary"
                  className="mt-2 flex items-center justify-center space-x-2"
                >
                  <Download size={18} />
                  <span>Baixar PDF</span>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <div className="card p-6 border-amber-200 dark:border-amber-700/40">
          <h3 className="font-bold text-amber-700 dark:text-amber-300 mb-2 flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Novos materiais toda semana!
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm">
            Fique atento às atualizações. Sempre adicionamos novos PDFs exclusivos para nossos membros.
          </p>
        </div>
      </div>
    </div>
  );
}
