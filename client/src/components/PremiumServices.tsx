import { Heart, Map, Plane } from 'lucide-react';
import { useState } from 'react';

export default function PremiumServices() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      icon: Heart,
      title: 'Voyages Religieux',
      description: 'Omra, pèlerinages et retraites spirituelles avec accompagnement professionnel',
      videoUrl: '/manus-storage/DVOMRA_40percent_c18c0d1a.mp4',
    },
    {
      icon: Map,
      title: 'Circuits Touristiques',
      description: 'Maroc et destinations internationales avec guides expérimentés',
      videoUrl: '/manus-storage/song_circuits_touristiques_placeholder.mp4',
    },
    {
      icon: Plane,
      title: 'Billetterie Aérienne',
      description: 'Vols nationaux et internationaux aux meilleurs tarifs',
      videoUrl: '/manus-storage/TICKETAVION_WITH_MUSIC_aa5b60b6.mp4',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Nos Services Premium
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedService === index;
            const hasVideo = service.videoUrl;

            return (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all ${
                  isExpanded && hasVideo ? 'md:col-span-3' : ''
                }`}
              >
                {isExpanded && hasVideo ? (
                  // Expanded video view
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-foreground">
                        {service.title}
                      </h3>
                      <button
                        onClick={() => setExpandedService(null)}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="bg-black rounded-lg overflow-hidden">
                      <video
                        width="100%"
                        height="auto"
                        controls
                        autoPlay
                        className="w-full"
                      >
                        <source src={service.videoUrl} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    </div>
                    <button
                      onClick={() => setExpandedService(null)}
                      className="btn-outline w-full"
                    >
                      Fermer la vidéo
                    </button>
                  </div>
                ) : (
                  // Collapsed card view
                  <>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                        <Icon size={32} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <button
                      className="btn-outline"
                      onClick={() => {
                        if (hasVideo) {
                          setExpandedService(index);
                        }
                      }}
                    >
                      {hasVideo ? 'Clic pour voir' : 'Bientôt disponible'}
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
