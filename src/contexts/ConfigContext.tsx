{/* Banner — CLARO: verde pastel / ESCURO: laranja→verde com bom contraste */}
<div
  className="
    rounded-2xl border shadow-sm p-6 sm:p-7
    bg-gradient-to-r from-emerald-100 via-emerald-50 to-teal-100
    text-emerald-900 border-emerald-200
    dark:bg-gradient-to-r dark:from-amber-600/20 dark:via-emerald-600/15 dark:to-emerald-700/20
    dark:text-zinc-50 dark:border-emerald-700/40
  "
  role="region"
  aria-label="Boas-vindas"
>
  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
    {/* Ícone do livro com “degradê” no contêiner */}
    <div className="
      p-2.5 rounded-xl shadow-sm
      bg-gradient-to-r from-amber-400 to-emerald-400
      ring-1 ring-white/40 dark:ring-black/20
    ">
      <BookOpen className="h-6 w-6 text-white" />
    </div>

    <div>
      <h2 className="text-xl sm:text-2xl font-bold">
        {greeting}, bem-vindo ao Clube do Livro 👋
      </h2>
      <p className="mt-1 text-sm sm:text-base text-emerald-800/80 dark:text-zinc-200">
        Explore os acessos rápidos abaixo.
      </p>
    </div>
  </div>
</div>