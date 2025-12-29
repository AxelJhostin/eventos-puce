import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftIcon } from 'lucide-react';
import { Event } from '@/types'; 

export default function EventHero({ event }: { event: Event }) {
  return (
    <div className="relative h-[400px] w-full bg-slate-900 overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img 
          src={event.image_url || '/placeholder-event.jpg'} 
          alt={event.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      {/* Contenido Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver al inicio
        </Link>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge className="bg-puce-gold text-puce-blue hover:bg-yellow-400 text-sm px-3 py-1">
            {event.category.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="text-white border-white/30 backdrop-blur-md">
            {event.scope.toUpperCase()}
          </Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-4xl shadow-sm">
          {event.title}
        </h1>
      </div>
    </div>
  );
}