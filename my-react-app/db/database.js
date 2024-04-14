const sqlite3 = require("sqlite3").verbose();

// Function to initialize the database
const initializeDatabase = () => {
  const db = new sqlite3.Database("mydatabase.db");

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS authors (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY,
      title TEXT,
      author_id INTEGER,
      FOREIGN KEY (author_id) REFERENCES authors(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS sale_items (
      id INTEGER PRIMARY KEY,
      book_id INTEGER,
      item_price REAL,
      quantity INTEGER,
      FOREIGN KEY (book_id) REFERENCES books(id)
    )`);
  });

  db.close();
};

// Function to query authors with total sales
const getTopAuthorsWithSales = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("mydatabase.db");

    db.all(
      `SELECT authors.name, authors.email, SUM(sale_items.item_price * sale_items.quantity) AS total_sales
      FROM authors
      JOIN books ON authors.id = books.author_id
      JOIN sale_items ON books.id = sale_items.book_id
      GROUP BY authors.id
      ORDER BY total_sales DESC
      LIMIT 10`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );

    db.close();
  });
};

module.exports = {
  initializeDatabase,
  getTopAuthorsWithSales,
};
