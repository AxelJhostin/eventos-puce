import { getEventBySlug } from '@/services/eventService';
import { notFound } from 'next/navigation';
import ViewTracker from "@/components/events/ViewTracker";
import { Metadata } from "next";

// Importamos nuestros nuevos módulos
import EventHero from "@/components/events/EventHero";
import EventDescription from "@/components/events/EventDescription";
import EventSidebar from "@/components/events/EventSidebar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 🔥 GENERADOR DE METADATOS (Se queda aquí porque Next.js lo busca en page.tsx)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return { title: "Evento no encontrado - PUCE Manabí" };

  const imageUrl = event.image_url || "/logo-puce-azul.png"; 

  return {
    title: event.title,
    description: event.description?.substring(0, 150) + "...",
    openGraph: {
      title: event.title,
      description: `¡Inscríbete ahora! - Eventos PUCE Manabí`,
      url: `/eventos/${event.slug}`,
      siteName: 'PUCE Manabí',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: event.title }],
      locale: 'es_EC',
      type: 'website',
    },
  };
}

// 🔥 COMPONENTE PRINCIPAL
export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return notFound();

  // Preparamos los formatos de fecha aquí para pasarlos limpios al Sidebar
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(event.event_date).toLocaleDateString('es-EC', dateOptions);
  const formattedTime = new Date(event.event_date).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      <ViewTracker eventId={event.id} />

      {/* 1. Módulo Hero */}
      <EventHero event={event} />

      {/* 2. Grid de Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda */}
          <div className="lg:col-span-2 space-y-8">
            <EventDescription event={event} />
          </div>

          {/* Columna Derecha (Sidebar) */}
          <div className="lg:col-span-1">
             <EventSidebar 
                event={event} 
                formattedDate={formattedDate} 
                formattedTime={formattedTime} 
             />
          </div>

        </div>
      </div>
    </main>
  );
}