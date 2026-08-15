import { X } from 'lucide-react';
import { useState } from 'react';

/**
 * Direction artistique : mini-étiquettes horizontales discrètes et premium,
 * avec un fond bleu doux en clair et bleu encre en sombre, des accents légèrement
 * désaturés et une hiérarchie réduite au nom du voyage et à son prix pour préserver le hero.
 */

interface Announcement {
  id: string;
  title: string;
  price: string;
  details: string;
  fullTitle: string;
  accentColor: string;
}

const announcements: Announcement[] = [
  {
    id: 'omra',
    title: '🕋 Omra',
    price: '13.900 MAD',
    details: 'Sept. 2026 · Etihad Airways',
    fullTitle: 'Omra — Deux Omra en une',
    accentColor: '#9ED68B',
  },
  {
    id: 'caire',
    title: '🏺 Le Caire',
    price: '17.600 MAD',
    details: '11 nuits / 12 jours · Départs multiples',
    fullTitle: 'Le Caire — Croisière — Hurghada',
    accentColor: '#E6A77F',
  },
  {
    id: 'thailande',
    title: '🌴 Thaïlande',
    price: '24.500 MAD',
    details: '11 nuits / 13 jours · Qatar Airways',
    fullTitle: 'Thaïlande — Bangkok, Krabi & Phuket',
    accentColor: '#9ED68B',
  },
];

export default function Announcements() {
  const [closedAnnouncements, setClosedAnnouncements] = useState<string[]>([]);
  const [isAllClosed, setIsAllClosed] = useState(false);

  const visibleAnnouncements = announcements.filter(
    (announcement) => !closedAnnouncements.includes(announcement.id),
  );

  if (isAllClosed) {
    return (
      <div className="pointer-events-none fixed left-0 right-0 top-[84px] z-30 flex justify-end px-3 py-1 sm:px-4">
        <button
          type="button"
          onClick={() => setIsAllClosed(false)}
          className="pointer-events-auto inline-flex h-6 items-center gap-1 rounded-full border border-white/15 bg-[#203451]/75 px-2.5 text-[9px] font-medium text-white/65 shadow-sm backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-px hover:bg-[#2a4565]/85 hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9ED68B] active:scale-[0.97] dark:border-[#6BFF42]/25 dark:bg-[#0a1b30]/95 dark:text-slate-200 dark:shadow-black/30 dark:hover:bg-[#173550] dark:hover:text-white"
          aria-label="Afficher à nouveau les annonces"
        >
          Afficher les offres
        </button>
      </div>
    );
  }

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
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

        <div className="grid grid-cols-1 items-stretch gap-1 md:grid-cols-3">
          {visibleAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="pointer-events-auto h-full overflow-hidden rounded-lg border border-white/10 border-l-2 bg-[#203451]/80 shadow-md shadow-slate-950/10 backdrop-blur-sm transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:border-white/25 hover:bg-[#2a4565]/90 hover:shadow-[0_0_14px_rgba(158,214,139,0.16)] dark:border-[#6BFF42]/20 dark:bg-[#0c2038]/95 dark:shadow-black/30 dark:hover:border-[#6BFF42]/55 dark:hover:bg-[#173550] dark:hover:shadow-[0_0_16px_rgba(107,255,66,0.2)]"
              style={{ borderLeftColor: announcement.accentColor }}
              aria-label={`${announcement.fullTitle} — à partir de ${announcement.price} — ${announcement.details}`}
            >
              <div className="flex min-h-[46px] h-full items-center gap-1.5 px-2 py-1 sm:px-2.5">
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
                  onClick={() => setClosedAnnouncements((current) => [...current, announcement.id])}
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white/45 transition duration-200 ease-out hover:bg-white/10 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9ED68B] active:scale-[0.97] dark:text-slate-400 dark:hover:bg-[#6BFF42]/15 dark:hover:text-[#BFFFAE]"
                  title={`Fermer l’annonce ${announcement.fullTitle}`}
                  aria-label={`Fermer l’annonce ${announcement.fullTitle}`}
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
