import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "social_media",
};

export const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("DB connected successfully");
    return connection;
  } catch (err) {
    console.error("DB connection failed:", err.stack);
    throw err;
  }
};
