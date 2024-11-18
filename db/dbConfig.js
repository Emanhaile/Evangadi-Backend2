const mysql2 = require('mysql2');
require('dotenv').config();

// Database connection pool
const dbConnection = mysql2.createPool({
    user: process.env.USER,
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

// Create `users` table
const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
        userid INT(20) NOT NULL AUTO_INCREMENT,
        username VARCHAR(100) NOT NULL UNIQUE,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (userid)
    )
`;

// Create `questions` table
const questionsTable = `
    CREATE TABLE IF NOT EXISTS questions (
        id INT(20) NOT NULL AUTO_INCREMENT,
        questionid VARCHAR(100) NOT NULL UNIQUE,
        userid INT(20) NOT NULL,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(255) NOT NULL,
        tag VARCHAR(20),
        PRIMARY KEY (id),
        FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
    )
`;

// Create `answers` table
const answers = `CREATE TABLE if not exists answers(
        answerid int(30) auto_increment,
        userid int(30) not null,
        questionid varchar(100) not null,
        answer varchar(255) not null,
        PRIMARY KEY(answerid),
        FOREIGN KEY (userid) REFERENCES users(userid),
        FOREIGN KEY (questionid) REFERENCES questions(questionid)
    )`;

// Execute table creation
const createTables = async () => {
    const db = dbConnection.promise();
    try {
        await db.query(usersTable);
        console.log("`users` table created");

        await db.query(questionsTable);
        console.log("`questions` table created");

        await db.query(answers);
        console.log("`answers` table created");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};

createTables();

module.exports = dbConnection.promise();
