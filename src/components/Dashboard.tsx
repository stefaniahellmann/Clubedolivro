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

  const todaysMessage = dailyMessages[Math.floor(Math.random() * dailyMessages.length)];

  const quickLinks = [
    {
      title: 'Drive de Materiais',
      description: 'Acesse todos os materiais complementares',
      icon: BookOpen,
      url: 'https://drive.google.com/materiais',
      color: 'from-blue-600 to-blue-700',
    },
    {
      title: 'Grupo de Leitura',
      description: 'Participe das discussões no WhatsApp',
      icon: MessageCircle,
      url: 'https://chat.whatsapp.com/grupo-leitura',
      color: 'from-green-600 to-green-700',
    },
    {
      title: 'Indique Amigos',
      description: 'Compartilhe o clube com seus amigos',
      icon: UserPlus,
      url: 'https://clubedolivro.com/convite',
      color: 'from-purple-600 to-purple-700',
    },
    {
      title: 'Podcast do Clube',
      description: 'Ouça com atenção e siga as regras combinadas abaixo:',
      icon: AlertCircle,
      color: 'from-amber-600 to-amber-700',
      showModal: true,
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
        <ul className="list-disc pl-5 text-gray-200 space-y-2">
          <li>Escute os episódios com atenção e sem interrupções.</li>
          <li>Evite pausar no meio do conteúdo.</li>
          <li>Reflita sobre os temas abordados antes de comentar.</li>
          <li>Compartilhe seus insights no grupo com respeito e clareza.</li>
        </ul>
      </Modal>

      {/* Saudação personalizada */}
      <Card className="bg-gradient-to-r from-amber-600 to-green-600 text-white border-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                {getGreeting()}, {user?.firstName}!
                <Sparkles className="ml-2 h-8 w-8 text-amber-200 animate-pulse" />
              </h2>
              <p className="text-amber-100 text-lg mb-4 leading-relaxed">
                {todaysMessage.message}
              </p>
              <div className="flex items-center space-x-2 text-amber-100">
                <Calendar size={16} />
                <span className="text-sm">
                  Membro desde {new Date(user?.createdAt || '').toLocaleDateString('pt-BR')}
                </span>
                <Star className="ml-2 h-4 w-4 text-amber-200" />
              </div>
            </div>
            <div className="hidden md:block">
              <BookOpen size={100} className="text-amber-200/50" />
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
            className="group cursor-pointer bg-gray-800/50 backdrop-blur-sm border-gray-600"
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
                    className={`bg-gradient-to-br ${link.color} p-4 rounded-xl group-hover:scale-110 transition-transform shadow-lg mx-auto w-fit`}
                  >
                    <link.icon size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2 text-lg">{link.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{link.description}</p>
                    <div className="flex items-center justify-center mt-3 text-amber-400 text-sm font-medium">
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
              <div className="text-center space-y-3 px-4 py-6">
                <div
                  className={`bg-gradient-to-br ${link.color} p-4 rounded-xl shadow-lg mx-auto w-fit`}
                >
                  <link.icon size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2 text-lg">{link.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{link.description}</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-3 text-amber-300 text-sm underline hover:text-amber-100 transition"
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
        <Card className="text-center bg-gradient-to-br from-amber-900/30 to-amber-800/30 border-amber-700">
          <div className="bg-amber-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Calendar className="text-amber-400" size={36} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">30</h3>
          <p className="text-amber-300">Resumos Disponíveis</p>
        </Card>

        <Card className="text-center bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700">
          <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <BookOpen className="text-green-400" size={36} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">4</h3>
          <p className="text-green-300">Livros do Mês</p>
        </Card>

        <Card className="text-center bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700">
          <div className="bg-purple-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Users className="text-purple-400" size={36} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">3</h3>
          <p className="text-purple-300">Parceiros Especialistas</p>
        </Card>

        <Card className="text-center bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700">
          <div className="bg-blue-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <FileText className="text-blue-400" size={36} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{freeMaterials.length}</h3>
          <p className="text-blue-300">Materiais Gratuitos</p>
        </Card>
      </div>
    </div>
  );
}
