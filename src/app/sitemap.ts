import { MetadataRoute } from 'next';
import { getAdminEvents } from "@/services/eventService"; // Usamos tu servicio existente

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. URL Base
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eventospucemanabi.vercel.app';

  // 2. Obtenemos TODOS los eventos
  const events = await getAdminEvents();
  
  // Filtramos solo los aprobados para no indexar cosas privadas/pendientes
  const approvedEvents = events.filter(e => e.status === 'approved');

  // 3. Generamos las URLs dinámicas de los eventos
  const eventUrls = approvedEvents.map((event) => ({
    url: `${baseUrl}/eventos/${event.slug}`,
    lastModified: new Date(event.event_date), // O la fecha de creación si la tienes
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 4. Devolvemos el mapa completo (Páginas estáticas + Eventos)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/nuevo-evento`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...eventUrls,
  ];
}