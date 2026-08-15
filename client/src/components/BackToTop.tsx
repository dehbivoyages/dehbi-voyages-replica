import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * Direction artistique : contrôle flottant compact et premium, en Orange tropical,
 * positionné au-dessus de WhatsApp afin de faciliter la navigation sans la gêner.
 */

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateVisibility = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 520);
        animationFrame = null;
      });
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const returnToTop = () => window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
          onClick={returnToTop}
          className="fixed bottom-24 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FF8C42] text-white shadow-lg shadow-[#FF8C42]/30 transition hover:-translate-y-0.5 hover:bg-[#eb7330] hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6BFF42] focus:ring-offset-2 focus:ring-offset-background"
          aria-label="Retour en haut de page"
          title="Retour en haut"
        >
          <ArrowUp size={21} strokeWidth={2.4} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
