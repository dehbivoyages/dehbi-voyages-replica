import { forwardRef, useEffect, useState } from 'react';

/**
 * Direction artistique : panorama premium de Tanger, avec une lumière claire de jour,
 * une version de pluie douce et une nuit bleu encre. Les contrôles de démo restent
 * sobres afin de laisser l’Orange tropical porter les appels à l’action.
 */

type HeroMode = 'auto' | 'day' | 'rain' | 'night';
type HeroScene = Exclude<HeroMode, 'auto'>;

const heroScenes: Record<HeroScene, { image: string; label: string; description: string; overlay: string }> = {
  day: {
    image: '/manus-storage/hero-tanger-day_41a380d2.png',
    label: 'Jour clair',
    description: 'Panorama de Tanger en lumière naturelle',
    overlay: 'linear-gradient(90deg, rgba(5, 24, 53, 0.82) 0%, rgba(5, 24, 53, 0.56) 48%, rgba(5, 24, 53, 0.18) 100%)',
  },
  rain: {
    image: '/manus-storage/hero-tanger-rain_4037d604.png',
    label: 'Pluie douce',
    description: 'Aperçu météo de Tanger sous la pluie',
    overlay: 'linear-gradient(90deg, rgba(7, 22, 44, 0.86) 0%, rgba(7, 22, 44, 0.62) 50%, rgba(7, 22, 44, 0.28) 100%)',
  },
  night: {
    image: '/manus-storage/hero-tanger-night_5d0aa3c8.png',
    label: 'Nuit bleue',
    description: 'Tanger illuminée après le coucher du soleil',
    overlay: 'linear-gradient(90deg, rgba(1, 10, 26, 0.92) 0%, rgba(1, 10, 26, 0.69) 52%, rgba(1, 10, 26, 0.32) 100%)',
  },
};

const automaticScene = (): HeroScene => {
  const hour = new Date().getHours();
  return hour >= 8 && hour < 20 ? 'day' : 'night';
};

const Hero = forwardRef((props, ref: any) => {
  const [mode, setMode] = useState<HeroMode>('auto');
  const [scheduledScene, setScheduledScene] = useState<HeroScene>(automaticScene);

  useEffect(() => {
    const refreshScene = () => setScheduledScene(automaticScene());
    refreshScene();
    const timer = window.setInterval(refreshScene, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const scene = heroScenes[mode === 'auto' ? scheduledScene : mode];
  const handleReserveClick = () => {
    ref?.current?.openModal();
  };

  return (
    <section className="relative h-[30rem] overflow-hidden md:h-[560px]" aria-label="En-tête Dehbi Voyages">
      <div
        className="absolute inset-0 bg-cover bg-center transition-[background-image] duration-1000 ease-out"
        style={{ backgroundImage: `url(${scene.image})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 transition-colors duration-1000" style={{ background: scene.overlay }} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07111F]/55 to-transparent" aria-hidden="true" />

      <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-4 pt-12">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#07111F]/45 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
            <span className={`h-2 w-2 rounded-full ${mode === 'auto' ? 'bg-[#6BFF42]' : 'bg-[#FF8C42]'}`} aria-hidden="true" />
            {mode === 'auto' ? `Mode automatique · ${scene.label}` : `Démo · ${scene.label}`}
          </div>
          <h1 className="mb-4 text-4xl font-bold text-[#FF8C42] md:text-5xl">اختر وجهتك .. وعلينا ايصالك</h1>
          <p className="mb-8 max-w-xl text-lg leading-8 text-white/95">
            Voyages religieux, circuits marocains et destinations internationales. Depuis 2015, nous réalisons vos rêves de voyage.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button onClick={handleReserveClick} className="btn-primary bg-[#FF8C42] text-white hover:bg-[#F6762C]">Réserver Maintenant</button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-primary">En Savoir Plus</button>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-2" role="group" aria-label="Démonstration des paysages de Tanger">
          {([
            ['auto', 'Auto 12 h'],
            ['day', 'Jour'],
            ['rain', 'Pluie'],
            ['night', 'Nuit'],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-[#6BFF42] focus:ring-offset-2 focus:ring-offset-[#07111F] ${mode === value ? 'border-[#FF8C42] bg-[#FF8C42] text-white' : 'border-white/35 bg-[#07111F]/35 text-white/90 hover:border-white/70 hover:bg-white/15'}`}
            >
              {label}
            </button>
          ))}
          <span className="ml-1 hidden text-xs text-white/70 sm:inline">{scene.description}</span>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
