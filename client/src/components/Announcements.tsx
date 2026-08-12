import { X } from 'lucide-react';
import { useState } from 'react';

/**
 * Direction artistique : annonces de voyage premium organisées en trois blocs
 * réguliers, avec un fond bleu profond, l’Orange tropical pour l’accent et le
 * Vert lime pour signaler les offres à jour sans masquer le contenu de la page.
 */

interface Announcement {
  id: string;
  title: string;
  description: string;
  badge: string;
  accentColor: string;
}

const announcements: Announcement[] = [
  {
    id: 'omra',
    title: '🕋 Omra — Deux Omra en une',
    description: 'À partir de 13.900 MAD · Départs septembre 2026 · Etihad Airways',
    badge: 'À JOUR',
    accentColor: '#6BFF42',
  },
  {
    id: 'caire',
    title: '🏺 Le Caire — Croisière — Hurghada',
    description: 'À partir de 17.600 MAD · 11 nuits / 12 jours · Plusieurs départs',
    badge: 'À JOUR',
    accentColor: '#FF8C42',
  },
  {
    id: 'thailande',
    title: '🌴 Thaïlande — Bangkok, Krabi & Phuket',
    description: 'À partir de 24.500 MAD · 11 nuits / 13 jours · Qatar Airways',
    badge: 'À JOUR',
    accentColor: '#6BFF42',
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
      className="pointer-events-none fixed left-0 right-0 top-[76px] z-30 px-3 py-2 sm:px-4"
      aria-label="Annonces des programmes à jour"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-2 md:grid-cols-3">
        {visibleAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="pointer-events-auto h-full overflow-hidden rounded-xl border border-white/15 border-l-4 bg-[#10213f]/95 shadow-lg shadow-slate-950/20 backdrop-blur-md"
            style={{ borderLeftColor: announcement.accentColor }}
          >
            <div className="flex min-h-[68px] h-full items-center gap-2.5 px-3 py-2.5 sm:px-3.5">
              <div className="min-w-0 flex-1">
                <div className="flex min-h-[2.25rem] items-start justify-between gap-2">
                  <h3 className="line-clamp-2 text-xs font-bold leading-4 text-white sm:text-sm">{announcement.title}</h3>
                  <span
                    className="mt-0.5 inline-flex shrink-0 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#10213f]"
                    style={{ backgroundColor: announcement.accentColor }}
                  >
                    {announcement.badge}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[10px] font-medium leading-3.5 text-white/75 sm:text-xs">{announcement.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setClosedAnnouncements((current) => [...current, announcement.id])}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6BFF42] active:scale-95"
                title="Fermer l’annonce"
                aria-label={`Fermer l’annonce ${announcement.title}`}
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
