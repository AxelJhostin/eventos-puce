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
    // CAMBIO CLAVE: La consulta base arranca filtrando por estado
    let queryText = "SELECT * FROM events WHERE status = 'approved'";
    const queryParams: (string | number | null)[] = [];

    // 1. Filtro de Búsqueda (Texto)
    if (filters?.search) {
      queryParams.push(`%${filters.search}%`);
      // Usamos queryParams.length para asignar dinámicamente $1, $2, etc.
      queryText += ` AND (title ILIKE $${queryParams.length} OR description ILIKE $${queryParams.length})`;
    }

    // 2. Filtro de Categoría
    if (filters?.category) {
      queryParams.push(filters.category.toLowerCase());
      queryText += ` AND category = $${queryParams.length}`;
    }

    // 3. Filtro de Ámbito
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

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const res = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    return res.rows[0] || null;
  } catch (error) {
    console.error('Error fetching event by id:', error);
    return null;
  }
}

export async function getAdminEvents(): Promise<Event[]> {
  try {
    // CAMBIO SUGERIDO: Ordenar por fecha del evento (descendente = los más lejanos primero, o pon ASC para los más próximos)
    const res = await pool.query('SELECT * FROM events ORDER BY event_date DESC');
    return res.rows;
  } catch (error) {
    console.error('Error fetching admin events:', error);
    return [];
  }
}