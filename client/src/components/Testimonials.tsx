import { Star } from 'lucide-react';
import { useState } from 'react';

export default function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Fatima Bennani',
      destination: 'Punta Cana 2026',
      rating: 5,
      text: 'Expérience incroyable ! L\'équipe Dehbi Voyages a organisé chaque détail à la perfection. Les hôtels étaient magnifiques et le service impeccable. Je recommande vivement !',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      date: 'Juillet 2026',
    },
    {
      id: 2,
      name: 'Ahmed El Fassi',
      destination: 'Omra 13 Jours',
      rating: 5,
      text: 'Voyage spirituel exceptionnellement bien organisé. L\'accompagnement religieux était professionnel et respectueux. Merci Dehbi Voyages pour cette belle expérience.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      date: 'Août 2026',
    },
    {
      id: 3,
      name: 'Nadia Khouribga',
      destination: 'Antalya-Istanbul',
      rating: 5,
      text: 'Magnifique circuit en Turquie ! Les hôtels étaient luxueux, les visites guidées très intéressantes. L\'équipe était toujours disponible et attentive. Bravo !',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia',
      date: 'Juillet 2026',
    },
    {
      id: 4,
      name: 'Mohamed Alaoui',
      destination: 'Umra avec Turquie',
      rating: 5,
      text: 'Combinaison parfaite entre spiritualité et découverte culturelle. Istanbul était magnifique et l\'Umra bien organisée. Très satisfait du service.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed',
      date: 'Août 2026',
    },
    {
      id: 5,
      name: 'Leila Marrakchi',
      destination: 'Punta Cana 2026',
      rating: 5,
      text: 'Les plages étaient paradisiaques ! L\'hôtel all-inclusive était excellent avec un service 5 étoiles. Dehbi Voyages a vraiment dépassé mes attentes.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leila',
      date: 'Août 2026',
    },
    {
      id: 6,
      name: 'Hassan Bennani',
      destination: 'Antalya-Istanbul',
      rating: 5,
      text: 'Voyage inoubliable ! La croisière sur le Bosphore était magique. Tous les détails étaient parfaitement organisés. Merci à toute l\'équipe !',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan',
      date: 'Juillet 2026',
    },
  ];

  const averageRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section className="py-16 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Avis de Nos Clients</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Découvrez les témoignages authentiques de nos voyageurs satisfaits
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={i < Math.round(parseFloat(averageRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xl font-bold text-foreground">{averageRating}/5</span>
            <span className="text-muted-foreground">({testimonials.length} avis)</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-blue-100"
              onClick={() => setSelectedTestimonial(testimonial.id)}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground mb-4 line-clamp-3 italic">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-3 border-t border-blue-100 pt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.destination}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{testimonials.length}</div>
            <p className="text-blue-100">Clients Satisfaits</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{averageRating}</div>
            <p className="text-blue-100">Note Moyenne</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">100%</div>
            <p className="text-blue-100">Recommandent Dehbi</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Prêt à vivre votre propre aventure ?
          </p>
          <button
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: '#FF8C42' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Réserver Maintenant
          </button>
        </div>
      </div>

      {/* Modal - Full Testimonial */}
      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTestimonial(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            {testimonials.map((t) => (
              t.id === selectedTestimonial && (
                <div key={t.id}>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{t.name}</h3>
                      <p className="text-muted-foreground">{t.destination}</p>
                      <p className="text-sm text-muted-foreground">{t.date}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-lg text-foreground mb-6 leading-relaxed">
                    "{t.text}"
                  </p>

                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Fermer
                  </button>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
