import { useState } from 'react';

export default function OrganizedTrips() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const trips = [
    {
      id: 1,
      title: 'Jakarta - Bali - Kuala Lumpur',
      description: 'Découvrez l\'Asie du Sud-Est ! Jakarta, Bali et Kuala Lumpur. Vols Qatar Airways, hôtels 5 étoiles, 3 destinations incontournables, excursions variées et guide francophone.',
      dates: '13/08 au 26/08 et 20/08 au 02/09/2026',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/wzhNdhxUaMCCtBwf.jpg',
      video: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/wzhNdhxUaMCCtBwf.jpg',
      pdfUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/wzhNdhxUaMCCtBwf.jpg',
      destination: 'International',
      highlights: [
        'Vols Qatar Airways',
        'Hôtels 5 étoiles',
        '3 destinations incontournables',
        'Excursions variées',
        'Guide francophone',
        'Repas et visites inclus',
        '11 nuits / 12 jours',
        'À partir de 34.500 MAD',
      ],
    },
    {
      id: 2,
      title: 'Le Vietnam Authentement',
      description: 'Voyage authentique entre culture, nature et rencontres inoubliables. Hanoi, Ninh Binh, Baie d\'Halong, Hue, Hoi An, Saigon. Qatar Airways, hôtels de qualité, circuit accompagné francophone.',
      dates: '07/08 - 21/08/2026',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/LtbJNeTYdgdEfoOG.jpg',
      video: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/LtbJNeTYdgdEfoOG.jpg',
      pdfUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/LtbJNeTYdgdEfoOG.jpg',
      destination: 'International',
      highlights: [
        'Vols Qatar Airways',
        'Itinéraire complet',
        'Expériences uniques',
        'Croisière à Halong',
        'Hébergements de charme',
        'Guides francophones',
        '12 nuits / 14 jours',
        'À partir de 33.500 MAD',
      ],
    },
    {
      id: 3,
      title: 'Kuala Lumpur - Bali',
      description: 'Découvrez la magie de l\'Asie ! Kuala Lumpur et Bali. Vols Qatar Airways, hôtels 5 étoiles, 2 destinations incontournables, croisière à Nusa Lembongan et guide francophone.',
      dates: '07/08 au 20/08 et 11/08 au 24/08/2026',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/pOFMDUlxLxVCxDlU.jpg',
      video: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/pOFMDUlxLxVCxDlU.jpg',
      pdfUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/pOFMDUlxLxVCxDlU.jpg',
      destination: 'International',
      highlights: [
        'Vols Qatar Airways',
        'Hôtels 5 étoiles',
        '2 destinations incontournables',
        'Croisière à Nusa Lembongan',
        'Excursions variées',
        'Guide francophone',
        '11 nuits / 13 jours',
        'À partir de 32.500 MAD',
      ],
    },
    {
      id: 4,
      title: 'Omra avec Turquie',
      description: 'Omra avec visite de la Turquie ! Istanbul, Médine et La Mecque. Vols Turkish Airlines, hôtels 5 étoiles, circuit accompagné francophone, repas et visites inclus.',
      dates: '19/08 au 29/08/2026',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/QLVylZOomSmYlhkW.jpg',
      video: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/QLVylZOomSmYlhkW.jpg',
      pdfUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/QLVylZOomSmYlhkW.jpg',
      destination: 'Moyen-Orient',
      highlights: [
        'Vols Turkish Airlines',
        'Hôtels 5 étoiles',
        'Istanbul + Omra',
        'Repas et visites inclus',
        'Guide francophone',
        'Assurance voyage',
        '10 nuits / 11 jours',
        'À partir de 19.500 MAD',
      ],
    },
    {
      id: 5,
      title: 'Omra',
      description: 'Voyage spirituel à La Mecque et Médine. Saudi Arabian Airlines, hôtels 5 étoiles, hébergements de charme, guides francophones, repas et visites inclus.',
      dates: '21/08 au 05/09/2026',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/RGRqiOKhPKiUyXqp.jpg',
      video: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/RGRqiOKhPKiUyXqp.jpg',
      pdfUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/RGRqiOKhPKiUyXqp.jpg',
      destination: 'Moyen-Orient',
      highlights: [
        'Vols Saudi Arabian Airlines',
        'Hôtels 5 étoiles',
        'Médine et La Mecque',
        'Hébergements de charme',
        'Guides francophones',
        'Repas et visites inclus',
        '15 nuits / 16 jours',
        'À partir de 14.500 MAD',
      ],
    },
    {
      id: 6,
      title: 'Omra Distinguée',
      description: 'Omra premium avec Royal Air Maroc ! Médine et La Mecque. Hôtels 5 étoiles, fonds palestiniens et hôtels de prestige, guides francophones, repas et visites inclus.',
      dates: '02/09 au 14/09/2026',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/oAwYcqBLbaYnsMAS.jpeg',
      video: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/oAwYcqBLbaYnsMAS.jpeg',
      pdfUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663591781073/oAwYcqBLbaYnsMAS.jpeg',
      destination: 'Moyen-Orient',
      highlights: [
        'Vols Royal Air Maroc',
        'Hôtels 5 étoiles premium',
        'Médine et La Mecque',
        'Fonds palestiniens',
        'Guides francophones',
        'Repas et visites inclus',
        '12 nuits / 13 jours',
        'À partir de 17.300 MAD',
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
    <section 
      className="py-16 relative"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/world_destinations-J3U2HM7NeytZKeXb2Q8b4R.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Voyages Organisés</h2>
          <p className="text-lg text-gray-600">Découvrez nos circuits touristiques premium</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setSelectedFilter(dest)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedFilter === dest
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {dest === 'all' ? 'Tous' : dest}
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{trip.description}</p>
                
                {/* Dates */}
                <div className="flex items-center gap-2 mb-4 text-orange-500 font-semibold">
                  <span>📅 {trip.dates}</span>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Points forts :</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {trip.highlights.slice(0, 4).map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-orange-500">✓</span> {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedVideo(trip.video)}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                  >
                    Voir Détails
                  </button>
                  <a
                    href={trip.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold text-center"
                  >
                    Brochure
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold">Détails du Voyage</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <img
                  src={selectedVideo}
                  alt="Trip Details"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        )}\n      </div>\n    </section>
  );
}
