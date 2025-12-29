import { getAllEvents } from '@/services/eventService';
import EventCard from '@/components/events/EventCard';
import { Button } from '@/components/ui/button'; 
import SidebarFilters from '@/components/events/SidebarFilters';
import Link from 'next/link';

// Esto asegura que la página muestre datos frescos siempre
export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  // 1. Esperamos a que lleguen los parámetros de la URL
  const params = await searchParams;
  
  const search = typeof params.search === 'string' ? params.search : undefined;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const scope = typeof params.scope === 'string' ? params.scope : undefined;

  // 2. Pedimos los eventos FILTRADOS a la base de datos
  const events = await getAllEvents({ search, category, scope });

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
             {/* Botón 1: Baja al Grid */}
             <Link href="#eventos">
               <Button size="lg" className="bg-puce-gold text-puce-blue hover:bg-yellow-400 font-bold text-lg px-8 h-14 shadow-lg shadow-puce-gold/20 transition-all hover:scale-105">
                  Explorar Eventos Activos
               </Button>
             </Link>
             
             {/* Botón 2: Va a Admisiones PUCE */}
             <a href="https://pucem.edu.ec/grado" target="_blank" rel="noopener noreferrer">
               <Button size="lg" variant="outline" className="text-black border-white hover:bg-white/10 font-bold text-lg px-8 h-14 backdrop-blur-sm transition-all">
                  Saber Más
               </Button>
             </a>
          </div>
        </div>
      </section>

      {/* Grid de Eventos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* COLUMNA IZQUIERDA: Sidebar (Filtros) */}
          {/* 'lg:w-1/4' significa que ocupará el 25% del ancho en pantallas grandes */}
          <aside className="w-full lg:w-1/4">
             {/* Sticky: Hace que el filtro te siga mientras bajas */}
             <div className="sticky top-24">
                {/* ⚠️ Importante: Asegúrate de importar SidebarFilters arriba */}
                <SidebarFilters />
             </div>
          </aside>

          {/* COLUMNA DERECHA: Grid de Eventos */}
          {/* 'lg:w-3/4' significa que ocupará el 75% restante */}
          <div className="w-full lg:w-3/4">
            
            {/* Título de la sección */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Próximos Eventos</h2>
              <span className="text-sm text-slate-500">{events.length} resultados encontrados</span>
            </div>

            {events.length > 0 ? (
              // Cambiamos grid-cols-3 a grid-cols-2 en desktop porque ahora tenemos menos espacio ancho
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No hay eventos que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}