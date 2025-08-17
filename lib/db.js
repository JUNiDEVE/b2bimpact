import sql from 'mssql';

const config = {
  user: 'myuser',
  password: 'MyPass123!',
  server: 'localhost',  // e.g., 'localhost' or '127.0.0.1'
  database: 'b2bimpactDB',
  port: 1433,
  options: {
    encrypt: true,               // required for Azure
    trustServerCertificate: true // change to false in production if using a valid certificate
  }
};

let pool;

export async function getConnection() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}
