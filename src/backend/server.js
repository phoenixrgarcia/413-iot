const express = require('express');
const app = express();
const cors = require("cors");
const recordRoutes = require('./routes'); // Your routes file

app.use(cors());
app.use(express.json()); // For parsing JSON request bodies
app.use('/', recordRoutes);

app.get('/', (req, res) => {
    res.send('Hello from our server!')
});


app.listen(8080, () => {
    console.log('server listening on port 8080')
});

// Use the routes
//might need database stuff here actually

//Database connection


const connectToDB = require('./db/db');
const User = require("./models/exampleSchema.js");

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
