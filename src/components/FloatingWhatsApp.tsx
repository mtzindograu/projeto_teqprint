"use client";

import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message?: string;
}

export function FloatingWhatsApp({ phoneNumber, message = "Olá, vim pelo site e gostaria de um orçamento." }: FloatingWhatsAppProps) {
  const getWhatsAppLink = () => {
    const msg = encodeURIComponent(message);
    return `https://wa.me/55${phoneNumber}?text=${msg}`;
  };

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 whatsapp-pulse bg-green-500 hover:bg-green-600 text-white px-4 py-3 md:px-6 md:py-4 rounded-full shadow-lg transition-all hover:scale-105"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      <span className="hidden md:inline font-medium">Fazer orçamento</span>
    </a>
  );
}
