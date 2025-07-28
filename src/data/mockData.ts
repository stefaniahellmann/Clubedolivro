import { DailySummary, Book, Partner, DailyMessage, ExtraLink } from '../types';

export const dailyMessages: DailyMessage[] = [
  { id: '1', message: 'Bom dia! Que a leitura de hoje traga novas descobertas para sua vida! 📚', isActive: true },
  { id: '2', message: 'Cada página lida é um passo em direção ao conhecimento. Continue sua jornada! ✨', isActive: true },
  { id: '3', message: 'A leitura é uma conversa com as mentes mais brilhantes da história. Aproveite! 🌟', isActive: true },
  { id: '4', message: 'Um livro é um sonho que você segura nas mãos. Que sonho você está vivendo hoje? 💭', isActive: true },
  { id: '5', message: 'Leia não apenas com os olhos, mas com o coração. Boa leitura! ❤️', isActive: true }
];

export const dailySummaries: DailySummary[] = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  day: i + 1,
  title: `Reflexão do Dia ${i + 1}`,
  content: `Este é o resumo e reflexão do dia ${i + 1}. Aqui exploramos conceitos importantes sobre leitura, desenvolvimento pessoal e como os livros podem transformar nossa perspectiva de vida. Cada dia traz uma nova oportunidade de aprendizado e crescimento através da literatura.`,
  image: `https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg`,
  audioUrl: `https://example.com/audio/day${i + 1}.mp3`
}));

export const books: Book[] = [
  {
    id: '1',
    title: 'O Poder do Hábito',
    author: 'Charles Duhigg',
    cover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    miniSummary: 'Descubra como os hábitos funcionam e como mudá-los para transformar sua vida.',
    fullSummary: 'Charles Duhigg apresenta pesquisas fascinantes sobre como os hábitos se formam, como funcionam e como podem ser transformados. O livro explora o ciclo do hábito e oferece estratégias práticas para criar mudanças positivas duradouras.',
    quotes: [
      'Os hábitos não são o destino. Os hábitos podem ser ignorados, mudados ou substituídos.',
      'Pequenas vitórias são exatamente o que parecem: sucessos menores que podem ser aplicados independentemente.'
    ],
    purchaseLink: 'https://amazon.com.br',
    downloadLink: 'https://drive.google.com'
  },
  {
    id: '2',
    title: 'Mindset: A Nova Psicologia do Sucesso',
    author: 'Carol S. Dweck',
    cover: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg',
    miniSummary: 'Como nossa mentalidade determina nosso sucesso e como podemos mudá-la.',
    fullSummary: 'Carol Dweck revela como nossa mentalidade sobre nossas habilidades afeta profundamente nosso sucesso. Ela mostra como cultivar uma mentalidade de crescimento pode transformar nossa vida pessoal e profissional.',
    quotes: [
      'Em uma mentalidade de crescimento, os desafios são emocionantes, não ameaçadores.',
      'O fracasso é informação - nós rotulamos isso como fracasso, mas é mais como: Isso não funcionou, sou um solucionador de problemas.'
    ],
    purchaseLink: 'https://amazon.com.br',
    downloadLink: 'https://drive.google.com'
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.pexels.com/photos/1261180/pexels-photo-1261180.jpeg',
    miniSummary: 'Um guia prático para formar bons hábitos e quebrar os ruins.',
    fullSummary: 'James Clear apresenta estratégias comprovadas para formar bons hábitos, quebrar os ruins e dominar os pequenos comportamentos que levam a resultados extraordinários.',
    quotes: [
      'Você não se eleva ao nível de seus objetivos. Você cai ao nível de seus sistemas.',
      'Os hábitos são os juros compostos da melhoria pessoal.'
    ],
    purchaseLink: 'https://amazon.com.br',
    downloadLink: 'https://drive.google.com'
  },
  {
    id: '4',
    title: 'O Homem Mais Rico da Babilônia',
    author: 'George S. Clason',
    cover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    miniSummary: 'Lições atemporais sobre prosperidade e riqueza através de parábolas antigas.',
    fullSummary: 'George Clason apresenta princípios fundamentais de prosperidade através de histórias da antiga Babilônia. O livro ensina lições práticas sobre como construir riqueza, economizar dinheiro e investir sabiamente.',
    quotes: [
      'Uma parte de tudo que você ganha é sua para manter.',
      'Controle seus gastos e não gaste mais do que é necessário para viver.'
    ],
    purchaseLink: 'https://amazon.com.br',
    downloadLink: 'https://drive.google.com'
  },
  {
    id: '5',
    title: 'Como Fazer Amigos e Influenciar Pessoas',
    author: 'Dale Carnegie',
    cover: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg',
    miniSummary: 'O clássico sobre relacionamentos interpessoais e comunicação eficaz.',
    fullSummary: 'Dale Carnegie oferece técnicas práticas para melhorar relacionamentos, comunicar-se efetivamente e influenciar pessoas de forma positiva. Um guia essencial para o sucesso pessoal e profissional.',
    quotes: [
      'Você pode fazer mais amigos em dois meses se interessando genuinamente pelas outras pessoas.',
      'O nome de uma pessoa é, para ela, o som mais doce e importante em qualquer idioma.'
    ],
    purchaseLink: 'https://amazon.com.br',
    downloadLink: 'https://drive.google.com'
  }
];

export const partners: Partner[] = [
  {
    id: '1',
    name: 'Ana Costa',
    photo: 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg',
    bio: 'Escritora e crítica literária com mais de 15 anos de experiência. Especialista em literatura contemporânea.',
    whatsapp: '11999999999',
    instagram: '@anacosta.livros',
    otherLink: 'https://anacosta.com.br',
    otherLinkLabel: 'Site'
  },
  {
    id: '2',
    name: 'Pedro Martins',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    bio: 'Livreiro e curador de conteúdo. Apaixonado por descobrir novos talentos e grandes clássicos da literatura.',
    whatsapp: '11888888888',
    instagram: '@pedro.livros',
    otherLink: 'https://tiktok.com/@pedrolivros',
    otherLinkLabel: 'TikTok'
  },
  {
    id: '3',
    name: 'Carla Santos',
    photo: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg',
    bio: 'Bibliotecária e consultora em leitura. Dedica sua vida a conectar pessoas com os livros certos.',
    whatsapp: '11777777777',
    instagram: '@carla.biblioteca',
    otherLink: 'https://carlasantos.com.br',
    otherLinkLabel: 'Blog'
  }
];

export const extraLinks: ExtraLink[] = [
  {
    id: '1',
    label: 'Biblioteca Digital',
    url: 'https://drive.google.com/biblioteca',
    icon: 'BookOpen'
  },
  {
    id: '2',
    label: 'Podcast do Clube',
    url: 'https://spotify.com/podcast',
    icon: 'Headphones'
  },
  {
    id: '3',
    label: 'Newsletter Semanal',
    url: 'https://newsletter.clubedolivro.com',
    icon: 'Mail'
  },
  {
    id: '4',
    label: 'Canal no YouTube',
    url: 'https://youtube.com/clubedolivro',
    icon: 'Youtube'
  }
];

export const freeMaterials: FreeMaterial[] = [
  {
    id: '1',
    title: 'Guia de Leitura Eficiente',
    description: 'Técnicas comprovadas para ler mais e melhor',
    downloadUrl: 'https://drive.google.com/file/d/1/download',
    fileSize: '2.5 MB',
    category: 'Produtividade'
  },
  {
    id: '2',
    title: 'Lista de 100 Livros Essenciais',
    description: 'Curadoria especial dos melhores livros de todos os tempos',
    downloadUrl: 'https://drive.google.com/file/d/2/download',
    fileSize: '1.8 MB',
    category: 'Listas'
  },
  {
    id: '3',
    title: 'Como Criar um Clube de Leitura',
    description: 'Passo a passo para formar seu próprio grupo',
    downloadUrl: 'https://drive.google.com/file/d/3/download',
    fileSize: '3.2 MB',
    category: 'Guias'
  },
  {
    id: '4',
    title: 'Planilha de Controle de Leituras',
    description: 'Organize suas leituras e metas anuais',
    downloadUrl: 'https://drive.google.com/file/d/4/download',
    fileSize: '0.8 MB',
    category: 'Ferramentas'
  },
  {
    id: '5',
    title: 'Resumo: Os 7 Hábitos',
    description: 'Resumo completo do clássico de Stephen Covey',
    downloadUrl: 'https://drive.google.com/file/d/5/download',
    fileSize: '1.5 MB',
    category: 'Resumos'
  }
];