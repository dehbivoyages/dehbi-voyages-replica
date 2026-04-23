import { CheckCircle2 } from 'lucide-react';

export default function SpiritualTrips() {
  const trips = [
    {
      title: 'Omra Complète',
      description: 'Pèlerinage spirituel à la Mecque avec accompagnement professionnel, hébergement premium et tous les rituels guidés',
      features: ['Visa facilité', 'Hébergement 5 étoiles', 'Guides religieux', 'Repas halal'],
    },
    {
      title: 'Visite Médinas Sacrées',
      description: 'Découvrez les lieux saints du Maroc : Fès, Meknès, Marrakech avec leurs mosquées historiques et sanctuaires',
      features: ['Mosquée Karaouine', 'Sanctuaires saints', 'Médinas authentiques', 'Guides culturels'],
    },
    {
      title: 'Retraite Spirituelle',
      description: 'Séjour de méditation et prière dans les riads traditionnels du Maroc avec enseignements spirituels',
      features: ['Méditation guidée', 'Enseignements', 'Riads traditionnels', 'Repas bio'],
    },
  ];

  return (
    <section id="spirituel" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Voyages Spirituels & Religieux
          </h2>
          <p className="text-muted-foreground text-lg">
            Expériences sacrées avec accompagnement professionnel
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {trips.map((trip, index) => (
            <div key={index} className="card-bordered">
              <h3 className="text-xl font-bold text-foreground mb-3">
                {trip.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                {trip.description}
              </p>
              <ul className="space-y-3 mb-6">
                {trip.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary w-full">
                Réserver
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
