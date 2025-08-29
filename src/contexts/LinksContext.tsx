import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type LinkKey = 'drive' | 'whatsapp' | 'telegram' | 'refer' | 'rules';

export type ClubLink = {
  key: LinkKey;
  label: string;
  url: string;
  description?: string;
};

type LinksState = Record<LinkKey, ClubLink>;

const DEFAULT_LINKS: LinksState = {
  drive: {
    key: 'drive',
    label: 'Drive de Materiais',
    url: '',
    description: 'Acesse +1k volumes, PDFs e materiais de apoio.',
  },
  whatsapp: {
    key: 'whatsapp',
    label: 'Clube Whats',
    url: '',
    description: 'Entre no grupo oficial do WhatsApp.',
  },
  telegram: {
    key: 'telegram',
    label: 'Clube Telegram',
    url: '',
    description: 'Entre no grupo oficial do Telegram.',
  },
  refer: {
    key: 'refer',
    label: 'Indique Amigos',
    url: '',
    description: 'Compartilhe o clube com seus amigos.',
  },
  rules: {
    key: 'rules',
    label: 'Regras do Clube',
    url: '',
    description: 'Leia com atenção as regras do clube.',
  },
};

type LinksContextType = {
  links: LinksState;
  updateLink: (key: LinkKey, url: string) => void;
  resetLinks: () => void;
};

const LinksContext = createContext<LinksContextType | null>(null);
const LS_KEY = 'club_links_v1';

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinksState>(DEFAULT_LINKS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<LinksState>;
        setLinks((prev) => ({
          ...prev,
          ...parsed,
          // garante labels/descrições padrão se faltar
          drive: { ...prev.drive, ...parsed?.drive },
          whatsapp: { ...prev.whatsapp, ...parsed?.whatsapp },
          telegram: { ...prev.telegram, ...parsed?.telegram },
          refer: { ...prev.refer, ...parsed?.refer },
          rules: { ...prev.rules, ...parsed?.rules },
        }));
      }
    } catch {
      // ignora
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(links));
  }, [links]);

  const updateLink = (key: LinkKey, url: string) => {
    setLinks((prev) => ({ ...prev, [key]: { ...prev[key], url } }));
  };

  const resetLinks = () => setLinks(DEFAULT_LINKS);

  const value = useMemo(() => ({ links, updateLink, resetLinks }), [links]);

  return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error('useLinks deve ser usado dentro de <LinksProvider>');
  return ctx;
}
