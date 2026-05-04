import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  destination: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    alt: 'Maroc - Médina de Fès',
    destination: 'Maroc',
    description: 'La médina historique de Fès avec ses ruelles authentiques',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    alt: 'Maroc - Désert du Sahara',
    destination: 'Maroc',
    description: 'Les dunes dorées du désert du Sahara marocain',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    alt: 'Égypte - Pyramides de Gizeh',
    destination: 'Égypte',
    description: 'Les majestueuses pyramides de Gizeh',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Égypte - Croisière sur le Nil',
    destination: 'Égypte',
    description: 'Croisière romantique sur le Nil',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=600&fit=crop',
    alt: 'Turquie - Istanbul',
    destination: 'Turquie',
    description: 'La Mosquée Bleue d\'Istanbul',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=600&fit=crop',
    alt: 'Turquie - Cappadoce',
    destination: 'Turquie',
    description: 'Les formations rocheuses uniques de Cappadoce',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    alt: 'Dubaï - Burj Khalifa',
    destination: 'Dubaï',
    description: 'Le Burj Khalifa, le plus haut bâtiment du monde',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Jordanie - Pétra',
    destination: 'Jordanie',
    description: 'La cité rose de Pétra',
  },
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const filteredImages = selectedDestination
    ? galleryImages.filter((img) => img.destination === selectedDestination)
    : galleryImages;

  const destinations = Array.from(new Set(galleryImages.map((img) => img.destination)));

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
    setSelectedImage(filteredImages[currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1]);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    setSelectedImage(filteredImages[(currentIndex + 1) % filteredImages.length]);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Galerie de Destinations</h2>
          <p className="text-lg text-gray-600">Découvrez les plus belles images de nos destinations</p>
        </div>

        {/* Destination Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setSelectedDestination(null)}
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              selectedDestination === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Toutes
          </button>
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setSelectedDestination(dest)}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${
                selectedDestination === dest
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {dest}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => {
                setSelectedImage(image);
                setCurrentIndex(filteredImages.indexOf(image));
              }}
              className="cursor-pointer group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-bold">{image.destination}</p>
                  <p className="text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedImage.destination}</h3>
                  <p className="text-gray-600 text-sm">{selectedImage.description}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="hover:bg-gray-100 p-2 rounded transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Image */}
              <div className="relative bg-black flex items-center justify-center min-h-[400px]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[500px] object-contain"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                  {currentIndex + 1} / {filteredImages.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
