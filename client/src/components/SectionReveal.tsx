import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Direction artistique : révélations de sections sobres et cinématiques, pensées pour
 * accompagner la lecture sans rivaliser avec les affiches et la palette Dehbi Voyages.
 */

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
}

export default function SectionReveal({ children, delay = 0 }: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const initialState = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };

  return (
    <motion.div
      className="section-reveal"
      initial={initialState}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.52, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
