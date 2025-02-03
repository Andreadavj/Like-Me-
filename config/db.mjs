import pkg from 'pg';  // Importa el paquete completo
const { Pool } = pkg;  // Desestructura Pool

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'likeme',
  password: 'amanda',
  port: 5432,
});
