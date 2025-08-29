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
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Drive de Materiais</h3>
            <Input
              label="URL"
              type="url"
              value={local.drive}
              onChange={(v) => setLocal({ ...local, drive: v })}
              placeholder="https://..."
            />
            <p className="text-sm text-zinc-500 mt-1">Acesse +1k volumes</p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Clube Whats</h3>
            <Input
              label="URL"
              type="url"
              value={local.whatsapp}
              onChange={(v) => setLocal({ ...local, whatsapp: v })}
              placeholder="https://wa.me/..."
            />
            <p className="text-sm text-zinc-500 mt-1">Acesse o grupo de WhatsApp</p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Clube Telegram</h3>
            <Input
              label="URL"
              type="url"
              value={local.telegram}
              onChange={(v) => setLocal({ ...local, telegram: v })}
              placeholder="https://t.me/..."
            />
            <p className="text-sm text-zinc-500 mt-1">Acesse o grupo Telegram</p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Indique Amigos</h3>
            <Input
              label="URL"
              type="url"
              value={local.refer}
              onChange={(v) => setLocal({ ...local, refer: v })}
              placeholder="https://..."
            />
            <p className="text-sm text-zinc-500 mt-1">Compartilhe o clube com seus amigos</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Regras do Clube</h3>
            <Input
              label="URL"
              type="url"
              value={local.rules}
              onChange={(v) => setLocal({ ...local, rules: v })}
              placeholder="https://..."
            />
            <p className="text-sm text-zinc-500 mt-1">Leia com atenção as regras</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
