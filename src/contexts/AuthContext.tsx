// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string;
  // ...outros campos que você já tem
};

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  login: (cpf: string) => Promise<boolean>;
  adminLogin: (password: string) => Promise<boolean>;
  logout: () => void;
  /** <-- NOVO */
  updateUser: (partial: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // carregue do localStorage (se já não faz isso)
  useEffect(() => {
    const raw = localStorage.getItem('clube_user');
    const rawAdmin = localStorage.getItem('clube_is_admin');
    if (raw) setUser(JSON.parse(raw));
    if (rawAdmin) setIsAdmin(rawAdmin === 'true');
  }, []);

  // persista user & isAdmin
  useEffect(() => {
    if (user) localStorage.setItem('clube_user', JSON.stringify(user));
    else localStorage.removeItem('clube_user');
    localStorage.setItem('clube_is_admin', String(isAdmin));
  }, [user, isAdmin]);

  // implemente como você já tinha
  const login = async (cpf: string) => {
    // ...sua lógica
    return true;
  };

  const adminLogin = async (password: string) => {
    // ...sua lógica
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('clube_user');
    localStorage.removeItem('clube_is_admin');
  };

  /** <-- NOVO: atualiza e persiste */
  const updateUser = (partial: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...partial };
      localStorage.setItem('clube_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, login, adminLogin, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
