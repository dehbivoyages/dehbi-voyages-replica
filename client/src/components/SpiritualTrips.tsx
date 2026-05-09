import { CheckCircle2, Play } from 'lucide-react';
import { useState } from 'react';

interface Trip {
  title: string;
  description: string;
  features: string[];
  videoUrl: string;
}

export default function SpiritualTrips() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const trips: Trip[] = [
    {
      title: 'Omra Complète',
      description: 'Pèlerinage spirituel à la Mecque avec accompagnement professionnel, hébergement premium et tous les rituels guidés',
      features: ['Visa facilité', 'Hébergement 5 étoiles', 'Guides religieux', 'Repas halal'],
      videoUrl: '/manus-storage/spiritual_omra_video_final_3f94fa38.mp4',
    },
    {
      title: 'Visite Médinas Sacrées',
      description: 'Découvrez les lieux saints du Maroc : Fès, Meknès, Marrakech avec leurs mosquées historiques et sanctuaires',
      features: ['Mosquée Karaouine', 'Sanctuaires saints', 'Médinas authentiques', 'Guides culturels'],
      videoUrl: '/manus-storage/spiritual_medinas_video_final_4555f460.mp4',
    },
    {
      title: 'Retraite Spirituelle',
      description: 'Séjour de méditation et prière dans les riads traditionnels du Maroc avec enseignements spirituels',
      features: ['Méditation guidée', 'Enseignements', 'Riads traditionnels', 'Repas bio'],
      videoUrl: '/manus-storage/spiritual_retreat_video_final_1c65a1d1.mp4',
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
            <div key={index} className="card-bordered overflow-hidden">
              {/* Vidéo */}
              <div
                className="relative mb-4 bg-black rounded-lg overflow-hidden h-40 group cursor-pointer"
                onClick={() => setSelectedVideo(trip.videoUrl)}
              >
                <video
                  src={trip.videoUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  muted
                  loop
                  autoPlay
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Play size={40} className="text-white" fill="white" />
                </div>
              </div>

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

        {/* Modal Vidéo */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
