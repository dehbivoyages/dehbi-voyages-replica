import { useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import SpiritualTrips from '@/components/SpiritualTrips';
import MoroccanDestinations from '@/components/MoroccanDestinations';
import InternationalDestinations from '@/components/InternationalDestinations';
import PremiumServices from '@/components/PremiumServices';

import OrganizedTrips from '@/components/OrganizedTrips';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import ReservationContactForm from '@/components/ReservationContactForm';
import WhatsAppReservation from '@/components/WhatsAppReservation';

import Footer from '@/components/Footer';
import SectionReveal from '@/components/SectionReveal';

/**
 * Direction artistique : une progression de page calme et continue ; les sections se
 * dévoilent à la lecture tout en laissant les images et les offres conserver le premier rôle.
 */

export default function Home() {
  const whatsappRef = useRef<{ openModal: () => void }>(null);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header onReserveClick={() => whatsappRef.current?.openModal()} />
      <main>
        <SectionReveal><Hero ref={whatsappRef} /></SectionReveal>
        <SectionReveal delay={0.02}><Stats /></SectionReveal>
        <SectionReveal delay={0.03}><SpiritualTrips /></SectionReveal>
        <SectionReveal delay={0.04}><MoroccanDestinations /></SectionReveal>
        <SectionReveal delay={0.05}><InternationalDestinations /></SectionReveal>
        <SectionReveal delay={0.06}><PremiumServices /></SectionReveal>
        <SectionReveal delay={0.07}><OrganizedTrips /></SectionReveal>
        <SectionReveal delay={0.08}><ReservationContactForm /></SectionReveal>
        <SectionReveal delay={0.09}><Testimonials /></SectionReveal>
        <SectionReveal delay={0.1}><Newsletter /></SectionReveal>
      </main>
      <WhatsAppReservation ref={whatsappRef} />

      <Footer />
    </div>
  );
}
