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