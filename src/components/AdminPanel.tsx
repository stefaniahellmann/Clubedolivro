// src/components/AdminPanel.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLinks } from '../contexts/LinksContext';
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
  EyeOff,
} from 'lucide-react';

type AdminSection =
  | 'dashboard'
  | 'users'
  | 'summaries'
  | 'books'
  | 'partners'
  | 'messages'
  | 'links';

/* ================== EXPORTAÇÃO NOMEADA ================== */
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
    { id: 'links' as AdminSection, label: 'Links Extras', icon: Settings },
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
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <aside
        className="
          w-64 border-r
          bg-white/90 dark:bg-zinc-900/80
          border-zinc-200 dark:border-zinc-800
          backdrop-blur-sm
        "
      >
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Painel Admin
            </h2>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
              title="Sair"
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={[
                  'w-full flex items-center gap-3 px-6 py-3 text-left transition',
                  active
                    ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-400 ' +
                      'dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-600'
                    : 'text-zinc-700 hover:bg-zinc-100 ' +
                      'dark:text-zinc-300 dark:hover:bg-zinc-800',
                ].join(' ')}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 sm:p-8">{renderContent()}</div>
      </main>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Dashboard Administrativo
        </h1>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10">
            <Users className="h-8 w-8 text-blue-700 dark:text-blue-300" />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">2</h3>
            <p className="text-blue-700 dark:text-blue-300">Usuários Ativos</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
            <Calendar className="h-8 w-8 text-emerald-700 dark:text-emerald-300" />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">30</h3>
            <p className="text-emerald-700 dark:text-emerald-300">Resumos Criados</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-500/10">
            <BookOpen className="h-8 w-8 text-purple-700 dark:text-purple-300" />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">3</h3>
            <p className="text-purple-700 dark:text-purple-300">Livros Cadastrados</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10">
            <UserPlus className="h-8 w-8 text-amber-700 dark:text-amber-300" />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">3</h3>
            <p className="text-amber-700 dark:text-amber-300">Parceiros</p>
          </div>
        </Card>
      </div>

      {/* Duas colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="mr-2" />
            Atividades Recentes
          </h3>
          <div className="space-y-4">
            {[
              { dot: 'bg-emerald-500', text: 'Novo usuário cadastrado: Maria Santos', when: 'Há 2 horas' },
              { dot: 'bg-blue-500', text: 'Resumo do Dia 15 atualizado', when: 'Há 1 dia' },
              { dot: 'bg-purple-500', text: 'Novo livro adicionado: Atomic Habits', when: 'Há 2 dias' },
            ].map((it, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/60">
                <div className={`w-3 h-3 rounded-full ${it.dot} animate-pulse`} />
                <div className="flex-1">
                  <span className="text-zinc-800 dark:text-zinc-200">{it.text}</span>
                  <div className="text-xs text-zinc-500">{it.when}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Estatísticas do Mês
          </h3>
          <div className="space-y-4">
            {[
              ['Novos usuários', '+2', 'text-emerald-700 dark:text-emerald-300'],
              ['Resumos acessados', '156', 'text-blue-700 dark:text-blue-300'],
              ['Livros visualizados', '89', 'text-purple-700 dark:text-purple-300'],
              ['Taxa de engajamento', '87%', 'text-amber-700 dark:text-amber-300'],
            ].map(([label, value, tone]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
                <span className={`font-bold ${tone as string}`}>{value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- USERS ---------------- */

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
    isActive: true,
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
      isActive: true,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Salvando usuário:', formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Gerenciar Usuários</h1>
        <Button onClick={handleNew} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Novo Usuário</span>
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
            <thead className="bg-zinc-100 dark:bg-zinc-800/60">
              <tr>
                {['Nome', 'Email', 'CPF', 'Expira em', 'Status', 'Ações'].map((th) => (
                  <th
                    key={th}
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-600 dark:text-zinc-300 uppercase tracking-wider"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
              {[
                {
                  firstName: 'João',
                  lastName: 'Silva',
                  email: 'joao@email.com',
                  phone: '11999999999',
                  cpf: '123.456.789-01',
                  expirationDate: '2024-12-31',
                  isActive: true,
                },
                {
                  firstName: 'Maria',
                  lastName: 'Santos',
                  email: 'maria@email.com',
                  phone: '11888888888',
                  cpf: '987.654.321-09',
                  expirationDate: '2024-11-30',
                  isActive: true,
                },
              ].map((u) => (
                <tr key={u.cpf} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-zinc-900 dark:text-white">
                      {u.firstName} {u.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">{u.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">{u.cpf}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">
                      {new Date(u.expirationDate).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                     bg-emerald-50 text-emerald-700 border border-emerald-200
                                     dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-700/40">
                      {u.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(u)}
                      className="text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10"
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
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
            <Input label="Primeiro Nome" value={formData.firstName} onChange={(v) => setFormData({ ...formData, firstName: v })} />
            <Input label="Sobrenome" value={formData.lastName} onChange={(v) => setFormData({ ...formData, lastName: v })} />
          </div>

          <Input label="Email" type="email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Telefone" value={formData.phone} onChange={(v) => setFormData({ ...formData, phone: v })} />
            <Input label="CPF" value={formData.cpf} onChange={(v) => setFormData({ ...formData, cpf: v })} />
          </div>

          <Input
            label="Data de Expiração"
            type="date"
            value={formData.expirationDate}
            onChange={(v) => setFormData({ ...formData, expirationDate: v })}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 accent-emerald-600"
            />
            <label htmlFor="isActive" className="text-sm text-zinc-700 dark:text-zinc-300">
              Usuário ativo
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
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

/* ---------------- SUMMARIES ---------------- */

function SummaryManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingSummary, setEditingSummary] = useState<any>(null);
  const [formData, setFormData] = useState({
    day: '',
    title: '',
    content: '',
    image: '',
    audioUrl: '',
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
      audioUrl: '',
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
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Resumos Diários</h1>
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
                <h3 className="font-semibold text-zinc-900 dark:text-white">Dia {i + 1}</h3>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleEdit({
                        day: i + 1,
                        title: `Reflexão do Dia ${i + 1}`,
                        content: `Este é o resumo e reflexão do dia ${i + 1}...`,
                        image: '',
                        audioUrl: '',
                      })
                    }
                    className="text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
                Reflexão do dia {i + 1} sobre leitura e desenvolvimento pessoal...
              </p>
              <div className="flex items-center text-xs text-zinc-500">
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
            <Input
              label="Dia"
              type="number"
              min={1}
              max={31}
              value={formData.day}
              onChange={(v) => setFormData({ ...formData, day: v })}
            />
            <Input
              label="Título"
              value={formData.title}
              onChange={(v) => setFormData({ ...formData, title: v })}
            />
          </div>

          <Textarea
            label="Conteúdo"
            rows={6}
            value={formData.content}
            onChange={(v) => setFormData({ ...formData, content: v })}
          />

          <Input
            label="URL da Imagem (opcional)"
            type="url"
            value={formData.image}
            onChange={(v) => setFormData({ ...formData, image: v })}
          />

          <Input
            label="URL do Áudio (opcional)"
            type="url"
            value={formData.audioUrl}
            onChange={(v) => setFormData({ ...formData, audioUrl: v })}
          />

          <div className="flex justify-end gap-2 pt-2">
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

/* ---------------- BOOKS ---------------- */

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
    downloadLink: '',
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
      downloadLink: '',
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Salvando livro:', formData);
    setShowModal(false);
  };

  const addQuote = () => setFormData({ ...formData, quotes: [...formData.quotes, ''] });
  const removeQuote = (i: number) =>
    setFormData({ ...formData, quotes: formData.quotes.filter((_, idx) => idx !== i) });
  const updateQuote = (i: number, v: string) => {
    const q = [...formData.quotes];
    q[i] = v;
    setFormData({ ...formData, quotes: q });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Gerenciar Livros</h1>
        <Button onClick={handleNew}>
          <Plus size={16} className="mr-2" />
          Novo Livro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'O Poder do Hábito', author: 'Charles Duhigg' },
          { title: 'Mindset', author: 'Carol S. Dweck' },
          { title: 'Atomic Habits', author: 'James Clear' },
        ].map((book, index) => (
          <Card key={index} hover className="group">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{book.title}</h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">{book.author}</p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleEdit({
                        title: book.title,
                        author: book.author,
                        cover: '',
                        miniSummary: 'Resumo do livro...',
                        fullSummary: 'Resumo completo...',
                        quotes: ['Frase marcante...'],
                        purchaseLink: '',
                        downloadLink: '',
                      })
                    }
                    className="text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
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
            <Input label="Título" value={formData.title} onChange={(v) => setFormData({ ...formData, title: v })} />
            <Input label="Autor" value={formData.author} onChange={(v) => setFormData({ ...formData, author: v })} />
          </div>

          <Input label="URL da Capa" type="url" value={formData.cover} onChange={(v) => setFormData({ ...formData, cover: v })} />

          <Textarea
            label="Mini Resumo"
            rows={2}
            value={formData.miniSummary}
            onChange={(v) => setFormData({ ...formData, miniSummary: v })}
          />

          <Textarea
            label="Resumo Completo"
            rows={4}
            value={formData.fullSummary}
            onChange={(v) => setFormData({ ...formData, fullSummary: v })}
          />

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Frases Marcantes
              </label>
              <Button variant="ghost" size="sm" onClick={addQuote}>
                <Plus size={14} />
              </Button>
            </div>
            {formData.quotes.map((quote, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  label=""
                  value={quote}
                  onChange={(v) => updateQuote(index, v)}
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
            <Input
              label="Link de Compra"
              type="url"
              value={formData.purchaseLink}
              onChange={(v) => setFormData({ ...formData, purchaseLink: v })}
            />
            <Input
              label="Link de Download"
              type="url"
              value={formData.downloadLink}
              onChange={(v) => setFormData({ ...formData, downloadLink: v })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
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

/* ---------------- PARTNERS ---------------- */

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
    otherLinkLabel: '',
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
      otherLinkLabel: '',
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
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Gerenciar Parceiros</h1>
        <Button onClick={handleNew}>
          <Plus size={16} className="mr-2" />
          Novo Parceiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Ana Costa', bio: 'Escritora e crítica literária com mais de 15 anos...' },
          { name: 'Pedro Martins', bio: 'Livreiro e curador de conteúdo. Apaixonado por...' },
          { name: 'Carla Santos', bio: 'Bibliotecária e consultora em leitura...' },
        ].map((partner, index) => (
          <Card key={index} hover className="group">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-zinc-900 dark:text-white">{partner.name}</h3>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleEdit({
                        name: partner.name,
                        photo: '',
                        bio: partner.bio,
                        whatsapp: '11999999999',
                        instagram: '@usuario',
                        otherLink: '',
                        otherLinkLabel: '',
                      })
                    }
                    className="text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">{partner.bio}</p>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="w-2 h-2 rounded-full bg-pink-500" />
                <div className="w-2 h-2 rounded-full bg-blue-500" />
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
          <Input label="Nome" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
          <Input label="URL da Foto" type="url" value={formData.photo} onChange={(v) => setFormData({ ...formData, photo: v })} />
          <Textarea
            label="Bio (até 200 caracteres)"
            rows={3}
            value={formData.bio}
            onChange={(v) => setFormData({ ...formData, bio: v })}
            maxLength={200}
          />
          <div className="text-xs text-zinc-500">{formData.bio.length}/200 caracteres</div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="WhatsApp"
              value={formData.whatsapp}
              onChange={(v) => setFormData({ ...formData, whatsapp: v })}
              placeholder="11999999999"
            />
            <Input
              label="Instagram"
              value={formData.instagram}
              onChange={(v) => setFormData({ ...formData, instagram: v })}
              placeholder="@usuario"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Outro Link"
              type="url"
              value={formData.otherLink}
              onChange={(v) => setFormData({ ...formData, otherLink: v })}
            />
            <Input
              label="Label do Link"
              value={formData.otherLinkLabel}
              onChange={(v) => setFormData({ ...formData, otherLinkLabel: v })}
              placeholder="Site, TikTok, etc."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
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

/* ---------------- MESSAGES ---------------- */

function MessageManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState<any>(null);
  const [formData, setFormData] = useState({
    message: '',
    isActive: true,
  });

  const messages = [
    { id: 1, message: 'Bom dia! Que a leitura de hoje traga novas descobertas para sua vida! 📚', isActive: true },
    { id: 2, message: 'Cada página lida é um passo em direção ao conhecimento. Continue sua jornada! ✨', isActive: true },
    { id: 3, message: 'A leitura é uma conversa com as mentes mais brilhantes da história. Aproveite! 🌟', isActive: false },
  ];

  const handleEdit = (message: any) => {
    setEditingMessage(message);
    setFormData(message);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingMessage(null);
    setFormData({ message: '', isActive: true });
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
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Mensagens Diárias</h1>
        <Button onClick={handleNew}>
          <Plus size={16} className="mr-2" />
          Nova Mensagem
        </Button>
      </div>

      <Card>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`border-b border-zinc-200 dark:border-zinc-800 pb-4 ${
                index === messages.length - 1 ? 'border-b-0 pb-0' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-zinc-800 dark:text-zinc-200 mb-2">{message.message}</p>
                  <div className="flex items-center gap-4">
                    <span
                      className={[
                        'text-xs px-2 py-1 rounded-full border',
                        message.isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-700/40'
                          : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-700/40',
                      ].join(' ')}
                    >
                      {message.isActive ? 'Ativa' : 'Inativa'}
                    </span>
                    <span className="text-xs text-zinc-500">Criada há 5 dias</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(message)}
                    className="text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(message.id)}
                    className={
                      message.isActive
                        ? 'text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10'
                        : 'text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-500/10'
                    }
                  >
                    {message.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
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
          <Textarea
            label="Mensagem"
            rows={4}
            value={formData.message}
            onChange={(v) => setFormData({ ...formData, message: v })}
            placeholder="Digite a mensagem inspiradora..."
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 accent-emerald-600"
            />
            <label htmlFor="isActive" className="text-sm text-zinc-700 dark:text-zinc-300">
              Mensagem ativa
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
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

/* ---------------- LINKS (usa LinksContext) ---------------- */

function LinkManagement() {
  const { links, updateLink, resetLinks } = useLinks();
  const [local, setLocal] = useState({
    drive: links.drive.url,
    whatsapp: links.whatsapp.url,
    telegram: links.telegram.url,
    refer: links.refer.url,
    rules: links.rules.url,
  });

  const handleSave = () => {
    (Object.keys(local) as Array<keyof typeof local>).forEach((k) => {
      updateLink(k as any, local[k] || '');
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Acessos Rápidos (Links)</h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={resetLinks}>Restaurar padrões</Button>
          <Button onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LinkInput
            title="Drive de Materiais"
            hint="Acesse +1k volumes"
            value={local.drive}
            onChange={(v) => setLocal({ ...local, drive: v })}
          />
          <LinkInput
            title="Clube Whats"
            hint="Acesse o grupo de WhatsApp"
            value={local.whatsapp}
            onChange={(v) => setLocal({ ...local, whatsapp: v })}
          />
          <LinkInput
            title="Clube Telegram"
            hint="Acesse o grupo Telegram"
            value={local.telegram}
            onChange={(v) => setLocal({ ...local, telegram: v })}
          />
          <LinkInput
            title="Indique Amigos"
            hint="Compartilhe o clube com seus amigos"
            value={local.refer}
            onChange={(v) => setLocal({ ...local, refer: v })}
          />
          <LinkInput
            title="Regras do Clube"
            hint="Leia com atenção as regras"
            value={local.rules}
            onChange={(v) => setLocal({ ...local, rules: v })}
            wide
          />
        </div>
      </Card>
    </div>
  );
}

/* ---------------- Inputs reutilizáveis ---------------- */

function LinkInput({
  title,
  hint,
  value,
  onChange,
  wide,
}: {
  title: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  wide?: boolean;
}) {
  return (
    <div className={wide ? 'md:col-span-2' : ''}>
      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">{title}</h3>
      <Input label="URL" type="url" value={value} onChange={onChange} placeholder="https://..." />
      <p className="text-sm text-zinc-500 mt-1">{hint}</p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  maxLength,
  min,
  max,
}: {
  label: string;
  value: any;
  onChange: (v: any) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min as any}
        max={max as any}
        className="w-full px-3 py-2 rounded-lg transition
                   bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400
                   focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                   dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
  maxLength,
}: {
  label: string;
  value: any;
  onChange: (v: any) => void;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-3 py-2 rounded-lg transition
                   bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400
                   focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                   dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
      />
    </div>
  );
}
