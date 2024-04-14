
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5432,
  max: 1000,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function handler(event, context) {
  try {
    const query = `
      SELECT authors.name, authors.email, SUM(sale_items.item_price * sale_items.quantity) AS total_sales
      FROM authors
      JOIN books ON authors.id = books.author_id
      JOIN sale_items ON books.id = sale_items.book_id
      GROUP BY authors.id
      ORDER BY total_sales DESC
      LIMIT 10
    `;
    const { rows } = await pool.query(query);
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}
