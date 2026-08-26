import { CalendarDays, Download, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Direction artistique : mini-étiquettes premium bleu doux / bleu encre, avec un accès
 * immédiat à des détails de voyage riches. Leur luminosité suit aussi l’ambiance météo de Tanger.
 */

interface Announcement {
  id: string;
  title: string;
  price: string;
  details: string;
  fullTitle: string;
  destination: string;
  description: string;
  highlights: string[];
  image: string;
  pdfUrl: string;
  accentColor: string;
}

const announcements: Announcement[] = [
  {
    id: 'antalya-istanbul-aout-sept-2026',
    title: 'Antalya–Istanbul',
    price: '17.900 DHS',
    details: '26 août–4 sept. 2026 · Turkish',
    fullTitle: 'Antalya–Istanbul — Dernier départ d’été',
    destination: 'International',
    description: 'Un circuit Turquie entre Istanbul et Antalya, avec hôtels sélectionnés, visites en option et séjour balnéaire.',
    highlights: ['Turkish Airlines via Istanbul', '4 nuits à Istanbul', '5 nuits à Antalya'],
    image: '/manus-storage/antalya-istanbul-aout-sept-2026_6995cbcc.jpg',
    pdfUrl: '/manus-storage/antalya-istanbul-aout-sept-2026_19be1582.pdf',
    accentColor: '#53BFD3',
  },
  {
    id: 'omra-kuala-lumpur-sept-2026',
    title: 'Omra Kuala Lumpur',
    price: '25.800 DHS',
    details: '6–19 sept. 2026 · Saudia',
    fullTitle: 'Omra avec Kuala Lumpur',
    destination: 'Moyen-Orient',
    description: 'Une Omra associée à une escale de découverte à Kuala Lumpur, avec hôtels et visites incluses au programme.',
    highlights: ['Vol Saudia', '5 nuits à Kuala Lumpur', '7 nuits à La Mecque'],
    image: '/manus-storage/omra-kuala-lumpur-sept-2026_402cbf9a.jpg',
    pdfUrl: '/manus-storage/omra-kuala-lumpur-sept-2026_9f466bf1.pdf',
    accentColor: '#9ED68B',
  },
  {
    id: 'punta-cana-septembre-2026',
    title: 'Punta Cana',
    price: '15.000 DHS',
    details: '8 nuits / 10 jours · Septembre 2026',
    fullTitle: 'Punta Cana — Septembre 2026',
    destination: 'International',
    description: 'Le paradis des Caraïbes entre plages de sable blanc, eaux turquoise et hébergements tout compris.',
    highlights: ['Départs Tanger et Casablanca', 'Hôtel 5 étoiles', 'Formule all inclusive'],
    image: '/manus-storage/punta-cana-septembre-2026_89ff6676.jpg',
    pdfUrl: '/manus-storage/punta-cana-septembre-2026_961df264.pdf',
    accentColor: '#E6A77F',
  },
];

export default function Announcements() {
  const [closedAnnouncements, setClosedAnnouncements] = useState<string[]>([]);
  const [isAllClosed, setIsAllClosed] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const visibleAnnouncements = announcements.filter(
    (announcement) => !closedAnnouncements.includes(announcement.id),
  );

  const restoreAnnouncements = () => {
    setClosedAnnouncements([]);
    setIsAllClosed(false);
  };

  useEffect(() => {
    if (!selectedAnnouncement) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedAnnouncement(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedAnnouncement]);

  const showRestoreControl = isAllClosed || visibleAnnouncements.length === 0;

  return (
    <>
      {showRestoreControl ? (
        <div className="pointer-events-none fixed left-0 right-0 top-[84px] z-30 flex justify-end px-3 py-1 sm:px-4">
          <button
            type="button"
            onClick={restoreAnnouncements}
            className="pointer-events-auto inline-flex h-6 items-center gap-1 rounded-full border border-white/15 bg-[#203451]/75 px-2.5 text-[9px] font-medium text-white/65 shadow-sm backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-px hover:bg-[#2a4565]/85 hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9ED68B] active:scale-[0.97] dark:border-[#6BFF42]/25 dark:bg-[#0a1b30]/95 dark:text-slate-200 dark:shadow-black/30 dark:hover:bg-[#173550] dark:hover:text-white"
            aria-label="Afficher à nouveau les annonces"
          >
            Afficher les offres
          </button>
        </div>
      ) : (
        <div
          className="pointer-events-none fixed left-0 right-0 top-[84px] z-30 px-2.5 py-1 sm:px-3"
          aria-label="Annonces des programmes à jour"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-end pb-1">
              <button
                type="button"
                onClick={() => setIsAllClosed(true)}
                className="pointer-events-auto inline-flex h-5 items-center gap-1 rounded-full border border-white/10 bg-[#203451]/60 px-2 text-[8px] font-medium text-white/50 transition duration-200 ease-out hover:-translate-y-px hover:bg-[#2a4565]/80 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9ED68B] active:scale-[0.97] dark:border-[#6BFF42]/20 dark:bg-[#0a1b30]/90 dark:text-slate-300 dark:hover:bg-[#173550] dark:hover:text-white"
                aria-label="Masquer toutes les annonces"
              >
                Masquer
                <X size={10} aria-hidden="true" />
              </button>
            </div>

            <div className="tanger-announcements grid grid-cols-1 items-stretch gap-1 md:grid-cols-3">
              {visibleAnnouncements.map((announcement) => (
                <article
                  key={announcement.id}
                  className="pointer-events-auto relative h-full overflow-hidden rounded-lg border border-white/10 border-l-2 bg-[#203451]/80 shadow-md shadow-slate-950/10 backdrop-blur-sm transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:border-white/25 hover:bg-[#2a4565]/90 hover:shadow-[0_0_14px_rgba(158,214,139,0.16)] dark:border-[#6BFF42]/20 dark:bg-[#0c2038]/95 dark:shadow-black/30 dark:hover:border-[#6BFF42]/55 dark:hover:bg-[#173550] dark:hover:shadow-[0_0_16px_rgba(107,255,66,0.2)]"
                  style={{ borderLeftColor: announcement.accentColor }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedAnnouncement(announcement)}
                    className="absolute inset-0 z-0 h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#6BFF42]"
                    aria-label={`Voir les détails de ${announcement.fullTitle}`}
                  />
                  <div className="pointer-events-none relative z-10 flex min-h-[46px] h-full items-center gap-1.5 px-2 py-1 sm:px-2.5">
                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-center gap-2">
                        <h3 className="min-w-0 truncate text-[10px] font-semibold text-white/90 sm:text-[11px] dark:text-white">
                          {announcement.title}
                        </h3>
                        <span className="shrink-0 text-[9px] font-medium text-white/65 sm:text-[10px] dark:text-[#BFFFAE]">
                          {announcement.price}
                        </span>
                      </div>
                      <p className="truncate pt-0.5 text-[8px] font-medium leading-3 text-white/50 sm:text-[9px] dark:text-slate-300">
                        {announcement.details}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setClosedAnnouncements((current) => [...current, announcement.id]);
                      }}
                      className="pointer-events-auto relative z-20 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white/45 transition duration-200 ease-out hover:bg-white/10 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9ED68B] active:scale-[0.97] dark:text-slate-400 dark:hover:bg-[#6BFF42]/15 dark:hover:text-[#BFFFAE]"
                      title={`Fermer l’annonce ${announcement.fullTitle}`}
                      aria-label={`Fermer l’annonce ${announcement.fullTitle}`}
                    >
                      <X size={12} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Détails de ${selectedAnnouncement.fullTitle}`}
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            className="relative grid max-h-[92vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white shadow-2xl dark:bg-[#13263D] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[220px] bg-[#f6f1e8] p-3 dark:bg-[#1C344E] md:min-h-full md:p-5">
              <img
                src={selectedAnnouncement.image}
                alt={`Affiche de ${selectedAnnouncement.fullTitle}`}
                className="h-full max-h-[380px] w-full rounded-xl object-contain"
              />
            </div>
            <div className="flex flex-col p-6 sm:p-8">
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/85 text-white transition hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#6BFF42]"
                aria-label="Fermer les détails du programme"
              >
                <X size={20} aria-hidden="true" />
              </button>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#FF8C42]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#d86d2d] dark:bg-[#FF8C42]/15 dark:text-[#FFB27D]">
                <MapPin size={14} aria-hidden="true" />
                {selectedAnnouncement.destination}
              </span>
              <h2 className="mt-4 pr-10 font-['Playfair_Display'] text-3xl font-bold leading-tight text-slate-900 dark:text-white">
                {selectedAnnouncement.fullTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{selectedAnnouncement.description}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#d86d2d] dark:text-[#FFB27D]">
                <CalendarDays size={17} aria-hidden="true" />
                {selectedAnnouncement.details}
              </div>
              <p className="mt-4 text-2xl font-extrabold text-[#10213f] dark:text-[#BFFFAE]">À partir de {selectedAnnouncement.price}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                {selectedAnnouncement.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6BFF42]/20 text-xs font-extrabold text-[#317a20] dark:text-[#BFFFAE]">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={selectedAnnouncement.pdfUrl}
                  download={`${selectedAnnouncement.id}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF8C42] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#eb7330] focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 dark:focus:ring-offset-[#13263D]"
                >
                  <Download size={16} aria-hidden="true" />
                  Télécharger
                </a>
                <a
                  href="#reservation-form"
                  onClick={() => setSelectedAnnouncement(null)}
                  className="inline-flex items-center justify-center rounded-xl border border-[#6BFF42]/70 px-4 py-3 text-sm font-bold text-[#317a20] transition hover:bg-[#6BFF42]/15 focus:outline-none focus:ring-2 focus:ring-[#6BFF42] dark:text-[#BFFFAE]"
                >
                  Réserver ce voyage
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
