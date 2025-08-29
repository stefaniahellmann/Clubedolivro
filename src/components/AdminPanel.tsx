import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLinks } from '../contexts/LinksContext';

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
  resetLinks: () => void;
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

  const resetLinks = () => setLinks(DEFAULT_LINKS);

  const value = useMemo(() => ({ links, setLinks, updateLink, resetLinks }), [links]);
  return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}

function RaffleManagement() {
  const { 
    state, 
    approveReservation, 
    rejectReservation, 
    resetPendingForUser,
    pricePerNumber 
  } = useRaffle();

  const pendingReservations = state.reservations.filter(r => r.status === 'pending');
  const approvedReservations = state.reservations.filter(r => r.status === 'approved');
  const rejectedReservations = state.reservations.filter(r => r.status === 'rejected');

  const soldNumbers = state.numbers.filter(n => n.status === 'sold').length;
  const pendingNumbers = state.numbers.filter(n => n.status === 'pending').length;
  const freeNumbers = state.numbers.filter(n => n.status === 'free').length;
  const totalRevenue = approvedReservations.reduce((sum, r) => sum + r.amount, 0);

  const handleApprove = (reservationId: string) => {
    approveReservation(reservationId);
  };

  const handleReject = (reservationId: string) => {
    rejectReservation(reservationId);
  };

  const handleResetPending = (userId: string) => {
    resetPendingForUser(userId);
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('pt-BR');
  };

  const handleSaveLinks = () => {
    Object.entries(tempLinks).forEach(([key, value]) => {
      updateLink(key as keyof typeof links, value);
    });
    setLinksSaved(true);
    setTimeout(() => setLinksSaved(false), 2000);
  };

  const handleLinkChange = (key: keyof typeof links, value: string) => {
    setTempLinks(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center justify-center">
          <Ticket className="mr-3 text-amber-600 dark:text-amber-400" />
          Gerenciamento da Rifa
        </h2>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 dark:from-emerald-500/10 dark:to-teal-500/10 dark:border-emerald-700/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{soldNumbers}</div>
              <div className="text-sm text-emerald-600 dark:text-emerald-400">Vendidos</div>
            </div>
            <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 dark:from-amber-500/10 dark:to-orange-500/10 dark:border-amber-700/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{pendingNumbers}</div>
              <div className="text-sm text-amber-600 dark:text-amber-400">Pendentes</div>
            </div>
            <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-zinc-50 to-slate-50 border-zinc-200 dark:from-zinc-700/20 dark:to-slate-700/20 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">{freeNumbers}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Disponíveis</div>
            </div>
            <Ticket className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-500/10 dark:to-emerald-500/10 dark:border-green-700/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(totalRevenue)}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Receita</div>
            </div>
            <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </Card>
      </div>

      {/* Reservas Pendentes */}
      {pendingReservations.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center">
            <Clock className="mr-2 text-amber-600 dark:text-amber-400" />
            Reservas Pendentes ({pendingReservations.length})
          </h3>
          <div className="space-y-4">
            {pendingReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="border border-amber-200 dark:border-amber-700/40 rounded-lg p-4 bg-amber-50 dark:bg-amber-500/5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {reservation.userName}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                        Pendente
                      </span>
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      <div>Números: {reservation.numbers.join(', ')}</div>
                      <div>Total: {formatCurrency(reservation.amount)}</div>
                      <div>Data: {formatDate(reservation.createdAt)}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(reservation.id)}
                      variant="primary"
                      size="sm"
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Check size={16} />
                      Aprovar
                    </Button>
                    <Button
                      onClick={() => handleReject(reservation.id)}
                      variant="danger"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <X size={16} />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Reservas Aprovadas */}
      {approvedReservations.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center">
            <Trophy className="mr-2 text-emerald-600 dark:text-emerald-400" />
            Reservas Aprovadas ({approvedReservations.length})
          </h3>
          <div className="space-y-3">
            {approvedReservations.slice(0, 10).map((reservation) => (
              <div
                key={reservation.id}
                className="border border-emerald-200 dark:border-emerald-700/40 rounded-lg p-3 bg-emerald-50 dark:bg-emerald-500/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {reservation.userName}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                        Aprovado
                      </span>
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {reservation.numbers.length} números • {formatCurrency(reservation.amount)} • {formatDate(reservation.createdAt)}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Números: {reservation.numbers.join(', ')}
                  </div>
                </div>
              </div>
            ))}
            {approvedReservations.length > 10 && (
              <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                ... e mais {approvedReservations.length - 10} reservas aprovadas
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Ações Administrativas */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center">
          <Settings className="mr-2 text-zinc-600 dark:text-zinc-400" />
          Ações Administrativas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Gerenciar por Usuário</h4>
            <div className="space-y-2">
              {Array.from(new Set(state.reservations.map(r => r.userId))).map(userId => {
                const userName = state.reservations.find(r => r.userId === userId)?.userName || 'Usuário';
                const userPending = state.reservations.filter(r => r.userId === userId && r.status === 'pending').length;
                
                return (
                  <div key={userId} className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-white">{userName}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        {userPending} reservas pendentes
                      </div>
                    </div>
                    {userPending > 0 && (
                      <Button
                        onClick={() => handleResetPending(userId)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <RefreshCw size={14} />
                        Limpar Pendentes
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Informações Gerais</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Preço por número:</span>
                <span className="font-medium">{formatCurrency(pricePerNumber)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total de números:</span>
                <span className="font-medium">1.000</span>
              </div>
              <div className="flex justify-between">
                <span>Receita potencial:</span>
                <span className="font-medium">{formatCurrency(1000 * pricePerNumber)}</span>
              </div>
              <div className="flex justify-between">
                <span>% vendido:</span>
                <span className="font-medium">{((soldNumbers / 1000) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Histórico de Reservas Rejeitadas (últimas 5) */}
      {rejectedReservations.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center">
            <X className="mr-2 text-rose-600 dark:text-rose-400" />
            Últimas Reservas Rejeitadas
          </h3>
          <div className="space-y-2">
            {rejectedReservations.slice(0, 5).map((reservation) => (
              <div
                key={reservation.id}
                className="border border-rose-200 dark:border-rose-700/40 rounded-lg p-3 bg-rose-50 dark:bg-rose-500/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {reservation.userName}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-2">
                      {reservation.numbers.length} números • {formatCurrency(reservation.amount)}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatDate(reservation.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error('useLinks deve ser usado dentro de <LinksProvider>');
  return ctx;
}

import { useRaffle } from '../contexts/RaffleContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { 
  Ticket, 
  Check, 
  Clock, 
  X, 
  DollarSign, 
  Trophy, 
  Settings, 
  RefreshCw,
  Save,
  Users,
  Link,
  MessageSquare,
  Send,
  Share2,
  FolderOpen
} from 'lucide-react';

export function AdminPanel() {
  const { logout } = useAuth();
  const { links, updateLink } = useLinks();
  const { 
    state, 
    approveReservation, 
    rejectReservation, 
    resetPendingForUser,
    pricePerNumber 
  } = useRaffle();
  
  const [activeTab, setActiveTab] = useState<'raffle' | 'links' | 'users'>('raffle');
  const [tempLinks, setTempLinks] = useState(links);
  const [linksSaved, setLinksSaved] = useState(false);

  const pendingReservations = state.reservations.filter(r => r.status === 'pending');
  const approvedReservations = state.reservations.filter(r => r.status === 'approved');
  const rejectedReservations = state.reservations.filter(r => r.status === 'rejected');

  const soldNumbers = state.numbers.filter(n => n.status === 'sold').length;
  const pendingNumbers = state.numbers.filter(n => n.status === 'pending').length;
  const freeNumbers = state.numbers.filter(n => n.status === 'free').length;
  const totalRevenue = approvedReservations.reduce((sum, r) => sum + r.amount, 0);

  const handleApprove = (reservationId: string) => {
    approveReservation(reservationId);
  };

  const handleReject = (reservationId: string) => {
    rejectReservation(reservationId);
  };

  const handleResetPending = (userId: string) => {
    resetPendingForUser(userId);
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('pt-BR');
  };

  const handleSaveLinks = () => {
    Object.entries(tempLinks).forEach(([key, value]) => {
      updateLink(key as keyof typeof links, value);
    });
    setLinksSaved(true);
    setTimeout(() => setLinksSaved(false), 2000);
  };

  const handleLinkChange = (key: keyof typeof links, value: string) => {
    setTempLinks(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center justify-center">
          <Ticket className="mr-3 text-amber-600 dark:text-amber-400" />
          Gerenciamento da Rifa
        </h2>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 dark:from-emerald-500/10 dark:to-teal-500/10 dark:border-emerald-700/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{soldNumbers}</div>
              <div className="text-sm text-emerald-600 dark:text-emerald-400">Vendidos</div>
            </div>
            <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 dark:from-amber-500/10 dark:to-orange-500/10 dark:border-amber-700/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{pendingNumbers}</div>
              <div className="text-sm text-amber-600 dark:text-amber-400">Pendentes</div>
            </div>
            <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-zinc-50 to-slate-50 border-zinc-200 dark:from-zinc-700/20 dark:to-slate-700/20 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">{freeNumbers}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Disponíveis</div>
            </div>
            <Ticket className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-500/10 dark:to-emerald-500/10 dark:border-green-700/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(totalRevenue)}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Receita</div>
            </div>
            <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </Card>
      </div>

      {/* Reservas Pendentes */}
      {pendingReservations.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center">
            <Clock className="mr-2 text-amber-600 dark:text-amber-400" />
            Reservas Pendentes ({pendingReservations.length})
          </h3>
          <div className="space-y-4">
            {pendingReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="border border-amber-200 dark:border-amber-700/40 rounded-lg p-4 bg-amber-50 dark:bg-amber-500/5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {reservation.userName}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                        Pendente
                      </span>
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      <div>Números: {reservation.numbers.join(', ')}</div>
                      <div>Total: {formatCurrency(reservation.amount)}</div>
                      <div>Data: {formatDate(reservation.createdAt)}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(reservation.id)}
                      variant="primary"
                      size="sm"
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Check size={16} />
                      Aprovar
                    </Button>
                    <Button
                      onClick={() => handleReject(reservation.id)}
                      variant="danger"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <X size={16} />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Reservas Aprovadas */}
      {approvedReservations.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center">
            <Trophy className="mr-2 text-emerald-600 dark:text-emerald-400" />
            Reservas Aprovadas ({approvedReservations.length})
          </h3>
          <div className="space-y-3">
            {approvedReservations.slice(0, 10).map((reservation) => (
              <div
                key={reservation.id}
                className="border border-emerald-200 dark:border-emerald-700/40 rounded-lg p-3 bg-emerald-50 dark:bg-emerald-500/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {reservation.userName}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                        Aprovado
                      </span>
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {reservation.numbers.length} números • {formatCurrency(reservation.amount)} • {formatDate(reservation.createdAt)}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Números: {reservation.numbers.join(', ')}
                  </div>
                </div>
              </div>
            ))}
            {approvedReservations.length > 10 && (
              <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                ... e mais {approvedReservations.length - 10} reservas aprovadas
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Ações Administrativas */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center">
          <Settings className="mr-2 text-zinc-600 dark:text-zinc-400" />
          Ações Administrativas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Gerenciar por Usuário</h4>
            <div className="space-y-2">
              {Array.from(new Set(state.reservations.map(r => r.userId))).map(userId => {
                const userName = state.reservations.find(r => r.userId === userId)?.userName || 'Usuário';
                const userPending = state.reservations.filter(r => r.userId === userId && r.status === 'pending').length;
                
                return (
                  <div key={userId} className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-white">{userName}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        {userPending} reservas pendentes
                      </div>
                    </div>
                    {userPending > 0 && (
                      <Button
                        onClick={() => handleResetPending(userId)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <RefreshCw size={14} />
                        Limpar Pendentes
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Informações Gerais</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Preço por número:</span>
                <span className="font-medium">{formatCurrency(pricePerNumber)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total de números:</span>
                <span className="font-medium">1.000</span>
              </div>
              <div className="flex justify-between">
                <span>Receita potencial:</span>
                <span className="font-medium">{formatCurrency(1000 * pricePerNumber)}</span>
              </div>
              <div className="flex justify-between">
                <span>% vendido:</span>
                <span className="font-medium">{((soldNumbers / 1000) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Histórico de Reservas Rejeitadas (últimas 5) */}
      {rejectedReservations.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center">
            <X className="mr-2 text-rose-600 dark:text-rose-400" />
            Últimas Reservas Rejeitadas
          </h3>
          <div className="space-y-2">
            {rejectedReservations.slice(0, 5).map((reservation) => (
              <div
                key={reservation.id}
                className="border border-rose-200 dark:border-rose-700/40 rounded-lg p-3 bg-rose-50 dark:bg-rose-500/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {reservation.userName}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-2">
                      {reservation.numbers.length} números • {formatCurrency(reservation.amount)}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatDate(reservation.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}