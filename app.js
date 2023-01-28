const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");

const app = express();



const start = async( ) => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(6011,()=>{console.log("Server is running")});
    } catch (error) {
        console.log(error);
    }
}

start();