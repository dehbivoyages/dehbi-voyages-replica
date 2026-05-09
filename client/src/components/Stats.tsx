import { useState, useEffect, useRef } from 'react';

interface StatItem {
  number: number;
  suffix: string;
  label: string;
}

export default function Stats() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    { number: 2000, suffix: '+', label: 'Clients Satisfaits' },
    { number: 50, suffix: '+', label: 'Destinations' },
    { number: 10, suffix: '+', label: 'Années d\'Expérience' },
    { number: 24, suffix: '/7', label: 'Support Client' },
  ];

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
      className="bg-gradient-to-r from-blue-700 to-blue-600 py-12 md:py-16"
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
              <div className="text-sm md:text-base text-blue-100 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
