export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
  expirationDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface DailySummary {
  id: string;
  day: number;
  title: string;
  content: string;
  image?: string;
  audioUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  miniSummary: string;
  fullSummary: string;
  quotes: string[];
  purchaseLink?: string;
  downloadLink?: string;
}

export interface Partner {
  id: string;
  name: string;
  photo: string;
  bio: string;
  whatsapp?: string;
  instagram?: string;
  otherLink?: string;
  otherLinkLabel?: string;
}

export interface DailyMessage {
  id: string;
  message: string;
  isActive: boolean;
}

export interface ExtraLink {
  id: string;
  label: string;
  url: string;
  icon?: string;
}

export interface FreeMaterial {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  fileSize: string;
  category: string;
}

export interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (cpf: string) => Promise<boolean>;
  adminLogin: (password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
}