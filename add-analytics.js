/* eslint-disable */
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function update() {
  try {
    await client.connect();
    console.log("📊 Agregando métricas de análisis...");
    
    // 1. Contador de Vistas (Cuánta gente entró a la página del evento)
    await client.query(`ALTER TABLE events ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;`);
    
    // 2. Contador de Clics (Cuánta gente le dio al botón de inscribirse)
    await client.query(`ALTER TABLE events ADD COLUMN IF NOT EXISTS clicks INTEGER DEFAULT 0;`);
    
    console.log("✅ ¡Listo! Columnas 'views' y 'clicks' creadas.");
  } catch (err) { console.error(err); } 
  finally { await client.end(); }
}
update();