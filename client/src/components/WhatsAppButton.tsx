import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = "212663381004",
  message = "Bonjour Dehbi Voyages, je souhaite en savoir plus sur vos voyages organisés.",
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm shadow-lg animate-in fade-in duration-200">
          Contactez-nous sur WhatsApp
          <div className="absolute bottom-0 right-4 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1"></div>
        </div>
      )}

      {/* Bouton flottant */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contacter via WhatsApp"
        title="Contactez-nous sur WhatsApp"
      >
        <MessageCircle size={24} className="fill-current" />
      </button>

      {/* Badge de notification */}
      <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </div>
  );
}
