import { getAllEvents } from '@/services/eventService';
import EventCard from '@/components/events/EventCard';
import { Button } from '@/components/ui/button'; // Ejemplo de reuso

// Esto asegura que la página muestre datos frescos siempre
export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Usamos el servicio (Lógica separada de la vista)
  const events = await getAllEvents();

  return (
    <main className="min-h-screen bg-slate-50/50">
      
      {/* Hero Section (Banner) */}
      <section className="bg-puce-blue text-white py-16 md:py-24 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Eventos <span className="text-puce-gold">PUCE</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mb-8">
            La plataforma oficial de eventos académicos, concursos y ferias de la carrera de Ingeniería de Software.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
             <Button className="bg-puce-gold text-puce-blue hover:bg-yellow-400 font-bold px-8 py-6 text-lg">
                Explorar Eventos
             </Button>
          </div>
        </div>
      </section>

      {/* Grid de Eventos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
        
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Aquí ocurre la magia modular: Renderizamos una carta por cada evento */}
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl text-slate-500">No hay eventos activos por el momento.</h3>
          </div>
        )}

      </section>
    </main>
  );
}