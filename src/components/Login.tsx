import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { BookOpen, Eye, EyeOff, Sparkles } from 'lucide-react';

export function Login() {
  const [cpf, setCpf] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, adminLogin } = useAuth();

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let success = false;

      if (isAdminLogin) {
        success = await adminLogin(adminPassword);
        if (!success) setError('Senha de administrador incorreta');
      } else {
        const cpfSemPontuacao = cpf.replace(/\D/g, '');
        success = await login(cpfSemPontuacao);
        if (!success) setError('CPF não encontrado ou acesso expirado');
      }
    } catch {
      setError('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* blobs decorativas — pastel no claro / suave no dark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-40 animate-pulse
                        bg-amber-200 dark:bg-amber-500/30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-40 animate-pulse animation-delay-2000
                        bg-emerald-200 dark:bg-emerald-500/30"></div>
        <div className="absolute top-40 left-40 w-60 h-60 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-4000
                        bg-purple-200 dark:bg-purple-500/30"></div>
      </div>

      {/* partículas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30 animate-float
                       bg-amber-300 dark:bg-amber-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4 relative">
            <div className="relative">
              <BookOpen className="h-12 w-12 text-amber-700 dark:text-amber-500" />
              <Sparkles className="h-6 w-6 text-amber-500 dark:text-amber-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r
                         from-amber-700 to-emerald-700
                         dark:from-amber-400 dark:to-emerald-400
                         bg-clip-text text-transparent">
            Clube do Livro
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300">
            Bem-vindo de volta à sua jornada literária!
          </p>
        </div>

        {/* Abas Usuário/Admin */}
        <div className="flex space-x-1 mb-6 p-1 rounded-lg border
                        bg-zinc-100 border-zinc-200
                        dark:bg-zinc-800 dark:border-zinc-700">
          <button
            onClick={() => setIsAdminLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all
              ${!isAdminLogin
                ? 'bg-white text-emerald-700 border border-emerald-200 shadow-sm dark:bg-zinc-900 dark:text-emerald-300 dark:border-emerald-700/40'
                : 'text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
          >
            Usuário
          </button>
          <button
            onClick={() => setIsAdminLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all
              ${isAdminLogin
                ? 'bg-white text-emerald-700 border border-emerald-200 shadow-sm dark:bg-zinc-900 dark:text-emerald-300 dark:border-emerald-700/40'
                : 'text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAdminLogin ? (
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                CPF (sua senha de acesso)
              </label>
              <input
                id="cpf"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                className="w-full px-4 py-3 rounded-lg transition-all
                           bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                placeholder="000.000.000-00"
                maxLength={14}
                required
              />
            </div>
          ) : (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Senha de Administrador
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg transition-all
                             bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400
                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                             dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded
                             text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900
                             dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg p-3 border
                            bg-rose-50 text-rose-700 border-rose-200
                            dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-700/40">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant="primary"
            className="py-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Entrando...</span>
              </div>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>

        {!isAdminLogin && (
          <div className="mt-6 card p-4 border-amber-200 dark:border-amber-700/40">
            <h3 className="font-medium text-amber-700 dark:text-amber-300 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Para teste:
            </h3>
            <div className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
              <p>
                CPF:{' '}
                <span className="font-mono px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800">
                  123.456.789-01
                </span>{' '}
                (João Silva)
              </p>
              <p>
                CPF:{' '}
                <span className="font-mono px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800">
                  987.654.321-09
                </span>{' '}
                (Maria Santos)
              </p>
              <p className="text-xs mt-2 text-zinc-600 dark:text-zinc-400">
                Pode digitar com ou sem pontos e traços
              </p>
            </div>
          </div>
        )}

        {isAdminLogin && (
          <div className="mt-6 card p-4 border-amber-200 dark:border-amber-700/40">
            <h3 className="font-medium text-amber-700 dark:text-amber-300 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Para teste:
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Senha:{' '}
              <span className="font-mono px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800">
                admin123
              </span>
            </p>
          </div>
        )}
      </Card>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
