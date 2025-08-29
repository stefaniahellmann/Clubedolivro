import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Camera, Trash2, Save, User, Sparkles } from 'lucide-react';

type UserProfile = {
  nickname: string;
  photoDataUrl: string | null;
};

const LS_KEY = 'clube:userProfile';

function readProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as UserProfile;
  } catch {}
  return { nickname: '', photoDataUrl: null };
}

function writeProfile(profile: UserProfile) {
  localStorage.setItem(LS_KEY, JSON.stringify(profile));
  // avisa o app (caso queira reagir em outros lugares)
  window.dispatchEvent(new CustomEvent('profile:updated', { detail: profile }));
}

export function UserSettings() {
  const { user } = useAuth();
  const baseName = useMemo(() => (user ? user.firstName : 'Leitor(a)'), [user]);

  const [nickname, setNickname] = useState<string>('');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const p = readProfile();
    setNickname(p.nickname || '');
    setPhotoDataUrl(p.photoDataUrl || null);
  }, []);

  const handleFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSave = () => {
    setSaving(true);
    writeProfile({ nickname, photoDataUrl });
    setTimeout(() => setSaving(false), 500);
  };

  const onRemovePhoto = () => setPhotoDataUrl(null);

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center justify-center gap-2">
          <Sparkles className="text-amber-600 dark:text-amber-400" />
          Configurações do Perfil
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Personalize como você aparece no Clube.
        </p>
      </header>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                {photoDataUrl ? (
                  <img
                    src={photoDataUrl}
                    className="w-full h-full object-cover"
                    alt="Foto de perfil"
                  />
                ) : (
                  <User className="w-16 h-16 text-zinc-400" />
                )}
              </div>
              <label
                htmlFor="photo"
                className="absolute -bottom-2 right-2 inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full
                           bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-pointer
                           hover:bg-emerald-100
                           dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-700/40"
                title="Trocar foto"
              >
                <Camera size={16} />
                Trocar
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </label>
            </div>

            {photoDataUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemovePhoto}
                className="text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
              >
                <Trash2 size={16} className="mr-1" />
                Remover foto
              </Button>
            )}
          </div>

          {/* Dados */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Apelido (como será exibido)
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={baseName}
                maxLength={32}
                className="w-full px-3 py-2 rounded-lg transition
                           bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
              <p className="text-xs text-zinc-500 mt-1">
                Dica: curto e único. Máx. 32 caracteres.
              </p>
            </div>

            <div className="pt-2">
              <Button onClick={onSave} disabled={saving}>
                <Save size={16} className="mr-2" />
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
