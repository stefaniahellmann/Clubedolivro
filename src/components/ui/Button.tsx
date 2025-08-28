import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';
import {
  MessageCircle,
  Users,
  ExternalLink,
  Calendar,
  BookOpen,
  UserPlus,
  AlertCircle,
  Sparkles,
  Star,
  FileText,
} from 'lucide-react';
import { dailyMessages, freeMaterials } from '../data/mockData';

export function Dashboard() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todaysMessage =
    dailyMessages[Math.floor(Math.random() * dailyMessages.length)];

  const quickLinks = [
    {
      title: 'Drive de Materiais',
      description: 'Acesse todos os materiais complementares',
      icon: BookOpen,
      url: 'https://drive.google.com/materiais',
      tone: 'emerald',
    },
    {
      title: 'Grupo de Leitura',
      description: 'Participe das discussões no WhatsApp',
      icon: MessageCircle,
      url: 'https://chat.whatsapp.com/grupo-leitura',
      tone: 'teal',
    },
    {
      title: 'Indique Amigos',
      description: 'Compartilhe o clube com seus amigos',
      icon: UserPlus,
      url: 'https://clubedolivro.com/convite',
      tone: 'violet',
    },
    {
      title: 'Podcast do Clube',
      description: 'Ouça com atenção e siga as regras combinadas abaixo:',
      icon: AlertCircle,
      tone: 'amber',
      showModal: true,
    },
  ] as const;

  const chipClass = (tone: string) => {
    switch (tone) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300';
      case 'teal':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300';
      case 'violet':
        return 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300';
      case 'amber':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300';
      case 'blue':
      default:
        return 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300';
    }
  };

  const iconWrap = (tone: string) =>
    [
      'p-4 rounded-xl shadow-sm mx-auto w-fit',
      // claro
      chipClass(tone),
    ].join(' ');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="space-y-8">
      {/* Modal com regras do podcast */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Regras do Podcast do Clube"
        size="md"
      >
        <ul className="list-disc pl-5 text-zinc-800 dark:text-zinc-200 space-y-2">
          <li>Escute os episódios com atenção e sem interrupções.</li>
          <li>Evite pausar no meio do conteúdo.</li>
          <li>Reflita sobre os temas abordados antes de comentar.</li>
          <li>Compartilhe seus insights no grupo com respeito e clareza.</li>
        </ul>
      </Modal>

      {/* Saudação personalizada (hero pastel no claro, contrastado no dark) */}
      <Card className="
        relative overflow-hidden
        border border-zinc-200 dark:border-zinc-700
        bg-gradient-to-r from-emerald-50 to-amber-50
        dark:from-zinc-800 dark:to-zinc-800
      ">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center text-zinc-900 dark:text-zinc-100">
                {getGreeting()}, {user?.firstName}!
                <Sparkles className="ml-2 h-8 w-8 text-amber-500 dark:text-amber-300 animate-pulse" />
              </h2>
              <p className="text-zinc-700 dark:text-zinc-200 text-lg mb-4 leading-relaxed">
                {todaysMessage.message}
              </p>
              <div className="flex items-center space-x-2 subtle">
                <Calendar size={16} />
                <span className="text-sm">
                  Membro desde{' '}
                  {new Date(user?.createdAt || '').toLocaleDateString('pt-BR')}
                </span>
                <Star className="ml-2 h-4 w-4 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <div className="hidden md:block">
              <BookOpen size={100} className="text-emerald-600/20 dark:text-emerald-300/20" />
            </div>
          </div>
        </div>
      </Card>

      {/* Blocos de links rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link, index) => (
          <Card
            key={index}
            hover
            className="group cursor-pointer card"
          >
            {link.url ? (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="text-center space-y-3">
                  <div className={`${iconWrap(link.tone)} group-hover:scale-105 transition-transform`}>
                    <link.icon size={28} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-lg">
                      {link.title}
                    </h3>
                    <p className="subtle text-sm leading-relaxed">
                      {link.description}
                    </p>
                    <div className="flex items-center justify-center mt-3 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                      <span>Acessar</span>
                      <ExternalLink
                        size={14}
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </a>
            ) : link.showModal ? (
              <div className="text-center space-y-3 p-4">
                <div className={iconWrap(link.tone)}>
                  <link.icon size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-lg">
                    {link.title}
                  </h3>
                  <p className="subtle text-sm leading-relaxed">
                    {link.description}
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-3 text-amber-700 dark:text-amber-300 text-sm underline hover:opacity-80 transition"
                  >
                    Ver mais
                  </button>
                </div>
              </div>
            ) : null}
          </Card>
        ))}
      </div>

      {/* Estatísticas (cards pastel no claro; contraste no dark) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center border-amber-200 dark:border-amber-700/40 bg-amber-50 dark:bg-amber-500/10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-amber-100 dark:bg-amber-500/20">
            <Calendar className="text-amber-700 dark:text-amber-300" size={36} />
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">30</h3>
          <p className="text-amber-800 dark:text-amber-300">Resumos disponíveis</p>
        </Card>

        <Card className="text-center border-emerald-200 dark:border-emerald-700/40 bg-emerald-50 dark:bg-emerald-500/10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-emerald-100 dark:bg-emerald-500/20">
            <BookOpen className="text-emerald-700 dark:text-emerald-300" size={36} />
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">4</h3>
          <p className="text-emerald-800 dark:text-emerald-300">Livros do mês</p>
        </Card>

        <Card className="text-center border-violet-200 dark:border-violet-700/40 bg-violet-50 dark:bg-violet-500/10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-violet-100 dark:bg-violet-500/20">
            <Users className="text-violet-700 dark:text-violet-300" size={36} />
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">3</h3>
          <p className="text-violet-800 dark:text-violet-300">Parceiros especialistas</p>
        </Card>

        <Card className="text-center border-blue-200 dark:border-blue-700/40 bg-blue-50 dark:bg-blue-500/10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100 dark:bg-blue-500/20">
            <FileText className="text-blue-700 dark:text-blue-300" size={36} />
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            {freeMaterials.length}
          </h3>
          <p className="text-blue-800 dark:text-blue-300">Materiais gratuitos</p>
        </Card>
      </div>
    </div>
  );
}
