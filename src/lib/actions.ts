'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import pool from '@/lib/db';

export async function createEvent(formData: FormData) {
  // 1. Extraer los datos del formulario
  const rawFormData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    category: formData.get('category') as string,
    scope: formData.get('scope') as string,
    event_date: formData.get('event_date') as string,
    location: formData.get('location') as string,
    image_url: formData.get('image_url') as string,
    registration_url: formData.get('registration_url') as string,
    social_url: formData.get('social_url') as string, // ✅ Aquí lo capturas
    description: formData.get('description') as string,
    requirements: formData.get('requirements') as string,
  };

  // 2. Insertar en la Base de Datos (SQL)
  try {
    // 👇 CAMBIO 1: Agregué social_url a la lista de columnas y el $11
    const query = `
      INSERT INTO events (title, slug, category, scope, event_date, location, image_url, registration_url, description, requirements, social_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;

    const values = [
      rawFormData.title,
      rawFormData.slug,
      rawFormData.category,
      rawFormData.scope,
      rawFormData.event_date,
      rawFormData.location,
      rawFormData.image_url,
      rawFormData.registration_url,
      rawFormData.description,
      rawFormData.requirements,
      rawFormData.social_url, // 👈 CAMBIO 2: Agregué el valor al array
    ];

    await pool.query(query, values);

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Error al crear el evento. Verifica que el Slug no esté repetido.');
  }

  // 3. Actualizar la caché
  revalidatePath('/');
  
  // 4. Redirigir
  redirect('/');
}

export async function deleteEvent(id: string) {
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    
    revalidatePath('/admin');
    revalidatePath('/');
    
    return { message: 'Evento eliminado correctamente' };
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('No se pudo eliminar el evento');
  }
}

export async function updateEvent(id: string, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    category: formData.get('category') as string,
    scope: formData.get('scope') as string,
    event_date: formData.get('event_date') as string,
    location: formData.get('location') as string,
    image_url: formData.get('image_url') as string,
    registration_url: formData.get('registration_url') as string,
    social_url: formData.get('social_url') as string, // ✅ Aquí lo capturas
    description: formData.get('description') as string,
    requirements: formData.get('requirements') as string,
  };

  try {
    // 👇 CAMBIO 3: Agregué social_url = $11 y moví el ID a $12
    const query = `
      UPDATE events 
      SET title = $1, slug = $2, category = $3, scope = $4, event_date = $5, 
          location = $6, image_url = $7, registration_url = $8, description = $9, 
          requirements = $10, social_url = $11
      WHERE id = $12
    `;

    const values = [
      data.title, 
      data.slug, 
      data.category, 
      data.scope, 
      data.event_date,
      data.location, 
      data.image_url, 
      data.registration_url, 
      data.description, 
      data.requirements,
      data.social_url, // 👈 CAMBIO 4: Agregué el valor aquí
      id // 👈 El ID siempre va al final (ahora es el $12)
    ];

    await pool.query(query, values);

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Error al actualizar el evento.');
  }

  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath(`/eventos/${data.slug}`);
  
  redirect('/admin');
}

export async function toggleEventStatus(id: string, newStatus: 'approved' | 'pending') {
  try {
    // Actualizamos el estado en la base de datos
    await pool.query('UPDATE events SET status = $1 WHERE id = $2', [newStatus, id]);
    
    // Recargamos las páginas para que el cambio se vea al instante
    revalidatePath('/admin');
    revalidatePath('/');
    
    return { message: 'Estado actualizado correctamente' };
  } catch (error) {
    console.error('Error updating status:', error);
    throw new Error('Error al actualizar el estado del evento.');
  }
}

export async function incrementView(id: string) {
  try {
    // Usamos SQL directo para ser atómicos y evitar errores de concurrencia
    await pool.query('UPDATE events SET views = views + 1 WHERE id = $1', [id]);
    // No revalidamos path aquí para no recargar la página del usuario y hacerlo lento
  } catch (error) {
    console.error('Error incrementing view:', error);
  }
}

// 🖱️ Sumar un clic (+1 click)
export async function incrementClick(id: string) {
  try {
    await pool.query('UPDATE events SET clicks = clicks + 1 WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error incrementing click:', error);
  }
}