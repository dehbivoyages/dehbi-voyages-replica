import { useState } from 'react';
import { MapPin, Globe } from 'lucide-react';

interface Destination {
  name: string;
  country: string;
  description: string;
  highlights: string[];
  image: string;
}

const destinations: Destination[] = [
  {
    name: 'Maroc',
    country: 'Afrique du Nord',
    description: 'Voyages spirituels et circuits marocains authentiques',
    highlights: ['Médinas historiques', 'Désert du Sahara', 'Montagnes de l\'Atlas', 'Côtes méditerranéennes'],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
  },
  {
    name: 'Égypte',
    country: 'Afrique du Nord',
    description: 'Pyramides, temples anciens et croisière sur le Nil',
    highlights: ['Pyramides de Gizeh', 'Croisière Nil', 'Temples de Louxor', 'Musée égyptien'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
  {
    name: 'Turquie',
    country: 'Asie Mineure',
    description: 'Istanbul, Cappadoce et la Côte Méditerranéenne',
    highlights: ['Mosquée Bleue', 'Cappadoce', 'Bosphore', 'Bazars d\'Istanbul'],
    image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=300&fit=crop',
  },
  {
    name: 'Arabie Saoudite',
    country: 'Moyen-Orient',
    description: 'Omra et expériences spirituelles inoubliables',
    highlights: ['La Mecque', 'Médine', 'Riyad moderne', 'Jeddah côtière'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
  {
    name: 'Dubaï',
    country: 'Émirats Arabes Unis',
    description: 'Luxe, shopping et architecture futuriste',
    highlights: ['Burj Khalifa', 'Palmiers artificiels', 'Shopping', 'Désert'],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
  },
  {
    name: 'Jordanie',
    country: 'Moyen-Orient',
    description: 'Pétra, Mer Morte et Wadi Rum',
    highlights: ['Pétra rose', 'Mer Morte', 'Wadi Rum', 'Aqaba'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
];

export default function InteractiveMap() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(destinations[0]);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nos Destinations Principales</h2>
          <p className="text-lg text-gray-600">Explorez nos destinations et découvrez des expériences inoubliables</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destination Card */}
          <div className="lg:col-span-2">
            {selectedDestination && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={selectedDestination.image}
                    alt={selectedDestination.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe size={24} />
                        <span className="text-sm font-semibold">{selectedDestination.country}</span>
                      </div>
                      <h3 className="text-3xl font-bold">{selectedDestination.name}</h3>
                      <p className="mt-2 text-gray-100">{selectedDestination.description}</p>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="p-6">
                  <h4 className="font-bold text-foreground mb-4">Points forts de la destination</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedDestination.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <MapPin size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                    Réserver un Voyage
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Destination List */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h3 className="text-2xl font-bold text-foreground mb-6">Destinations</h3>
            <div className="space-y-3">
              {destinations.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => setSelectedDestination(dest)}
                  className={`w-full text-left p-4 rounded-lg transition-all transform hover:scale-105 ${
                    selectedDestination?.name === dest.name
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-bold">{dest.name}</div>
                  <div className={`text-sm ${selectedDestination?.name === dest.name ? 'text-blue-100' : 'text-gray-600'}`}>
                    {dest.country}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
