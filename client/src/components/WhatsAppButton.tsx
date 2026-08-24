import { MessageCircle } from "lucide-react";
import { useState } from "react";

/**
 * Direction artistique : accès WhatsApp Business orange tropical, lisible et
 * distinct du bouton Assistant, avec un monogramme « B » immédiatement repérable.
 */

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
        <div className="absolute bottom-20 left-0 whitespace-nowrap rounded-xl bg-[#07111F] px-4 py-2 text-sm font-semibold text-white shadow-lg animate-in fade-in duration-200">
          Contacter Dehbi Voyages sur WhatsApp Business
          <div className="absolute bottom-0 left-5 h-2 w-2 translate-y-1 rotate-45 bg-[#07111F]"></div>
        </div>
      )}

      {/* Bouton flottant */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] border-2 border-[#FFE2C8] bg-[#FF8C42] text-[#07111F] shadow-lg shadow-[#FF8C42]/35 transition-all duration-300 hover:scale-110 hover:bg-[#F6762C] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Contacter Dehbi Voyages via WhatsApp Business"
        title="WhatsApp Business Dehbi Voyages"
      >
        <span className="relative flex h-8 w-8 items-center justify-center" aria-hidden="true">
          <MessageCircle size={31} strokeWidth={2.6} />
          <span className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 text-[11px] font-black leading-none">B</span>
        </span>
      </button>
    </div>
  );
}
