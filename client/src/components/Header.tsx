import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import TravelClock from './TravelClock';

interface HeaderProps {
  onReserveClick?: () => void;
}

export default function Header({ onReserveClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Spirituel', href: '#spirituel' },
    { label: 'Maroc', href: '#maroc' },
    { label: 'International', href: '#international' },
    { label: 'Contact', href: '#reservation-form' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img
              src="/manus-storage/dehbi-voyages-logo_d65e39fd.png"
              alt="Dehbi Voyages Logo"
              className="h-16 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden min-w-0 justify-self-center md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-bold"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Dedicated clock column: kept separate from navigation and CTA to prevent overlap */}
          <div className="hidden min-w-[210px] justify-self-end border-l border-slate-200 pl-4 md:block">
            <TravelClock />
          </div>

          {/* Dedicated desktop CTA column */}
          <button className="btn-primary hidden shrink-0 md:block" onClick={onReserveClick}>
            Réserver
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <TravelClock className="w-full justify-center" />
            <button className="btn-primary w-full" onClick={onReserveClick}>
              Réserver
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
