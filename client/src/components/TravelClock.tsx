import { Clock3 } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Direction artistique : petite horloge de voyage premium, fond bleu profond,
 * Orange tropical pour le logo et Vert lime pour le repère horaire, avec une
 * lecture compacte et lisible dans l’en-tête comme dans le menu mobile.
 */

const MOROCCO_TIME_ZONE = 'Africa/Casablanca';
const DISPLAY_OFFSET_MINUTES = -60;

export function getDisplayInstant(date: Date) {
  return new Date(date.getTime() + DISPLAY_OFFSET_MINUTES * 60_000);
}

export function formatClock(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: MOROCCO_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: MOROCCO_TIME_ZONE,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatHijriDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR-u-ca-islamic-umalqura', {
    timeZone: MOROCCO_TIME_ZONE,
    day: '2-digit',
    month: 'long',
    year: 'numeric',
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

  const displayNow = getDisplayInstant(now);

  return (
    <div
      className={`flex min-h-[56px] items-center gap-3 rounded-2xl border border-[#FF8C42]/30 bg-[#10213f] px-3.5 py-2.5 text-white shadow-md shadow-[#10213f]/15 ${className}`}
      aria-label="Heure, date grégorienne et date hégirienne synchronisées au Maroc"
      data-time-zone={MOROCCO_TIME_ZONE}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1" aria-hidden="true">
        <img src="/manus-storage/dehbi-voyages-logo_d65e39fd.png" alt="" className="h-full w-full object-contain" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6BFF42]">
          <Clock3 size={12} aria-hidden="true" /> Maroc
        </span>
        <span className="mt-0.5 block font-mono text-[17px] font-bold leading-none tracking-wider text-white tabular-nums">{formatClock(displayNow)}</span>
        <span className="mt-1 grid gap-0.5 text-[10px] font-semibold leading-tight text-[#FFB17D]">
          <span className="block">{formatDate(displayNow)}</span>
          <span className="block text-[9px] font-medium text-[#B8C8E8]">Hégirien · {formatHijriDate(displayNow)}</span>
          <span className="block text-[10px] font-semibold text-[#FFB17D]">الذهبي أسفار</span>
        </span>
      </span>
    </div>
  );
}
