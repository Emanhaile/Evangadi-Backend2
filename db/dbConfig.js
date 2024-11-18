const mysql2 = require('mysql2');
require('dotenv').config();

const dbConnection = mysql2.createPool({
    user: process.env.USER,
    database: process.env.DATABASE,
    host: 'localhost',
    password: process.env.PASSWORD,
    connectionLimit: 10
})

let questions = `CREATE TABLE if not exists questions(
        id int(20) not null auto_increment,
        questionid varchar(100) not null UNIQUE,
        userid int(30) not null,
        title varchar(100) not null,
        description varchar(255) not null,
        tag varchar(20),
        PRIMARY KEY(id,questionid),
        FOREIGN KEY (userid) REFERENCES users(userid)
    )`;

let answers = `CREATE TABLE if not exists answers(
        answerid int(30) auto_increment,
        userid int(30) not null,
        questionid varchar(100) not null,
        answer varchar(255) not null,
        PRIMARY KEY(answerid),
        FOREIGN KEY (userid) REFERENCES users(userid),
        FOREIGN KEY (questionid) REFERENCES questions(questionid)
    )`;

    dbConnection.query(questions, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log("question table created");
        }
    });

    dbConnection.query(answers, (err, res) => {
    if(err) {
        console.log(err);
    } else {
        console.log("answers table created");
    }
});

module.exports = dbConnection.promise();