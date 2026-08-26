import { forwardRef, useEffect, useState } from 'react';

/**
 * Direction artistique : panorama premium de Tanger animé par la météo réelle :
 * jour lumineux, pluie douce et nuit bleu encre. Le changement d’image se fait
 * par fondu long, tandis que les accents Orange tropical restent lisibles.
 */

type HeroMode = 'auto' | 'day' | 'rain' | 'night';
type HeroScene = Exclude<HeroMode, 'auto'>;

type WeatherCurrent = {
  temperature_2m: number;
  precipitation: number;
  weather_code: number;
  is_day: number;
};

type WeatherStatus = {
  label: string;
  temperature: number | null;
};

const WEATHER_ENDPOINT = 'https://api.open-meteo.com/v1/forecast?latitude=35.7595&longitude=-5.834&current=temperature_2m,precipitation,weather_code,is_day&timezone=Africa%2FCasablanca';

const heroScenes: Record<HeroScene, { image: string; label: string; description: string; overlay: string; filter: string }> = {
  day: {
    image: '/manus-storage/mosquee-mohammed-v-tanger-hd_faa02adc.jpg',
    label: 'Jour clair',
    description: 'Panorama de Tanger en lumière naturelle',
    overlay: 'linear-gradient(90deg, rgba(5, 24, 53, 0.82) 0%, rgba(5, 24, 53, 0.56) 48%, rgba(5, 24, 53, 0.18) 100%)',
    filter: 'brightness(1.05) saturate(1.04)',
  },
  rain: {
    image: '/manus-storage/mosquee-mohammed-v-tanger-hd_faa02adc.jpg',
    label: 'Pluie douce',
    description: 'Aperçu météo de Tanger sous la pluie',
    overlay: 'linear-gradient(90deg, rgba(7, 22, 44, 0.86) 0%, rgba(7, 22, 44, 0.62) 50%, rgba(7, 22, 44, 0.28) 100%)',
    filter: 'brightness(0.78) saturate(0.72) grayscale(0.1)',
  },
  night: {
    image: '/manus-storage/mosquee-mohammed-v-tanger-hd_faa02adc.jpg',
    label: 'Nuit bleue',
    description: 'Tanger illuminée après le coucher du soleil',
    overlay: 'linear-gradient(90deg, rgba(1, 10, 26, 0.92) 0%, rgba(1, 10, 26, 0.69) 52%, rgba(1, 10, 26, 0.32) 100%)',
    filter: 'brightness(0.44) saturate(0.76) hue-rotate(7deg) contrast(1.08)',
  },
};

const rainCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);

const automaticScene = (): HeroScene => {
  const hour = Number(new Intl.DateTimeFormat('fr-FR', { timeZone: 'Africa/Casablanca', hour: '2-digit', hourCycle: 'h23' }).format(new Date()));
  return hour >= 8 && hour < 20 ? 'day' : 'night';
};

const weatherScene = (weather: WeatherCurrent): HeroScene => {
  if (!weather.is_day) return 'night';
  if (weather.precipitation > 0 || rainCodes.has(weather.weather_code)) return 'rain';
  return 'day';
};

const weatherLabel = (weather: WeatherCurrent): string => {
  if (weather.precipitation > 0 || rainCodes.has(weather.weather_code)) return 'Pluie réelle à Tanger';
  if (!weather.is_day) return 'Nuit réelle à Tanger';
  if ([1, 2, 3, 45, 48].includes(weather.weather_code)) return 'Ciel couvert à Tanger';
  return 'Ciel clair à Tanger';
};

const Hero = forwardRef((props, ref: any) => {
  const [mode, setMode] = useState<HeroMode>('auto');
  const [scheduledScene, setScheduledScene] = useState<HeroScene>(automaticScene);
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus>({ label: 'Météo de Tanger en cours', temperature: null });
  const [activeScene, setActiveScene] = useState<HeroScene>(automaticScene);
  const [leavingScene, setLeavingScene] = useState<HeroScene | null>(null);

  const scene = heroScenes[mode === 'auto' ? scheduledScene : mode];

  useEffect(() => {
    let isCurrent = true;

    const loadWeather = async () => {
      try {
        const response = await fetch(WEATHER_ENDPOINT);
        if (!response.ok) throw new Error('weather_unavailable');
        const payload = await response.json() as { current?: WeatherCurrent };
        if (!payload.current || !isCurrent) throw new Error('weather_payload_invalid');

        setScheduledScene(weatherScene(payload.current));
        setWeatherStatus({
          label: weatherLabel(payload.current),
          temperature: Math.round(payload.current.temperature_2m),
        });
      } catch {
        if (!isCurrent) return;
        setScheduledScene(automaticScene());
        setWeatherStatus({ label: 'Mode horaire de Tanger', temperature: null });
      }
    };

    void loadWeather();
    const timer = window.setInterval(() => void loadWeather(), 30 * 60_000);
    return () => {
      isCurrent = false;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.tangerAtmosphere = mode === 'auto' ? scheduledScene : mode;
  }, [mode, scheduledScene]);

  useEffect(() => {
    const nextScene = mode === 'auto' ? scheduledScene : mode;
    if (nextScene === activeScene) return;
    setLeavingScene(activeScene);
    setActiveScene(nextScene);
    const timer = window.setTimeout(() => setLeavingScene(null), 2_900);
    return () => window.clearTimeout(timer);
  }, [activeScene, mode, scheduledScene]);

  const handleReserveClick = () => {
    ref?.current?.openModal();
  };

  const modeText = mode === 'auto'
    ? `${weatherStatus.label}${weatherStatus.temperature !== null ? ` · ${weatherStatus.temperature}°C` : ''}`
    : `Démo · ${scene.label}`;

  const visibleScene = heroScenes[activeScene];

  return (
    <section className="relative h-[30rem] overflow-hidden md:h-[560px]" aria-label="En-tête Dehbi Voyages">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${visibleScene.image})`, filter: visibleScene.filter }} aria-hidden="true" />
      {leavingScene && (
        <div className="tanger-hero-image-fade-out absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroScenes[leavingScene].image})`, filter: heroScenes[leavingScene].filter }} aria-hidden="true" />
      )}
      <div className="absolute inset-0 transition-[background] duration-[2800ms] ease-in-out" style={{ background: scene.overlay }} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07111F]/55 to-transparent" aria-hidden="true" />

      <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-4 pt-12">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#07111F]/45 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm" aria-live="polite">
            <span className={`h-2 w-2 rounded-full ${mode === 'auto' ? 'bg-[#6BFF42]' : 'bg-[#FF8C42]'}`} aria-hidden="true" />
            {modeText}
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
            ['auto', 'Météo réelle'],
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
