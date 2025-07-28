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
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <Sparkles className="mr-3 text-amber-400" />
          Nossos Parceiros
          <Sparkles className="ml-3 text-amber-400" />
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Conheça os especialistas que fazem parte da nossa comunidade e compartilham conhecimento conosco.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} hover className="text-center bg-gray-800/50 backdrop-blur-sm border-gray-600 hover:border-amber-500 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={partner.photo}
                  alt={partner.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover shadow-lg border-4 border-amber-500/20 group-hover:border-amber-500/50 transition-all duration-300"
                />
                <div className="absolute -top-2 -right-2">
                  <Star className="w-6 h-6 text-amber-400 animate-pulse" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {partner.bio}
                </p>
              </div>

              <div className="flex justify-center space-x-3 pt-4">
                {partner.whatsapp && (
                  <button
                    onClick={() => handleWhatsApp(partner.whatsapp!)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                    title="WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </button>
                )}
                
                {partner.instagram && (
                  <button
                    onClick={() => handleInstagram(partner.instagram!)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                    title="Instagram"
                  >
                    <Instagram size={20} />
                  </button>
                )}
                
                {partner.otherLink && (
                  <button
                    onClick={() => handleOtherLink(partner.otherLink!)}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
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