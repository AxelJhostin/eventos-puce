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