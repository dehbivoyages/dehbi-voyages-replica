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
      <div className="bg-white rounded-lg shadow-2xl overflow-y-auto" style={{maxWidth: '280px', width: '100%', maxHeight: '200px'}}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-foreground truncate">{title}</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-1 rounded transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Container */}
        <div className="p-2 bg-black flex items-center justify-center min-h-[150px]">
          {videoUrl ? (
            <>
              {isLoading && (
                <div className="text-white text-center text-sm">
                  <p>Chargement...</p>
                </div>
              )}
              {hasError && (
                <div className="text-white text-center text-sm">
                  <p>Erreur vidéo</p>
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
                style={{ display: isLoading || hasError ? 'none' : 'block', maxWidth: '260px', maxHeight: '140px' }}
              >
                <source src={videoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </>
          ) : (
            <p className="text-white text-center text-sm">Aucune vidéo disponible</p>
          )}
        </div>
      </div>
    </div>
  );
}
