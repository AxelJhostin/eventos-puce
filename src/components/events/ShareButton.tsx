'use client';

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner"; // Usamos las notificaciones que ya instalamos

interface ShareButtonProps {
  title: string;
  slug: string;
}

export default function ShareButton({ title, slug }: ShareButtonProps) {
  
  const handleShare = async () => {
    // Construimos la URL completa automáticamente
    const url = `${window.location.origin}/eventos/${slug}`;
    const shareData = {
      title: 'PUCE Manabí - Eventos',
      text: `¡Mira este evento! ${title}`,
      url: url,
    };

    // 1. Intentamos usar la función nativa del celular (Web Share API)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Compartir cancelado por el usuario");
      }
    } else {
      // 2. Si estamos en PC, copiamos al portapapeles
      try {
        await navigator.clipboard.writeText(url);
        toast.success("¡Enlace copiado!", {
          description: "Ya puedes pegarlo en WhatsApp o donde quieras."
        });
      } catch (err) {
        toast.error("Error al copiar enlace");
      }
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleShare}
      className="w-full gap-2 text-slate-600 border-slate-300 hover:bg-slate-50 hover:text-puce-blue transition-all"
    >
      <Share2 className="w-4 h-4" /> 
      Compartir Evento
    </Button>
  );
}