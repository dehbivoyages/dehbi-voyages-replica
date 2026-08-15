import { Eye, MapPin, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Direction artistique : découverte marocaine lumineuse et éditoriale, avec des
 * images de villes clairement identifiées, des cartes de taille moyenne et une
 * palette sable, bleu profond, Orange tropical et Vert lime.
 */

const destinations = [
  {
    name: 'Tanger',
    landmark: 'Kasbah, médina et détroit',
    description: 'La perle du Nord, entre l’Atlantique et la Méditerranée, avec ses ruelles blanches et ses vues sur le détroit.',
    image: '/manus-storage/tanger-ville_6034eceb.webp',
  },
  {
    name: 'Casablanca',
    landmark: 'Mosquée Hassan II',
    description: 'Une métropole atlantique vivante, portée par son architecture emblématique et sa corniche ouverte sur l’océan.',
    image: '/manus-storage/casablanca-mosquee_49217dc0.webp',
  },
  {
    name: 'Rabat',
    landmark: 'Kasbah des Oudayas',
    description: 'La capitale royale révèle ses jardins, ses remparts et la douceur de ses promenades au bord du Bouregreg.',
    image: '/manus-storage/rabat-oudayas_249c65d8.jpg',
  },
  {
    name: 'Meknès',
    landmark: 'Bab Mansour et médina',
    description: 'Une ville impériale au patrimoine remarquable, entre portes monumentales, souks et histoire saadienne.',
    image: '/manus-storage/meknes-bab-mansour_9735f3a7.jpg',
  },
];

export default function MoroccanDestinations() {
  const [selectedDestination, setSelectedDestination] = useState<(typeof destinations)[number] | null>(null);

  return (
    <section id="maroc" className="morocco-section section-padding bg-gradient-to-b from-white via-[#fffaf2] to-[#edf8ff]">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="morocco-eyebrow mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[#d86d2d]">Escapades au Maroc</p>
          <h2 className="morocco-title font-['Playfair_Display'] text-4xl font-bold text-slate-900 md:text-5xl">Destinations Marocaines</h2>
          <p className="morocco-intro mt-4 text-base leading-7 text-slate-600 md:text-lg">Tanger, Casablanca, Rabat et Meknès : quatre ambiances, un patrimoine exceptionnel.</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {destinations.map((destination) => (
            <article key={destination.name} className="morocco-card group overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-xl">
              <button type="button" onClick={() => setSelectedDestination(destination)} className="relative block h-56 w-full overflow-hidden bg-slate-100 text-left" aria-label={`Voir ${destination.name} en grand`}>
                <img src={destination.image} alt={`${destination.name} — ${destination.landmark}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900"><MapPin size={13} className="text-[#FF8C42]" aria-hidden="true" />Maroc</span>
                <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 text-white"><span><span className="block font-['Playfair_Display'] text-2xl font-bold">{destination.name}</span><span className="mt-1 block text-xs font-semibold text-white/80">{destination.landmark}</span></span><Eye size={19} className="opacity-0 transition group-hover:opacity-100" aria-hidden="true" /></span>
              </button>
              <div className="p-5"><p className="morocco-description text-sm leading-6 text-slate-600">{destination.description}</p><button type="button" onClick={() => setSelectedDestination(destination)} className="morocco-link mt-4 text-sm font-bold text-[#d86d2d] underline-offset-4 hover:underline">Voir la destination</button></div>
            </article>
          ))}
        </div>
      </div>

      {selectedDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4" role="dialog" aria-modal="true" aria-label={`Destination ${selectedDestination.name}`} onClick={() => setSelectedDestination(null)}>
          <div className="morocco-modal relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white p-3 shadow-2xl md:p-5" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedDestination(null)} className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 text-white hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]" aria-label="Fermer"><X size={20} aria-hidden="true" /></button>
            <img src={selectedDestination.image} alt={`${selectedDestination.name} — ${selectedDestination.landmark}`} className="max-h-[70vh] w-full rounded-xl object-contain" />
            <div className="px-2 pb-1 pt-4 md:px-4"><p className="morocco-eyebrow text-sm font-bold uppercase tracking-[0.18em] text-[#d86d2d]">{selectedDestination.landmark}</p><h3 className="morocco-title mt-1 font-['Playfair_Display'] text-3xl font-bold text-slate-900">{selectedDestination.name}</h3><p className="morocco-description mt-2 text-sm leading-6 text-slate-600">{selectedDestination.description}</p></div>
          </div>
        </div>
      )}
    </section>
  );
}
