
const { createClient } = require('@neondatabase/serverless');
require('dotenv').config();

const db = createClient({
  connectionString: process.env.NEON_DATABASE_URL,
});

module.exports = db;
