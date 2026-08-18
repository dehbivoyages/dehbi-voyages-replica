import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { CheckCircle2, Mail, MessageCircle, PlaneTakeoff, X } from 'lucide-react';

/**
 * Direction artistique : une fenêtre de réservation immédiatement lisible, avec en-tête
 * Orange tropical et corps Vert lime stable dans les thèmes clair et sombre.
 * Les parcours « Au Maroc » et « International » restent distincts jusqu’au choix de destination.
 */

const reservationEventName = 'dehbi-voyages:open-reservation';

export const openReservationDialog = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(reservationEventName));
  }
};

export interface ReservationModalHandle {
  openModal: () => void;
}

const services = [
  { id: 'hotel', label: 'Hôtel' },
  { id: 'avion', label: 'Avion' },
  { id: 'hotel-avion', label: 'Hôtel + Avion' },
  { id: 'bateaux', label: 'Bateaux' },
  { id: 'omrah', label: 'Omra' },
  { id: 'hajj', label: 'Hajj' },
];

const moroccanDestinations = [
  'Tanger', 'Casablanca', 'Rabat', 'Meknès', 'Fès', 'Marrakech', 'Agadir',
];

const internationalDestinations = [
  'Turquie', 'Égypte', 'Jordanie', 'Arabie Saoudite', 'Dubaï', 'Oman', 'Liban',
  'Malaisie', 'Thaïlande', 'Indonésie', 'Singapour', 'Japon', 'Corée du Sud', 'Vietnam',
  'France', 'Italie', 'Espagne', 'Grèce', 'Suisse', 'Allemagne', 'Pays-Bas',
  'Sénégal', 'Kenya', 'Tanzanie', 'Afrique du Sud', 'Madagascar',
  'États-Unis', 'Canada', 'Mexique', 'Brésil', 'Pérou', 'Colombie', 'Autre',
];

const hotelCategories = ['3 étoiles', '4 étoiles', '5 étoiles', 'Luxe', 'Budget'];

const WhatsAppReservation = forwardRef<ReservationModalHandle>((_props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedTravelZone, setSelectedTravelZone] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numberOfPax, setNumberOfPax] = useState('1');
  const [hotelCategory, setHotelCategory] = useState('');
  const [formError, setFormError] = useState('');

  const isOmrahOrHajj = selectedService === 'omrah' || selectedService === 'hajj';
  const destinationsForSelectedZone = selectedTravelZone === 'morocco'
    ? moroccanDestinations
    : selectedTravelZone === 'international'
      ? internationalDestinations
      : [];

  const resetForm = () => {
    setIsOpen(false);
    setSelectedService('');
    setSelectedTravelZone('');
    setSelectedDestination('');
    setDepartureDate('');
    setReturnDate('');
    setNumberOfPax('1');
    setHotelCategory('');
    setFormError('');
  };

  const openModal = () => {
    setFormError('');
    setIsOpen(true);
  };

  useImperativeHandle(ref, () => ({ openModal }));

  useEffect(() => {
    const handleOpen = () => openModal();
    window.addEventListener(reservationEventName, handleOpen);
    return () => window.removeEventListener(reservationEventName, handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') resetForm();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const validate = () => {
    if (!selectedService) {
      setFormError('Veuillez sélectionner un type de service.');
      return false;
    }
    if (!isOmrahOrHajj && !selectedTravelZone) {
      setFormError('Veuillez choisir « Au Maroc » ou « International ».');
      return false;
    }
    if (!isOmrahOrHajj && !selectedDestination) {
      setFormError('Veuillez sélectionner une destination.');
      return false;
    }
    if (isOmrahOrHajj && (!departureDate || !returnDate || !numberOfPax || !hotelCategory)) {
      setFormError('Veuillez compléter les dates, le nombre de voyageurs et la catégorie d’hôtel.');
      return false;
    }
    setFormError('');
    return true;
  };

  const reservationSummary = () => {
    const serviceLabel = services.find((service) => service.id === selectedService)?.label ?? selectedService;
    const destinationLabel = selectedDestination || (isOmrahOrHajj ? 'Médine & La Mecque' : 'À préciser');
    const travelZoneLabel = selectedTravelZone === 'morocco' ? 'Au Maroc' : selectedTravelZone === 'international' ? 'International' : '';
    let summary = `Bonjour Dehbi Voyages, je souhaite faire une réservation :\n- Service : ${serviceLabel}${travelZoneLabel ? `\n- Zone : ${travelZoneLabel}` : ''}\n- Destination : ${destinationLabel}`;

    if (isOmrahOrHajj) {
      summary += `\n- Date d’aller : ${departureDate}\n- Date de retour : ${returnDate}\n- Voyageurs : ${numberOfPax}\n- Catégorie d’hôtel : ${hotelCategory}`;
    }
    return { serviceLabel, destinationLabel, summary };
  };

  const handleWhatsAppReservation = () => {
    if (!validate()) return;
    const { summary } = reservationSummary();
    window.open(`https://wa.me/212663381004?text=${encodeURIComponent(summary)}`, '_blank', 'noopener,noreferrer');
    resetForm();
  };

  const handleEmailReservation = () => {
    if (!validate()) return;
    const { serviceLabel, destinationLabel, summary } = reservationSummary();
    const subject = `Demande de réservation — ${serviceLabel} — ${destinationLabel}`;
    window.open(`mailto:Dehbivoyages23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`, '_blank', 'noopener,noreferrer');
    resetForm();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-reservation-title"
          onClick={resetForm}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#FFB27D]/70 bg-[#C8FF42] shadow-[0_26px_80px_rgba(0,0,0,0.46)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#FF8C42] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15" aria-hidden="true">
                  <PlaneTakeoff size={19} />
                </span>
                <div>
                  <h2 id="quick-reservation-title" className="font-['Playfair_Display'] text-xl font-bold">Réserver Maintenant</h2>
                  <p className="text-xs font-medium text-white/85">Une réponse directe de Dehbi Voyages</p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Fermer la fenêtre de réservation"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[72vh] overflow-y-auto p-5 text-[#07111F] sm:p-6">
              <fieldset>
                <legend className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#1C5A2A]">Type de service</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${selectedService === service.id ? 'border-[#07111F] bg-[#07111F] text-white shadow-md' : 'border-[#4E9B40]/50 bg-white/35 text-[#07111F] hover:bg-white/65'}`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={selectedService === service.id}
                        onChange={(event) => {
                          setSelectedService(event.target.value);
                          setSelectedTravelZone('');
                          setSelectedDestination('');
                          setFormError('');
                        }}
                        className="h-4 w-4 accent-[#FF8C42]"
                      />
                      {service.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {!isOmrahOrHajj && (
                <div className="mt-5">
                  <fieldset>
                    <legend className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#1C5A2A]">Zone de voyage</legend>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <label className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold transition ${selectedTravelZone === 'morocco' ? 'border-[#FF8C42] bg-[#FF8C42] text-[#07111F] shadow-md' : 'border-[#4E9B40]/50 bg-white/35 text-[#07111F] hover:bg-white/65'}`}>
                        <input
                          type="radio"
                          name="travel-zone"
                          value="morocco"
                          checked={selectedTravelZone === 'morocco'}
                          onChange={() => {
                            setSelectedTravelZone('morocco');
                            setSelectedDestination('');
                            setFormError('');
                          }}
                          className="h-4 w-4 accent-[#FF8C42]"
                        />
                        Au Maroc
                      </label>
                      <label className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold transition ${selectedTravelZone === 'international' ? 'border-[#07111F] bg-[#07111F] text-white shadow-md' : 'border-[#4E9B40]/50 bg-white/35 text-[#07111F] hover:bg-white/65'}`}>
                        <input
                          type="radio"
                          name="travel-zone"
                          value="international"
                          checked={selectedTravelZone === 'international'}
                          onChange={() => {
                            setSelectedTravelZone('international');
                            setSelectedDestination('');
                            setFormError('');
                          }}
                          className="h-4 w-4 accent-[#6BFF42]"
                        />
                        International
                      </label>
                    </div>
                  </fieldset>

                  <label className="mt-4 block text-sm font-extrabold uppercase tracking-[0.12em] text-[#1C5A2A]">
                    Destination
                    <select
                      value={selectedDestination}
                      disabled={!selectedTravelZone}
                      onChange={(event) => setSelectedDestination(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#07111F]/25 bg-[#10213F] px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-white focus:ring-2 focus:ring-[#FF8C42] disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      <option value="">{selectedTravelZone ? '— Sélectionner une destination —' : '— Choisir d’abord une zone de voyage —'}</option>
                      {destinationsForSelectedZone.map((destination) => <option key={destination} value={destination}>{destination}</option>)}
                    </select>
                  </label>
                </div>
              )}

              {isOmrahOrHajj && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-bold text-[#1C5A2A]">Date d’aller
                    <input type="date" value={departureDate} onChange={(event) => setDepartureDate(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#07111F]/25 bg-white/75 px-3 py-2.5 text-[#07111F] outline-none focus:border-[#07111F] focus:ring-2 focus:ring-[#FF8C42]" />
                  </label>
                  <label className="text-sm font-bold text-[#1C5A2A]">Date de retour
                    <input type="date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#07111F]/25 bg-white/75 px-3 py-2.5 text-[#07111F] outline-none focus:border-[#07111F] focus:ring-2 focus:ring-[#FF8C42]" />
                  </label>
                  <label className="text-sm font-bold text-[#1C5A2A]">Voyageurs
                    <input type="number" min="1" value={numberOfPax} onChange={(event) => setNumberOfPax(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#07111F]/25 bg-white/75 px-3 py-2.5 text-[#07111F] outline-none focus:border-[#07111F] focus:ring-2 focus:ring-[#FF8C42]" />
                  </label>
                  <label className="text-sm font-bold text-[#1C5A2A]">Catégorie d’hôtel
                    <select value={hotelCategory} onChange={(event) => setHotelCategory(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#07111F]/25 bg-white/75 px-3 py-2.5 text-[#07111F] outline-none focus:border-[#07111F] focus:ring-2 focus:ring-[#FF8C42]">
                      <option value="">Sélectionner une catégorie</option>
                      {hotelCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                  </label>
                </div>
              )}

              {formError && <p role="alert" className="mt-4 rounded-xl border border-[#C0451D] bg-white/65 px-3 py-2 text-sm font-semibold text-[#8D2F16]">{formError}</p>}

              <div className="mt-5 flex items-start gap-2 rounded-xl border border-[#4E9B40]/45 bg-white/35 px-3 py-2.5 text-xs leading-5 text-[#244B2D]">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                Vous serez redirigé vers WhatsApp ou votre messagerie pour finaliser la demande avec notre équipe.
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                <button type="button" onClick={resetForm} className="rounded-xl border border-[#07111F]/25 bg-white/55 px-3 py-3 text-sm font-bold text-[#07111F] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#07111F]">Annuler</button>
                <button type="button" onClick={handleWhatsAppReservation} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17B85B] px-3 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#119747] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#C8FF42]"><MessageCircle size={16} aria-hidden="true" />WhatsApp</button>
                <button type="button" onClick={handleEmailReservation} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#246BDF] px-3 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#1958B8] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#C8FF42]"><Mail size={16} aria-hidden="true" />Gmail</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

WhatsAppReservation.displayName = 'WhatsAppReservation';
export default WhatsAppReservation;
