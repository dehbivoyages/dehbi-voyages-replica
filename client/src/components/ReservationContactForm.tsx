import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  MessageCircle,
  Plane,
  Send,
  Share2,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-react';

/**
 * Direction artistique : formulaire premium et chaleureux, avec l’Orange tropical
 * pour les actions, le Vert lime pour les confirmations et une mise en page sobre
 * qui reste lisible sur mobile comme sur desktop.
 */

const organizedTrips = [
  'Omra — Deux Omra en une',
  'Omra avec Kuala Lumpur',
  'Omra — Médine & La Mecque',
  'Omra avec Turquie',
  'Jakarta — Bali — Kuala Lumpur',
  'Le Vietnam autrement',
  'Kuala Lumpur — Bali',
  'Thaïlande — Bangkok, Krabi & Phuket',
  'Charm el-Cheikh — Le Caire',
  'Istanbul — Entre Orient et Occident',
  'Le Caire — Croisière — Hurghada',
  'Omra distinguée',
];

type FormStatus = 'idle' | 'success';
type ShareStatus = 'idle' | 'shared' | 'copied' | 'error';

export default function ReservationContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [shareStatus, setShareStatus] = useState<ShareStatus>('idle');
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
    setShareStatus('idle');
    if (status === 'success') setStatus('idle');
  };

  const handleShareTrip = async () => {
    const tripName = formData.trip || 'notre prochain voyage organisé';
    const shareTitle = `${tripName} — Dehbi Voyages`;
    const shareText = `Découvrez le programme ${tripName} avec Dehbi Voyages.`;
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        setShareStatus('shared');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setShareStatus('copied');
        return;
      }

      window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank', 'noopener,noreferrer');
      setShareStatus('shared');
    } catch (shareError) {
      if (shareError instanceof DOMException && shareError.name === 'AbortError') return;
      setShareStatus('error');
    }
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

            <AnimatePresence initial={false}>
              {status === 'success' && (
                <motion.div
                  key="reservation-success"
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, height: 0, y: -12 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 overflow-hidden rounded-2xl border border-[#6BFF42]/70 bg-gradient-to-br from-[#6BFF42]/25 via-[#f4ffe9] to-white px-5 py-5 text-slate-900 shadow-[0_12px_30px_rgba(107,255,66,0.16)]"
                >
                  <div className="flex items-start gap-4">
                    <motion.span
                      initial={{ scale: 0.4, rotate: -18 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.12, type: 'spring', stiffness: 260, damping: 15 }}
                      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6BFF42] text-[#10213f]"
                    >
                      <motion.span
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1.55, opacity: 0 }}
                        transition={{ delay: 0.18, duration: 0.7, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full border-2 border-[#6BFF42]"
                        aria-hidden="true"
                      />
                      <CheckCircle2 size={26} strokeWidth={2.4} aria-hidden="true" />
                    </motion.span>
                    <div className="min-w-0">
                      <motion.p
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18, duration: 0.28 }}
                        className="flex items-center gap-2 font-['Playfair_Display'] text-2xl font-bold text-[#10213f]"
                      >
                        Merci pour votre confiance <Sparkles size={18} className="text-[#FF8C42]" aria-hidden="true" />
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.26, duration: 0.28 }}
                        className="mt-1 text-sm leading-6 text-slate-700"
                      >
                        Merci{formData.fullName ? ` ${formData.fullName}` : ''} ! Votre demande est prête et WhatsApp vient de s’ouvrir pour transmettre vos informations à notre équipe.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.36, duration: 0.28 }}
                        className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#527c32]"
                      >
                        Notre équipe vous répondra rapidement.
                      </motion.p>
                      <motion.button
                        type="button"
                        onClick={handleShareTrip}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.44, duration: 0.28 }}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#10213f] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-[#10213f]/15 transition hover:bg-[#1b3560] focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2"
                      >
                        {shareStatus === 'copied' ? <CheckCircle2 size={16} aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
                        {shareStatus === 'copied' ? 'Lien copié' : 'Partager ce voyage'}
                      </motion.button>
                      <AnimatePresence initial={false}>
                        {shareStatus === 'copied' && (
                          <motion.span
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="ml-2 inline-block text-xs font-semibold text-[#527c32]"
                          >
                            Prêt à être envoyé à vos amis.
                          </motion.span>
                        )}
                        {shareStatus === 'shared' && (
                          <motion.span
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="ml-2 inline-block text-xs font-semibold text-[#527c32]"
                          >
                            Voyage partagé avec succès.
                          </motion.span>
                        )}
                        {shareStatus === 'error' && (
                          <motion.span
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="ml-2 inline-block text-xs font-semibold text-red-700"
                          >
                            Le partage n’a pas pu être lancé.
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold text-white shadow-lg transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 ${status === 'success' ? 'bg-[#10213f] shadow-[#10213f]/20 hover:bg-[#1b3560]' : 'bg-[#FF8C42] shadow-[#FF8C42]/20 hover:bg-[#eb7330]'}`}
            >
              {status === 'success' ? <CheckCircle2 size={18} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
              {status === 'success' ? 'Demande envoyée — ouvrir WhatsApp' : 'Envoyer ma demande sur WhatsApp'}
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

