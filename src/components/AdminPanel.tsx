import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  UserPlus,
  Calendar,
  Settings,
  BarChart3,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

type AdminSection = 'dashboard' | 'users' | 'summaries' | 'books' | 'partners' | 'messages' | 'links';

export function AdminPanel() {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const menuItems = [
    { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: BarChart3 },
    { id: 'users' as AdminSection, label: 'Usuários', icon: Users },
    { id: 'summaries' as AdminSection, label: 'Resumos Diários', icon: Calendar },
    { id: 'books' as AdminSection, label: 'Livros', icon: BookOpen },
    { id: 'partners' as AdminSection, label: 'Parceiros', icon: UserPlus },
    { id: 'messages' as AdminSection, label: 'Mensagens Diárias', icon: MessageSquare },
    { id: 'links' as AdminSection, label: 'Links Extras', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'summaries':
        return <SummaryManagement />;
      case 'books':
        return <BookManagement />;
      case 'partners':
        return <PartnerManagement />;
      case 'messages':
        return <MessageManagement />;
      case 'links':
        return <LinkManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800/90 backdrop-blur-sm shadow-2xl border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-green-400 bg-clip-text text-transparent">
              Painel Admin
            </h2>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              title="Sair"
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-amber-900/20 transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-amber-900/30 border-r-2 border-amber-500 text-amber-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard Administrativo</h1>
        <div className="text-sm text-gray-400">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">2</h3>
              <p className="text-blue-300">Usuários Ativos</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">30</h3>
              <p className="text-green-300">Resumos Criados</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-700">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">3</h3>
              <p className="text-purple-300">Livros Cadastrados</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 border-amber-700">
          <div className="flex items-center">
            <div className="bg-amber-500 p-3 rounded-lg">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">3</h3>
              <p className="text-amber-300">Parceiros</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BarChart3 className="mr-2" />
            Atividades Recentes
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <span className="text-gray-300">Novo usuário cadastrado: Maria Santos</span>
                <div className="text-xs text-gray-500">Há 2 horas</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <span className="text-gray-300">Resumo do Dia 15 atualizado</span>
                <div className="text-xs text-gray-500">Há 1 dia</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <span className="text-gray-300">Novo livro adicionado: Atomic Habits</span>
                <div className="text-xs text-gray-500">Há 2 dias</div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Estatísticas do Mês</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Novos usuários</span>
              <span className="text-green-400 font-bold">+2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Resumos acessados</span>
              <span className="text-blue-400 font-bold">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Livros visualizados</span>
              <span className="text-purple-400 font-bold">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Taxa de engajamento</span>
              <span className="text-amber-400 font-bold">87%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function UserManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cpf: '',
    expirationDate: '',
    isActive: true
  });

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingUser(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      cpf: '',
      expirationDate: '',
      isActive: true
    });
    setShowModal(true);
  };

  const handleSave = () => {
    // Implementar lógica de salvamento
    console.log('Salvando usuário:', formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gerenciar Usuários</h1>
        <Button onClick={handleNew} className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Novo Usuário</span>
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Expira em
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              <tr className="hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">João Silva</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">joao@email.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">123.456.789-01</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">31/12/2024</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/50 text-green-300 border border-green-700">
                    Ativo
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit({
                      firstName: 'João',
                      lastName: 'Silva',
                      email: 'joao@email.com',
                      phone: '11999999999',
                      cpf: '123.456.789-01',
                      expirationDate: '2024-12-31',
                      isActive: true
                    })}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 size={14} />
                  </Button>
                </td>
              </tr>
              <tr className="hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">Maria Santos</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">maria@email.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">987.654.321-09</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">30/11/2024</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/50 text-green-300 border border-green-700">
                    Ativo
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit({
                      firstName: 'Maria',
                      lastName: 'Santos',
                      email: 'maria@email.com',
                      phone: '11888888888',
                      cpf: '987.654.321-09',
                      expirationDate: '2024-11-30',
                      isActive: true
                    })}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 size={14} />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingUser ? 'Editar Usuário' : 'Novo Usuário'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Primeiro Nome
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Sobrenome
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Telefone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                CPF
              </label>
              <input
                type="text"
                value={formData.cpf}
                onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Data de Expiração
            </label>
            <input
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-sm text-gray-300">
              Usuário ativo
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function SummaryManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingSummary, setEditingSummary] = useState<any>(null);
  const [formData, setFormData] = useState({
    day: '',
    title: '',
    content: '',
    image: '',
    audioUrl: ''
  });

  const handleEdit = (summary: any) => {
    setEditingSummary(summary);
    setFormData(summary);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingSummary(null);
    setFormData({
      day: '',
      title: '',
      content: '',
      image: '',
      audioUrl: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Salvando resumo:', formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Resumos Diários</h1>
        <Button onClick={handleNew}>
          <Plus size={16} className="mr-2" />
          Novo Resumo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i} hover className="group">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white">Dia {i + 1}</h3>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit({
                      day: i + 1,
                      title: `Reflexão do Dia ${i + 1}`,
                      content: `Este é o resumo e reflexão do dia ${i + 1}...`,
                      image: '',
                      audioUrl: ''
                    })}
                    className="text-amber-400 hover:text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-300 line-clamp-3">
                Reflexão do dia {i + 1} sobre leitura e desenvolvimento pessoal...
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={12} className="mr-1" />
                Atualizado há 2 dias
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingSummary ? 'Editar Resumo' : 'Novo Resumo'}
        size="xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Dia
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={formData.day}
                onChange={(e) => setFormData({...formData, day: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Conteúdo
            </label>
            <textarea
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL da Imagem (opcional)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL do Áudio (opcional)
            </label>
            <input
              type="url"
              value={formData.audioUrl}
              onChange={(e) => setFormData({...formData, audioUrl: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function BookManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover: '',
    miniSummary: '',
    fullSummary: '',
    quotes: [''],
    purchaseLink: '',
    downloadLink: ''
  });

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setFormData(book);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      cover: '',
      miniSummary: '',
      fullSummary: '',
      quotes: [''],
      purchaseLink: '',
      downloadLink: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Salvando livro:', formData);
    setShowModal(false);
  };

  const addQuote = () => {
    setFormData({...formData, quotes: [...formData.quotes, '']});
  };

  const removeQuote = (index: number) => {
    const newQuotes = formData.quotes.filter((_, i) => i !== index);
    setFormData({...formData, quotes: newQuotes});
  };

  const updateQuote = (index: number, value: string) => {
    const newQuotes = [...formData.quotes];
    newQuotes[index] = value;
    setFormData({...formData, quotes: newQuotes});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gerenciar Livros</h1>
        <Button onClick={handleNew}>
          <Plus size={16} className="mr-2" />
          Novo Livro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'O Poder do Hábito', author: 'Charles Duhigg' },
          { title: 'Mindset', author: 'Carol S. Dweck' },
          { title: 'Atomic Habits', author: 'James Clear' }
        ].map((book, index) => (
          <Card key={index} hover className="group">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">{book.title}</h3>
                  <p className="text-sm text-amber-400">{book.author}</p>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit({
                      title: book.title,
                      author: book.author,
                      cover: '',
                      miniSummary: 'Resumo do livro...',
                      fullSummary: 'Resumo completo...',
                      quotes: ['Frase marcante...'],
                      purchaseLink: '',
                      downloadLink: ''
                    })}
                    className="text-amber-400 hover:text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">
                Descubra como os hábitos funcionam e como mudá-los...
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingBook ? 'Editar Livro' : 'Novo Livro'}
        size="xl"
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Autor
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL da Capa
            </label>
            <input
              type="url"
              value={formData.cover}
              onChange={(e) => setFormData({...formData, cover: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Mini Resumo
            </label>
            <textarea
              rows={2}
              value={formData.miniSummary}
              onChange={(e) => setFormData({...formData, miniSummary: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Resumo Completo
            </label>
            <textarea
              rows={4}
              value={formData.fullSummary}
              onChange={(e) => setFormData({...formData, fullSummary: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">
                Frases Marcantes
              </label>
              <Button variant="ghost" size="sm" onClick={addQuote}>
                <Plus size={14} />
              </Button>
            </div>
            {formData.quotes.map((quote, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={quote}
                  onChange={(e) => updateQuote(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                  placeholder="Digite uma frase marcante..."
                />
                {formData.quotes.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeQuote(index)}>
                    <X size={14} />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Link de Compra
              </label>
              <input
                type="url"
                value={formData.purchaseLink}
                onChange={(e) => setFormData({...formData, purchaseLink: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Link de Download
              </label>
              <input
                type="url"
                value={formData.downloadLink}
                onChange={(e) => setFormData({...formData, downloadLink: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
          <Button variant="ghost" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Salvar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function PartnerManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    bio: '',
    whatsapp: '',
    instagram: '',
    otherLink: '',
    otherLinkLabel: ''
  });

  const handleEdit = (partner: any) => {
    setEditingPartner(partner);
    setFormData(partner);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingPartner(null);
    setFormData({
      name: '',
      photo: '',
      bio: '',
      whatsapp: '',
      instagram: '',
      otherLink: '',
      otherLinkLabel: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Salvando parceiro:', formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gerenciar Parceiros</h1>
        <Button onClick={handleNew}>
          <Plus size={16} className="mr-2" />
          Novo Parceiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Ana Costa', bio: 'Escritora e crítica literária com mais de 15 anos...' },
          { name: 'Pedro Martins', bio: 'Livreiro e curador de conteúdo. Apaixonado por...' },
          { name: 'Carla Santos', bio: 'Bibliotecária e consultora em leitura...' }
        ].map((partner, index) => (
          <Card key={index} hover className="group">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white">{partner.name}</h3>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit({
                      name: partner.name,
                      photo: '',
                      bio: partner.bio,
                      whatsapp: '11999999999',
                      instagram: '@usuario',
                      otherLink: '',
                      otherLinkLabel: ''
                    })}
                    className="text-amber-400 hover:text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">
                {partner.bio}
              </p>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingPartner ? 'Editar Parceiro' : 'Novo Parceiro'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL da Foto
            </label>
            <input
              type="url"
              value={formData.photo}
              onChange={(e) => setFormData({...formData, photo: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Bio (até 200 caracteres)
            </label>
            <textarea
              rows={3}
              maxLength={200}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.bio.length}/200 caracteres
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                placeholder="11999999999"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Instagram
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                placeholder="@usuario"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Outro Link
              </label>
              <input
                type="url"
                value={formData.otherLink}
                onChange={(e) => setFormData({...formData, otherLink: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Label do Link
              </label>
              <input
                type="text"
                value={formData.otherLinkLabel}
                onChange={(e) => setFormData({...formData, otherLinkLabel: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                placeholder="Site, TikTok, etc."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function MessageManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState<any>(null);
  const [formData, setFormData] = useState({
    message: '',
    isActive: true
  });

  const messages = [
    { id: 1, message: 'Bom dia! Que a leitura de hoje traga novas descobertas para sua vida! 📚', isActive: true },
    { id: 2, message: 'Cada página lida é um passo em direção ao conhecimento. Continue sua jornada! ✨', isActive: true },
    { id: 3, message: 'A leitura é uma conversa com as mentes mais brilhantes da história. Aproveite! 🌟', isActive: false }
  ];

  const handleEdit = (message: any) => {
    setEditingMessage(message);
    setFormData(message);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingMessage(null);
    setFormData({
      message: '',
      isActive: true
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Salvando mensagem:', formData);
    setShowModal(false);
  };

  const toggleActive = (id: number) => {
    console.log('Alterando status da mensagem:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Mensagens Diárias</h1>
        <Button onClick={handleNew}>
          <Plus size={16} className="mr-2" />
          Nova Mensagem
        </Button>
      </div>

      <Card>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={message.id} className={`border-b border-gray-700 pb-4 ${index === messages.length - 1 ? 'border-b-0 pb-0' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-300 mb-2">
                    {message.message}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      message.isActive 
                        ? 'bg-green-900/50 text-green-300 border border-green-700' 
                        : 'bg-red-900/50 text-red-300 border border-red-700'
                    }`}>
                      {message.isActive ? 'Ativa' : 'Inativa'}
                    </span>
                    <span className="text-xs text-gray-500">Criada há 5 dias</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(message)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleActive(message.id)}
                    className={message.isActive ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}
                  >
                    {message.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingMessage ? 'Editar Mensagem' : 'Nova Mensagem'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Mensagem
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="Digite a mensagem inspiradora..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-sm text-gray-300">
              Mensagem ativa
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function LinkManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState<any>(null);
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    icon: 'ExternalLink'
  });

  const links = [
    { id: 1, label: 'Biblioteca Digital', url: 'https://drive.google.com/biblioteca', icon: 'BookOpen' },
    { id: 2, label: 'Podcast do Clube', url: 'https://spotify.com/podcast', icon: 'Headphones' },
    { id: 3, label: 'Newsletter Semanal', url: 'https://newsletter.clubedolivro.com', icon: 'Mail' }
  ];

  const handleEdit = (link: any) => {
    setEditingLink(link);
    setFormData(link);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingLink(null);
    setFormData({
      label: '',
      url: '',
      icon: 'ExternalLink'
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Salvando link:', formData);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    console.log('Removendo link:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Links Extras</h1>
        <Button onClick={handleNew}>
          <Plus size={16} className="mr-2" />
          Novo Link
        </Button>
      </div>

      <Card>
        <div className="space-y-4">
          {links.map((link, index) => (
            <div key={link.id} className={`border-b border-gray-700 pb-4 ${index === links.length - 1 ? 'border-b-0 pb-0' : ''}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-white">{link.label}</h3>
                  <p className="text-sm text-gray-400 break-all">{link.url}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(link)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDelete(link.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingLink ? 'Editar Link' : 'Novo Link'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Label
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({...formData, label: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="Nome do link"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="https://exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Ícone
            </label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            >
              <option value="ExternalLink">Link Externo</option>
              <option value="BookOpen">Livro</option>
              <option value="Headphones">Fones de Ouvido</option>
              <option value="Mail">Email</option>
              <option value="Youtube">YouTube</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}