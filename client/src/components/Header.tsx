import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import TravelClock from './TravelClock';

/**
 * Direction artistique : en-tête lumineux, précis et premium, enrichi d’un contrôle
 * de thème discret mais immédiatement identifiable, sans encombrer la navigation.
 */

interface HeaderProps {
  onReserveClick?: () => void;
}

export default function Header({ onReserveClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themePreview, setThemePreview] = useState<'light' | 'dark' | null>(null);
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const handleThemeToggle = () => {
    const nextTheme = isDarkTheme ? 'light' : 'dark';
    setThemePreview(nextTheme);
    toggleTheme?.();
    window.setTimeout(() => setThemePreview(null), 900);
  };

  useEffect(() => {
    const handleThemeShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable = target?.matches('input, textarea, select, [contenteditable="true"]');

      if (!isEditable && event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === 't') {
        event.preventDefault();
        handleThemeToggle();
      }
    };

    window.addEventListener('keydown', handleThemeShortcut);
    return () => window.removeEventListener('keydown', handleThemeShortcut);
  }, [isDarkTheme, toggleTheme]);

  const navItems = [
    { label: 'Spirituel', href: '#spirituel' },
    { label: 'Maroc', href: '#maroc' },
    { label: 'International', href: '#international' },
    { label: 'Contact', href: '#reservation-form' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="grid min-h-[72px] grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 md:grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] lg:gap-5">
          {/* Logo */}
          <a href="#" className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90">
            <img
              src="/manus-storage/dehbi-voyages-logo_d65e39fd.png"
              alt="Dehbi Voyages Logo"
              className="h-16 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden min-w-0 justify-self-center md:flex items-center gap-5 whitespace-nowrap lg:gap-8">
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

          {/* Theme toggle: own desktop column, with a persistent state label. */}
          <div className="theme-toggle-control hidden items-center gap-2 rounded-full border border-border bg-muted/70 px-2 py-1.5 text-muted-foreground shadow-sm md:flex">
            <Sun size={15} aria-hidden="true" className={isDarkTheme ? 'opacity-45' : 'text-[#FF8C42]'} />
            <Switch
              checked={isDarkTheme}
              onCheckedChange={handleThemeToggle}
              aria-label={isDarkTheme ? 'Activer le mode clair' : 'Activer le mode sombre'}
              title="Basculez aussi avec Maj + T"
              className="theme-toggle-switch h-5 w-9 data-[state=checked]:bg-[#6BFF42] data-[state=unchecked]:bg-[#FF8C42]"
            />
            <Moon size={15} aria-hidden="true" className={isDarkTheme ? 'text-[#6BFF42]' : 'opacity-45'} />
            <span className={`hidden rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] lg:inline ${isDarkTheme ? 'bg-[#6BFF42]/15 text-[#BFFFAE]' : 'bg-[#FF8C42]/15 text-[#d86d2d]'}`}>
              {isDarkTheme ? 'Nuit' : 'Clair'}
            </span>
          </div>

          {/* Dedicated clock column: kept separate from navigation and CTA to prevent overlap */}
          <div className="hidden min-w-[210px] justify-self-end border-l border-border pl-4 md:block lg:min-w-[224px]">
            <TravelClock />
          </div>

          {/* Dedicated desktop CTA column */}
          <button className="btn-primary hidden shrink-0 md:block" onClick={onReserveClick}>
            Réserver
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="theme-toggle-mobile inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-foreground transition hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-[#6BFF42] md:hidden"
            onClick={handleThemeToggle}
            aria-label={isDarkTheme ? 'Activer le mode clair' : 'Activer le mode sombre'}
            title={`${isDarkTheme ? 'Mode clair' : 'Mode sombre'} — raccourci Maj + T`}
          >
            {isDarkTheme ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-foreground transition hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-[#6BFF42] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm font-semibold text-foreground">
              <span className="flex items-center gap-2">{isDarkTheme ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />} {isDarkTheme ? 'Mode nuit actif' : 'Mode clair actif'}</span>
              <Switch
                checked={isDarkTheme}
                onCheckedChange={handleThemeToggle}
                aria-label={isDarkTheme ? 'Activer le mode clair' : 'Activer le mode sombre'}
                className="h-5 w-9 data-[state=checked]:bg-[#6BFF42] data-[state=unchecked]:bg-[#FF8C42]"
              />
            </div>
            <TravelClock className="w-full justify-center" />
            <button className="btn-primary w-full" onClick={onReserveClick}>
              Réserver
            </button>
          </nav>
        )}
      </div>

      {themePreview && (
        <>
          <div aria-hidden="true" className={`theme-transition-preview theme-transition-preview-${themePreview}`} />
          <div role="status" className="theme-preview-toast fixed right-5 top-[88px] z-[60] flex items-center gap-3 rounded-2xl border border-[#6BFF42]/50 bg-[#10213F]/95 px-4 py-3 text-sm font-semibold text-[#F8F4EA] shadow-xl shadow-black/30 backdrop-blur-md">
            {themePreview === 'dark' ? <Moon size={18} className="text-[#BFFFAE]" aria-hidden="true" /> : <Sun size={18} className="text-[#FFB27D]" aria-hidden="true" />}
            <span><span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#BFFFAE]">Aperçu du thème</span>{themePreview === 'dark' ? 'Mode nuit activé' : 'Mode clair activé'}</span>
          </div>
        </>
      )}
    </header>
  );
}
