import mysql from "mysql2/promise";

const poolConfig = {
  host: "db",
  user: "root",
  password: "1234",
  database: "social_media",
  waitForConnections: true,
  connectionLimit: 10, // Adjust the limit as needed
  queueLimit: 0,
};

export const pool = mysql.createPool(poolConfig);

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release(); // Release the connection back to the pool
    return connection;
  } catch (err: any) {
    console.error("DB connection failed:", err.stack);
    throw err;
  }
};
