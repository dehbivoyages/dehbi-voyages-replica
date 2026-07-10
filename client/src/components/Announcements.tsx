import { X } from 'lucide-react';
import { useState } from 'react';

interface Announcement {
  id: string;
  title: string;
  description: string;
  badge: string;
  color: string;
  bgColor: string;
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: '🎉 Offre Spéciale',
    description: 'Réduction de 20% sur tous les voyages',
    badge: 'NOUVEAU',
    color: '#ff8000',
    bgColor: '#00ff80'
  },
  {
    id: '2',
    title: '✈️ Dernière Minute',
    description: 'Punta Cana à partir de 12,999 MAD',
    badge: 'HOT',
    color: '#ff8000',
    bgColor: '#00ff80'
  },
  {
    id: '3',
    title: '🕌 Omra Spécial',
    description: 'Départ 22 juillet - Places limitées',
    badge: 'LIMITÉ',
    color: '#ff8000',
    bgColor: '#00ff80'
  }
];

export default function Announcements() {
  const [closedAnnouncements, setClosedAnnouncements] = useState<string[]>([]);

  const visibleAnnouncements = announcements.filter(
    (ann) => !closedAnnouncements.includes(ann.id)
  );

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 left-0 right-0 z-30 px-4 py-2">
      <div className="max-w-full space-y-2">
        {visibleAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="relative rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundColor: announcement.bgColor,
              borderLeft: `4px solid ${announcement.color}`
            }}
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm" style={{ color: announcement.color }}>
                      {announcement.title}
                    </h3>
                    <span
                      className="px-2 py-1 rounded text-xs font-bold text-white"
                      style={{ backgroundColor: announcement.color }}
                    >
                      {announcement.badge}
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: announcement.color }}>
                    {announcement.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setClosedAnnouncements([...closedAnnouncements, announcement.id])}
                className="ml-2 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-all"
                title="Fermer"
              >
                <X size={16} style={{ color: announcement.color }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
