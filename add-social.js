/* eslint-disable */
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function update() {
  try {
    await client.connect();
    console.log("📸 Agregando columna para Redes Sociales...");
    await client.query(`ALTER TABLE events ADD COLUMN IF NOT EXISTS social_url TEXT;`);
    console.log("✅ ¡Listo! Base de datos actualizada.");
  } catch (err) { console.error(err); } 
  finally { await client.end(); }
}
update();