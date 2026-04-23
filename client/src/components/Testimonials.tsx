import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Fatima M.',
      location: 'Fès',
      text: 'Expérience inoubliable avec Dehbi Voyages. L\'équipe était professionnelle et attentive à chaque détail. Je recommande vivement leurs services !',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      name: 'Ahmed B.',
      location: 'Marrakech',
      text: 'Service excellent pour notre voyage en famille. Tous les arrangements étaient parfaits, du transport à l\'hébergement. Nous recommandons vivement Dehbi Voyages !',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      name: 'Layla K.',
      location: 'Agadir',
      text: 'Les circuits sont bien organisés et les guides sont très compétents. Nous avons appris beaucoup et nous avons passé un moment merveilleux. À bientôt pour un autre voyage !',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      name: 'Mohammed T.',
      location: 'Casablanca',
      text: 'Voyage spirituel transformateur. L\'équipe de Dehbi Voyages a rendu chaque moment spécial et mémorable. Merci pour cette belle expérience !',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    {
      name: 'Nadia S.',
      location: 'Rabat',
      text: 'Très satisfaite du service. Les prix sont compétitifs et la qualité est au rendez-vous. Je vais certainement réserver avec eux pour mon prochain voyage.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      name: 'Hassan R.',
      location: 'Tanger',
      text: 'Excellente agence de voyages. Très professionnels et à l\'écoute des besoins. Je recommande sans hésiter Dehbi Voyages à tous mes amis !',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    );
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Avis de Nos Clients
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez ce que nos clients satisfaits pensent de nos services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-200"
            >
              {/* Rating */}
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-foreground text-sm mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Partagez votre expérience avec Dehbi Voyages
          </p>
          <button className="btn-primary">
            Laisser un Avis
          </button>
        </div>
      </div>
    </section>
  );
}
