import { ArrowRight, BellRing, X } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const AGENCY_NOTIFICATION_STORAGE_KEY = 'dehbi-voyages:agency-notification-day';

export const agencyNotificationContent = {
  title: 'Dehbi Voyages · départs à préparer',
  message: 'Recevez les disponibilités et l’accompagnement personnalisé pour votre prochaine escapade depuis Tanger.',
  actionLabel: 'Préparer mon départ',
};

export function getMoroccoDayKey(date: Date) {
  return new Intl.DateTimeFormat('fr-CA', {
    timeZone: 'Africa/Casablanca',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function shouldShowAgencyNotification(lastShownDay: string | null, today: string) {
  return lastShownDay !== today;
}

function dismissToast(toastId: string | number) {
  toast.dismiss(toastId);
}

export default function AgencyNotification() {
  useEffect(() => {
    const today = getMoroccoDayKey(new Date());
    let lastShownDay: string | null = null;

    try {
      lastShownDay = window.localStorage.getItem(AGENCY_NOTIFICATION_STORAGE_KEY);
      if (!shouldShowAgencyNotification(lastShownDay, today)) return;
      window.localStorage.setItem(AGENCY_NOTIFICATION_STORAGE_KEY, today);
    } catch {
      // La notification reste disponible même si le navigateur bloque le stockage local.
    }

    const toastId = toast.custom(
      (id) => (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto flex w-[min(390px,calc(100vw-2rem))] items-start gap-3 rounded-2xl border border-[#FF8C42]/35 bg-[#10213f] p-4 text-white shadow-[0_18px_55px_rgba(7,17,31,0.28)] dark:border-[#6BFF42]/35 dark:bg-[#0a1b30]"
        >
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FF8C42]/15 text-[#FFB17D]" aria-hidden="true">
            <BellRing size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6BFF42]">Dehbi Voyages</p>
            <p className="mt-1 text-sm font-extrabold text-white">{agencyNotificationContent.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-200">{agencyNotificationContent.message}</p>
            <button
              type="button"
              onClick={() => {
                document.getElementById('reservation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                dismissToast(id);
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#FF8C42] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#F6762C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6BFF42] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10213f] active:scale-[0.97]"
            >
              {agencyNotificationContent.actionLabel}
              <ArrowRight size={13} aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(id)}
            aria-label="Fermer la notification Dehbi Voyages"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6BFF42] active:scale-[0.97]"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      ),
      { duration: 9000, position: 'bottom-right' },
    );

    return () => dismissToast(toastId);
  }, []);

  return null;
}
