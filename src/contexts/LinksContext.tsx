import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type LinksState = {
  drive: string;
  whatsapp: string;
  telegram: string;
  shareUrl: string;
};

type LinksContextType = {
  links: LinksState;
  setLinks: React.Dispatch<React.SetStateAction<LinksState>>;
  updateLink: (key: keyof LinksState, value: string) => void;
};

const DEFAULT_LINKS: LinksState = {
  drive: 'https://seu-drive.com/biblioteca',
  whatsapp: 'https://wa.me/5511999999999',
  telegram: 'https://t.me/seu_canal',
  shareUrl: 'https://clubedolivro.com.br',
};

const LinksContext = createContext<LinksContextType | null>(null);

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinksState>(() => {
    try {
      const raw = localStorage.getItem('cl_links');
      return raw ? { ...DEFAULT_LINKS, ...JSON.parse(raw) } : DEFAULT_LINKS;
    } catch {
      return DEFAULT_LINKS;
    }
  });

  useEffect(() => {
    localStorage.setItem('cl_links', JSON.stringify(links));
  }, [links]);

  const updateLink = (key: keyof LinksState, value: string) =>
    setLinks(prev => ({ ...prev, [key]: value }));

  const value = useMemo(() => ({ links, setLinks, updateLink }), [links]);
  return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error('useLinks deve ser usado dentro de <LinksProvider>');
  return ctx;
}
