var mysql = require("mysql2");
import {
  createUserTable,
  createSuggesstionTable,
  createTravelDetailsTable,
} from "../src/models/tableSchemma";

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Satish@01#96",
  database: "travelapp",
});

pool.getConnection((err: string) => {
  if (err) throw err;
  console.log("Connected to MySQL!");

  // SQL query to create the database (if it doesn't exist)
  const createDatabaseSQL = "CREATE DATABASE IF NOT EXISTS travelapp";

  pool.query(createDatabaseSQL, (dbError: string) => {
    if (dbError) {
      console.error("Error creating database: " + dbError);
    } else {
      console.log("Database created successfully");

      // Select the newly created database
      pool.query("USE travelapp", (useDbError: string) => {
        if (useDbError) {
          console.error("Error selecting the database: " + useDbError);
        } else {
          console.log("Database selected successfully");

          // SQL query to create the "users" table
          pool.query(createUserTable, (tableError: string) => {
            if (tableError) {
              console.error("Error creating table: " + tableError);
            } else {
              console.log("User Table created successfully");
            }
          });

          // SQL query to create the "suggestion" table
          pool.query(createSuggesstionTable, (tableError: string) => {
            if (tableError) {
              console.error("Error creating table: " + tableError);
            } else {
              console.log("Suggestion Table created successfully2");
            }
          });

          // SQL query to create the "travelDetails" table
          pool.query(createTravelDetailsTable, (tableError: string) => {
            if (tableError) {
              console.error("Error creating table: " + tableError);
            } else {
              console.log("TravelDetails Table created successfully2");
            }
          });
        }
      });
    }
  });
});

module.exports = pool;
