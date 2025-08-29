import React, { useMemo, useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import {
  Sparkles,
  FolderOpen,
  MessageCircle,
  Send,
  Share2,
  ScrollText,
  ExternalLink
} from 'lucide-react';
import { Modal } from './ui/Modal';

/* Utils */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Boa noite';
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

/* Coloque aqui seus links reais (ou ligue isso ao seu Admin/Context depois) */
const LINKS = {
  drive: 'https://seu-drive.com/biblioteca',          // Acesse +1k Volumes
  whatsapp: 'https://wa.me/5511999999999',            // Grupo WhatsApp
  telegram: 'https://t.me/seu_canal',                 // Grupo Telegram
  shareUrl: 'https://clubedolivro.com.br'             // URL para compartilhar
};

export function Dashboard() {
  const greeting = useMemo(getGreeting, []);
  const [rulesOpen, setRulesOpen] = useState(false);

  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Clube do Livro',
      text: 'Vem pro Clube do Livro! Resumos, materiais e comunidade 📚✨',
      url: LINKS.shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(LINKS.shareUrl);
        alert('Link copiado! Agora é só colar e enviar para seus amigos.');
      }
    } catch {
      // usuário cancelou; sem problemas
    }
  };

  const quickItems = [
    {
      id: 'drive',
      title: 'Drive de Materiais',
      subtitle: 'Acesse +1k Volumes',
      cta: 'Acesse',
      icon: FolderOpen,
      onClick: () => handleOpen(LINKS.drive),
      tone: {
        iconWrap: 'bg-emerald-50 dark:bg-emerald-500/10',
        icon: 'text-emerald-700 dark:text-emerald-300',
        hover: 'hover:border-emerald-200 dark:hover:border-emerald-600'
      }
    },
    {
      id: 'whats',
      title: 'Clube Whats',
      subtitle: 'Acesse o grupo de WhatsApp',
      cta: 'Acesse',
      icon: MessageCircle,
      onClick: () => handleOpen(LINKS.whatsapp),
      tone: {
        iconWrap: 'bg-green-50 dark:bg-green-500/10',
        icon: 'text-green-700 dark:text-green-300',
        hover: 'hover:border-green-200 dark:hover:border-green-600'
      }
    },
    {
      id: 'telegram',
      title: 'Clube Telegram',
      subtitle: 'Acesse o grupo Telegram',
      cta: 'Acesse',
      icon: Send,
      onClick: () => handleOpen(LINKS.telegram),
      tone: {
        iconWrap: 'bg-sky-50 dark:bg-sky-500/10',
        icon: 'text-sky-700 dark:text-sky-300',
        hover: 'hover:border-sky-200 dark:hover:border-sky-600'
      }
    },
    {
      id: 'share',
      title: 'Indique Amigos',
      subtitle: 'Compartilhe o clube com seus amigos',
      cta: 'Compartilhe',
      icon: Share2,
      onClick: handleShare,
      tone: {
        iconWrap: 'bg-amber-50 dark:bg-amber-500/10',
        icon: 'text-amber-700 dark:text-amber-300',
        hover: 'hover:border-amber-200 dark:hover:border-amber-600'
      }
    },
    {
      id: 'rules',
      title: 'Regras do Clube',
      subtitle: 'Leia com atenção as regras',
      cta: 'Saiba mais',
      icon: ScrollText,
      onClick: () => setRulesOpen(true),
      tone: {
        iconWrap: 'bg-zinc-100 dark:bg-zinc-700/40',
        icon: 'text-zinc-700 dark:text-zinc-200',
        hover: 'hover:border-zinc-200 dark:hover:border-zinc-600'
      }
    }
  ] as const;

  return (
    <div className="space-y-8">
      {/* Banner com degradê verde pastel (claro) / cinza (escuro) */}
      <div
        className="
          rounded-2xl border shadow-sm p-6 sm:p-7
          bg-gradient-to-r from-emerald-100 via-emerald-50 to-teal-100
          text-emerald-900 border-emerald-200
          dark:bg-zinc-800/60 dark:text-zinc-100 dark:border-zinc-700
        "
        role="region"
        aria-label="Boas-vindas"
      >
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <Sparkles className="h-6 w-6 text-emerald-700 dark:text-amber-300 mt-0.5 sm:mt-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {greeting}, bem-vindo ao Clube do Livro 👋
            </h2>
            <p className="mt-1 text-sm sm:text-base text-emerald-800/80 dark:text-zinc-300">
              Explore os acessos rápidos abaixo.
            </p>
          </div>
        </div>
      </div>

      {/* Acessos rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {quickItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              hover
              className={[
                'group card cursor-pointer transition-all duration-200',
                'flex flex-col justify-between',
                item.tone.hover
              ].join(' ')}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={['p-3 rounded-xl shadow-sm', item.tone.iconWrap].join(' ')}>
                    <Icon size={24} className={item.tone.icon} />
                  </div>
                  {/* Indicador de ação */}
                  <ExternalLink
                    size={16}
                    className="text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-zinc-900 dark:text-white text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <Button
                onClick={item.onClick}
                fullWidth
                variant="ghost"
                className="
                  mt-5 border border-zinc-200 text-zinc-700
                  hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200
                  dark:border-zinc-700 dark:text-zinc-200
                  dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 dark:hover:border-emerald-700/40
                "
              >
                {item.cta}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Modal: Regras do Clube */}
      <Modal
        isOpen={rulesOpen}
        onClose={() => setRulesOpen(false)}
        title="Regras do Clube"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300">
            Leia com atenção as regras para mantermos a comunidade organizada e acolhedora:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Respeito sempre: trate todos com cordialidade.</li>
            <li>Evite spam e divulgações fora do tema leitura.</li>
            <li>Links de materiais devem ser relevantes ao clube.</li>
            <li>Mantenha as discussões no tópico do dia/semana.</li>
            <li>Denuncie comportamentos inadequados aos admins.</li>
          </ul>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              onClick={() => setRulesOpen(false)}
              fullWidth
              className="
                border border-zinc-200 text-zinc-700
                hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200
                dark:border-zinc-700 dark:text-zinc-200
                dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 dark:hover:border-emerald-700/40
              "
            >
              Fechar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
