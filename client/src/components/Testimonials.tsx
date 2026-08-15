import { CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { openReservationDialog } from './WhatsAppReservation';

/**
 * Direction artistique : section de réassurance factuelle, sobre et premium. Aucun avis
 * ni évaluation client n’est affiché sans contenu authentifié fourni par l’agence.
 */

const commitments = [
  {
    title: 'Conseil personnalisé',
    description: 'Notre équipe vous aide à choisir la formule, les dates et les prestations adaptées à votre projet.',
    icon: MessageCircle,
  },
  {
    title: 'Informations claires',
    description: 'Les programmes, brochures et conditions utiles restent accessibles avant votre prise de décision.',
    icon: CheckCircle2,
  },
  {
    title: 'Réservation directe',
    description: 'Vous pouvez transmettre votre demande à l’agence par WhatsApp ou par e-mail depuis la fenêtre de réservation.',
    icon: ShieldCheck,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16 dark:bg-[#10213f]" aria-labelledby="travel-confidence-title">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF8C42]">Accompagnement Dehbi Voyages</p>
          <h2 id="travel-confidence-title" className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-foreground">Préparez votre prochain départ</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">Une demande claire suffit pour recevoir les disponibilités, les détails du programme et l’accompagnement adapté à votre voyage.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {commitments.map(({ title, description, icon: Icon }) => (
            <article key={title} className="card-bordered rounded-2xl p-6 text-center dark:bg-[#173550]">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#6BFF42]/20 text-[#1C5A2A] dark:text-[#BFFFAE]">
                <Icon size={23} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="btn-primary px-8 py-3"
            onClick={openReservationDialog}
          >
            Réserver Maintenant
          </button>
        </div>
      </div>
    </section>
  );
}
