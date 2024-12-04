const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.listen(8080, () => {
    console.log('server listening on port 8080')
})


//Database connection


const connectToDB = require('./db/db');
const mongoose = require("mongoose");

// Define a schema
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

// Create a model
const User = mongoose.model("User", UserSchema);

(async () => {
    await connectToDB();

    // Example: Insert a document
    const user = new User({ name: "Alice", age: 30 });
    await user.save();
    console.log("Document inserted:", user);
})();


//CRUD Operations
// Insert a document
const user = new User({ name: "Alice", age: 30 });
user.save();

// Find a document
const foundUser = User.findOne({ name: "Alice" });
console.log("Found user:", foundUser);

// Update a document
User.updateOne({ name: "Alice" }, { age: 31 });

// Delete a document
User.deleteOne({ name: "Alice" });
