import { useLinks } from '../contexts/LinksContext';
import { Save, Edit, Trash2, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';

/* ... outras partes do AdminPanel acima ... */

function LinkManagement() {
  const { links, updateLink } = useLinks();
  const [showModal, setShowModal] = useState(false);
  const [editingKey, setEditingKey] = useState<keyof typeof links | null>(null);
  const [temp, setTemp] = useState('');

  const list = [
    { key: 'drive', label: 'Drive de Materiais', value: links.drive },
    { key: 'whatsapp', label: 'Clube WhatsApp', value: links.whatsapp },
    { key: 'telegram', label: 'Clube Telegram', value: links.telegram },
    { key: 'shareUrl', label: 'URL para Compartilhar', value: links.shareUrl },
  ] as const;

  const openEdit = (key: keyof typeof links, current: string) => {
    setEditingKey(key);
    setTemp(current);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingKey) updateLink(editingKey, temp.trim());
    setShowModal(false);
    setEditingKey(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Links Extras</h1>
        <div className="text-sm subtle">Edite os links usados no Início</div>
      </div>

      <Card>
        <div className="space-y-4">
          {list.map((item, index) => (
            <div
              key={item.key}
              className={`border-b border-zinc-200 dark:border-zinc-800 pb-4 ${
                index === list.length - 1 ? 'border-b-0 pb-0' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-white">{item.label}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 break-all">{item.value}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(item.key, item.value)}
                    className="text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10"
                  >
                    <Edit size={14} />
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
        title={editingKey ? `Editar: ${list.find(l => l.key === editingKey)?.label}` : 'Editar Link'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              URL
            </label>
            <input
              type="url"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="w-full px-3 py-2 rounded-lg transition
                         bg-white border border-zinc-200 text-zinc-900
                         focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                         dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              placeholder="https://exemplo.com"
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

/* ... resto do AdminPanel abaixo ... */
