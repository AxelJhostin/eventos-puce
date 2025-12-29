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
    description: formData.get('description') as string,
    requirements: formData.get('requirements') as string,
  };

  // 2. Insertar en la Base de Datos (SQL)
  try {
    const query = `
      INSERT INTO events (title, slug, category, scope, event_date, location, image_url, registration_url, description, requirements)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
    ];

    await pool.query(query, values);

  } catch (error) {
    console.error('Database Error:', error);
    // En un futuro podríamos devolver el error al usuario
    throw new Error('Error al crear el evento. Verifica que el Slug no esté repetido.');
  }

  // 3. Actualizar la caché (para que el evento aparezca en el Home sin recargar)
  revalidatePath('/');
  
  // 4. Redirigir al usuario a la página de inicio
  redirect('/');
}

export async function deleteEvent(id: string) {
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    
    // Recargamos la página para que la tabla se actualice sola
    revalidatePath('/admin');
    revalidatePath('/'); // También actualizamos el Home por si acaso
    
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
    description: formData.get('description') as string,
    requirements: formData.get('requirements') as string,
  };

  try {
    const query = `
      UPDATE events 
      SET title = $1, slug = $2, category = $3, scope = $4, event_date = $5, 
          location = $6, image_url = $7, registration_url = $8, description = $9, requirements = $10
      WHERE id = $11
    `;

    const values = [
      data.title, data.slug, data.category, data.scope, data.event_date,
      data.location, data.image_url, data.registration_url, data.description, data.requirements,
      id // <--- El ID va al final
    ];

    await pool.query(query, values);

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Error al actualizar el evento.');
  }

  // Actualizamos todas las rutas donde sale el evento
  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath(`/eventos/${data.slug}`);
  
  redirect('/admin');
}