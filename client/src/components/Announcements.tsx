import { X } from 'lucide-react';
import { useState } from 'react';

/**
 * Direction artistique : mini-étiquettes horizontales discrètes et premium,
 * avec un fond bleu doux, des accents légèrement désaturés et une hiérarchie
 * réduite au nom du voyage et à son prix pour préserver le hero.
 */

interface Announcement {
  id: string;
  title: string;
  price: string;
  fullTitle: string;
  accentColor: string;
}

const announcements: Announcement[] = [
  {
    id: 'omra',
    title: '🕋 Omra',
    price: '13.900 MAD',
    fullTitle: 'Omra — Deux Omra en une',
    accentColor: '#9ED68B',
  },
  {
    id: 'caire',
    title: '🏺 Le Caire',
    price: '17.600 MAD',
    fullTitle: 'Le Caire — Croisière — Hurghada',
    accentColor: '#E6A77F',
  },
  {
    id: 'thailande',
    title: '🌴 Thaïlande',
    price: '24.500 MAD',
    fullTitle: 'Thaïlande — Bangkok, Krabi & Phuket',
    accentColor: '#9ED68B',
  },
];

export default function Announcements() {
  const [closedAnnouncements, setClosedAnnouncements] = useState<string[]>([]);

  const visibleAnnouncements = announcements.filter(
    (announcement) => !closedAnnouncements.includes(announcement.id),
  );

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-[84px] z-30 px-2.5 py-1 sm:px-3"
      aria-label="Annonces des programmes à jour"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-1 md:grid-cols-3">
        {visibleAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="pointer-events-auto h-full overflow-hidden rounded-lg border border-white/10 border-l-2 bg-[#203451]/80 shadow-md shadow-slate-950/10 backdrop-blur-sm"
            style={{ borderLeftColor: announcement.accentColor }}
            aria-label={`${announcement.fullTitle} — à partir de ${announcement.price}`}
          >
            <div className="flex min-h-[38px] h-full items-center gap-1.5 px-2 py-0.5 sm:px-2.5">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <h3 className="min-w-0 truncate text-[10px] font-semibold text-white/90 sm:text-[11px]">
                  {announcement.title}
                </h3>
                <span className="shrink-0 text-[9px] font-medium text-white/65 sm:text-[10px]">
                  {announcement.price}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setClosedAnnouncements((current) => [...current, announcement.id])}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-[#9ED68B] active:scale-95"
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
  );
}
