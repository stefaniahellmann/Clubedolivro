import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123';

const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@email.com',
    phone: '11999999999',
    cpf: '12345678901',
    expirationDate: '2025-12-31', // 🔁 Atualizado para 2025
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria@email.com',
    phone: '11888888888',
    cpf: '98765432109',
    expirationDate: '2025-11-30', // 🔁 Atualizado para 2025
    isActive: true,
    createdAt: '2024-01-15'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedAdmin = localStorage.getItem('isAdmin');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAdmin) setIsAdmin(JSON.parse(savedAdmin));
  }, []);

  const login = async (cpf: string): Promise<boolean> => {
    const cleanCpf = cpf.replace(/\D/g, '');
    const foundUser = mockUsers.find(u => u.cpf.replace(/\D/g, '') === cleanCpf && u.isActive);
    if (foundUser) {
      const today = new Date();
      const expiration = new Date(foundUser.expirationDate);
      if (expiration >= today) {
        setUser(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        return true;
      }
    }
    return false;
  };

  const adminLogin = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
