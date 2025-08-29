import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Profile = {
  displayName: string;
  photoUrl: string;
};

type RaffleMap = Record<number, string | null>; // número -> nome do comprador (ou null)

type ConfigContextType = {
  profile: Profile;
  setProfile: (p: Profile) => void;

  raffle: RaffleMap;
  buyNumbers: (buyerName: string, numbers: number[]) => { ok: boolean; failed?: number[] };
  releaseNumber: (num: number) => void;
  clearRaffle: () => void;
  drawWinner: () => { number: number; name: string } | null;
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const STORAGE_KEYS = {
  profile: 'cfg.profile.v1',
  raffle: 'cfg.raffle.v1',
};

const TOTAL_NUMBERS = 1000;

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<Profile>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.profile);
    return raw
      ? JSON.parse(raw)
      : { displayName: '', photoUrl: '' };
  });

  const [raffle, setRaffle] = useState<RaffleMap>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.raffle);
    if (raw) return JSON.parse(raw);
    // inicia 1..1000 como null
    const base: RaffleMap = {};
    for (let i = 1; i <= TOTAL_NUMBERS; i++) base[i] = null;
    return base;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.raffle, JSON.stringify(raffle));
  }, [raffle]);

  const setProfile = (p: Profile) => setProfileState(p);

  const buyNumbers: ConfigContextType['buyNumbers'] = (buyerName, numbers) => {
    const failed: number[] = [];
    const copy: RaffleMap = { ...raffle };

    numbers.forEach((n) => {
      if (copy[n]) failed.push(n);
      else copy[n] = buyerName;
    });

    if (failed.length === numbers.length) {
      return { ok: false, failed };
    }
    setRaffle(copy);
    return { ok: true, failed: failed.length ? failed : undefined };
  };

  const releaseNumber = (num: number) => {
    setRaffle((prev) => ({ ...prev, [num]: null }));
  };

  const clearRaffle = () => {
    const base: RaffleMap = {};
    for (let i = 1; i <= TOTAL_NUMBERS; i++) base[i] = null;
    setRaffle(base);
  };

  const drawWinner = () => {
    const sold = Object.entries(raffle)
      .filter(([, who]) => !!who)
      .map(([num, who]) => ({ number: Number(num), name: String(who) }));

    if (sold.length === 0) return null;
    const rnd = Math.floor(Math.random() * sold.length);
    return sold[rnd];
  };

  const value = useMemo(
    () => ({ profile, setProfile, raffle, buyNumbers, releaseNumber, clearRaffle, drawWinner }),
    [profile, raffle]
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig deve ser usado dentro de <ConfigProvider>');
  return ctx;
}

export const RAFFLE_TOTAL = TOTAL_NUMBERS;
export const RAFFLE_PRICE = 2; // R$2 por número
