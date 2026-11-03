import { useState, useEffect, useRef } from 'react';

interface StatItem {
  number: number;
  suffix: string;
  label: string;
}

const STATS_START_DATE = new Date('2026-11-02T00:00:00');

function getWeeksSinceStart(date: Date) {
  const elapsedMs = Math.max(0, date.getTime() - STATS_START_DATE.getTime());
  return Math.floor(elapsedMs / (7 * 24 * 60 * 60 * 1000));
}

function getWeeklyClientCount(date: Date) {
  const weeksSinceStart = getWeeksSinceStart(date);
  const weeklyIncreases = Array.from({ length: weeksSinceStart }, (_, index) => (index % 2 === 0 ? 7 : 8));
  return 2035 + weeklyIncreases.reduce((total, increase) => total + increase, 0);
}

export default function Stats() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [statsColor, setStatsColor] = useState('bg-[#2E7D32]');

  const stats: StatItem[] = [
    { number: getWeeklyClientCount(new Date()), suffix: '+', label: 'Clients Satisfaits' },
    { number: 50, suffix: '+', label: 'Destinations' },
    { number: 10, suffix: '+', label: 'Années d\'Expérience' },
    { number: 24, suffix: '/7', label: 'Support Client' },
  ];

  useEffect(() => {
    const monthlyColors = ['bg-[#2563EB]', 'bg-[#2E7D32]', 'bg-[#F97316]'];
    setStatsColor(monthlyColors[new Date().getMonth() % monthlyColors.length]);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000; // 2 secondes
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      const newCounts = stats.map((stat) => {
        const increment = Math.floor(stat.number * progress);
        return Math.min(increment, stat.number);
      });

      setCounts(newCounts);

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(stats.map((stat) => stat.number));
      }
    }, stepDuration);
  };

  return (
    <section
      ref={sectionRef}
      className={`${statsColor} py-12 md:py-16 transition-colors duration-500`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-3xl md:text-4xl font-black mb-2 transition-all duration-300">
                <span className="inline-block">
                  {counts[index]}
                  {stat.suffix}
                </span>
              </div>
              <div className="text-sm md:text-base text-white/90 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
