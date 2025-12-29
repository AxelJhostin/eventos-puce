import { CalendarIcon, ClockIcon, MapPinIcon, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrackedLink from "@/components/events/TrackedLink";
import ShareButton from "@/components/events/ShareButton";
import { Event } from '@/types';

interface EventSidebarProps {
  event: Event;
  formattedDate: string;
  formattedTime: string;
}

export default function EventSidebar({ event, formattedDate, formattedTime }: EventSidebarProps) {
  return (
    <div className="sticky top-24 space-y-6">
      
      {/* Tarjeta de Acción */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden p-6">
        <div className="space-y-6">
          
          {/* Fecha */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-puce-blue">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Fecha</p>
              <p className="font-bold text-slate-900 capitalize">{formattedDate}</p>
            </div>
          </div>

          {/* Hora */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-puce-blue">
              <ClockIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Hora</p>
              <p className="font-bold text-slate-900">{formattedTime}</p>
            </div>
          </div>

          {/* Ubicación */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-puce-blue">
              <MapPinIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Ubicación</p>
              <p className="font-bold text-slate-900">{event.location || 'Por definir'}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100"></div>

          {/* Botón Inscribirse (Tracked) */}
          <Button asChild className="w-full bg-puce-blue hover:bg-puce-dark text-white font-bold h-12 text-lg shadow-md shadow-blue-900/10 cursor-pointer">
            <TrackedLink eventId={event.id} href={event.registration_url || '#'}>
              Inscribirse Ahora
            </TrackedLink>
          </Button>
          
          <p className="text-xs text-center text-slate-400">
            * Serás redirigido al formulario oficial
          </p>

          {/* Botón Instagram (Tracked) */}
          {event.social_url && (
            <Button asChild variant="outline" className="w-full gap-2 border-slate-300 text-slate-700 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 font-bold transition-all h-12 cursor-pointer">
              <TrackedLink eventId={event.id} href={event.social_url} className="flex items-center justify-center w-full gap-2">
                <Instagram className="w-5 h-5" />
                Ver Más en Instagram
              </TrackedLink>
            </Button>
          )}
          
        </div>

        {/* Botón Compartir */}
        <div className="mt-4 pt-4 border-t border-slate-100">
           <ShareButton title={event.title} slug={event.slug} />
        </div>
      </div>
    </div>
  );
}