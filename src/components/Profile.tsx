// src/components/Profile.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.firstName ?? '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '');

  const handleSave = () => {
    updateUser({
      firstName: name || user?.firstName || '',
      avatarUrl: avatarUrl || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Meu perfil</h1>
      <Card className="p-4 space-y-4">
        <div>
          <label className="block text-sm mb-1">Apelido / Nome</label>
          <input
            className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">URL do avatar (opcional)</label>
          <input
            className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <Button onClick={handleSave}>Salvar</Button>
      </Card>
    </div>
  );
}
