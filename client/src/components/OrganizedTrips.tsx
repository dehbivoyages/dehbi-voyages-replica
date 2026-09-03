import { CalendarDays, Download, Eye, Heart, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Direction artistique : catalogue de voyages premium mais lisible, avec des cartes
 * de format moyen, des affiches visibles dans leur intégralité, l'Orange tropical
 * pour les actions et le Vert lime pour les accents de confirmation.
 */

export type OrganizedTrip = {
  id: string;
  title: string;
  description: string;
  dates: string;
  endDate?: string;
  image: string;
  pdfUrl: string;
  destination: string;
  price: string;
  highlights: string[];
};

export function getMoroccoDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Casablanca',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function isTripExpired(trip: Pick<OrganizedTrip, 'endDate'>, now = new Date()) {
  return Boolean(trip.endDate && trip.endDate < getMoroccoDateKey(now));
}

const trips: OrganizedTrip[] = [
  {
    id: 'antalya-istanbul-aout-sept-2026',
    title: 'Antalya–Istanbul — Dernier départ d’été',
    description: 'Un circuit Turquie entre Istanbul et Antalya, avec visites en option, hôtels sélectionnés et séjour balnéaire.',
    dates: '26/08 au 04/09/2026 — 9 nuits / 10 jours',
    endDate: '2026-09-04',
    image: '/manus-storage/antalya-istanbul-aout-sept-2026_6995cbcc.jpg',
    pdfUrl: '/manus-storage/antalya-istanbul-aout-sept-2026_19be1582.pdf',
    destination: 'International',
    price: 'À partir de 17.900 DHS',
    highlights: ['Turkish Airlines via Istanbul', '4 nuits à Istanbul', '5 nuits à Antalya', 'Transferts inclus'],
  },
  {
    id: 'omra-hajj-sur-mesure-2026',
    title: 'Programmes Omra & Hajj sur mesure',
    description: 'Des programmes spirituels organisés toute l’année, construits selon votre rythme et vos envies.',
    dates: 'Toute l’année — dates selon vos envies',
    image: '/manus-storage/omra-hajj-sur-mesure-2026_e38fd289.jpg',
    pdfUrl: '/manus-storage/omra-hajj-sur-mesure-2026_6f7df2ec.pdf',
    destination: 'Moyen-Orient',
    price: 'Tarif sur demande',
    highlights: ['Billets et hôtels adaptés', 'Transferts climatisés', 'Accompagnement administratif', 'Assistance 24 h / 24'],
  },
  {
    id: 'omra-kuala-lumpur-sept-2026',
    title: 'Omra avec Kuala Lumpur',
    description: 'Une Omra associée à une escale de découverte à Kuala Lumpur, avec hôtels et visites incluses au programme.',
    dates: '06/09 au 19/09/2026 — 13 nuits / 14 jours',
    endDate: '2026-09-19',
    image: '/manus-storage/omra-kuala-lumpur-sept-2026_402cbf9a.jpg',
    pdfUrl: '/manus-storage/omra-kuala-lumpur-sept-2026_9f466bf1.pdf',
    destination: 'Moyen-Orient',
    price: 'À partir de 25.800 DHS',
    highlights: ['Saudia', '5 nuits à Kuala Lumpur', '7 nuits à La Mecque', 'Excursions offertes à Kuala Lumpur'],
  },
  {
    id: 'deux-omra-etihad-sept-oct-2026',
    title: 'Deux Omra en un voyage',
    description: 'Un itinéraire spirituel via Abu Dhabi, avec deux séjours à La Mecque et une étape à Médine.',
    dates: '16/09 au 04/10/2026 — 18 nuits / 19 jours',
    endDate: '2026-10-04',
    image: '/manus-storage/deux-omra-etihad-sept-oct-2026_675d28bb.jpg',
    pdfUrl: '/manus-storage/deux-omra-etihad-sept-oct-2026_8837939a.pdf',
    destination: 'Moyen-Orient',
    price: 'À partir de 13.900 DHS',
    highlights: ['Etihad via Abu Dhabi', '7 + 4 + 7 nuits', 'Hôtels au choix', 'Transferts inclus'],
  },
  {
    id: 'punta-cana-septembre-2026',
    title: 'Punta Cana — Septembre 2026',
    description: 'Un séjour caraïbe entre plages de sable blanc, hôtel 5 étoiles et formule tout compris.',
    dates: '8 nuits / 10 jours — départs tous les vendredis de septembre',
    endDate: '2026-09-30',
    image: '/manus-storage/punta-cana-septembre-2026_89ff6676.jpg',
    pdfUrl: '/manus-storage/punta-cana-septembre-2026_961df264.pdf',
    destination: 'International',
    price: 'À partir de 15.000 DHS',
    highlights: ['Départs Tanger et Casablanca', 'Hôtel 5 étoiles', 'All inclusive', 'Transferts inclus'],
  },
  {
    id: 'ouzbekistan-istanbul-mai-2027',
    title: 'Circuit Ouzbékistan & Istanbul',
    description: 'Un circuit culturel de Samarcande à Istanbul entre patrimoine de la Route de la Soie et grandes escales.',
    dates: '16/05 au 30/05/2027 — 13 nuits / 14 jours',
    endDate: '2027-05-30',
    image: '/manus-storage/ouzbekistan-istanbul-mai-2027_58527759.jpg',
    pdfUrl: '/manus-storage/ouzbekistan-istanbul-mai-2027_e60b0ed9.pdf',
    destination: 'International',
    price: 'À partir de 23.900 DHS',
    highlights: ['Hôtels 4 et 5 étoiles', 'Petit déjeuner inclus', 'Guide arabophone', 'Visites au programme'],
  },
  {
    id: 'dakhla-lagon-dunes-sur-demande',
    title: 'Dakhla — Lagon & dunes',
    description: 'Une escapade marocaine entre désert et océan, avec hébergement, pension complète et accompagnement agence.',
    dates: '4 nuits / 5 jours — dates sur demande',
    image: '/manus-storage/dakhla-lagon-dunes-sur-demande_92f5b0e7.jpg',
    pdfUrl: '/manus-storage/dakhla-lagon-dunes-sur-demande_94dffec4.pdf',
    destination: 'Maroc',
    price: 'À partir de 5.900 DHS',
    highlights: ['Royal Air Maroc', 'Pension complète', 'Transferts inclus', 'Accompagnement agence'],
  },
];

export default function OrganizedTrips() {
  const [selectedDetails, setSelectedDetails] = useState<(typeof trips)[number] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [showExpired, setShowExpired] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem('dehbi-voyages-favorites');
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem('dehbi-voyages-favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (tripId: string) => {
    setFavoriteIds((current) => current.includes(tripId) ? current.filter((id) => id !== tripId) : [...current, tripId]);
  };

  const expiredTrips = trips.filter((trip) => isTripExpired(trip));
  const visibleTrips = showExpired ? trips : trips.filter((trip) => !isTripExpired(trip));
  const destinations = ['Tous', ...Array.from(new Set(visibleTrips.map((trip) => trip.destination)))];
  const filteredTrips = selectedFilter === 'Tous'
    ? visibleTrips
    : visibleTrips.filter((trip) => trip.destination === selectedFilter);

  return (
    <section
      id="organized-trips"
      className="relative py-16 md:py-20"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/world_destinations-J3U2HM7NeytZKeXb2Q8b4R.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-slate-950/55" aria-hidden="true" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center text-white">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[#6BFF42]">Sélection Dehbi Voyages</p>
          <h2 className="mb-4 font-['Playfair_Display'] text-4xl font-bold md:text-5xl">Voyages Organisés</h2>
          <p className="text-base leading-7 text-white/80 md:text-lg">Découvrez les nouvelles offres internationales, spirituelles et culturelles dans un format clair et confortable.</p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3" aria-label="Filtrer les voyages par destination">
          {destinations.map((destination) => (
            <button
              key={destination}
              type="button"
              onClick={() => setSelectedFilter(destination)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#6BFF42] focus:ring-offset-2 focus:ring-offset-slate-950 ${selectedFilter === destination ? 'bg-[#FF8C42] text-white' : 'bg-white/90 text-slate-800 hover:bg-white'}`}
            >
              {destination}
            </button>
          ))}
          {expiredTrips.length > 0 && (
            <button
              type="button"
              aria-pressed={showExpired}
              onClick={() => setShowExpired((current) => !current)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#6BFF42] focus:ring-offset-2 focus:ring-offset-slate-950 ${showExpired ? 'bg-[#10213f] text-white' : 'bg-white/90 text-slate-800 hover:bg-white'}`}
            >
              {showExpired ? 'Masquer les expirés' : `Afficher les expirés (${expiredTrips.length})`}
            </button>
          )}
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTrips.map((trip) => (
            <article key={trip.id} className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="group relative h-72 w-full bg-[#f6f1e8] md:h-80">
                <button type="button" className="absolute inset-0 block h-full w-full" onClick={() => setSelectedDetails(trip)} aria-label={`Voir les détails de ${trip.title}`}>
                  <img src={trip.image} alt={`Affiche du voyage ${trip.title}`} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-white"><MapPin size={13} aria-hidden="true" />{trip.destination}</span>
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 opacity-0 transition group-hover:opacity-100"><Eye size={14} aria-hidden="true" />Voir détail</span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(trip.id)}
                  aria-pressed={favoriteIds.includes(trip.id)}
                  aria-label={favoriteIds.includes(trip.id) ? `Retirer ${trip.title} des favoris` : `Ajouter ${trip.title} aux favoris`}
                  title={favoriteIds.includes(trip.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  className={`absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full shadow-lg backdrop-blur transition active:scale-90 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 ${favoriteIds.includes(trip.id) ? 'bg-[#FF8C42] text-white' : 'bg-white/90 text-[#10213f] hover:bg-white'}`}
                >
                  <Heart size={20} fill={favoriteIds.includes(trip.id) ? 'currentColor' : 'none'} strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>

              <div className="p-5">
                <h3 className="min-h-[3.5rem] font-['Playfair_Display'] text-2xl font-bold leading-tight text-slate-900">{trip.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{trip.description}</p>
                <div className="mt-4 flex items-start gap-2 text-sm font-semibold text-[#d86d2d]"><CalendarDays size={17} className="mt-0.5 shrink-0" aria-hidden="true" /><span>{trip.dates}</span></div>
                <p className="mt-3 text-lg font-extrabold text-[#10213f]">{trip.price}</p>

                <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-slate-600">
                  {trip.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-1.5"><span className="mt-0.5 text-[#5bba39]">✓</span><span>{highlight}</span></li>)}
                </ul>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setSelectedDetails(trip)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF8C42] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#eb7330] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2"><Eye size={16} aria-hidden="true" />Voir détail</button>
                  <a href={trip.pdfUrl} download={`${trip.id}.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5ecb3b] px-3 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#79df58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#6BFF42] focus:ring-offset-2"><Download size={16} aria-hidden="true" />Télécharger</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4" role="dialog" aria-modal="true" aria-label={`Détails de ${selectedDetails.title}`} onClick={() => setSelectedDetails(null)}>
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white p-3 shadow-2xl md:p-5" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedDetails(null)} className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 text-white transition hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]" aria-label="Fermer les détails"><X size={20} aria-hidden="true" /></button>
            <img src={selectedDetails.image} alt={`Détails du voyage ${selectedDetails.title}`} className="mx-auto max-h-[78vh] w-auto max-w-full rounded-xl object-contain" />
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-4 md:px-4">
              <div><h3 className="font-['Playfair_Display'] text-2xl font-bold text-slate-900">{selectedDetails.title}</h3><p className="mt-1 text-sm text-slate-600">{selectedDetails.dates}</p></div>
              <a href={selectedDetails.pdfUrl} download={`${selectedDetails.id}.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#FF8C42] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#eb7330]"><Download size={16} aria-hidden="true" />Télécharger le PDF</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
