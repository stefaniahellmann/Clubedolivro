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

  // Mapeamento de tons para CLARO (pastel) e ESCURO (suave)
  const tone = {
    amber: {
      iconWrap:
        'bg-amber-50 dark:bg-amber-500/10',
      icon:
        'text-amber-700 dark:text-amber-300',
      accent:
        'text-amber-700 dark:text-amber-300',
      border:
        'border-amber-200 dark:border-amber-700/40',
    },
    emerald: {
      iconWrap:
        'bg-emerald-50 dark:bg-emerald-500/10',
      icon:
        'text-emerald-700 dark:text-emerald-300',
      accent:
        'text-emerald-700 dark:text-emerald-300',
      border:
        'border-emerald-200 dark:border-emerald-700/40',
    },
    blue: {
      iconWrap:
        'bg-blue-50 dark:bg-blue-500/10',
      icon:
        'text-blue-700 dark:text-blue-300',
      accent:
        'text-blue-700 dark:text-blue-300',
      border:
        'border-blue-200 dark:border-blue-700/40',
    },
    purple: {
      iconWrap:
        'bg-purple-50 dark:bg-purple-500/10',
      icon:
        'text-purple-700 dark:text-purple-300',
      accent:
        'text-purple-700 dark:text-purple-300',
      border:
        'border-purple-200 dark:border-purple-700/40',
    },
  } as const;

  const quickLinks = [
    {
      title: 'Drive de Materiais',
      description: 'Acesse todos os materiais complementares',
      icon: BookOpen,
      url: 'https://drive.google.com/materiais',
      tone: tone.blue,
    },
    {
      title: 'Grupo de Leitura',
      description: 'Participe das discussões no WhatsApp',
      icon: MessageCircle,
      url: 'https://chat.whatsapp.com/grupo-leitura',
      tone: tone.emerald,
    },
    {
      title: 'Indique Amigos',
      description: 'Compartilhe o clube com seus amigos',
      icon: UserPlus,
      url: 'https://clubedolivro.com/convite',
      tone: tone.purple,
    },
    {
      title: 'Podcast do Clube',
      description: 'Ouça com atenção e siga as regras combinadas abaixo:',
      icon: AlertCircle,
      showModal: true,
      tone: tone.amber,
    },
  ];

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
        <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-200">
          <li>Escute os episódios com atenção e sem interrupções.</li>
          <li>Evite pausar no meio do conteúdo.</li>
          <li>Reflita sobre os temas abordados antes de comentar.</li>
          <li>Compartilhe seus insights no grupo com respeito e clareza.</li>
        </ul>
      </Modal>

     {/* Saudação personalizada — pastel no claro, cinza no dark */}
<Card className="relative overflow-hidden border border-emerald-200 dark:border-emerald-700/40 bg-emerald-50 dark:bg-zinc-800">
  {/* leve brilho decorativo no claro */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-transparent dark:from-transparent" />
  <div className="relative z-10">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-2 flex items-center text-zinc-900 dark:text-white">
          {getGreeting()}, {user?.firstName}!
          <Sparkles className="ml-2 h-8 w-8 text-amber-600 dark:text-amber-300 animate-pulse" />
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 text-lg mb-4 leading-relaxed">
          {todaysMessage.message}
        </p>
        <div className="flex items-center space-x-2 text-emerald-700 dark:text-amber-300">
          <Calendar size={16} />
          <span className="text-sm">
            Membro desde {new Date(user?.createdAt || '').toLocaleDateString('pt-BR')}
          </span>
          <Star className="ml-2 h-4 w-4" />
        </div>
      </div>
      <div className="hidden md:block">
        <BookOpen size={100} className="text-emerald-600/30 dark:text-amber-200/40" />
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
            className={`group cursor-pointer card ${link.tone.border}`}
          >
            {link.url ? (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="text-center space-y-3">
                  <div
                    className={[
                      'p-4 rounded-xl group-hover:scale-110 transition-transform shadow-sm mx-auto w-fit',
                      link.tone.iconWrap,
                    ].join(' ')}
                  >
                    <link.icon size={28} className={link.tone.icon} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">
                      {link.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                      {link.description}
                    </p>
                    <div
                      className={[
                        'flex items-center justify-center mt-3 text-sm font-medium',
                        link.tone.accent,
                      ].join(' ')}
                    >
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
                <div
                  className={[
                    'p-4 rounded-xl shadow-sm mx-auto w-fit',
                    link.tone.iconWrap,
                  ].join(' ')}
                >
                  <link.icon size={28} className={link.tone.icon} />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">
                    {link.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                    {link.description}
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={[
                      'mt-3 text-sm underline transition',
                      link.tone.accent,
                    ].join(' ')}
                  >
                    Ver Mais
                  </button>
                </div>
              </div>
            ) : null}
          </Card>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center card border-amber-200 dark:border-amber-700/40">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-amber-50 dark:bg-amber-500/10">
            <Calendar className="text-amber-700 dark:text-amber-300" size={28} />
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">30</h3>
          <p className="text-amber-700 dark:text-amber-300">Resumos Disponíveis</p>
        </Card>

        <Card className="text-center card border-emerald-200 dark:border-emerald-700/40">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-emerald-50 dark:bg-emerald-500/10">
            <BookOpen className="text-emerald-700 dark:text-emerald-300" size={28} />
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">4</h3>
          <p className="text-emerald-700 dark:text-emerald-300">Livros do Mês</p>
        </Card>

        <Card className="text-center card border-purple-200 dark:border-purple-700/40">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-50 dark:bg-purple-500/10">
            <Users className="text-purple-700 dark:text-purple-300" size={28} />
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">3</h3>
          <p className="text-purple-700 dark:text-purple-300">Parceiros Especialistas</p>
        </Card>

        <Card className="text-center card border-blue-200 dark:border-blue-700/40">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-50 dark:bg-blue-500/10">
            <FileText className="text-blue-700 dark:text-blue-300" size={28} />
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            {freeMaterials.length}
          </h3>
          <p className="text-blue-700 dark:text-blue-300">Materiais Gratuitos</p>
        </Card>
      </div>
    </div>
  );
}
