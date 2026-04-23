import { MapPin } from 'lucide-react';

export default function InternationalDestinations() {
  const destinations = [
    {
      name: 'Turquie',
      highlights: ['Istanbul, Cappadoce, Côte Méditerranéenne'],
      features: ['Mosquée Bleue', 'Cappadoce', 'Bazars'],
    },
    {
      name: 'Égypte',
      highlights: ['Le Caire, Louxor, Croisière sur le Nil'],
      features: ['Pyramides', 'Croisière Nil', 'Temples'],
    },
    {
      name: 'Jordanie',
      highlights: ['Pétra, Mer Morte, Désert de Wadi Rum'],
      features: ['Pétra', 'Mer Morte', 'Wadi Rum'],
    },
    {
      name: 'Arabie Saoudite',
      highlights: ['Riyad, Jeddah, Expériences culturelles'],
      features: ['Riyad moderne', 'Jeddah côtière', 'Culture locale'],
    },
    {
      name: 'Dubaï',
      highlights: ['Luxe, shopping, plages et désert'],
      features: ['Burj Khalifa', 'Shopping', 'Désert'],
    },
    {
      name: 'Malaisie',
      highlights: ['Kuala Lumpur, Îles Langkawi, Forêts tropicales'],
      features: ['Tours Petronas', 'Îles paradisiaques', 'Nature'],
    },
  ];

  return (
    <section id="international" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Destinations Internationales
          </h2>
          <p className="text-muted-foreground text-lg">
            Explorez le monde avec nos circuits premium
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={20} className="text-secondary" />
                <h3 className="text-xl font-bold text-foreground">
                  {dest.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {dest.highlights[0]}
              </p>
              <div className="space-y-2 mb-6">
                {dest.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="btn-secondary w-full">
                Réserver
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
