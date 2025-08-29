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
  ExternalLink,
  FileText,
  BookOpen,
  Users,
  BarChart3,
} from 'lucide-react';
import { Modal } from './ui/Modal';
import { useLinks } from '../contexts/LinksContext';
import { books, freeMaterials, partners } from '../data/mockData';

/* Saudação correta */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Boa noite';
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function Dashboard() {
  const greeting = useMemo(getGreeting, []);
  const { links } = useLinks();

  /* ==== MODAIS dos atalhos (mantidos) ==== */
  const [rulesOpen, setRulesOpen] = useState(false);
  const [infoDriveOpen, setInfoDriveOpen] = useState(false);
  const [infoWhatsOpen, setInfoWhatsOpen] = useState(false);
  const [infoTelOpen, setInfoTelOpen] = useState(false);
  const [infoShareOpen, setInfoShareOpen] = useState(false);

  /* Contadores (dados exibidos diretamente) */
  const totalMateriais = freeMaterials.length;
  const totalLivros = books.length;
  const totalParceiros = partners.length;
  const totalSummaries = 30; // ajuste se desejar

  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Clube do Livro',
      text: 'Vem pro Clube do Livro! Resumos, materiais e comunidade 📚✨',
      url: links.shareUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(links.shareUrl);
        alert('Link copiado! Agora é só colar e enviar para seus amigos.');
      }
    } catch {}
  };

  /* Atalhos rápidos */
  const quickItems = [
    {
      id: 'drive',
      title: 'Drive de Materiais',
      subtitle: 'Acesse +1k Volumes',
      cta: 'Acesse',
      icon: FolderOpen,
      onClick: () => handleOpen(links.drive),
      tone: {
        iconWrap: 'bg-emerald-50 dark:bg-emerald-500/10',
        icon: 'text-emerald-700 dark:text-emerald-300',
        hover: 'hover:border-emerald-200 dark:hover:border-emerald-600',
      },
    },
    {
      id: 'whats',
      title: 'Clube Whats',
      subtitle: 'Acesse o grupo de WhatsApp',
      cta: 'Acesse',
      icon: MessageCircle,
      onClick: () => handleOpen(links.whatsapp),
      tone: {
        iconWrap: 'bg-green-50 dark:bg-green-500/10',
        icon: 'text-green-700 dark:text-green-300',
        hover: 'hover:border-green-200 dark:hover:border-green-600',
      },
    },
    {
      id: 'telegram',
      title: 'Clube Telegram',
      subtitle: 'Acesse o grupo Telegram',
      cta: 'Acesse',
      icon: Send,
      onClick: () => handleOpen(links.telegram),
      tone: {
        iconWrap: 'bg-sky-50 dark:bg-sky-500/10',
        icon: 'text-sky-700 dark:text-sky-300',
        hover: 'hover:border-sky-200 dark:hover:border-sky-600',
      },
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
        hover: 'hover:border-amber-200 dark:hover:border-amber-600',
      },
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
        hover: 'hover:border-zinc-200 dark:hover:border-zinc-600',
      },
    },
  ] as const;

  /* Cartões de estatística — APENAS DADOS (sem links/modais/botão) */
  const statCards = [
    {
      id: 'materiais' as const,
      label: 'Materiais Gratuitos',
      value: totalMateriais,
      icon: FileText,
      tone: {
        wrap: 'from-blue-50 via-sky-50 to-blue-50 dark:from-sky-500/10 dark:via-sky-500/10 dark:to-sky-500/10',
        border: 'border-blue-200 dark:border-sky-700/40',
        text: 'text-blue-700 dark:text-sky-300',
        iconWrap: 'bg-blue-50 dark:bg-sky-500/10',
        icon: 'text-blue-700 dark:text-sky-300',
      },
    },
    {
      id: 'resumos' as const,
      label: 'Resumos',
      value: totalSummaries,
      icon: BarChart3,
      tone: {
        wrap: 'from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-500/10 dark:via-teal-500/10 dark:to-emerald-500/10',
        border: 'border-emerald-200 dark:border-emerald-700/40',
        text: 'text-emerald-700 dark:text-emerald-300',
        iconWrap: 'bg-emerald-50 dark:bg-emerald-500/10',
        icon: 'text-emerald-700 dark:text-emerald-300',
      },
    },
    {
      id: 'livros' as const,
      label: 'Livros',
      value: totalLivros,
      icon: BookOpen,
      tone: {
        wrap: 'from-purple-50 via-violet-50 to-purple-50 dark:from-violet-500/10 dark:via-purple-500/10 dark:to-violet-500/10',
        border: 'border-purple-200 dark:border-violet-700/40',
        text: 'text-purple-700 dark:text-violet-300',
        iconWrap: 'bg-purple-50 dark:bg-violet-500/10',
        icon: 'text-purple-700 dark:text-violet-300',
      },
    },
    {
      id: 'parceiros' as const,
      label: 'Parceiros',
      value: totalParceiros,
      icon: Users,
      tone: {
        wrap: 'from-amber-50 via-orange-50 to-amber-50 dark:from-amber-500/10 dark:via-orange-500/10 dark:to-amber-500/10',
        border: 'border-amber-200 dark:border-amber-700/40',
        text: 'text-amber-700 dark:text-amber-300',
        iconWrap: 'bg-amber-50 dark:bg-amber-500/10',
        icon: 'text-amber-700 dark:text-amber-300',
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner — CLARO: verde pastel / ESCURO: laranja→verde com bom contraste */}
<div
  className="
    rounded-2xl border shadow-sm p-6 sm:p-7
    bg-gradient-to-r from-emerald-100 via-emerald-50 to-teal-100
    text-emerald-900 border-emerald-200
    dark:bg-gradient-to-r dark:from-amber-600/20 dark:via-emerald-600/15 dark:to-emerald-700/20
    dark:text-zinc-50 dark:border-emerald-700/40
  "
  role="region"
  aria-label="Boas-vindas"
>
  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
    {/* Ícone do livro com “degradê” no contêiner */}
    <div className="
      p-2.5 rounded-xl shadow-sm
      bg-gradient-to-r from-amber-400 to-emerald-400
      ring-1 ring-white/40 dark:ring-black/20
    ">
      <BookOpen className="h-6 w-6 text-white" />
    </div>

    <div>
      <h2 className="text-xl sm:text-2xl font-bold">
        {greeting}, bem-vindo ao Clube do Livro 👋
      </h2>
      <p className="mt-1 text-sm sm:text-base text-emerald-800/80 dark:text-zinc-200">
        Explore os acessos rápidos abaixo.
      </p>
    </div>
  </div>
</div>

      {/* Acessos rápidos (mantidos) */}
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
                item.tone.hover,
              ].join(' ')}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={['p-3 rounded-xl shadow-sm', item.tone.iconWrap].join(' ')}>
                    <Icon size={24} className={item.tone.icon} />
                  </div>
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

      {/* Estatísticas — SOMENTE DADOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.id}
              className={[
                'border bg-gradient-to-br',
                s.tone.border,
                s.tone.wrap,
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className={`text-3xl font-bold ${s.tone.text}`}>{s.value}</div>
                  <div className={`text-sm ${s.tone.text}`}>{s.label}</div>
                </div>
                <div className={`p-3 rounded-xl ${s.tone.iconWrap}`}>
                  <Icon className={s.tone.icon} size={24} />
                </div>
              </div>
              {/* sem botão/links */}
            </Card>
          );
        })}
      </div>

      {/* --------- MODAIS dos atalhos (mantidos) --------- */}
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
            <Button onClick={() => setRulesOpen(false)} fullWidth>
              Fechar
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={infoDriveOpen} onClose={() => setInfoDriveOpen(false)} title="Materiais e Acesso" size="md">
        <div className="space-y-3">
          <p className="text-zinc-700 dark:text-zinc-300">
            O Drive reúne materiais selecionados. Use a busca, respeite direitos autorais e evite compartilhar fora do clube.
          </p>
          <Button as="a" href={links.drive} target="_blank" rel="noopener noreferrer" fullWidth>
            Acessar o Drive
          </Button>
        </div>
      </Modal>

      <Modal isOpen={infoWhatsOpen} onClose={() => setInfoWhatsOpen(false)} title="Grupo de WhatsApp" size="md">
        <div className="space-y-3">
          <p className="text-zinc-700 dark:text-zinc-300">
            Mantenha o foco em leitura, evite correntes e respeite os horários. Dúvidas? Marque um admin.
          </p>
          <Button as="a" href={links.whatsapp} target="_blank" rel="noopener noreferrer" fullWidth>
            Acessar WhatsApp
          </Button>
        </div>
      </Modal>

      <Modal isOpen={infoTelOpen} onClose={() => setInfoTelOpen(false)} title="Grupo do Telegram" size="md">
        <div className="space-y-3">
          <p className="text-zinc-700 dark:text-zinc-300">
            Ideal para quem quer receber avisos e materiais com menos ruído. Ative as notificações do canal.
          </p>
          <Button as="a" href={links.telegram} target="_blank" rel="noopener noreferrer" fullWidth>
            Acessar Telegram
          </Button>
        </div>
      </Modal>

      <Modal isOpen={infoShareOpen} onClose={() => setInfoShareOpen(false)} title="Indique Amigos" size="md">
        <div className="space-y-3">
          <p className="text-zinc-700 dark:text-zinc-300">
            Convide quem você gosta para ler com você! Ao indicar, você fortalece a comunidade.
          </p>
        </div>
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-2">
            <Button onClick={handleShare} className="flex-1">Compartilhar</Button>
            <Button
              variant="ghost"
              className="flex-1 border"
              onClick={async () => {
                await navigator.clipboard.writeText(links.shareUrl);
                alert('Link copiado!');
              }}
            >
              Copiar link
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
