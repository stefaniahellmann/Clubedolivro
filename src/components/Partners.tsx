import React from 'react';
import { Card } from './ui/Card';
import { MessageCircle, Instagram, ExternalLink, Sparkles, Star } from 'lucide-react';
import { partners } from '../data/mockData';

export function Partners() {
  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/55${phone.replace(/\D/g, '')}`, '_blank');
  };

  const handleInstagram = (username: string) => {
    window.open(`https://instagram.com/${username.replace('@', '')}`, '_blank');
  };

  const handleOtherLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-600 dark:text-amber-400" />
          Nossos Parceiros
          <Sparkles className="ml-3 text-amber-600 dark:text-amber-400" />
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Conheça os especialistas que fazem parte da nossa comunidade e compartilham conhecimento conosco.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card
            key={partner.id}
            hover
            className="text-center card group transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={partner.photo}
                  alt={partner.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover shadow-sm border-4 border-amber-200 dark:border-amber-500/20 group-hover:border-amber-300 dark:group-hover:border-amber-500 transition-all duration-300"
                />
                <div className="absolute -top-2 -right-2">
                  <Star className="w-6 h-6 text-amber-600 dark:text-amber-400 animate-pulse" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-amber-300 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                  {partner.bio}
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                {partner.whatsapp && (
                  <button
                    onClick={() => handleWhatsApp(partner.whatsapp!)}
                    className="p-3 rounded-full shadow-sm transition hover:scale-110
                               bg-emerald-50 text-emerald-700 hover:bg-emerald-100
                               dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15"
                    title="WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </button>
                )}

                {partner.instagram && (
                  <button
                    onClick={() => handleInstagram(partner.instagram!)}
                    className="p-3 rounded-full shadow-sm transition hover:scale-110
                               bg-pink-50 text-pink-700 hover:bg-pink-100
                               dark:bg-pink-500/10 dark:text-pink-300 dark:hover:bg-pink-500/15"
                    title="Instagram"
                  >
                    <Instagram size={20} />
                  </button>
                )}

                {partner.otherLink && (
                  <button
                    onClick={() => handleOtherLink(partner.otherLink!)}
                    className="p-3 rounded-full shadow-sm transition hover:scale-110
                               bg-amber-50 text-amber-700 hover:bg-amber-100
                               dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/15"
                    title={partner.otherLinkLabel || 'Link'}
                  >
                    <ExternalLink size={20} />
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
