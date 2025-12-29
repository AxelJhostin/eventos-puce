import pool from '@/lib/db';
import { Event } from '@/types';

interface GetEventsFilters {
  search?: string;
  category?: string;
  scope?: string;
}

// Esta función solo se encarga de ir a buscar datos, nada visual
export async function getAllEvents(filters?: GetEventsFilters): Promise<Event[]> {
  try {
    // Empezamos con la consulta base
    let queryText = 'SELECT * FROM events WHERE 1=1';
    const queryParams: (string | number | null)[] = [];

    // 1. Filtro de Búsqueda (Texto)
    if (filters?.search) {
      queryParams.push(`%${filters.search}%`);
      // Busca en título O en descripción (insensible a mayúsculas/minúsculas con ILIKE)
      queryText += ` AND (title ILIKE $${queryParams.length} OR description ILIKE $${queryParams.length})`;
    }

    // 2. Filtro de Categoría (Ponencia, Feria, etc.)
    if (filters?.category) {
      queryParams.push(filters.category.toLowerCase());
      queryText += ` AND category = $${queryParams.length}`;
    }

    // 3. Filtro de Ámbito (Nacional, Internacional...)
    if (filters?.scope) {
      queryParams.push(filters.scope.toLowerCase());
      queryText += ` AND scope = $${queryParams.length}`;
    }

    // Ordenamos por fecha (los más próximos primero)
    queryText += ' ORDER BY event_date ASC';

    const res = await pool.query(queryText, queryParams);
    return res.rows;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const res = await pool.query('SELECT * FROM events WHERE slug = $1', [slug]);
    return res.rows[0] || null;
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    return null;
  }
}