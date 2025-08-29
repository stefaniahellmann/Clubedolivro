import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type RaffleNumberStatus = 'free' | 'pending' | 'sold';

export type RaffleNumber = {
  n: number;
  status: RaffleNumberStatus;
  userId?: string;
  userName?: string;
  reservationId?: string;
};

export type Reservation = {
  id: string;
  userId: string;
  userName: string;
  numbers: number[];
  amount: number; // em reais
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string; // ISO
};

type RaffleState = {
  numbers: RaffleNumber[];
  reservations: Reservation[];
};

type RaffleContextType = {
  pricePerNumber: number;
  state: RaffleState;
  availableNumbers: number[];
  userNumbers: (userId: string) => number[];
  createReservation: (userId: string, userName: string, numbers: number[], amount: number) => string;
  approveReservation: (reservationId: string) => void;
  rejectReservation: (reservationId: string) => void;
  resetPendingForUser: (userId: string) => void; // opcional
};

const RaffleContext = createContext<RaffleContextType | undefined>(undefined);

const LS_KEY = 'clube_raffle_v1';
const TOTAL_NUMBERS = 1000;
const PRICE = 2; // R$2,00

function bootstrap(): RaffleState {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as RaffleState;
    } catch {
      localStorage.removeItem(LS_KEY);
    }
  }
  const numbers: RaffleNumber[] = Array.from({ length: TOTAL_NUMBERS }, (_, i) => ({
    n: i + 1,
    status: 'free',
  }));
  return { numbers, reservations: [] };
}

function persist(state: RaffleState) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

export function RaffleProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RaffleState>(bootstrap);

  useEffect(() => {
    persist(state);
  }, [state]);

  const availableNumbers = useMemo(
    () => state.numbers.filter((x) => x.status === 'free').map((x) => x.n),
    [state.numbers]
  );

  const userNumbers = (userId: string) =>
    state.numbers.filter((x) => x.userId === userId && x.status === 'sold').map((x) => x.n);

  const createReservation = (userId: string, userName: string, numbers: number[], amount: number) => {
    if (!numbers.length) return '';
    // valida se ainda estão livres
    const freeSet = new Set(availableNumbers);
    const allFree = numbers.every((n) => freeSet.has(n));
    if (!allFree) return '';

    const reservationId = `res_${Date.now()}`;

    setState((prev) => {
      const nextNumbers = prev.numbers.map((it) =>
        numbers.includes(it.n)
          ? { ...it, status: 'pending', reservationId, userId, userName }
          : it
      );
      const nextRes: Reservation = {
        id: reservationId,
        userId,
        userName,
        numbers: [...numbers].sort((a, b) => a - b),
        amount,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      return { numbers: nextNumbers, reservations: [nextRes, ...prev.reservations] };
    });

    return reservationId;
  };

  const approveReservation = (reservationId: string) => {
    setState((prev) => {
      const res = prev.reservations.find((r) => r.id === reservationId);
      if (!res) return prev;
      const nextReservations = prev.reservations.map((r) =>
        r.id === reservationId ? { ...r, status: 'approved' } : r
      );
      const nextNumbers = prev.numbers.map((n) =>
        res.numbers.includes(n.n)
          ? { ...n, status: 'sold', reservationId, userId: res.userId, userName: res.userName }
          : n
      );
      return { numbers: nextNumbers, reservations: nextReservations };
    });
  };

  const rejectReservation = (reservationId: string) => {
    setState((prev) => {
      const res = prev.reservations.find((r) => r.id === reservationId);
      if (!res) return prev;
      const nextReservations = prev.reservations.map((r) =>
        r.id === reservationId ? { ...r, status: 'rejected' } : r
      );
      const nextNumbers = prev.numbers.map((n) =>
        res.numbers.includes(n.n)
          ? { n: n.n, status: 'free' as const } // limpa campos do pending
          : n
      );
      return { numbers: nextNumbers, reservations: nextReservations };
    });
  };

  const resetPendingForUser = (userId: string) => {
    setState((prev) => {
      const pendingOfUser = prev.reservations.filter(
        (r) => r.userId === userId && r.status === 'pending'
      );
      const pendIds = new Set(pendingOfUser.map((r) => r.id));
      const nextReservations = prev.reservations.map((r) =>
        pendIds.has(r.id) ? { ...r, status: 'rejected' } : r
      );
      const nextNumbers = prev.numbers.map((n) =>
        n.status === 'pending' && n.userId === userId ? { n: n.n, status: 'free' } : n
      );
      return { numbers: nextNumbers, reservations: nextReservations };
    });
  };

  const value: RaffleContextType = {
    pricePerNumber: PRICE,
    state,
    availableNumbers,
    userNumbers,
    createReservation,
    approveReservation,
    rejectReservation,
    resetPendingForUser,
  };

  return <RaffleContext.Provider value={value}>{children}</RaffleContext.Provider>;
}

export function useRaffle() {
  const ctx = useContext(RaffleContext);
  if (!ctx) throw new Error('useRaffle deve ser usado dentro de <RaffleProvider>');
  return ctx;
}