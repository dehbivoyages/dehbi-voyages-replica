import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import SpiritualTrips from '@/components/SpiritualTrips';
import MoroccanDestinations from '@/components/MoroccanDestinations';
import InternationalDestinations from '@/components/InternationalDestinations';
import PremiumServices from '@/components/PremiumServices';
import Testimonials from '@/components/Testimonials';
import WhatsAppReservation from '@/components/WhatsAppReservation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <SpiritualTrips />
        <MoroccanDestinations />
        <InternationalDestinations />
        <PremiumServices />
        <Testimonials />
      </main>
      <WhatsAppReservation />
      <Footer />
    </div>
  );
}
