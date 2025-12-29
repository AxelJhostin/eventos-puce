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
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        
        {/* CAPA 1: Imagen de Fondo */}
        <div className="absolute inset-0 z-0">
          <img
            // 👇 AQUÍ CAMBIARÁS LA FOTO LUEGO. He puesto una de una universidad genérica de alta calidad.
            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop"
            alt="Campus Universitario"
            className="w-full h-full object-cover scale-105" // scale-105 ayuda a evitar bordes blancos
          />
          {/* CAPA 2: Superposición Oscura (Overlay) */}
          {/* Esto es CLAVE: Una capa azul semitransparente encima de la foto para que el texto blanco se lea perfecto */}
          <div className="absolute inset-0 bg-puce-blue/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-puce-dark/90 via-transparent to-transparent" />
        </div>

        {/* CAPA 3: El Contenido (Texto y Botón) */}
        {/* 'relative z-10' asegura que esto esté ENCIMA de la imagen y el overlay */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          
          {/* Un pequeño badge arriba del título */}
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-puce-gold/20 text-puce-gold border border-puce-gold/30 backdrop-blur-sm text-sm font-bold uppercase tracking-wider">
            Ingeniería de Software
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
            Innovación, Código y <br className="hidden md:block"/>
            <span className="text-puce-gold">Futuro Tecnológico</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow">
            Tu puerta de entrada a los congresos, hackatones y ferias académicas más relevantes de la PUCE Manabí y el mundo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" className="bg-puce-gold text-puce-blue hover:bg-yellow-400 font-bold text-lg px-8 h-14 shadow-lg shadow-puce-gold/20 transition-all hover:scale-105">
                Explorar Eventos Activos
             </Button>
             <Button size="lg" variant="outline" className="text-black border-white hover:bg-white/10 font-bold text-lg px-8 h-14 backdrop-blur-sm transition-all">
                Saber Más
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