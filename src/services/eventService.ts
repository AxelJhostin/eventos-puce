import pool from '@/lib/db';
import { Event } from '@/types';

// Esta función solo se encarga de ir a buscar datos, nada visual
export async function getAllEvents(): Promise<Event[]> {
  try {
    const res = await pool.query('SELECT * FROM events ORDER BY event_date ASC');
    return res.rows;
  } catch (error) {
    console.error('Error fetching events:', error);
    return []; // Retorna lista vacía si falla, para no romper la página
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