var mysql = require("mysql2");

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
          const createUserTable = `
                                  CREATE TABLE IF NOT EXISTS users (
                                  user_id INT AUTO_INCREMENT PRIMARY KEY,
                                  username VARCHAR(255) NOT NULL,
                                  email VARCHAR(255) UNIQUE NOT NULL,
                                  password VARCHAR(255) NOT NULL,
                                  phoneNo VARCHAR(10) NOT NULL
                                );`;

          // SQL query to create the "suggestion" table
          const createSuggesstionTable = `
                                  CREATE TABLE IF NOT EXISTS suggesstion (
                                  user_id VARCHAR(255) NOT NULL ,
                                  name VARCHAR(255) NOT NULL,
                                  message VARCHAR(255) NOT NULL
                                );`;

          // SQL query to create the "traavelDetails" table
          const createTravelDetailsTable = ` 
                                    CREATE TABLE IF NOT EXISTS traveldetails(
                                    user_id VARCHAR(255) NOT NULL ,
                                    location VARCHAR(255) NOT NULL,
                                    noOfPeople VARCHAR(255) NOT NULL,
                                    selectedDate VARCHAR(255) NOT NULL,
                                    cost VARCHAR(255) NOT NULL,
                                    tripPackage VARCHAR(255) NOT NULL
                                  )`;

          pool.query(createUserTable, (tableError: string) => {
            if (tableError) {
              console.error("Error creating table: " + tableError);
            } else {
              console.log("User Table created successfully");
            }
          });

          pool.query(createSuggesstionTable, (tableError: string) => {
            if (tableError) {
              console.error("Error creating table: " + tableError);
            } else {
              console.log("Suggestion Table created successfully2");
            }
          });

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
