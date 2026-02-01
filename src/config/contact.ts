/**
 * Configuración de contacto centralizada
 * Usa variables de entorno con fallbacks para desarrollo
 */
export const CONTACT = {
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '5491124943224',
  phone: '+54 9 11 2494-3224',
  email: 'info@etniaviajes.com',
  
  // URLs pre-formateadas
  getWhatsAppUrl: (message?: string) => {
    const encodedMessage = message ? encodeURIComponent(message) : '';
    return `https://wa.me/${CONTACT.whatsapp}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  },
  
  getPhoneUrl: () => `tel:+${CONTACT.whatsapp}`,
};

// Mensajes predefinidos para WhatsApp
export const WHATSAPP_MESSAGES = {
  default: 'Hola! Quiero consultar por un viaje',
  package: (packageName: string) => `Hola! Me interesa el paquete ${packageName}`,
  destination: (destinationName: string, country?: string) => 
    `Hola! Me interesa consultar por paquetes a ${destinationName}${country ? `, ${country}` : ''}`,
  region: (regionName: string) => `Hola! Me interesa un viaje a ${regionName}`,
};
