import { Download, Eye } from 'lucide-react';

export default function OrganizedTrips() {
  const trips = [
    {
      id: 1,
      title: 'Voyage Organisé - Arabie Saoudite',
      description: 'Circuit complet en Arabie Saoudite avec hébergement premium, vols directs et visites guidées',
      dates: '23 Juillet - 7 Juillet 2025 / 23 Juillet - 6 Août 2025',
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
        <div className="grid md:grid-cols-1 gap-8">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="relative h-96 md:h-auto overflow-hidden bg-gray-200">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{trip.title}</h3>
                    <p className="text-sm text-blue-600 font-semibold mb-4">📅 {trip.dates}</p>
                    <p className="text-muted-foreground mb-6">{trip.description}</p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Ce voyage inclut :</h4>
                      <ul className="space-y-2">
                        {trip.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={trip.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <Eye size={18} />
                      Consulter
                    </a>
                    <a
                      href={trip.pdfUrl}
                      download="voyage-organise-dehbi.pdf"
                      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
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
