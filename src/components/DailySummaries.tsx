import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';
import { Calendar, BookOpen, Headphones, Sparkles, Star, Lock } from 'lucide-react';
import { DailySummary } from '../types';

const dailySummaries: DailySummary[] = [
  {
    id: '1',
    day: 1,
    title: 'O Poder do Hábito',
    content: 'Descubra como pequenos hábitos moldam sua vida e como substituí-los por padrões positivos pode transformar sua produtividade.',
    image: 'https://images.pexels.com/photos/1550643/pexels-photo-1550643.jpeg',
    audioUrl: ''
  },
  {
    id: '2',
    day: 2,
    title: 'Essencialismo',
    content: 'Menos é mais: aprenda a eliminar o que não é essencial e foque no que realmente importa.',
    image: 'https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg',
    audioUrl: ''
  },
  {
    id: '3',
    day: 3,
    title: 'A Única Coisa',
    content: 'Descubra o poder de focar em uma única prioridade por vez para obter resultados extraordinários.',
    image: 'https://images.pexels.com/photos/1850021/pexels-photo-1850021.jpeg',
    audioUrl: ''
  },
  {
    id: '4',
    day: 4,
    title: 'Milagre da Manhã',
    content: 'Uma rotina matinal poderosa pode redefinir sua energia, foco e clareza mental.',
    image: 'https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg',
    audioUrl: ''
  },
  {
    id: '5',
    day: 5,
    title: 'Mindset',
    content: 'A mentalidade de crescimento pode mudar completamente sua abordagem frente a desafios e aprendizados.',
    image: 'https://images.pexels.com/photos/2409022/pexels-photo-2409022.jpeg',
    audioUrl: ''
  },
  {
    id: '6',
    day: 6,
    title: 'Trabalhe 4 Horas por Semana',
    content: 'Redefina o conceito de trabalho e produtividade com estratégias práticas para otimizar seu tempo.',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
    audioUrl: ''
  },
  {
    id: '7',
    day: 7,
    title: 'Faça Tempo',
    content: 'Crie tempo para o que importa com pequenas mudanças no dia a dia.',
    image: 'https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg',
    audioUrl: ''
  },
  {
    id: '8',
    day: 8,
    title: 'A Coragem de Ser Imperfeito',
    content: 'Vulnerabilidade como chave para conexões humanas e desenvolvimento pessoal.',
    image: 'https://images.pexels.com/photos/33972/pexels-photo.jpg',
    audioUrl: ''
  },
  {
    id: '9',
    day: 9,
    title: 'Rápido e Devagar',
    content: 'Conheça os dois sistemas que guiam sua tomada de decisão.',
    image: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
    audioUrl: ''
  },
  {
    id: '10',
    day: 10,
    title: 'Quem Pensa Enriquece',
    content: 'Pensamentos e ações moldam sua trajetória rumo ao sucesso.',
    image: 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg',
    audioUrl: ''
  },
  {
    id: '11',
    day: 11,
    title: 'Os Segredos da Mente Milionária',
    content: 'Alinhe sua mentalidade com comportamentos financeiros positivos.',
    image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg',
    audioUrl: ''
  },
  {
    id: '12',
    day: 12,
    title: 'Roube como um Artista',
    content: 'Criatividade é combinar ideias de formas únicas e autênticas.',
    image: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
    audioUrl: ''
  },
  {
    id: '13',
    day: 13,
    title: 'A Mente Organizada',
    content: 'Simplifique seu ambiente mental e físico para maior clareza.',
    image: 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg',
    audioUrl: ''
  },
  {
    id: '14',
    day: 14,
    title: 'A Sutil Arte de Ligar o F*da-se',
    content: 'Foque no que realmente tem valor em vez de tentar agradar a todos.',
    image: 'https://images.pexels.com/photos/1005768/pexels-photo-1005768.jpeg',
    audioUrl: ''
  },
  {
    id: '15',
    day: 15,
    title: 'Desperte Seu Gigante Interior',
    content: 'Use seu poder pessoal para alcançar mudanças extraordinárias.',
    image: 'https://images.pexels.com/photos/134050/pexels-photo-134050.jpeg',
    audioUrl: ''
  },
  {
    id: '16',
    day: 16,
    title: 'Nunca Almoce Sozinho',
    content: 'Conexões verdadeiras impulsionam oportunidades e crescimento.',
    image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg',
    audioUrl: ''
  },
  {
    id: '17',
    day: 17,
    title: 'O Jeito Harvard de Ser Feliz',
    content: 'A felicidade não é o destino, é o caminho.',
    image: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg',
    audioUrl: ''
  },
  {
    id: '18',
    day: 18,
    title: 'Arrume Sua Cama',
    content: 'A disciplina começa pelas pequenas ações do dia a dia.',
    image: 'https://images.pexels.com/photos/545012/pexels-photo-545012.jpeg',
    audioUrl: ''
  },
  {
    id: '19',
    day: 19,
    title: 'A Regra dos 5 Segundos',
    content: 'Vença a procrastinação com uma contagem simples e poderosa.',
    image: 'https://images.pexels.com/photos/1441151/pexels-photo-1441151.jpeg',
    audioUrl: ''
  },
  {
    id: '20',
    day: 20,
    title: 'Trabalhe Como um Monge',
    content: 'Disciplina, silêncio e foco como ferramentas para alta performance.',
    image: 'https://images.pexels.com/photos/1567069/pexels-photo-1567069.jpeg',
    audioUrl: ''
  },
  {
    id: '21',
    day: 21,
    title: 'Os 7 Hábitos das Pessoas Altamente Eficazes',
    content: 'Transforme suas atitudes com práticas comprovadas de eficácia pessoal.',
    image: 'https://images.pexels.com/photos/132340/pexels-photo-132340.jpeg',
    audioUrl: ''
  },
  {
    id: '22',
    day: 22,
    title: 'Cérebro com Foco e Disciplina',
    content: 'Neurociência aplicada à produtividade e autocontrole.',
    image: 'https://images.pexels.com/photos/452738/pexels-photo-452738.jpeg',
    audioUrl: ''
  },
  {
    id: '23',
    day: 23,
    title: 'Gatilhos Mentais',
    content: 'Use os gatilhos a seu favor na comunicação e decisões.',
    image: 'https://images.pexels.com/photos/1820082/pexels-photo-1820082.jpeg',
    audioUrl: ''
  },
  {
    id: '24',
    day: 24,
    title: 'Antifrágil',
    content: 'Seja alguém que cresce e evolui com os desafios.',
    image: 'https://images.pexels.com/photos/27411/pexels-photo.jpg',
    audioUrl: ''
  },
  {
    id: '25',
    day: 25,
    title: 'O Ego é Seu Inimigo',
    content: 'Humildade, foco e propósito são chaves para o sucesso duradouro.',
    image: 'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg',
    audioUrl: ''
  },
  {
    id: '26',
    day: 26,
    title: '12 Regras para a Vida',
    content: 'Responsabilidade pessoal e clareza para uma vida com propósito.',
    image: 'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg',
    audioUrl: ''
  },
  {
    id: '27',
    day: 27,
    title: 'A Mágica da Arrumação',
    content: 'Organização externa ajuda a liberar espaço mental e emocional.',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    audioUrl: ''
  },
  {
    id: '28',
    day: 28,
    title: 'A Coragem de Não Agradar',
    content: 'Autenticidade e liberdade ao viver conforme seus valores.',
    image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
    audioUrl: ''
  },
  {
    id: '29',
    day: 29,
    title: 'O Homem Mais Rico da Babilônia',
    content: 'Sabedoria financeira milenar ainda válida hoje.',
    image: 'https://images.pexels.com/photos/315320/pexels-photo-315320.jpeg',
    audioUrl: ''
  },
  {
    id: '30',
    day: 30,
    title: 'O Milagre da Gratidão',
    content: 'Praticar gratidão muda sua visão da vida e atrai abundância.',
    image: 'https://images.pexels.com/photos/556414/pexels-photo-556414.jpeg',
    audioUrl: ''
  }
];

export default dailySummaries;
