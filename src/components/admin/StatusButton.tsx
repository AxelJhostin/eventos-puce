'use client';

import { toggleEventStatus } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // ✅ Ahora sí funciona porque ya lo instalaste

export default function StatusButton({ eventId, currentStatus }: { eventId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  
  // Si no tiene status, asumimos que es 'pending'
  const isPending = currentStatus === 'pending' || !currentStatus;

  const handleToggle = async () => {
    setLoading(true);
    try {
      // Calculamos el nuevo estado
      const newStatus = isPending ? 'approved' : 'pending';
      
      // Llamamos al servidor
      await toggleEventStatus(eventId, newStatus);
      
      // 🎉 Notificación bonita
      if (isPending) {
        toast.success("¡Evento Publicado!", {
            description: "Ahora es visible para todos los estudiantes."
        });
      } else {
        toast.info("Evento Ocultado", {
            description: "Se ha movido a la lista de pendientes."
        });
      }

    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar", {
          description: "No se pudo cambiar el estado del evento."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleToggle} 
      size="sm" 
      disabled={loading}
      variant={isPending ? "default" : "secondary"}
      className={`${isPending ? "bg-green-600 hover:bg-green-700 text-white" : "bg-slate-200 text-slate-600 hover:bg-slate-300"} font-bold transition-all min-w-[110px]`}
      title={isPending ? "Hacer público este evento" : "Ocultar evento del público"}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : isPending ? (
        <CheckCircle className="w-4 h-4 mr-2" />
      ) : (
        <XCircle className="w-4 h-4 mr-2" />
      )}
      
      {loading ? "..." : (isPending ? "Aprobar" : "Ocultar")}
    </Button>
  );
}