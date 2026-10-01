export const RESERVATION_TRIP_KEY = 'dehbi-voyages-reservation-trip';
export const RESERVATION_TRIP_EVENT = 'dehbi:select-trip';

export function selectReservationTrip(tripName: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(RESERVATION_TRIP_KEY, tripName);
  window.dispatchEvent(new CustomEvent(RESERVATION_TRIP_EVENT, { detail: tripName }));
  document.getElementById('reservation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
