import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppReservation() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  const services = [
    { id: 'hotel', label: 'Hôtel' },
    { id: 'avion', label: 'Avion' },
    { id: 'hotel-avion', label: 'Hôtel + Avion' },
  ];

  const destinations = [
    'Tanger',
    'Casablanca',
    'Rabat',
    'Meknès',
    'Turquie',
    'Égypte',
    'Jordanie',
    'Arabie Saoudite',
    'Dubaï',
    'Malaisie',
    'Autre',
  ];

  const handleReservation = () => {
    if (!selectedService || !selectedDestination) {
      alert('Veuillez sélectionner un service et une destination');
      return;
    }

    const message = `Bonjour, je souhaite faire une réservation:\n- Service: ${services.find(s => s.id === selectedService)?.label}\n- Destination: ${selectedDestination}`;
    const whatsappUrl = `https://wa.me/212653940304?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setSelectedService('');
    setSelectedDestination('');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
        title="Réserver via WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="hidden sm:inline text-sm font-semibold">Réserver</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageCircle size={24} />
                <h2 className="text-lg font-bold">Réserver via WhatsApp</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-green-600 p-1 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Type de Service *
                </label>
                <div className="space-y-2">
                  {services.map((service) => (
                    <label key={service.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={selectedService === service.id}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Destination Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Destination *
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">-- Sélectionner une destination --</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Info Text */}
              <p className="text-xs text-muted-foreground">
                Vous serez redirigé vers WhatsApp pour finaliser votre réservation avec notre équipe.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-foreground rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleReservation}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
