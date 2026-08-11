import { Play } from 'lucide-react';
import { useState } from 'react';

export default function MoroccanDestinations() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const destinations = [
    {
      name: 'Tanger',
      description: 'La perle du détroit où l\'Atlantique rencontre la Méditerranée',
      image: '/manus-storage/tanger_destination_67d32054.jpg',
    },
    {
      name: 'Tanger – Mosquée Mohammed V',
      description: 'Un joyau architectural de Tanger avec une vue exceptionnelle sur le détroit',
      image: '/manus-storage/mosque_mohammed_v_tanger_c7b9fd8e.jpg',
    },
    {
      name: 'Rabat',
      description: 'La capitale royale avec ses palais et jardins',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/rabat-capital-Sm3UnDvHLdrWX3vNdSzjSY.webp',
      video: '/manus-storage/video_maroc_rabat_081923b9.mp4',
    },
    {
      name: 'Meknès',
      description: 'La ville impériale avec ses portes monumentales',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/meknes-imperial-QkA5mBceUmtk4YMX6kXeUV.webp',
      video: '/manus-storage/video_maroc_meknes_601b12a3.mp4',
    },
  ];

  return (
    <section id="maroc" className="section-padding bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Destinations Marocaines
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez les villes les plus fascinantes du Maroc avec vidéos immersives
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <div key={index} className="card-destination group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden bg-gray-200 cursor-pointer group" onClick={() => dest.video && setSelectedVideo(dest.video)}>
                {dest.video ? (
                  <>
                    <video
                      src={dest.video}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      muted
                      loop
                      autoPlay
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                        <Play size={24} className="text-blue-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </>
                )}
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {dest.name}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground text-sm">{dest.description}</p>
              </div>
            </div>
          ))}
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
