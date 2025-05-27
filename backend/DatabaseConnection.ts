const mysql = require('mysql2/promise');

// Create a connection pool
let pool;

// Function to establish a connection pool to the database
async function connectToDB(username, password, database = "official_ai_website") {
  try {
    // Create a pool of connections
    pool = mysql.createPool({
      host: '129.153.84.107', 
      user: username,          
      password: password,      
      database: database,      
      waitForConnections: true, // Wait for available connection if all are in use
      connectionLimit: 10,      // Limit the number of concurrent connections
      queueLimit: 0,            // Unlimited queue length
    });

    console.log('Successfully connected to the database');
    return pool;
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

module.exports = { connectToDB };