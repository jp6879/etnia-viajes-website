import { MessageCircle } from "lucide-react";
import { CONTACT, WHATSAPP_MESSAGES } from "@/config/contact";

interface WhatsAppButtonProps {
  message?: string;
}

export const WhatsAppButton = ({ 
  message = WHATSAPP_MESSAGES.default 
}: WhatsAppButtonProps) => {
  const whatsappUrl = CONTACT.getWhatsAppUrl(message);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BA5A] hover:scale-110 transition-all duration-300 animate-fade-in"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};
