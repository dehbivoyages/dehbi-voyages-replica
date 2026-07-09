import { Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    // Simulation d'abonnement
    console.log('Email abonné:', email);
    setIsSubscribed(true);
    setEmail('');

    // Réinitialiser après 5 secondes
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-blue-50">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Restez Informé des Meilleures Offres
            </h2>
            <p className="text-lg text-muted-foreground">
              Abonnez-vous à notre newsletter pour recevoir les offres spéciales, les nouveaux voyages et les promotions exclusives
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4" style={{ borderTopColor: '#FF8C42' }}>
            {isSubscribed ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Merci de votre abonnement !</h3>
                <p className="text-muted-foreground text-center">
                  Vous recevrez bientôt nos meilleures offres et les nouveaux voyages directement dans votre boîte mail.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        placeholder="Votre adresse email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
                    style={{ backgroundColor: '#FF8C42' }}
                  >
                    S'abonner
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <p className="text-xs text-muted-foreground">
                  ✓ Pas de spam - Désinscription facile à tout moment
                </p>
              </form>
            )}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Offres Exclusives</h3>
              <p className="text-sm text-muted-foreground">
                Accédez aux promotions réservées aux abonnés
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✈️</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Nouveaux Voyages</h3>
              <p className="text-sm text-muted-foreground">
                Découvrez les destinations avant tout le monde
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Conseils de Voyage</h3>
              <p className="text-sm text-muted-foreground">
                Recevez des astuces et conseils pour vos voyages
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
