/* eslint-disable */
const { Client } = require('pg');
// Carga las variables de entorno del archivo .env.local
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Necesario para Railway/Postgres en la nube
});

async function runMigration() {
  try {
    console.log("🔌 Conectando a la base de datos...");
    await client.connect();
    
    console.log("🛠️ Agregando columna 'social_url'...");
    
    // Este es el comando SQL que modificará tu tabla
    await client.query(`
      ALTER TABLE events 
      ADD COLUMN IF NOT EXISTS social_url TEXT;
    `);
    
    console.log("✅ ¡ÉXITO! La columna 'social_url' ha sido creada.");
  } catch (err) {
    console.error("❌ Error fatal:", err);
  } finally {
    await client.end();
  }
}

runMigration();