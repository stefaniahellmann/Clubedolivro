import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { useLinks } from '../contexts/LinksContext';
import { FolderOpen, MessageCircle, Send, Share2, ShieldCheck } from 'lucide-react';

type ItemKey = 'drive' | 'whatsapp' | 'telegram' | 'refer' | 'rules';

const ITEMS: { key: ItemKey; icon: React.ElementType; tone: string; cta: string }[] = [
  { key: 'drive', icon: FolderOpen, tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300', cta: 'Acessar o Drive' },
  { key: 'whatsapp', icon: MessageCircle, tone: 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-300', cta: 'Entrar no WhatsApp' },
  { key: 'telegram', icon: Send, tone: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300', cta: 'Entrar no Telegram' },
  { key: 'refer', icon: Share2, tone: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300', cta: 'Indicar Amigos' },
  { key: 'rules', icon: ShieldCheck, tone: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700/50 dark:text-zinc-200', cta: 'Ler Regras' },
];

export function Dashboard() {
  const { links } = useLinks();
  const [openKey, setOpenKey] = useState<ItemKey | null>(null);

  return (
    <div className="space-y-8">
      {/* saudação com fundo pastel (modo claro) e cinza no dark */}
      <div className="rounded-2xl p-6 border
                      bg-amber-50 border-amber-200
                      dark:bg-zinc-800/60 dark:border-zinc-700">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Bom dia, bem-vindo ao Clube do Livro 👋</h2>
        <p className="text-zinc-700 dark:text-zinc-300 mt-1">
          Explore os acessos rápidos abaixo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {ITEMS.map(({ key, icon: Icon, tone }) => {
          const data = links[key];
          return (
            <Card
              key={key}
              hover
              className="cursor-pointer group"
              onClick={() => setOpenKey(key)}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tone}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">{data.label}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {data.description}
                  </p>
                </div>
                <Button variant="ghost" className="justify-start px-0 text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">
                  Ver detalhes
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modais */}
      {openKey && (
        <AccessModal
          itemKey={openKey}
          onClose={() => setOpenKey(null)}
        />
      )}
    </div>
  );
}

function AccessModal({ itemKey, onClose }: { itemKey: ItemKey; onClose: () => void }) {
  const { links } = useLinks();
  const data = links[itemKey];
  const iconMap: Record<ItemKey, React.ElementType> = {
    drive: FolderOpen,
    whatsapp: MessageCircle,
    telegram: Send,
    refer: Share2,
    rules: ShieldCheck,
  };
  const ctaMap: Record<ItemKey, string> = {
    drive: 'Acessar o Drive',
    whatsapp: 'Entrar no WhatsApp',
    telegram: 'Entrar no Telegram',
    refer: 'Indicar Amigos',
    rules: 'Ler Regras',
  };

  const Icon = iconMap[itemKey];
  const ctaLabel = ctaMap[itemKey];

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={data.label}
      size="md"
      footer={
        <Button
          as="a"
          href={data.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="w-full"
          disabled={!data.url}
        >
          {ctaLabel}
        </Button>
      }
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center
                        bg-emerald-50 text-emerald-700
                        dark:bg-emerald-500/10 dark:text-emerald-300">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-zinc-700 dark:text-zinc-300">
            {data.description}
          </p>
          {!data.url && (
            <p className="text-sm text-amber-600 dark:text-amber-300 mt-2">
              Link ainda não configurado pelo admin.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
