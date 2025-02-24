const { Pool } = require("pg");
const db = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:nino@localhost:5432/myCareer",
});

async function query(sql, params, callback) {
  return db.query(sql, params, callback);
}

module.exports = { query };
