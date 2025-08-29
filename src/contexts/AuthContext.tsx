import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { users as mockUsers } from '../data/mockData';

type User = {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  cpf?: string;
  avatarUrl?: string;
  expiresAt?: string; // ISO
};

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  hydrated: boolean;
  login: (cpf: string) => Promise<boolean>;
  adminLogin: (password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// chaves de persistência
const K_USER = 'clube_user';
const K_ADMIN = 'clube_is_admin';

function onlyDigits(s: string) {
  return (s || '').replace(/\D/g, '');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // hidrata do localStorage uma única vez
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(K_USER);
      const rawAdmin = localStorage.getItem(K_ADMIN);
      if (rawUser) setUser(JSON.parse(rawUser));
      if (rawAdmin) setIsAdmin(rawAdmin === 'true');
    } catch {
      // se der erro de parse, zera
      localStorage.removeItem(K_USER);
      localStorage.removeItem(K_ADMIN);
      setUser(null);
      setIsAdmin(false);
    } finally {
      setHydrated(true);
    }
  }, []);

  // persiste quando mudar
  useEffect(() => {
    if (user) localStorage.setItem(K_USER, JSON.stringify(user));
    else localStorage.removeItem(K_USER);
    localStorage.setItem(K_ADMIN, String(isAdmin));
  }, [user, isAdmin]);

  const login = async (cpf: string) => {
    const d = onlyDigits(cpf);
    const found = mockUsers.find((u: any) => onlyDigits(u.cpf) === d);
    if (!found) return false;

    // opcional: checar validade
    const expiresISO =
      typeof found.expirationDate === 'string'
        ? found.expirationDate
        : found.expirationDate?.toISOString?.() ?? undefined;

    const newUser: User = {
      id: found.id?.toString?.() ?? d,
      firstName: found.firstName ?? 'Usuário',
      lastName: found.lastName,
      email: found.email,
      cpf: d,
      expiresAt: expiresISO,
      avatarUrl: found.avatarUrl,
    };

    setUser(newUser);
    setIsAdmin(false);
    return true;
  };

  const adminLogin = async (password: string) => {
    // simples: admin123
    if (password !== 'admin123') return false;
    setIsAdmin(true);

    // mantém um user básico p/ header saudar
    setUser((prev) => prev ?? { id: 'admin', firstName: 'Admin' });
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem(K_USER);
    localStorage.removeItem(K_ADMIN);
  };

  const updateUser = (partial: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...partial };
      localStorage.setItem(K_USER, JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo<AuthContextType>(
    () => ({ user, isAdmin, hydrated, login, adminLogin, logout, updateUser }),
    [user, isAdmin, hydrated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
