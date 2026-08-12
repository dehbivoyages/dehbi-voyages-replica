import { CalendarDays, Download, Eye, MapPin, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Direction artistique : catalogue de voyages premium mais lisible, avec des cartes
 * de format moyen, des affiches visibles dans leur intégralité, l'Orange tropical
 * pour les actions et le Vert lime pour les accents de confirmation.
 */

const trips = [
  {
    id: 'omra-etihad',
    title: 'Omra — Deux Omra en une',
    description: 'Un parcours spirituel avec Etihad Airways, Médine et La Mecque, avec hébergements sélectionnés et accompagnement de l’agence.',
    dates: 'Départs : 16/09, 23/09 et 27/09/2026',
    image: '/manus-storage/omra-etihad_8ed880ab.jpg',
    pdfUrl: '/manus-storage/omra-etihad_5b1c1b11.pdf',
    destination: 'Moyen-Orient',
    price: 'À partir de 13.900 MAD',
    highlights: ['Etihad Airways', 'Médine et La Mecque', '7 nuits à La Mecque', '4 nuits à Médine'],
  },
  {
    id: 'omra-kuala-lumpur',
    title: 'Omra avec Kuala Lumpur',
    description: 'Une expérience spirituelle prolongée combinant Kuala Lumpur et la Omra, avec Saudi Airlines et des sorties incluses.',
    dates: '06/09 au 19/09/2026',
    image: '/manus-storage/omra-kuala-lumpur_8a502730.jpg',
    pdfUrl: '/manus-storage/omra-kuala-lumpur_8d5bd9ad.pdf',
    destination: 'Moyen-Orient',
    price: 'À partir de 25.800 MAD',
    highlights: ['Saudi Airlines', 'Kuala Lumpur + Omra', 'Sorties gratuites', 'Hôtels avec petit-déjeuner'],
  },
  {
    id: 'omra-medine',
    title: 'Omra — Médine & La Mecque',
    description: 'Un programme spirituel au départ de Casablanca avec Médine, La Mecque et des hôtels choisis pour un séjour serein.',
    dates: '21/08 au 05/09/2026',
    image: '/manus-storage/omra-medine_d1fe92a1.jpg',
    pdfUrl: '/manus-storage/omra-medine_5ad6891c.pdf',
    destination: 'Moyen-Orient',
    price: 'À partir de 14.500 MAD',
    highlights: ['Saudi Arabian Airlines', 'Médine et La Mecque', 'Pension selon formule', 'Bagages inclus'],
  },
  {
    id: 'omra-turquie',
    title: 'Omra avec Turquie',
    description: 'Istanbul, Médine et La Mecque dans un même itinéraire, avec Turkish Airlines et un accompagnement francophone.',
    dates: '15/08 au 29/08/2026',
    image: '/manus-storage/omra-turquie_1a875d1f.jpg',
    pdfUrl: '/manus-storage/omra-turquie_4edc8208.pdf',
    destination: 'Moyen-Orient',
    price: 'À partir de 19.500 MAD',
    highlights: ['Turkish Airlines', 'Istanbul + Omra', 'Hôtels sélectionnés', 'Accompagnement francophone'],
  },
  {
    id: 'jakarta-bali-kuala-lumpur',
    title: 'Jakarta — Bali — Kuala Lumpur',
    description: 'Un circuit en Asie du Sud-Est avec trois destinations incontournables, vols Qatar Airways et hôtels 5 étoiles.',
    dates: '13/08 au 26/08/2026',
    image: '/manus-storage/jakarta-bali-kuala-lumpur_b5c066bc.jpg',
    pdfUrl: '/manus-storage/jakarta-bali-kuala-lumpur_428cd45b.pdf',
    destination: 'Asie',
    price: 'À partir de 34.500 MAD',
    highlights: ['Qatar Airways', '11 nuits / 12 jours', 'Hôtels 5 étoiles', 'Guide francophone'],
  },
  {
    id: 'vietnam-authentement',
    title: 'Le Vietnam autrement',
    description: 'Hanoï, Ninh Binh, la baie d’Halong, Hué, Hoi An et Saïgon dans un circuit accompagné francophone.',
    dates: '07/08 au 21/08/2026',
    image: '/manus-storage/vietnam-authentement_0875eca2.jpg',
    pdfUrl: '/manus-storage/vietnam-authentement_70734ed2.pdf',
    destination: 'Asie',
    price: 'À partir de 33.500 MAD',
    highlights: ['Qatar Airways', '12 nuits / 14 jours', 'Croisière à Halong', 'Hébergements de charme'],
  },
  {
    id: 'kuala-lumpur-bali',
    title: 'Kuala Lumpur — Bali',
    description: 'Un circuit accompagné francophone entre Kuala Lumpur et Bali, avec excursions, croisière et hôtels 5 étoiles.',
    dates: '07/08 au 20/08 ou 11/08 au 24/08/2026',
    image: '/manus-storage/kuala-lumpur-bali_517eb2f3.jpg',
    pdfUrl: '/manus-storage/kuala-lumpur-bali_d3cad60d.pdf',
    destination: 'Asie',
    price: 'À partir de 32.500 MAD',
    highlights: ['Qatar Airways', '11 nuits / 13 jours', 'Nusa Lembongan', 'Hôtels 5 étoiles'],
  },
  {
    id: 'thailande',
    title: 'Thaïlande — Bangkok, Krabi & Phuket',
    description: 'Entre temples, plages et paysages tropicaux, découvrez Bangkok, Krabi et Phuket dans un circuit de 13 jours.',
    dates: '12/08 au 25/08/2026',
    image: '/manus-storage/thailande_8d0f0244.jpg',
    pdfUrl: '/manus-storage/thailande_f45b47d5.pdf',
    destination: 'Asie',
    price: 'À partir de 24.500 MAD',
    highlights: ['Qatar Airways', '11 nuits / 13 jours', 'Bangkok, Krabi et Phuket', 'Guide francophone'],
  },
  {
    id: 'sharm-caire',
    title: 'Charm el-Cheikh — Le Caire',
    description: 'Un séjour entre la mer Rouge et les trésors du Caire, avec programme accompagné et formules hôtelières 5 étoiles.',
    dates: '18/07 au 27/07 ou 15/08 au 24/08/2026',
    image: '/manus-storage/sharm-caire_3efe29e4.jpg',
    pdfUrl: '/manus-storage/sharm-caire_21a87e4c.pdf',
    destination: 'Afrique',
    price: 'À partir de 17.500 MAD',
    highlights: ['9 nuits / 10 jours', 'Sharm el-Cheikh', 'Visites du Caire', 'Hôtels 5 étoiles'],
  },
  {
    id: 'istanbul',
    title: 'Istanbul — Entre Orient et Occident',
    description: 'Explorez les rives du Bosphore, les quartiers historiques et les joyaux d’Istanbul avec plusieurs dates de départ.',
    dates: 'Plusieurs départs en juillet et août 2026',
    image: '/manus-storage/istanbul_7baaeb9e.jpg',
    pdfUrl: '/manus-storage/istanbul_7ceb580e.pdf',
    destination: 'International',
    price: 'À partir de 9.900 MAD',
    highlights: ['7 nuits / 8 jours', 'Turkish Airlines ou RAM', 'Visites optionnelles', 'Hôtels sélectionnés'],
  },
  {
    id: 'caire-croisiere-hurghada',
    title: 'Le Caire — Croisière — Hurghada',
    description: 'Pyramides, temples antiques, croisière sur le Nil et détente à Hurghada dans un itinéraire complet de 12 jours.',
    dates: '09/08, 16/08 ou 23/08/2026',
    image: '/manus-storage/caire-croisiere-hurghada_15c62264.jpg',
    pdfUrl: '/manus-storage/caire-croisiere-hurghada_5d8b8eb8.pdf',
    destination: 'Afrique',
    price: 'À partir de 17.600 MAD',
    highlights: ['11 nuits / 12 jours', 'Croisière sur le Nil', 'Aswan et Louxor', 'Hurghada'],
  },
  {
    id: 'omra-distinguee',
    title: 'Omra distinguée',
    description: 'Un séjour spirituel premium avec Royal Air Maroc, hébergements sélectionnés à Médine et à La Mecque et services dédiés.',
    dates: '02/09 au 14/09/2026',
    image: '/manus-storage/omra-distinguee_40393899.jpg',
    pdfUrl: '/manus-storage/omra-distinguee_b558f759.pdf',
    destination: 'Moyen-Orient',
    price: 'À partir de 17.300 MAD',
    highlights: ['Royal Air Maroc', '4 nuits à Médine', '8 nuits à La Mecque', 'Hôtels sélectionnés'],
  },
];

export default function OrganizedTrips() {
  const [selectedDetails, setSelectedDetails] = useState<(typeof trips)[number] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('Tous');

  const destinations = ['Tous', ...Array.from(new Set(trips.map((trip) => trip.destination)))];
  const filteredTrips = selectedFilter === 'Tous'
    ? trips
    : trips.filter((trip) => trip.destination === selectedFilter);

  return (
    <section
      id="international"
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
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTrips.map((trip) => (
            <article key={trip.id} className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:shadow-2xl">
              <button type="button" className="group relative block h-72 w-full bg-[#f6f1e8] md:h-80" onClick={() => setSelectedDetails(trip)} aria-label={`Voir les détails de ${trip.title}`}>
                <img src={trip.image} alt={`Affiche du voyage ${trip.title}`} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-white"><MapPin size={13} aria-hidden="true" />{trip.destination}</span>
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 opacity-0 transition group-hover:opacity-100"><Eye size={14} aria-hidden="true" />Voir détail</span>
              </button>

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
