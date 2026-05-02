import { X } from 'lucide-react';
import { useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
        <div className="p-6 bg-black flex items-center justify-center">
          <video
            width="100%"
            height="auto"
            controls
            autoPlay
            className="rounded-lg max-w-full"
          >
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </div>
    </div>
  );
}
