import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

type Config = {
  driveUrl: string;
  whatsappUrl: string;
  telegramUrl: string;
  shareText: string;       // usado no “Indique Amigos”
  shareUrl: string;        // idem
  rules: string[];         // tópicos das regras do clube
};

const DEFAULTS: Config = {
  driveUrl: '',
  whatsappUrl: '',
  telegramUrl: '',
  shareText: 'Vem para o Clube do Livro comigo! 📚',
  shareUrl: window.location.origin,
  rules: [
    'Seja respeitoso (a) com todos.',
    'Nada de spam/divulgação fora dos canais combinados.',
    'Evite spoilers sem aviso.',
    'Siga as orientações dos moderadores.',
  ],
};

type Ctx = {
  config: Config;
  setConfig: (c: Partial<Config>) => void;
  resetConfig: () => void;
};

const ConfigContext = createContext<Ctx | null>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<Config>(DEFAULTS);

  useEffect(() => {
    const raw = localStorage.getItem('clube.config');
    if (raw) {
      try { setConfigState({ ...DEFAULTS, ...JSON.parse(raw) }); } catch {}
    }
  }, []);

  const setConfig = (patch: Partial<Config>) => {
    setConfigState(prev => {
      const next = { ...prev, ...patch };
      localStorage.setItem('clube.config', JSON.stringify(next));
      return next;
    });
  };

  const resetConfig = () => {
    localStorage.removeItem('clube.config');
    setConfigState(DEFAULTS);
  };

  const value = useMemo(() => ({ config, setConfig, resetConfig }), [config]);
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig deve estar dentro de <ConfigProvider>');
  return ctx;
};
