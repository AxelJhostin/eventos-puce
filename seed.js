/* eslint-disable */
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const seedQuery = `
  INSERT INTO events (title, slug, description, category, scope, event_date, location, image_url, registration_url)
  VALUES (
    'Hult Prize 2025: Competencia de Impacto Social',
    'hult-prize-2025',
    'El Hult Prize desafía a los jóvenes a resolver los problemas más apremiantes del mundo. Este año, el premio es de 1 millón de dólares para el equipo ganador. Participa con tu idea innovadora.',
    'concurso',
    'internacional',
    '2025-02-15 09:00:00',
    'Auditorio PUCE Manabí (y Virtual)',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Hult_Prize_Logo.jpg/800px-Hult_Prize_Logo.jpg',
    'https://www.hultprize.org'
  ) RETURNING id;
`;

async function seed() {
  try {
    await client.connect();
    console.log("🌱 Sembrando datos...");
    
    // Insertar el evento y guardar su ID
    const res = await client.query(seedQuery);
    const eventId = res.rows[0].id;
    console.log(`✅ Evento creado con ID: ${eventId}`);

    // Insertar enlaces de redes sociales para este evento
    const linksQuery = `
      INSERT INTO event_links (event_id, platform_name, url) VALUES
      ('${eventId}', 'whatsapp', 'https://chat.whatsapp.com/grupo-ejemplo'),
      ('${eventId}', 'web', 'https://www.hultprize.org');
    `;
    
    await client.query(linksQuery);
    console.log("✅ Enlaces sociales agregados.");

  } catch (err) {
    if (err.code === '23505') {
      console.log("⚠️  El evento ya existe (error de duplicado), no te preocupes.");
    } else {
      console.error("❌ Error:", err);
    }
  } finally {
    await client.end();
  }
}

seed();