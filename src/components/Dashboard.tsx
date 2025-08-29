function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Boa noite';
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function WelcomeBanner() {
  const greeting = getGreeting();
  return (
    <div
      className="
        rounded-2xl border shadow-sm p-6 sm:p-7 mb-8
        bg-gradient-to-r from-emerald-100 via-emerald-50 to-teal-100
        text-emerald-900 border-emerald-200
        dark:bg-zinc-800/60 dark:text-zinc-100 dark:border-zinc-700
      "
    >
      <h2 className="text-xl sm:text-2xl font-bold">
        {greeting}, bem-vindo ao Clube do Livro 👋
      </h2>
      <p className="mt-1 text-sm sm:text-base text-emerald-800/80 dark:text-zinc-300">
        Explore os acessos rápidos abaixo.
      </p>
    </div>
  );
}
