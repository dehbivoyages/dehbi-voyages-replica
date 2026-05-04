import { useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import SpiritualTrips from '@/components/SpiritualTrips';
import MoroccanDestinations from '@/components/MoroccanDestinations';
import InternationalDestinations from '@/components/InternationalDestinations';
import PremiumServices from '@/components/PremiumServices';
import InteractiveMap from '@/components/InteractiveMap';
import ImageGallery from '@/components/ImageGallery';
import OrganizedTrips from '@/components/OrganizedTrips';
import Testimonials from '@/components/Testimonials';
import WhatsAppReservation from '@/components/WhatsAppReservation';

import Footer from '@/components/Footer';

export default function Home() {
  const whatsappRef = useRef<{ openModal: () => void }>(null);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onReserveClick={() => whatsappRef.current?.openModal()} />
      <main>
        <Hero ref={whatsappRef} />
        <Stats />
        <SpiritualTrips />
        <MoroccanDestinations />
        <InternationalDestinations />
        <PremiumServices />
        <InteractiveMap />
        <ImageGallery />
        <OrganizedTrips />
        <Testimonials />
      </main>
      <WhatsAppReservation ref={whatsappRef} />

      <Footer />
    </div>
  );
}
