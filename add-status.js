/* eslint-disable */
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function update() {
  try {
    await client.connect();
    console.log("🚦 Agregando sistema de estados...");
    // 1. Crear la columna con valor por defecto 'pending'
    await client.query(`ALTER TABLE events ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';`);
    
    // 2. APROBAR automáticamente todos los eventos que ya existen (para no borrarlos del mapa)
    await client.query(`UPDATE events SET status = 'approved' WHERE status IS NULL OR status = 'pending';`);
    
    console.log("✅ ¡Listo! Sistema de moderación instalado.");
  } catch (err) { console.error(err); } 
  finally { await client.end(); }
}
update();