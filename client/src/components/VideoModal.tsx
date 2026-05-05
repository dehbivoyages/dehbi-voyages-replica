import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Reset loading state when modal opens
      setIsLoading(true);
      setHasError(false);
      
      // Force reload of video
      videoRef.current.load();
    }
  }, [isOpen, videoUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-y-auto" style={{maxWidth: '400px', width: '100%', maxHeight: '300px'}}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Container */}
        <div className="p-4 bg-black flex items-center justify-center min-h-[250px]">
          {videoUrl ? (
            <>
              {isLoading && (
                <div className="text-white text-center">
                  <p>Chargement de la vidéo...</p>
                </div>
              )}
              {hasError && (
                <div className="text-white text-center">
                  <p>Erreur lors du chargement de la vidéo. Veuillez réessayer.</p>
                </div>
              )}
              <video
                ref={videoRef}
                width="100%"
                height="auto"
                controls
                autoPlay
                className="rounded-lg max-w-full"
                onLoadedData={() => setIsLoading(false)}
                onCanPlay={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
                style={{ display: isLoading || hasError ? 'none' : 'block' }}
              >
                <source src={videoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </>
          ) : (
            <p className="text-white text-center">Aucune vidéo disponible pour ce service.</p>
          )}
        </div>
      </div>
    </div>
  );
}
