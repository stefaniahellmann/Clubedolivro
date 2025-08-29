import React, { useRef, useState } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Camera, User } from 'lucide-react';

function ProfileInner() {
  const { profile, setProfile } = useConfig();
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState(profile.displayName || user?.firstName || '');
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl || '');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPhotoUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSave = () => setProfile({ displayName: displayName.trim(), photoUrl });
  const handleReset = () => {
    setDisplayName(user?.firstName || '');
    setPhotoUrl('');
    setProfile({ displayName: user?.firstName || '', photoUrl: '' });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Seu Perfil</h2>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                />
              ) : (
                <div className="w-28 h-28 rounded-full grid place-items-center bg-emerald-50 text-emerald-700
                                dark:bg-emerald-500/10 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/40">
                  <User className="w-10 h-10" />
                </div>
              )}

              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow"
                title="Trocar foto"
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              />
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Apelido (como você quer aparecer)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg transition
                           bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                placeholder="Ex.: João, J.Silva, @joao"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                URL da foto (opcional)
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg transition
                           bg-white border border-zinc-200 text-zinc-900
                           focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                           dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                placeholder="Cole um link de imagem…"
              />
              <p className="mt-1 text-xs text-zinc-500">
                Dica: você também pode enviar um arquivo clicando no botão de câmera do avatar.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave}>Salvar</Button>
              <Button variant="ghost" onClick={handleReset}>Resetar</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

/** Export nomeado e default (funcionam os dois tipos de import) */
export function Profile() {
  return <ProfileInner />;
}
export default Profile;
