// Schemma for user table
export const createUserTable = `
                                  CREATE TABLE IF NOT EXISTS users (
                                  user_id INT AUTO_INCREMENT PRIMARY KEY,
                                  username VARCHAR(255) NOT NULL,
                                  email VARCHAR(255) UNIQUE NOT NULL,
                                  password VARCHAR(255) NOT NULL,
                                  phoneNo VARCHAR(10) NOT NULL,
                                  userrole VARCHAR(20) DEFAULT 'user'
                                
                                );`;

// Schemma for suggestion table
export const createSuggesstionTable = `
                                  CREATE TABLE IF NOT EXISTS suggestions (
                                  suggestion_id INT AUTO_INCREMENT PRIMARY KEY,
                                  user_id VARCHAR(255) NOT NULL ,
                                  name VARCHAR(255) NOT NULL,
                                  message VARCHAR(255) NOT NULL
                                );`;

// Schemma for travel details table
export const createTravelDetailsTable = ` 
                                    CREATE TABLE IF NOT EXISTS traveldetails(
                                    travel_id INT AUTO_INCREMENT PRIMARY KEY,
                                    user_id VARCHAR(255) NOT NULL ,
                                    location VARCHAR(255) NOT NULL,
                                    noOfPeople VARCHAR(255) NOT NULL,
                                    selectedDate VARCHAR(255) NOT NULL,
                                    cost VARCHAR(255) NOT NULL,
                                    tripPackage VARCHAR(255) NOT NULL
                                  )`;
