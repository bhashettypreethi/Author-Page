const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const sqlite3 = require("sqlite3").verbose();

const app = express();
// const PORT = 4000;
const PORT = process.env.PORT || 4000;

// // Configure your database connection pool
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "1234",
//   port: 5432,
//   max: 1000,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// // Serve static files (e.g., your React app's build files)
// app.use(express.static(path.join(__dirname, "build")));

// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'self'; connect-src 'self' http://localhost:4000;"
//   );
//   next();
// });

// // Endpoint to get top 10 performing authors
// app.get("/authors", async (req, res) => {
//   try {
//     const query = `
//       SELECT authors.name, authors.email, SUM(sale_items.item_price * sale_items.quantity) AS total_sales
//       FROM authors
//       JOIN books ON authors.id = books.author_id
//       JOIN sale_items ON books.id = sale_items.book_id
//       GROUP BY authors.id
//       ORDER BY total_sales DESC
//       LIMIT 10
//     `;
//     const { rows } = await pool.query(query);
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Create a new database instance or open an existing one
const dbPath = path.resolve(__dirname, "mydatabase.db");
const db = new sqlite3.Database(dbPath);
console.log(db, dbPath);

// Endpoint to get top 10 performing authors
app.get("/authors", async (req, res) => {
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

    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(rows);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Close the database connection when the Node.js process is terminated
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection.");
    process.exit(0);
  });
});

// Route all other requests to serve the React app's entry point
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require("express");
// const path = require("path");
// const { Pool } = require("pg");

// const app = express();
// const PORT = 4000;

// // Configure your database connection pool
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "1234",
//   port: 5432,
//   max: 1000,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// // Serve static files (e.g., your React app's build files)
// app.use(express.static(path.join(__dirname, "build")));

// // Endpoint to get top 10 performing authors
// app.get("/authors", async (req, res) => {
//   try {
//     const query = `
//       SELECT authors.name, authors.email, SUM(sale_items.item_price * sale_items.quantity) AS total_sales
//       FROM authors
//       JOIN books ON authors.id = books.author_id
//       JOIN sale_items ON books.id = sale_items.book_id
//       GROUP BY authors.id
//       ORDER BY total_sales DESC
//       LIMIT 10
//     `;
//     const { rows } = await pool.query(query);
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Route all other requests to serve the React app's entry point
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
