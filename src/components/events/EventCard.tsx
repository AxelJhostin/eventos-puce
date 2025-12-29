import { Event } from '@/types';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from 'lucide-react';

// Importamos los componentes "Premium" de Shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  // Formateo de fecha
  const formattedDate = new Date(event.event_date).toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 group">
      {/* Sección de Imagen */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {event.image_url ? (
          <img 
            src={event.image_url} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            Sin Imagen
          </div>
        )}
        
        {/* Badge Flotante */}
        <div className="absolute top-3 left-3 flex gap-2">
           <Badge variant="secondary" className="backdrop-blur-md bg-white/90 text-[#003366] font-bold shadow-sm">
              {event.category.toUpperCase()}
           </Badge>
        </div>
      </div>

      {/* Contenido */}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {event.scope}
            </span>
            <span className="text-xs font-medium text-[#EAB308] bg-[#EAB308]/10 px-2 py-1 rounded-full flex items-center gap-1">
               <CalendarIcon className="w-3 h-3" />
               {formattedDate}
            </span>
        </div>
        <CardTitle className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#003366] transition-colors">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <CardDescription className="line-clamp-3 text-slate-600">
          {event.description}
        </CardDescription>
        
        {/* Ubicación opcional */}
        {event.location && (
          <div className="mt-4 flex items-center text-xs text-slate-500">
            <MapPinIcon className="w-3.5 h-3.5 mr-1" />
            {event.location}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full bg-[#003366] hover:bg-[#002850] text-white font-semibold">
          <Link href={`/eventos/${event.slug}`} className="flex items-center justify-center gap-2">
            Ver Detalles <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}