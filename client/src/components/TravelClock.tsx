import { Clock3 } from 'lucide-react';
import { useEffect, useState } from 'react';

const MOROCCO_TIME_ZONE = 'Africa/Casablanca';

const WORLD_CLOCKS = [
  { code: 'PAR', city: 'Paris', timeZone: 'Europe/Paris' },
  { code: 'LON', city: 'Londres', timeZone: 'Europe/London' },
  { code: 'NYC', city: 'New York', timeZone: 'America/New_York' },
  { code: 'RUH', city: 'Arabie saoudite', timeZone: 'Asia/Riyadh' },
] as const;

export function getDisplayInstant(date: Date) {
  return date;
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

export function formatWorldClock(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: MOROCCO_TIME_ZONE,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date).replace(/\//g, '-');
}

export function formatHijriDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR-u-ca-islamic-umalqura', {
    timeZone: MOROCCO_TIME_ZONE,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date).replace(/\//g, '-').replace(/\s*H$/i, '');
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
  const [hours, minutes, seconds] = formatClock(displayNow).split(':').map(Number);
  const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);
  const minuteAngle = (minutes * 6) + (seconds * 0.1);
  const secondAngle = seconds * 6;

  return (
    <div
      className={`grid min-h-[72px] gap-3 rounded-2xl border border-[#2F6B4F]/35 bg-[#9BDCF8] px-3.5 py-3 text-[#073B5C] shadow-lg shadow-[#2F6B4F]/20 ring-1 ring-[#FF8C42]/20 dark:border-[#6BFF42]/45 dark:bg-[#185A7A] dark:text-white dark:ring-[#6BFF42]/10 md:grid-cols-[minmax(190px,1fr)_minmax(245px,1.25fr)] ${className}`}
      aria-label="Heure du Maroc et quatre horloges mondiales synchronisées"
      data-time-zone={MOROCCO_TIME_ZONE}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#D99A2B] bg-[#F8F4EA] shadow-[0_0_0_3px_rgba(255,140,66,0.18)]" aria-label="Horloge analogique du Maroc" role="img">
          {Array.from({ length: 12 }, (_, index) => {
            const angle = index * 30;
            return <span key={angle} className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[#073B5C]" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-18px)` }} aria-hidden="true" />;
          })}
          <span className="absolute left-1/2 top-1/2 h-[13px] w-[2px] origin-bottom rounded-full bg-[#073B5C]" style={{ transform: `translate(-50%, -100%) rotate(${hourAngle}deg)` }} aria-hidden="true" />
          <span className="absolute left-1/2 top-1/2 h-[18px] w-[1.5px] origin-bottom rounded-full bg-[#D86D2D]" style={{ transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)` }} aria-hidden="true" />
          <span className="absolute left-1/2 top-1/2 h-[20px] w-px origin-bottom bg-[#2F6B4F]" style={{ transform: `translate(-50%, -100%) rotate(${secondAngle}deg)` }} aria-hidden="true" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D99A2B]" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2F6B4F] dark:text-[#BFFFAE]"><Clock3 size={12} aria-hidden="true" /> Maroc · Africa/Casablanca</span>
          <span className="mt-1 block font-mono text-[20px] font-extrabold leading-none tracking-[0.08em] text-[#073B5C] tabular-nums dark:text-[#FFF1C7]">{formatClock(displayNow)}</span>
          <span className="mt-2 grid gap-1 text-[11px] font-semibold leading-tight">
            <span className="rounded-md border border-[#2F6B4F]/25 bg-white/35 px-2 py-1 text-[#073B5C] dark:bg-white/5 dark:text-[#FFF8E8]">{formatDate(displayNow)}</span>
            <span className="rounded-md border border-[#2F6B4F]/25 bg-white/35 px-2 py-1 text-[#14532D] dark:bg-white/5 dark:text-[#D7FFCA]">{formatHijriDate(displayNow)}</span>
          </span>
        </span>
      </span>

      <div className="grid grid-cols-2 gap-1.5 border-t border-[#2F6B4F]/25 pt-2 md:border-l md:border-t-0 md:pl-3 md:pt-0">
        {WORLD_CLOCKS.map((clock) => (
          <span key={clock.code} className="rounded-md border border-[#073B5C]/20 bg-[#E9F8FF]/70 px-2 py-1.5 text-[#073B5C] shadow-sm dark:border-white/20 dark:bg-[#0E4059]/70 dark:text-white">
            <span className="flex items-center justify-between gap-2 text-[8px] font-black uppercase tracking-[0.12em] text-[#2F6B4F] dark:text-[#BFFFAE]"><span>{clock.code}</span><span className="h-1.5 w-1.5 rounded-full bg-[#FF8C42]" aria-hidden="true" /></span>
            <span className="mt-0.5 block truncate text-[9px] font-bold uppercase tracking-[0.08em]">{clock.city}</span>
            <span className="mt-0.5 block font-mono text-[14px] font-extrabold tracking-[0.08em] tabular-nums">{formatWorldClock(displayNow, clock.timeZone)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
