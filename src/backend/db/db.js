// import "use server";
// import mongoose from "mongoose";
const mongoose = require('mongoose');

// Connection URI (use your Atlas URI if applicable)
const uri = "mongodb://localhost:27017/myDatabase"; 

let isConnected = false; // Track connection status

async function connectToDB() {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return mongoose.connection;
    }
    
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        isConnected = true;
        console.log("Connected to MongoDB with Mongoose");
        return mongoose.connection; // Return the connection instance
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if the connection fails
    }
}

module.exports = connectToDB;
