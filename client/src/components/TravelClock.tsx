import { Clock3 } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Direction artistique : petite horloge de voyage premium, fond bleu profond,
 * Orange tropical pour le logo et Vert lime pour le repère horaire, avec une
 * lecture compacte et lisible dans l’en-tête comme dans le menu mobile.
 */

const MOROCCO_TIME_ZONE = 'Africa/Casablanca';

function formatClock(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: MOROCCO_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: MOROCCO_TIME_ZONE,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(date);
}

interface TravelClockProps {
  className?: string;
}

export default function TravelClock({ className = '' }: TravelClockProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={`flex items-center gap-2.5 rounded-2xl border border-[#FF8C42]/30 bg-[#10213f] px-3 py-2 text-white shadow-md shadow-[#10213f]/15 ${className}`} aria-label="Heure actuelle au Maroc">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white p-1" aria-hidden="true">
        <img src="/manus-storage/dehbi-voyages-logo_d65e39fd.png" alt="" className="h-full w-full object-contain" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6BFF42]">
          <Clock3 size={12} aria-hidden="true" /> Maroc
        </span>
        <span className="mt-0.5 block font-mono text-base font-bold leading-none tracking-wider text-white tabular-nums">{formatClock(now)}</span>
        <span className="mt-1 block text-[10px] font-semibold leading-none text-[#FFB17D]">{formatDate(now)} · الذهبي أسفار</span>
      </span>
    </div>
  );
}
