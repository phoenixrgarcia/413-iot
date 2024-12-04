// import "use server";
// import mongoose from "mongoose";
const mongoose = require('mongoose');

// Connection URI (use your Atlas URI if applicable)
const uri = "mongodb://localhost:27017/myDatabase"; 
console.log(mongoose);

async function connectToDB() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB with Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = connectToDB;
