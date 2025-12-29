import { getEventBySlug } from '@/services/eventService';
import { notFound } from 'next/navigation';
import { CalendarIcon, MapPinIcon, Share2Icon, ArrowLeftIcon, ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Esta interfaz define qué parámetros recibe la página (el slug de la URL)
interface PageProps {
  params: Promise<{ slug: string }>; // En Next.js 15+, params es una Promesa
}

export default async function EventDetailPage({ params }: PageProps) {
  // 1. Obtenemos el slug de la URL
  const { slug } = await params;
  
  // 2. Buscamos los datos en la base de datos
  const event = await getEventBySlug(slug);

  // 3. Si no existe el evento, mandamos al usuario a la página de Error 404
  if (!event) {
    return notFound();
  }

  // Formateamos las fechas para mostrarlas bonitas
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(event.event_date).toLocaleDateString('es-EC', dateOptions);
  const formattedTime = new Date(event.event_date).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HERO SECTION (Imagen y Título) --- */}
      <div className="relative h-[400px] w-full bg-slate-900 overflow-hidden">
        {/* Imagen de fondo con overlay */}
        <div className="absolute inset-0">
          <img 
            src={event.image_url || '/placeholder-event.jpg'} 
            alt={event.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        {/* Contenido sobre la imagen */}
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

      {/* --- CONTENIDO PRINCIPAL (2 Columnas) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA (Descripción) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-puce-blue mb-4">Sobre este evento</h2>
              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
              
              {/* Aquí podrías agregar más secciones estáticas por ahora */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">Requisitos</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Ser estudiante activo de la PUCE Manabí.</li>
                  <li>Registrarse antes de la fecha límite.</li>
                  <li>Traer laptop propia (si aplica).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA (Sticky Sidebar con Info Clave) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Tarjeta de Acción */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden p-6">
                <div className="space-y-6">
                  
                  {/* Bloque Fecha */}
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-puce-blue">
                      <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Fecha</p>
                      <p className="font-bold text-slate-900 capitalize">{formattedDate}</p>
                    </div>
                  </div>

                  {/* Bloque Hora */}
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-puce-blue">
                      <ClockIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Hora</p>
                      <p className="font-bold text-slate-900">{formattedTime}</p>
                    </div>
                  </div>

                  {/* Bloque Ubicación */}
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

                  <Button className="w-full bg-puce-blue hover:bg-puce-dark text-white font-bold h-12 text-lg shadow-md shadow-blue-900/10">
                    <a href={event.registration_url || '#'} target="_blank" rel="noopener noreferrer">
                      Inscribirse Ahora
                    </a>
                  </Button>
                  
                  <p className="text-xs text-center text-slate-400">
                    * Serás redirigido al formulario oficial
                  </p>
                </div>
              </div>

              {/* Botón Compartir */}
              <Button variant="outline" className="w-full gap-2 text-slate-600 border-slate-300 hover:bg-slate-50">
                <Share2Icon className="w-4 h-4" /> Compartir Evento
              </Button>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}