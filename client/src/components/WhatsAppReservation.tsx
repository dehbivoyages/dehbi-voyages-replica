import { useState } from 'react';
import { MessageCircle, X, Mail } from 'lucide-react';
import { forwardRef, useImperativeHandle } from 'react';

const WhatsAppReservation = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openModal: () => setIsOpen(true),
  }));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numberOfPax, setNumberOfPax] = useState('1');
  const [hotelCategory, setHotelCategory] = useState('');

  const services = [
    { id: 'hotel', label: 'Hôtel' },
    { id: 'avion', label: 'Avion' },
    { id: 'hotel-avion', label: 'Hôtel + Avion' },
    { id: 'bateaux', label: 'Bateaux' },
    { id: 'omrah', label: 'Omrah' },
    { id: 'hajj', label: 'Hajj' },
  ];

  const destinations = [
    // Maroc
    'Tanger',
    'Casablanca',
    'Rabat',
    'Meknès',
    'Fès',
    'Marrakech',
    'Agadir',
    // Moyen-Orient
    'Turquie',
    'Égypte',
    'Jordanie',
    'Arabie Saoudite',
    'Dubaï',
    'Oman',
    'Liban',
    // Asie
    'Malaisie',
    'Thaïlande',
    'Indonésie',
    'Singapour',
    'Japon',
    'Corée du Sud',
    'Vietnam',
    // Europe
    'France',
    'Italie',
    'Espagne',
    'Grèce',
    'Suisse',
    'Allemagne',
    'Pays-Bas',
    // Afrique
    'Sénégal',
    'Kenya',
    'Tanzanie',
    'Afrique du Sud',
    'Madagascar',
    // Amériques
    'États-Unis',
    'Canada',
    'Mexique',
    'Brésil',
    'Pérou',
    'Colombie',
    'Autre',
  ];

  const hotelCategories = [
    '3 étoiles',
    '4 étoiles',
    '5 étoiles',
    'Luxe',
    'Budget',
  ];

  const isOmrahOrHajj = selectedService === 'omrah' || selectedService === 'hajj';

  const handleWhatsAppReservation = () => {
    if (!selectedService) {
      alert('Veuillez sélectionner un service');
      return;
    }
    if (!isOmrahOrHajj && !selectedDestination) {
      alert('Veuillez sélectionner une destination');
      return;
    }

    if (isOmrahOrHajj && (!departureDate || !returnDate || !numberOfPax || !hotelCategory)) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    let message = `Bonjour, je souhaite faire une réservation:\n- Service: ${services.find(s => s.id === selectedService)?.label}\n- Destination: ${selectedDestination}`;
    
    if (isOmrahOrHajj) {
      message += `\n- Date d'aller: ${departureDate}\n- Date de retour: ${returnDate}\n- Nombre de passagers: ${numberOfPax}\n- Catégorie d'hôtel: ${hotelCategory}`;
    }

    const whatsappUrl = `https://wa.me/212653940304?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    resetForm();
  };

  const handleEmailReservation = () => {
    if (!selectedService) {
      alert('Veuillez sélectionner un service');
      return;
    }
    if (!isOmrahOrHajj && !selectedDestination) {
      alert('Veuillez sélectionner une destination');
      return;
    }

    if (isOmrahOrHajj && (!departureDate || !returnDate || !numberOfPax || !hotelCategory)) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    const subject = `Demande de Réservation - ${services.find(s => s.id === selectedService)?.label} - ${selectedDestination}`;
    let body = `Bonjour,\n\nJe souhaite faire une réservation avec les détails suivants:\n\nService: ${services.find(s => s.id === selectedService)?.label}\nDestination: ${selectedDestination}`;
    
    if (isOmrahOrHajj) {
      body += `\nDate d'aller: ${departureDate}\nDate de retour: ${returnDate}\nNombre de passagers: ${numberOfPax}\nCatégorie d'hôtel: ${hotelCategory}`;
    }

    body += '\n\nCordialement';
    
    const mailtoUrl = `mailto:Dehbivoyages23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    resetForm();
  };

  const resetForm = () => {
    setIsOpen(false);
    setSelectedService('');
    setSelectedDestination('');
    setDepartureDate('');
    setReturnDate('');
    setNumberOfPax('1');
    setHotelCategory('');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        title="Réserver via WhatsApp"
        style={{
          width: '64px',
          height: '64px',
          backgroundImage: 'url(/manus-storage/whatsapp_logo_dehbi_3SVvvJn7TaHH7qKQLYy8VM.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: 'transparent'
        }}
      >
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full my-8">
            {/* Header */}
            <div className="bg-orange-500 text-white p-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageCircle size={24} />
                <h2 className="text-lg font-bold">Réserver Maintenant</h2>
              </div>
              <button
                onClick={resetForm}
                className="hover:bg-orange-600 p-1 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#C8FF42' }}>
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

              {/* Destination Selection - Hidden for Omrah/Hajj */}
              {!isOmrahOrHajj && (
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
              )}

              {/* Omrah/Hajj Specific Fields */}
              {isOmrahOrHajj && (
                <>
                  {/* Departure Date */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Date d'aller *
                    </label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Return Date */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Date de retour *
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Number of Passengers */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Nombre de passagers *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={numberOfPax}
                      onChange={(e) => setNumberOfPax(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Hotel Category */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Catégorie d'hôtel *
                    </label>
                    <select
                      value={hotelCategory}
                      onChange={(e) => setHotelCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">-- Sélectionner une catégorie --</option>
                      {hotelCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Info Text */}
              <p className="text-xs text-muted-foreground">
                Vous serez redirigé vers WhatsApp ou Gmail pour finaliser votre réservation avec notre équipe.
              </p>

              {/* Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-foreground rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={handleWhatsAppReservation}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
                <button
                  onClick={handleEmailReservation}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2 text-sm"
                >
                  <Mail size={16} />
                  Gmail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
    );
});

WhatsAppReservation.displayName = 'WhatsAppReservation';
export default WhatsAppReservation;
