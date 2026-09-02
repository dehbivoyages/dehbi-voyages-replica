import { forwardRef, useEffect, useMemo, useState } from 'react';

/**
 * Direction artistique : quatre vues documentaires de Tanger, chacune centrée
 * sur une mosquée emblématique. Les fonds alternent avec un fondu long, et le
 * voile bleu encre préserve la lisibilité des accents Orange tropical.
 */

type HeroMode = 'auto' | 'mohammedV' | 'port' | 'rmilat' | 'saoudienne';
type HeroScene = Exclude<HeroMode, 'auto'>;
type WeatherTone = 'clear' | 'rain' | 'night';

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

const heroScenes: Record<HeroScene, { image: string; label: string; description: string; overlay: string; filter: string; credit: string; creditUrl: string }> = {
  mohammedV: {
    image: '/manus-storage/tanger-mosquee-mohammed-v-matin_62295c9a.webp',
    label: 'Mosquée Mohammed V · Tanger',
    description: 'Façade et minaret de la mosquée Mohammed V en lumière claire',
    overlay: 'linear-gradient(90deg, rgba(5, 24, 53, 0.80) 0%, rgba(5, 24, 53, 0.52) 48%, rgba(5, 24, 53, 0.16) 100%)',
    filter: 'brightness(1.04) saturate(1.03)',
    credit: 'Tangier City Tour',
    creditUrl: 'https://tanger.city-tour.com/',
  },
  port: {
    image: '/manus-storage/tanger-mosquee-port-matin_2013dcda.jpg',
    label: 'Mosquée du port · Tanger',
    description: 'Mosquée du port de Tanger et sa perspective maritime',
    overlay: 'linear-gradient(90deg, rgba(5, 24, 53, 0.80) 0%, rgba(5, 24, 53, 0.51) 48%, rgba(5, 24, 53, 0.16) 100%)',
    filter: 'brightness(1.02) saturate(1.04)',
    credit: 'Référence photo Dehbi Voyages',
    creditUrl: 'https://www.facebook.com/dehbi.voyages/',
  },
  rmilat: {
    image: '/manus-storage/tanger-mosquee-mesnana-soiree_e294a19c.jpg',
    label: 'Mosquée de Rmilat · Tanger',
    description: 'Mosquée de quartier et ciel atlantique dans le secteur de Rmilat',
    overlay: 'linear-gradient(90deg, rgba(12, 22, 35, 0.84) 0%, rgba(12, 22, 35, 0.55) 48%, rgba(12, 22, 35, 0.18) 100%)',
    filter: 'brightness(0.92) saturate(0.90)',
    credit: 'Référence photo Dehbi Voyages',
    creditUrl: 'https://www.facebook.com/dehbi.voyages/',
  },
  saoudienne: {
    image: '/manus-storage/U1R4xR9HrdJp_7b899715.jpg',
    label: 'Mosquée saoudienne · Tanger',
    description: 'Mosquée saoudienne de Tanger dans un panorama urbain',
    overlay: 'linear-gradient(90deg, rgba(7, 18, 37, 0.87) 0%, rgba(7, 18, 37, 0.57) 48%, rgba(7, 18, 37, 0.18) 100%)',
    filter: 'brightness(0.82) saturate(0.92)',
    credit: 'Référence publique à vérifier',
    creditUrl: 'https://www.facebook.com/dehbi.voyages/',
  },
};

const rainCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);

export const sceneForTangierHour = (hour: number): HeroScene => {
  const safeHour = Math.max(0, Math.min(23, Math.floor(hour)));
  const slot = Math.floor(safeHour / 3) % 4;
  return (['mohammedV', 'port', 'rmilat', 'saoudienne'] as const)[slot];
};

const timeScene = (): HeroScene => {
  const hour = Number(
    new Intl.DateTimeFormat('fr-FR', { timeZone: 'Africa/Casablanca', hour: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date())
      .find((part) => part.type === 'hour')?.value ?? '0',
  );
  return sceneForTangierHour(hour);
};

const weatherLabel = (weather: WeatherCurrent): string => {
  if (weather.precipitation > 0 || rainCodes.has(weather.weather_code)) return 'Pluie réelle à Tanger';
  if (!weather.is_day) return 'Nuit réelle à Tanger';
  if ([1, 2, 3, 45, 48].includes(weather.weather_code)) return 'Ciel couvert à Tanger';
  return 'Ciel clair à Tanger';
};

const Hero = forwardRef((props, ref: any) => {
  const [mode, setMode] = useState<HeroMode>('auto');
  const [scheduledScene, setScheduledScene] = useState<HeroScene>(timeScene);
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus>({ label: 'Météo de Tanger en cours', temperature: null });
  const [weatherTone, setWeatherTone] = useState<WeatherTone>('clear');
  const [activeScene, setActiveScene] = useState<HeroScene>(timeScene);
  const [leavingScene, setLeavingScene] = useState<HeroScene | null>(null);
  const [loadedScenes, setLoadedScenes] = useState<Record<HeroScene, boolean>>({
    mohammedV: false,
    port: false,
    rmilat: false,
    saoudienne: false,
  });

  const scene = heroScenes[mode === 'auto' ? scheduledScene : mode];
  const allSceneImages = useMemo(() => Object.entries(heroScenes) as [HeroScene, typeof heroScenes[HeroScene]][], []);
  const activeSceneIsReady = loadedScenes[activeScene];

  useEffect(() => {
    let isCurrent = true;

    allSceneImages.forEach(([sceneName, sceneDetails]) => {
      const image = new Image();
      const markLoaded = () => {
        if (!isCurrent) return;
        setLoadedScenes((current) => current[sceneName] ? current : { ...current, [sceneName]: true });
      };

      image.onload = markLoaded;
      image.onerror = markLoaded;
      image.src = sceneDetails.image;

      if (image.complete) markLoaded();
    });

    return () => {
      isCurrent = false;
    };
  }, [allSceneImages]);

  useEffect(() => {
    let isCurrent = true;

    const loadWeather = async () => {
      try {
        const response = await fetch(WEATHER_ENDPOINT);
        if (!response.ok) throw new Error('weather_unavailable');
        const payload = await response.json() as { current?: WeatherCurrent };
        if (!payload.current || !isCurrent) throw new Error('weather_payload_invalid');

        const isRainy = payload.current.precipitation > 0 || rainCodes.has(payload.current.weather_code);
        setScheduledScene(timeScene());
        setWeatherTone(!payload.current.is_day ? 'night' : isRainy ? 'rain' : 'clear');
        setWeatherStatus({
          label: weatherLabel(payload.current),
          temperature: Math.round(payload.current.temperature_2m),
        });
      } catch {
        if (!isCurrent) return;
        setScheduledScene(timeScene());
        setWeatherTone('clear');
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
    const timer = window.setInterval(() => setScheduledScene(timeScene()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const atmosphere = mode === 'auto'
      ? weatherTone === 'rain' ? 'rain' : weatherTone === 'night' ? 'night' : 'clear'
      : mode === 'saoudienne' ? 'night' : 'clear';
    document.documentElement.dataset.tangerAtmosphere = atmosphere;
  }, [mode, scheduledScene, weatherTone]);

  useEffect(() => {
    const nextScene = mode === 'auto' ? scheduledScene : mode;
    if (nextScene === activeScene) return;
    setLeavingScene(activeScene);
    setActiveScene(nextScene);
  }, [activeScene, mode, scheduledScene]);

  useEffect(() => {
    if (!leavingScene) return;
    const timer = window.setTimeout(() => setLeavingScene(null), 2_900);
    return () => window.clearTimeout(timer);
  }, [leavingScene]);

  const handleReserveClick = () => {
    ref?.current?.openModal();
  };

  const modeText = mode === 'auto'
    ? `${weatherStatus.label}${weatherStatus.temperature !== null ? ` · ${weatherStatus.temperature}°C` : ''}`
    : `Démo · ${scene.label}`;

  const visibleScene = heroScenes[activeScene];

  return (
    <section className="relative h-[30rem] overflow-hidden md:h-[560px]" aria-label="En-tête Dehbi Voyages">
      <div
        className={`tanger-hero-image-base absolute inset-0 bg-cover bg-center ${activeSceneIsReady ? 'is-ready' : ''}`}
        style={{ backgroundImage: `url(${visibleScene.image})`, filter: visibleScene.filter }}
        aria-hidden="true"
      />
      {leavingScene && (
        <div className="tanger-hero-image-fade-out absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroScenes[leavingScene].image})`, filter: heroScenes[leavingScene].filter }} aria-hidden="true" />
      )}
      <div className="absolute inset-0 transition-[background] duration-[2800ms] ease-in-out" style={{ background: scene.overlay }} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07111F]/55 to-transparent" aria-hidden="true" />
      {!activeSceneIsReady && (
        <div className="tanger-hero-loading absolute inset-0 z-[1] flex items-end px-4 pb-5 sm:px-8" aria-hidden="true">
          <span className="h-1 w-28 rounded-full bg-white/15">
            <span className="block h-full w-2/3 rounded-full bg-[#FF8C42]/85" />
          </span>
        </div>
      )}

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
            ['auto', 'Auto 3 h'],
            ['mohammedV', 'Mohammed V'],
            ['port', 'Port de Tanger'],
            ['rmilat', 'Rmilat'],
            ['saoudienne', 'Mosquée saoudienne'],
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
        <a href={scene.creditUrl} target="_blank" rel="noreferrer" className="mt-3 block w-fit text-[10px] text-white/55 underline-offset-2 hover:text-white hover:underline">
          Photo : {scene.credit}
        </a>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
