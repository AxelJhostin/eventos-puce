/* eslint-disable */
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

// Configuración de conexión usando tu variable de entorno
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necesario para conexiones externas a Railway
  },
});

const createTablesQuery = `
  -- 1. Crear los tipos de datos personalizados (ENUMs)
  DO $$ BEGIN
    CREATE TYPE event_category AS ENUM ('ponencia', 'feria', 'concurso', 'articulo');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    CREATE TYPE event_scope AS ENUM ('interno', 'nacional', 'internacional');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  -- 2. Crear Tabla de Eventos
  CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category event_category NOT NULL,
    scope event_scope NOT NULL,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    image_url TEXT,
    registration_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- 3. Crear Tabla de Enlaces (Redes Sociales)
  CREATE TABLE IF NOT EXISTS event_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    platform_name VARCHAR(50),
    url TEXT NOT NULL
  );
`;

async function init() {
  try {
    console.log("🔌 Conectando a Railway...");
    await client.connect();
    
    console.log("🏗️  Creando tablas en la base de datos...");
    await client.query(createTablesQuery);
    
    console.log("✅ ¡ÉXITO! Las tablas 'events' y 'event_links' han sido creadas.");
  } catch (err) {
    console.error("❌ Error creando tablas:", err);
  } finally {
    await client.end();
  }
}

init();