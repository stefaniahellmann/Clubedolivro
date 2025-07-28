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
        console.log('Tentando login com CPF limpo:', cpfSemPontuacao);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-gray-800/90 border-gray-600">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4 relative">
            <div className="relative">
              <BookOpen className="h-12 w-12 text-amber-500" />
              <Sparkles className="h-6 w-6 text-amber-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-amber-400 to-green-400 bg-clip-text text-transparent">
            Clube do Livro
          </h1>
          <p className="text-gray-300">Bem-vindo de volta à sua jornada literária!</p>
        </div>

        <div className="flex space-x-1 mb-6 bg-gray-700/50 p-1 rounded-lg backdrop-blur-sm">
          <button
            onClick={() => setIsAdminLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              !isAdminLogin ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'
            }`}
          >
            Usuário
          </button>
          <button
            onClick={() => setIsAdminLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              isAdminLogin ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAdminLogin ? (
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-300 mb-1">
                CPF (sua senha de acesso)
              </label>
              <input
                id="cpf"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-all"
                placeholder="000.000.000-00"
                maxLength={14}
                required
              />
            </div>
          ) : (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Senha de Administrador
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-all"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className="py-3 bg-gradient-to-r from-amber-600 to-green-600 hover:from-amber-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
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
          <div className="mt-6 p-4 bg-amber-900/30 border border-amber-700/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-amber-300 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Para teste:
            </h3>
            <div className="text-sm text-amber-200 space-y-1">
              <p>CPF: <span className="font-mono bg-gray-700 px-2 py-1 rounded">123.456.789-01</span> (João Silva)</p>
              <p>CPF: <span className="font-mono bg-gray-700 px-2 py-1 rounded">987.654.321-09</span> (Maria Santos)</p>
              <p className="text-xs mt-2 text-amber-300">
                Pode digitar com ou sem pontos e traços
              </p>
            </div>
          </div>
        )}

        {isAdminLogin && (
          <div className="mt-6 p-4 bg-amber-900/30 border border-amber-700/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-medium text-amber-300 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Para teste:
            </h3>
            <p className="text-sm text-amber-200">
              Senha: <span className="font-mono bg-gray-700 px-2 py-1 rounded">admin123</span>
            </p>
          </div>
        )}
      </Card>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
