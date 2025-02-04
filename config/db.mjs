import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',  // Tu usuario de PostgreSQL
  host: 'localhost',
  database: 'likeme',  // Asegúrate de que el nombre de la base de datos es correcto
  password: 'tu_contraseña',  // Tu contraseña de PostgreSQL
  port: 5432,
});

export { pool };
