require('dotenv').config();

const express = require('express');
const app = express();
const port = 3306;


const cors = require('cors');


//cors middleware
app.use(cors());
// db connection

const dbConnection = require("./db/dbConfig");




// user routes middleware file
const userRoute = require("./routes/userRoute");
const answerRoute = require("./routes/answerRoute");

//user routes middleware
const questionRoute = require("./routes/questionRoute");

//auth middleware
const authMiddleware = require('./middleware/authMiddleware');


//json middleware to extract json data
app.use(express.json());



// user routes middleware
app.use("/api/user", userRoute)

// questions routes middleware

app.use("/api/questions", authMiddleware, questionRoute)

// answers routes middleware
app.use("/api/question", authMiddleware, answerRoute);

async function start (){
    try {
        const result = await dbConnection.execute("select 'test'") 
        await app.listen(port)
        console.log("database connection established")
        console.log(`listening on port ${port}`)
        } catch (error) {
            console.log(error.message)
        }  
}

start();


