import { MapPin, Play } from 'lucide-react';
import { useState } from 'react';
import { openReservationDialog } from './WhatsAppReservation';

/**
 * Direction artistique : cartes de destinations internationales épurées,
 * aperçus vidéo HD immersifs et accents Orange tropical Dehbi Voyages.
 */

export default function InternationalDestinations() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const destinations = [
    {
      name: 'Turquie',
      highlights: ['Istanbul, Cappadoce, Côte Méditerranéenne'],
      features: ['Mosquée Bleue', 'Cappadoce', 'Bazars'],
      videoUrl: '/manus-storage/turquie-istanbul-hd_2741b712.mp4',
    },
    {
      name: 'Égypte',
      highlights: ['Le Caire, Louxor, Croisière sur le Nil'],
      features: ['Pyramides', 'Croisière Nil', 'Temples'],
      videoUrl: '/manus-storage/egypte-gizeh-hd_25c8f1b9.mp4',
    },
    {
      name: 'Jordanie',
      highlights: ['Pétra, Mer Morte, Désert de Wadi Rum'],
      features: ['Pétra', 'Mer Morte', 'Wadi Rum'],
      videoUrl: '/manus-storage/jordanie-petra-hd_663e2d37.mp4',
    },
    {
      name: 'Arabie Saoudite',
      highlights: ['Médine, Riyad, Jeddah et expériences culturelles'],
      features: ['Mosquée du Prophète', 'Riyad moderne', 'Jeddah côtière'],
      videoUrl: '/manus-storage/arabie-saoudite-medine-hd_0544db71.mp4',
    },
    {
      name: 'Dubaï',
      highlights: ['Luxe, shopping, plages et désert'],
      features: ['Burj Khalifa', 'Shopping', 'Désert'],
      videoUrl: '/manus-storage/dubai-burj-khalifa-hd_dad9a8bc.mp4',
    },
    {
      name: 'Malaisie',
      highlights: ['Kuala Lumpur, Îles Langkawi, Forêts tropicales'],
      features: ['Tours Petronas', 'Îles paradisiaques', 'Nature'],
      videoUrl: '/manus-storage/malaisie-petronas-hd_7d17093c.mp4',
    },
    {
      name: 'Europe',
      highlights: ['Rome, Paris, Alpes et patrimoine européen'],
      features: ['Colisée', 'Capitales historiques', 'Escapades culturelles'],
      videoUrl: '/manus-storage/europe-rome-hd_4eac07e7.mp4',
    },
    {
      name: 'Amérique du Sud',
      highlights: ['Brésil, Pérou, Argentine — panoramas grandioses'],
      features: ['Machu Picchu', 'Rio de Janeiro', 'Patagonie'],
      videoUrl: '/manus-storage/amerique-sud-machu-picchu-hd_b8db3b3a.mp4',
    },
  ];

  return (
    <section id="international" className="section-padding bg-white">
      {/* Video Modal */}
      {playingVideo !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setPlayingVideo(null)}>
          <div className="bg-black rounded-lg max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <video
              src={destinations[playingVideo].videoUrl}
              controls
              autoPlay
              playsInline
              preload="metadata"
              onLoadedMetadata={(event) => {
                event.currentTarget.volume = 0.45;
              }}
              className="w-full rounded-lg"
            />
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
            <div key={dest.name} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              {/* Video Preview */}
              <button
                type="button"
                className="relative block h-48 w-full bg-black text-left group"
                onClick={() => setPlayingVideo(index)}
                aria-label={`Lire la vidéo de la destination ${dest.name}`}
              >
                <video
                  src={dest.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Play size={48} className="text-white" fill="white" />
                </div>
              </button>

              {/* Content */}
              <div className="p-6">
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
                <button type="button" className="btn-secondary w-full" onClick={openReservationDialog}>
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
