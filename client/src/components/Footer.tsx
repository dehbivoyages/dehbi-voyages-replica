import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">Dehbi Voyages</span>
                <span className="text-xs text-gray-400">اختر وجهتك</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Votre partenaire de voyage de confiance depuis 2015.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#spirituel" className="hover:text-primary transition-colors">Voyages Spirituels</a></li>
              <li><a href="#maroc" className="hover:text-primary transition-colors">Circuits Touristiques</a></li>
              <li><a href="#international" className="hover:text-primary transition-colors">Billetterie Aérienne</a></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-bold mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#maroc" className="hover:text-primary transition-colors">Maroc</a></li>
              <li><a href="#international" className="hover:text-primary transition-colors">Turquie</a></li>
              <li><a href="#international" className="hover:text-primary transition-colors">Égypte</a></li>
              <li><a href="#international" className="hover:text-primary transition-colors">Dubaï</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Nous Contacter</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">Téléphone</p>
                <p className="font-semibold">+212 5 39 40 30 04</p>
                <p className="font-semibold">+212 6 63 38 10 04</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-semibold">Dehbivoyages23@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          {/* Contact Form */}
          <div className="mb-8">
            <h4 className="font-bold mb-4">Nous Contacter</h4>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Votre Nom"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                placeholder="Votre Email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-primary"
              />
              <input
                type="tel"
                placeholder="Votre Téléphone"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-primary"
              />
              <textarea
                placeholder="Votre Message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-primary"
              />
              <button type="submit" className="btn-primary w-full">
                Envoyer
              </button>
            </form>
          </div>

          {/* Social Links & Hours */}
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-700">
            <div>
              <h4 className="font-bold mb-4">Horaires</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Lundi - Vendredi: 09:00 - 18:00</p>
                <p>Samedi: 10:00 - 15:00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suivez-nous</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-700">
          <p>&copy; 2026 Dehbi Voyages. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
