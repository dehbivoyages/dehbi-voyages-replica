import { Download, Eye, Play, Filter } from 'lucide-react';
import { useState } from 'react';

export default function OrganizedTrips() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const trips = [
    {
      id: 1,
      title: 'Voyage Organisé - Punta Cana Été 2026',
      description: 'Séjour balnéaire complet à Punta Cana, République Dominicaine. Hôtels 5 étoiles all inclusive, plages de sable blanc et eaux turquoise. Départs garantis tous les vendredis de juillet, août et septembre 2026.',
      dates: 'Tous les vendredis - Juillet, Août, Septembre 2026',
      image: '/manus-storage/punta_cana_brochure_0cb0a56d.pdf',
      video: '/manus-storage/punta_cana_video_4d8df104.mp4',
      pdfUrl: '/manus-storage/punta_cana_brochure_0cb0a56d.pdf',
      destination: 'International',
      highlights: [
        'Hôtels 5 étoiles all inclusive',
        'Plages de sable blanc',
        'Eaux turquoise cristallines',
        'Repas et boissons inclus',
        'Assurance voyage',
        '8 nuits / 10 jours',
        'À partir de 16.999 DHS',
      ],
    },
    {
      id: 2,
      title: 'Voyage Organisé - Antalya Istanbul 09 Nuits',
      description: 'Circuit complet en Turquie combinant Antalya et Istanbul. Vols Turkish Airlines, hébergement 4-5 étoiles, croisière sur le Bosphore et visites guidées complètes des sites historiques.',
      dates: 'Juillet à Septembre 2026 - Dates multiples disponibles',
      image: '/manus-storage/antalya_istanbul_brochure_995a1fce.pdf',
      video: '/manus-storage/antalya_istanbul_video_c245cf36.mp4',
      pdfUrl: '/manus-storage/antalya_istanbul_brochure_995a1fce.pdf',
      destination: 'Europe',
      highlights: [
        'Vols Turkish Airlines',
        'Hébergement 4-5 étoiles',
        'Croisière sur le Bosphore',
        'Visites guidées complètes',
        'Repas inclus',
        'Assurance voyage',
        '9 nuits / 10 jours',
        'Tarifs : 17.900 - 21.900 DHS',
      ],
    },
    {
      id: 3,
      title: 'Voyage Organisé - Omra 13 Jours',
      description: 'Voyage spirituel complet combinant Médine et La Mecque. Compagnie Royal Air Maroc, hébergement premium avec vue sur la Kaaba, accompagnement religieux professionnel et visites guidées des sites sacrés.',
      dates: '22 Juillet - 3 Août 2026',
      image: '/manus-storage/omra_brochure_44289462.pdf',
      video: '/manus-storage/omra_video_d46ce0d5.mp4',
      pdfUrl: '/manus-storage/omra_brochure_44289462.pdf',
      destination: 'Moyen-Orient',
      highlights: [
        'Vols Royal Air Maroc',
        'Hébergement premium 4-5 étoiles',
        'Vue sur la Kaaba',
        'Accompagnement religieux',
        'Visites guidées complètes',
        'Repas inclus',
        '13 jours / 12 nuits',
        'Tarifs : 15.900 - 19.900 DHS',
      ],
    },
    {
      id: 4,
      title: 'Voyage Organisé - Umra avec Turquie',
      description: 'Combinaison unique : Umra spirituelle et découverte de la Turquie. Istanbul, Médine et La Mecque. Vols Turkish Airlines, hébergement premium et programme spirituel avec accompagnement professionnel.',
      dates: '8 Août - 22 Août 2026',
      image: '/manus-storage/umra_turquie_brochure_a1d2a451.pdf',
      video: '/manus-storage/umra_turquie_video_d3ae4643.mp4',
      pdfUrl: '/manus-storage/umra_turquie_brochure_a1d2a451.pdf',
      destination: 'Moyen-Orient',
      highlights: [
        'Vols Turkish Airlines',
        'Hébergement premium 4-5 étoiles',
        'Istanbul - Médine - La Mecque',
        'Croisière sur le Bosphore',
        'Accompagnement religieux',
        'Repas inclus',
        'Assurance voyage',
        'Tarifs : 18.900 - 32.900 DHS',
      ],
    },
    {
      id: 5,
      title: 'Istanbul - Entre Orient et Occident',
      description: 'Vivez la magie d\'Istanbul ! Galata Tower, Blue Mosque, Bosphore. Croisière, shopping, souks. Hébergement 4-5 étoiles avec Turkish Airlines.',
      dates: '04/07 - 11/08/2026 - Multiples départs',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_istanbul-YuThYbDCtYiuGS27gPHkSi.webp',
      video: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_istanbul-YuThYbDCtYiuGS27gPHkSi.webp',
      pdfUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_istanbul-YuThYbDCtYiuGS27gPHkSi.webp',
      destination: 'Europe',
      highlights: [
        'Vols Turkish Airlines',
        'Hébergement 4-5 étoiles',
        'Croisière Bosphore',
        'Visite historique',
        'Shopping & Souks',
        'Repas inclus',
        '07 nuits / 08 jours',
        'À partir de 9.900 DHS',
      ],
    },
    {
      id: 6,
      title: 'Vietnam Authentique - 12 Nuits',
      description: 'Voyage authentique entre culture, nature et rencontres inoubliables. Hanoi, Ninh Binh, Baie d\'Halong, Hue, Hoi An, Saigon. Qatar Airways, hébergement 5 étoiles.',
      dates: '07/08 - 21/08/2026',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_vietnam-jTxYUNAugWhh598QJdf8GT.webp',
      video: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_vietnam-jTxYUNAugWhh598QJdf8GT.webp',
      pdfUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_vietnam-jTxYUNAugWhh598QJdf8GT.webp',
      destination: 'International',
      highlights: [
        'Vols Qatar Airways',
        'Hébergement 5 étoiles',
        'Sites classés UNESCO',
        'Gastronomie raffinée',
        'Expériences uniques',
        'Guides francophones',
        '12 nuits / 14 jours',
        'À partir de 33.300 DHS',
      ],
    },
    {
      id: 7,
      title: 'Omra & Hajj - Programmes Religieux',
      description: 'Voyage spirituel au cœur de l\'Islam. Visite des lieux saints, accompagnement spirituel, guides expérimentés, transport confortable et service de qualité.',
      dates: 'Dates multiples - Toute l\'année',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_omra-fBN7RWsFfh6AUmHN9AkQJC.webp',
      video: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_omra-fBN7RWsFfh6AUmHN9AkQJC.webp',
      pdfUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_omra-fBN7RWsFfh6AUmHN9AkQJC.webp',
      destination: 'Moyen-Orient',
      highlights: [
        'Visites des lieux saints',
        'Accompagnement spirituel',
        'Guides expérimentés',
        'Transport confortable',
        'Hébergement premium',
        'Service 24/7',
        'Sécurité garantie',
        'Tarifs compétitifs',
      ],
    },
    {
      id: 8,
      title: 'Égypte - Circuits Touristiques',
      description: 'Découvrez les merveilles de l\'Égypte ancienne. Pyramides de Giza, Sphinx, temples égyptiens, Nil, croisière. Histoire millénaire et expériences inoubliables.',
      dates: 'Dates multiples - Toute l\'année',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_egypt-d4CGV8hRBULD3sLosiqZCU.webp',
      video: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_egypt-d4CGV8hRBULD3sLosiqZCU.webp',
      pdfUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_egypt-d4CGV8hRBULD3sLosiqZCU.webp',
      destination: 'International',
      highlights: [
        'Pyramides de Giza',
        'Visite du Sphinx',
        'Temples égyptiens',
        'Croisière sur le Nil',
        'Histoire millénaire',
        'Hébergement 4-5 étoiles',
        'Guides archéologues',
        'Souvenirs impérissables',
      ],
    },
    {
      id: 9,
      title: 'Europe - Circuits Multiples',
      description: 'Découvrez l\'Europe ! Paris, Londres, Rome, Suisse. Destinations iconiques, itinéraires flexibles, expériences inoubliables. Voyagez, découvrez, vivez l\'Europe.',
      dates: 'Dates multiples - Toute l\'année',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_europe-eMWmJqC47YUGiiqkoxxet3.webp',
      video: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_europe-eMWmJqC47YUGiiqkoxxet3.webp',
      pdfUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/program_europe-eMWmJqC47YUGiiqkoxxet3.webp',
      destination: 'Europe',
      highlights: [
        'Destinations iconiques',
        'Paris - Londres - Rome',
        'Suisse & Alpes',
        'Itinéraires flexibles',
        'Hébergement premium',
        'Guides touristiques',
        'Expériences uniques',
        'Souvenirs inoubliables',
      ],
    },
  ];

  // Get unique destinations for filter
  const uniqueDestinations = Array.from(new Set(trips.map(trip => trip.destination)));
  const destinations = ['all', ...uniqueDestinations];

  // Filter trips based on selected destination
  const filteredTrips = selectedFilter === 'all' 
    ? trips 
    : trips.filter(trip => trip.destination === selectedFilter);

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

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 mr-4">
            <Filter size={20} className="text-blue-600" />
            <span className="font-semibold text-foreground">Filtrer par :</span>
          </div>
          {destinations.map((destination) => (
            <button
              key={destination}
              onClick={() => setSelectedFilter(destination)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedFilter === destination
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-foreground border-2 border-blue-600 hover:bg-blue-50'
              }`}
            >
              {destination === 'all' ? '🌍 Tous les voyages' : `🌏 ${destination}`}
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 gap-4">
                {/* Video/Image */}
                <div className="relative h-25 overflow-hidden bg-gray-200 group cursor-pointer" onClick={() => trip.video && setSelectedVideo(trip.video)}>
                  {trip.video ? (
                    <>
                      <video
                        src={trip.video}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        muted
                        loop
                        autoPlay
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                          <Play size={24} className="text-blue-600 ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground flex-1">{trip.title}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                        {trip.destination}
                      </span>
                    </div>
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

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Aucun voyage trouvé pour cette destination.</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h4 className="font-semibold text-foreground mb-2">📧 Besoin de plus d'informations ?</h4>
          <p className="text-muted-foreground mb-4">
            Téléchargez le PDF pour voir tous les détails, tarifs, conditions et modalités de paiement. Tous nos voyages sont disponibles toute l'année - contactez-nous pour des dates alternatives !
          </p>
          <p className="text-sm text-muted-foreground">
            Pour toute question, contactez-nous via WhatsApp ou Gmail en utilisant le bouton "Réserver" en bas à gauche.
          </p>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVideo(null)}>
            <div className="bg-black rounded-lg overflow-hidden max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-auto"
              />
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
