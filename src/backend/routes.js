const express = require("express");
const recordRoutes = express.Router();
const connectToDB = require('./db/db');
 
// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
(async () => {
    const mongooseConnection = await connectToDB();
    db_connect = mongooseConnection.db; // Access the native MongoDB database object
  })();
  
// This section will help you get a list of all the records.
recordRoutes.route("/patients").get(async function (req, res) {
    try {
        if (!db_connect) {
            console.error("Database connection not established.");
            return res.status(500).send("Database connection not established.");
        }

        // Perform the database query
        const result = await db_connect.collection("users").find({}).toArray();
        res.json(result);
    } catch (err) {
        console.error("Error fetching records:", err);
        res.status(500).send("Error fetching records: " + err.message);
    }
});



 
// // This section will help you get a single record by id
// recordRoutes.route("/patients/:id").get(function (req, res) {
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect
//    .collection("users")
//    .findOne(myquery, function (err, result) {
//      if (err) throw err;
//      res.json(result);
//    });
// });
 
// This section will help you create a new record.
// recordRoutes.route("/record/add").post(function (req, response) {
//  let myobj = {
//    name: req.body.name,
//    position: req.body.position,
//    level: req.body.level,
//  };
//  db_connect.collection("records").insertOne(myobj, function (err, res) {
//    if (err) throw err;
//    response.json(res);
//  });
// });
 
// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//  let myquery = { _id: ObjectId(req.params.id) };
//  let newvalues = {
//    $set: {
//      name: req.body.name,
//      position: req.body.position,
//      level: req.body.level,
//    },
//  };
//  db_connect
//    .collection("records")
//    .updateOne(myquery, newvalues, function (err, res) {
//      if (err) throw err;
//      console.log("1 document updated");
//      response.json(res);
//    });
// });
 
// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });
 
module.exports = recordRoutes;
