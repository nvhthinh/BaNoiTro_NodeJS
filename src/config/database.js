const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// ==> connect com a Base de Dados:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('DB connect success!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};