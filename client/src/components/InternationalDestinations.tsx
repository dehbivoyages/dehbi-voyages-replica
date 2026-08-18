import { CheckCircle2, MapPin, Plane, Play, Ticket, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { openReservationDialog } from './WhatsAppReservation';

/**
 * Direction artistique : cartes de destinations internationales épurées,
 * aperçus vidéo HD immersifs et livrée aérienne Dehbi Voyages en Orange tropical, Vert lime et Bleu profond.
 */

export default function InternationalDestinations() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [isTicketVideoOpen, setIsTicketVideoOpen] = useState(false);

  const ticketingVideoUrl = '/manus-storage/billetterie-parcours-12s_021c6e7b.mp4';
  const ticketingAircraftUrl = '/manus-storage/billetterie-avion-dehbi-voyages_bd8d22a9.png';

  useEffect(() => {
    if (!isTicketVideoOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsTicketVideoOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTicketVideoOpen]);

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

      {isTicketVideoOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setIsTicketVideoOpen(false)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#6BFF42]/50 bg-[#07111F] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-video-title"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/15 bg-[#10233C] px-5 py-4 text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6BFF42]">Billetterie aérienne</p>
                <h3 id="ticket-video-title" className="mt-1 text-lg font-bold">Votre parcours aller-retour, accompagné par Dehbi Voyages</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTicketVideoOpen(false)}
                className="rounded-full p-2 text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#6BFF42]"
                aria-label="Fermer la vidéo de billetterie"
              >
                <X size={22} />
              </button>
            </div>
            <video
              src={ticketingVideoUrl}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-black object-contain"
              onLoadedMetadata={(event) => {
                event.currentTarget.volume = 0.35;
              }}
            />
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-[#D8E8FF]">Les horaires, itinéraires et tarifs sont confirmés par notre équipe avant réservation.</p>
              <button type="button" className="btn-secondary shrink-0" onClick={openReservationDialog}>
                Demander mon billet
              </button>
            </div>
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

        <section
          id="billetterie"
          className="mt-16 overflow-hidden rounded-[2rem] border border-[#FF8C42]/35 bg-[#07111F] text-white shadow-[0_24px_80px_rgba(7,17,31,0.18)]"
          aria-labelledby="ticketing-title"
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF8C42] text-[#07111F] shadow-lg shadow-[#FF8C42]/25">
                  <Ticket size={25} strokeWidth={2.4} />
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#6BFF42]">Service agence</p>
              </div>

              <h3 id="ticketing-title" className="mt-6 max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
                Billetterie Aérienne, partout où vous allez.
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#D8E8FF]">
                Notre équipe vous accompagne pour organiser vos billets aller-retour, avec une demande adaptée à votre destination, vos dates et vos bagages.
              </p>

              <div className="mt-7 flex flex-wrap gap-2" aria-label="Régions prises en charge sur demande">
                {['Europe', 'Moyen-Orient', 'Afrique', 'Amériques', 'Autres destinations'].map((route) => (
                  <span key={route} className="rounded-full border border-[#6BFF42]/35 bg-[#6BFF42]/10 px-3 py-1.5 text-sm font-semibold text-[#E8FFE3]">
                    {route}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 text-sm text-[#D8E8FF] sm:grid-cols-2">
                <span className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#6BFF42]" />Conseil sur l’itinéraire et les bagages</span>
                <span className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#6BFF42]" />Confirmation personnalisée par l’agence</span>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" className="btn-secondary" onClick={openReservationDialog}>
                  Demander mon billet
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-bold text-white transition hover:border-[#6BFF42] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#6BFF42]"
                  onClick={() => setIsTicketVideoOpen(true)}
                >
                  <Play size={18} fill="currentColor" /> Voir le parcours en vidéo
                </button>
              </div>
            </div>

            <button
              type="button"
              className="group relative min-h-[340px] overflow-hidden bg-black text-left lg:min-h-full"
              onClick={() => setIsTicketVideoOpen(true)}
              aria-label="Voir l’avion Dehbi Voyages et lire la vidéo du parcours de billetterie aérienne"
            >
              <img
                src={ticketingAircraftUrl}
                alt="Avion à la livrée Dehbi Voyages avec logo et inscription sur le fuselage"
                className="h-full w-full bg-[#F4F8FA] object-contain transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/95 via-[#07111F]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF8C42] text-[#07111F] shadow-xl shadow-black/30 transition group-hover:scale-110"><Play size={24} fill="currentColor" /></div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6BFF42]">Livrée Dehbi Voyages</p>
                <p className="mt-2 text-2xl font-extrabold text-white">Votre voyage, notre signature</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#D8E8FF]">Découvrez notre identité aérienne, puis ouvrez la vidéo de votre parcours de billetterie.</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
