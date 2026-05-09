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
  // Turquie
  { id: '1', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/turkey_cappadocia-k9AwMyABhgLTCVhN5xe9y5.webp', alt: 'Cappadocia', destination: 'Turquie', description: 'Montgolfières au-dessus de Cappadoce' },
  { id: '2', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/turkey_bazaar-UiXsrvetVEd4hnkHTtUfQ5.webp', alt: 'Grand Bazaar', destination: 'Turquie', description: 'Le Grand Bazaar d\'Istanbul' },
  { id: '3', src: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=600&fit=crop', alt: 'Bosphore', destination: 'Turquie', description: 'Vue sur le Bosphore' },
  // Égypte
  { id: '4', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/egypt_luxor_temple-TCG5oj6YKD59RKjuQc6ZYz.webp', alt: 'Luxor Temple', destination: 'Égypte', description: 'Temple de Louxor' },
  { id: '5', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/egypt_nile_sunset-ZKHvkR9d6xcZnHWwSLJYUq.webp', alt: 'Nil Sunset', destination: 'Égypte', description: 'Coucher de soleil sur le Nil' },
  { id: '6', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/egypt_sphinx-grbKqH4ih9Zk5MAc5CkEAP.webp', alt: 'Sphinx', destination: 'Égypte', description: 'Le Grand Sphinx de Gizeh' },
  // Jordanie
  { id: '7', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/jordan_wadi_rum-2a2dq2fC6uFkKnYTJd87vL.webp', alt: 'Wadi Rum', destination: 'Jordanie', description: 'Désert de Wadi Rum' },
  { id: '8', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/jordan_dead_sea-7xfxcQqrj9bALYDMLKU7RW.webp', alt: 'Dead Sea', destination: 'Jordanie', description: 'La Mer Morte' },
  { id: '9', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', alt: 'Amman', destination: 'Jordanie', description: 'Amman, la capitale' },
  // Arabie Saoudite
  { id: '10', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/saudi_kingdom_tower-QNUZUWpyH6byr6xGGus8WM.webp', alt: 'Kingdom Tower', destination: 'Arabie Saoudite', description: 'Kingdom Tower à Riyad' },
  { id: '11', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/saudi_diriyah-FrQhscQsFuFNQ8kgTAVy9Q.webp', alt: 'Diriyah', destination: 'Arabie Saoudite', description: 'Diriyah, patrimoine UNESCO' },
  { id: '12', src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop', alt: 'Désert', destination: 'Arabie Saoudite', description: 'Désert saoudien' },
  // Dubaï
  { id: '13', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/dubai_palm_island-Nv8ZHzss6qiubzBTHDKp5m.webp', alt: 'Palm Island', destination: 'Dubaï', description: 'Palm Jumeirah' },
  { id: '14', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/dubai_gold_souk-g2vjBaSLxJ3RiroaDCXfce.webp', alt: 'Gold Souk', destination: 'Dubaï', description: 'Gold Souk de Dubaï' },
  { id: '15', src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop', alt: 'Burj Khalifa', destination: 'Dubaï', description: 'Burj Khalifa' },
  // Malaisie
  { id: '16', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/malaysia_batu_caves-BFequxqMz8z92gE9KfhVrn.webp', alt: 'Batu Caves', destination: 'Malaisie', description: 'Batu Caves' },
  { id: '17', src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663591781073/ViXFFkRctWTJLPBgidN9PC/malaysia_langkawi-fzNuV7Y4Cp4ypCZhb3ZjEG.webp', alt: 'Langkawi', destination: 'Malaisie', description: 'Plages de Langkawi' },
  { id: '18', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', alt: 'Kuala Lumpur', destination: 'Malaisie', description: 'Kuala Lumpur' },
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
