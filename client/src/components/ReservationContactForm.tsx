import { FormEvent, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  MessageCircle,
  Plane,
  Send,
  UserRound,
  Users,
} from 'lucide-react';

/**
 * Direction artistique : formulaire premium et chaleureux, avec l’Orange tropical
 * pour les actions, le Vert lime pour les confirmations et une mise en page sobre
 * qui reste lisible sur mobile comme sur desktop.
 */

const organizedTrips = [
  'Jakarta - Bali - Kuala Lumpur',
  'Le Vietnam Authentement',
  'Kuala Lumpur - Bali',
  'Omra avec Turquie',
  'Omra',
  'Omra Distinguée',
];

type FormStatus = 'idle' | 'success';

export default function ReservationContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    trip: '',
    departureDate: '',
    travelers: '1',
    message: '',
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setError('');
    if (status === 'success') setStatus('idle');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!formData.fullName || !formData.phone || !formData.trip || !formData.travelers) {
      setError('Veuillez remplir votre nom, votre téléphone, le programme choisi et le nombre de voyageurs.');
      return;
    }

    const message = [
      'Bonjour Dehbi Voyages,',
      '',
      'Je souhaite demander une réservation pour un voyage organisé.',
      `Nom : ${formData.fullName}`,
      `Téléphone : ${formData.phone}`,
      formData.email ? `E-mail : ${formData.email}` : '',
      `Programme : ${formData.trip}`,
      formData.departureDate ? `Date souhaitée : ${formData.departureDate}` : '',
      `Nombre de voyageurs : ${formData.travelers}`,
      formData.message ? `Message : ${formData.message}` : '',
      '',
      'Merci de me confirmer les disponibilités et les conditions de réservation.',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/212653940304?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setStatus('success');
  };

  return (
    <section id="reservation-form" className="relative overflow-hidden bg-[#10213f] py-16 md:py-20">
      <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#6BFF42]/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#FF8C42]/15 blur-3xl" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="pt-2 text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#6BFF42]/40 bg-white/10 px-4 py-2 text-sm font-semibold text-[#6BFF42]">
              <Plane size={16} aria-hidden="true" />
              Réservation personnalisée
            </div>
            <h2 className="mb-5 font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
              Préparez votre prochain départ
            </h2>
            <p className="max-w-xl text-base leading-7 text-white/75 md:text-lg">
              Partagez votre projet avec notre équipe. Nous vous répondrons rapidement avec les disponibilités, les tarifs et les détails du programme sélectionné.
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/85">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8C42] text-white">
                  <MessageCircle size={19} aria-hidden="true" />
                </span>
                <span>Échange direct avec Dehbi Voyages sur WhatsApp</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6BFF42] text-[#10213f]">
                  <CheckCircle2 size={19} aria-hidden="true" />
                </span>
                <span>Une demande claire, sans engagement de paiement</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-2xl md:p-8" noValidate>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF8C42]">Votre demande</p>
                <h3 className="mt-2 font-['Playfair_Display'] text-3xl font-bold text-slate-900">Réserver maintenant</h3>
              </div>
              <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#6BFF42]/20 text-[#10213f] sm:flex" aria-hidden="true">
                <Send size={22} />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <UserRound size={16} className="text-[#FF8C42]" aria-hidden="true" /> Nom complet <span className="text-[#FF8C42]">*</span>
                </span>
                <input
                  required
                  value={formData.fullName}
                  onChange={(event) => updateField('fullName', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20"
                  placeholder="Votre nom et prénom"
                  autoComplete="name"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MessageCircle size={16} className="text-[#FF8C42]" aria-hidden="true" /> Téléphone / WhatsApp <span className="text-[#FF8C42]">*</span>
                </span>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20"
                  placeholder="+212 6 XX XX XX XX"
                  autoComplete="tel"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Mail size={16} className="text-[#FF8C42]" aria-hidden="true" /> E-mail
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20"
                  placeholder="vous@exemple.com"
                  autoComplete="email"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Plane size={16} className="text-[#FF8C42]" aria-hidden="true" /> Programme souhaité <span className="text-[#FF8C42]">*</span>
                </span>
                <select
                  required
                  value={formData.trip}
                  onChange={(event) => updateField('trip', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20"
                >
                  <option value="">Sélectionner un programme</option>
                  {organizedTrips.map((trip) => (
                    <option key={trip} value={trip}>{trip}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarDays size={16} className="text-[#FF8C42]" aria-hidden="true" /> Date souhaitée
                </span>
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(event) => updateField('departureDate', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Users size={16} className="text-[#FF8C42]" aria-hidden="true" /> Nombre de voyageurs <span className="text-[#FF8C42]">*</span>
                </span>
                <input
                  required
                  min="1"
                  max="50"
                  type="number"
                  value={formData.travelers}
                  onChange={(event) => updateField('travelers', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Votre message</span>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(event) => updateField('message', event.target.value)}
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#FF8C42] focus:ring-2 focus:ring-[#FF8C42]/20"
                placeholder="Précisez vos besoins, votre budget ou vos questions..."
              />
            </label>

            {error && (
              <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            {status === 'success' && (
              <p role="status" className="mt-4 flex items-start gap-2 rounded-xl border border-[#6BFF42] bg-[#6BFF42]/15 px-4 py-3 text-sm font-medium text-slate-800">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-700" aria-hidden="true" />
                Votre demande est prête. WhatsApp s’est ouvert pour envoyer les informations à notre équipe.
              </p>
            )}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF8C42] px-5 py-3.5 font-bold text-white shadow-lg shadow-[#FF8C42]/20 transition hover:bg-[#eb7330] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2"
            >
              <Send size={18} aria-hidden="true" />
              Envoyer ma demande sur WhatsApp
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Vos informations servent uniquement à traiter votre demande de réservation.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

