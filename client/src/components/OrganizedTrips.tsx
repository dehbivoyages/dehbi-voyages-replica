import { Download, Eye } from 'lucide-react';

export default function OrganizedTrips() {
  const trips = [
    {
      id: 1,
      title: 'Voyage Organisé - Arabie Saoudite',
      description: 'Circuit complet en Arabie Saoudite avec hébergement premium, vols directs et visites guidées',
      dates: '23 Juillet - 7 Juillet 2026 / 23 Juillet - 6 Août 2026',
      image: '/manus-storage/dv02_ba9ec844.jpeg',
      pdfUrl: '/manus-storage/voyage-organise-dehbi_c485bd6a.pdf',
      highlights: [
        'Vols Saudi Arabian Airlines',
        'Hébergement 4-5 étoiles',
        'Visites guidées complètes',
        'Repas inclus',
        'Assurance voyage',
      ],
    },
    {
      id: 2,
      title: 'Voyage Organisé - Chine Éternelle',
      description: 'Circuit complet en Chine avec visite de Guangzhou, Shanghai, Zhangjiajie et Beijing. Vols Turkish Airlines, hébergement premium et visites guidées complètes',
      dates: '14 Août - 26 Août 2026 / 20 Août - 2 Septembre 2026',
      image: '/manus-storage/DVCHINE26_7b74d784.webp',
      pdfUrl: '/manus-storage/voyage-organise-dehbi_c485bd6a.pdf',
      highlights: [
        'Vols Turkish Airlines',
        'Hébergement 4-5 étoiles',
        'Visites guidées complètes',
        'Repas inclus',
        'Assurance voyage',
        '13 jours / 12 nuits',
      ],
    },
    {
      id: 3,
      title: 'Voyage Organisé - Thaïlande Jungle & Plages De Rêve',
      description: 'Circuit complet en Thaïlande avec Bangkok, Krabi, Kanchanaburi, Phuket et Rivière Kwai. Jungle, plages paradisiaques et culture thaïlandaise authentique',
      dates: '19 Août - 31 Août 2026',
      image: '/manus-storage/DVTHAILAND26_06ae0e94.webp',
      pdfUrl: '/manus-storage/voyage-organise-dehbi_c485bd6a.pdf',
      highlights: [
        'Vols Turkish Airlines',
        'Hébergement 4-5 étoiles',
        'Visites guidées complètes',
        'Repas inclus',
        'Assurance voyage',
        '12 nuits / 13 jours',
        'À partir de 23.700 MAD',
      ],
    },
    {
      id: 4,
      title: 'Voyage Organisé - Thaïlande Rêvée',
      description: 'Circuit complet en Thaïlande avec Bangkok, Krabi, Phuket, îles paradisiaques et temples bouddhistes. Vols Qatar Airways, hébergement premium et expériences authentiques',
      dates: '05 Juin - 17 Juin 2025',
      image: '/manus-storage/550993670_122239015040127360_3405256931647515060_n_4b825609.jpg',
      pdfUrl: '/manus-storage/voyage-organise-dehbi_c485bd6a.pdf',
      highlights: [
        'Vols Qatar Airways',
        'Hébergement 4-5 étoiles',
        'Solitaire Sukhumvit 4*',
        'Blue Sotel Krabi Ao Nang 4*',
        'Sawaddi Patong Resort & Spa 4*',
        'Visites guidées complètes',
        'Repas inclus',
        'Assurance voyage',
        '13 jours / 12 nuits',
        'À partir de 23.000 MAD',
      ],
    },
    {
      id: 5,
      title: 'Voyage Organisé - Istanbul Mai 2026',
      description: 'Circuit complet en Turquie avec Istanbul, visite de la Mosquée Bleue, Bosphore et Bursa. Vols Royal Air Maroc, hébergement premium et croisière sur le Bosphore incluse',
      dates: '1 Mai - 8 Mai 2026 / 23 Mai - 30 Mai 2026 / 30 Mai - 6 Juin 2026',
      image: '/manus-storage/DVISTANBULMAI26._a32c686f.webp',
      pdfUrl: '/manus-storage/voyage-organise-dehbi_c485bd6a.pdf',
      highlights: [
        'Vols Royal Air Maroc',
        'Hébergement 3-5 étoiles',
        'Croisière sur le Bosphore',
        'Visites guidées complètes',
        'Repas inclus',
        'Assurance voyage',
        '7 nuits / 8 jours',
        'À partir de 7.690 MAD',
      ],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Voyages Organisés</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez nos packages de voyages complets et téléchargez les détails
          </p>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 gap-4">
                {/* Image */}
                <div className="relative h-25 overflow-hidden bg-gray-200">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{trip.title}</h3>
                    <p className="text-xs text-blue-600 font-semibold mb-2">📅 {trip.dates}</p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{trip.description}</p>

                    {/* Highlights */}
                    <div className="mb-3">
                      <h4 className="font-semibold text-sm text-foreground mb-2">Ce voyage inclut :</h4>
                      <ul className="space-y-1">
                        {trip.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center gap-2 text-xs text-foreground">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={trip.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-1 text-sm"
                    >
                      <Eye size={14} />
                      Consulter
                    </a>
                    <a
                      href={trip.pdfUrl}
                      download="voyage-organise-dehbi.pdf"
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-1 text-sm"
                    >
                      <Download size={14} />
                      Télécharger
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h4 className="font-semibold text-foreground mb-2">📧 Besoin de plus d'informations ?</h4>
          <p className="text-muted-foreground mb-4">
            Téléchargez le PDF pour voir tous les détails, tarifs, conditions et modalités de paiement.
          </p>
          <p className="text-sm text-muted-foreground">
            Pour toute question, contactez-nous via WhatsApp ou Gmail en utilisant le bouton "Réserver" en bas à droite.
          </p>
        </div>
      </div>
    </section>
  );
}
