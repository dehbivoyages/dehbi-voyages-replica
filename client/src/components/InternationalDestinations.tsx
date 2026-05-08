import { MapPin, Play } from 'lucide-react';
import { useState } from 'react';

export default function InternationalDestinations() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const destinations = [
    {
      name: 'Turquie',
      highlights: ['Istanbul, Cappadoce, Côte Méditerranéenne'],
      features: ['Mosquée Bleue', 'Cappadoce', 'Bazars'],
      videoUrl: '/manus-storage/turkey_istanbul_monument_326fae65.mp4',
    },
    {
      name: 'Égypte',
      highlights: ['Le Caire, Louxor, Croisière sur le Nil'],
      features: ['Pyramides', 'Croisière Nil', 'Temples'],
      videoUrl: '/manus-storage/egypt_cairo_pyramids_92e4bfa3.mp4',
    },
    {
      name: 'Jordanie',
      highlights: ['Pétra, Mer Morte, Désert de Wadi Rum'],
      features: ['Pétra', 'Mer Morte', 'Wadi Rum'],
      videoUrl: '/manus-storage/jordan_petra_monument_6e59a668.mp4',
    },
    {
      name: 'Arabie Saoudite',
      highlights: ['Riyad, Jeddah, Expériences culturelles'],
      features: ['Riyad moderne', 'Jeddah côtière', 'Culture locale'],
      videoUrl: '/manus-storage/saudi_arabia_riyadh_dd8a2335.mp4',
    },
    {
      name: 'Dubaï',
      highlights: ['Luxe, shopping, plages et désert'],
      features: ['Burj Khalifa', 'Shopping', 'Désert'],
      videoUrl: '/manus-storage/dubai_burj_khalifa_ddcec158.mp4',
    },
    {
      name: 'Malaisie',
      highlights: ['Kuala Lumpur, Îles Langkawi, Forêts tropicales'],
      features: ['Tours Petronas', 'Îles paradisiaques', 'Nature'],
      videoUrl: '/manus-storage/malaysia_kuala_lumpur_589e77da.mp4',
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
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              {/* Video Preview */}
              <div className="relative w-full h-48 bg-black group cursor-pointer" onClick={() => setPlayingVideo(index)}>
                <video
                  src={dest.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Play size={48} className="text-white" fill="white" />
                </div>
              </div>

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
                <button className="btn-secondary w-full">
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
