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
    <div className="fixed bottom-6 left-6 z-40">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-20 left-0 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm shadow-lg animate-in fade-in duration-200">
          Contactez-nous sur WhatsApp
          <div className="absolute bottom-0 left-4 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1"></div>
        </div>
      )}

      {/* Bouton flottant */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-14 h-14 bg-[#17B85B] hover:bg-[#119747] text-white rounded-full border-2 border-white/80 shadow-lg shadow-[#17B85B]/30 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#6BFF42] focus:ring-offset-2 focus:ring-offset-background"
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
