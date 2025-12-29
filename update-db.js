/* eslint-disable */
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function update() {
  try {
    await client.connect();
    console.log("🛠️ Actualizando base de datos...");
    
    // Agregamos la columna 'requirements' si no existe
    await client.query(`
      ALTER TABLE events 
      ADD COLUMN IF NOT EXISTS requirements TEXT;
    `);
    
    console.log("✅ Columna 'requirements' agregada con éxito.");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.end();
  }
}

update();