const express = require("express");
const jwt = require("jwt-simple");
const recordRoutes = express.Router();
const connectToDB = require('./db/db');
const Patient = require("./models/patientsSchema");
const Device = require("./models/devicesSchema");
const Sensor = require("./models/sensorDataSchema");
const bcrypt = require('bcrypt');

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

(async () => {
    const mongooseConnection = await connectToDB();
    db_connect = mongooseConnection.db; // Access the native MongoDB database object
})();


//Authentication

const secret = "supersecret";

// Post new information to the database.
recordRoutes.route("/patients").post(async function (req, res) {
    try {
        // Create a new patient with the hashed password
        // Check for email and password
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ error: "Missing email and/or password" });
            return;
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newPatient = new Patient({
            email: req.body.email,
            password: hashedPassword,  // Store the hashed password
            devices: req.body.devices || [],  // Default to an empty array if devices are not provided
        });

        // Save the new patient document to the database
        const savedPatient = await newPatient.save();

        res.status(201).json(savedPatient);
    } catch (err) {
        console.error("Error saving the new patient:", err);
        res.status(500).send("Error saving the new patient: " + err.message);
    }
});

// Update patient information by email
recordRoutes.route("/patients/:email").put(async function (req, res) {
    try {
        const email = req.params.email;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ error: "Missing email parameter" });
        }

        // Build update object dynamically
        const updateData = {};
        if (req.body.password) updateData.password = req.body.password; // Note: No hashing for simplicity
        if (req.body.devices) updateData.devices = req.body.devices;

        // Find patient by email and update
        const updatedPatient = await Patient.findOneAndUpdate(
            { email: email }, // Filter by email
            { $set: updateData }, // Fields to update
            { new: true, runValidators: true } // Options: Return updated document and validate
        );

        if (!updatedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        // Send updated document as response
        res.status(200).json(updatedPatient);
    } catch (err) {
        console.error("Error updating the patient:", err);
        res.status(500).json({ error: "Error updating the patient: " + err.message });
    }
});

// Sends a token when given valid email/password
recordRoutes.route("/auth").post(async function (req, res) {
    try {
        const patient = await Patient.findOne({ email: req.body.email });

        if (!patient) {
            // email not found in the database
            return res.status(401).json({ error: "Bad email" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(req.body.password, patient.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Bad password" });
        }

        // Generate a token containing the patient's email
        const token = jwt.encode({ email: patient.email }, secret);
        res.json({ token: token });
        return;


    } catch (err) {
        console.error("Error during authentication:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Gets the status of all users when given a valid token
recordRoutes.route("/status").get(async function (req, res) {

    // See if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }

    // X-Auth should contain the token 
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token, secret); //use decoded to call specific things

        // Send back all username and status fields
        const patients = await Patient.find();
        res.json(patients);
    }
    catch (ex) {
        res.status(401).json({ error: "Invalid JWT" });
    }
});


//PATIENT Stuff

// This is a test route to fetch all patient records
recordRoutes.route("/patients").get(async function (req, res) {
    try {
        // Fetch all patients using the Mongoose model
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        console.error("Error fetching records:", err);
        res.status(500).send("Error fetching records: " + err.message);
    }
});

// GET route to fetch devices for a specific patient by ID
recordRoutes.route("/patients/:email").get(async function (req, res) {
    // See if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth header" });
    }
    // X-Auth should contain the token 
    const token = req.headers["x-auth"];

    try {
        const decoded = jwt.decode(token, secret);
        const email = decoded.email;
        
        const patient = await Patient.findOne({ email: email }, { _id: 0 });
        if (!patient) {
            return res.status(404).send("Patient not found");
        }
        res.json(patient); 
    } catch (err) {
        console.error("Error fetching patient devices:", err);
        res.status(500).send("Error fetching patient devices: " + err.message);
    }
});

// Get Sensor Data for a patient ID 
recordRoutes.route("/data/:id").get(async function (req, res) {
    try {
        const id = req.params.id; // Extract the :id from the route parameter
        const sensorData = await Sensor.find({ deviceId: id }, { _id: 0 });
        if (!sensorData) {
            return res.status(404).send("Sensor Data not found");
        }
        res.json(sensorData); // Send only the "devices" array
    } catch (err) {
        console.error("Error fetching sensor data:", err);
        res.status(500).send("Error fetching sensor data: " + err.message);
    }
});


//DEVICE STUFF

// Post new information to the database.
recordRoutes.route("/devices").post(async function (req, res) {
    try {
        const newDevice = new Device({
            deviceId: req.body.deviceId,
            activeRange: req.body.activeRange,
            period: req.body.period,
            APIKey: req.body.apiKey,
        });

        // Save the new patient document to the database
        const savedDevice = await newDevice.save();

        res.status(201).json(savedDevice);
    } catch (err) {
        console.error("Error saving the new device:", err);
        res.status(500).send("Error saving the new device: " + err.message);
    }
});

recordRoutes.route("/devices/:id").get(async function (req, res) {
    try {
        const deviceId = req.params.id; // Get the device ID from the request params

        // Find the device in the database by its ID
        const device = await Device.findOne({ deviceId: deviceId });

        // If no device is found, return a 404 response
        if (!device) {
            return res.status(404).json({ error: "Device not found" });
        }

        // If device is found, return it as a response
        res.status(200).json(device);
    } catch (err) {
        // Handle any unexpected errors
        console.error('Error fetching device:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

recordRoutes.route("/devices/:id").put(async function (req, res) {
    try {
      const deviceId = req.params.id;
  
      // Find the device and update it with new data
      const updatedDevice = await Device.findOneAndUpdate(
        { deviceId: deviceId },  // Filter by deviceId
        {
          frequencyMeasured: req.body.frequencyMeasured,
          startHours: req.body.startHours,
          startMinutes: req.body.startMinutes,
          endHours: req.body.endHours,
          endMinutes: req.body.endMinutes,
        },
        { new: true, runValidators: true } // Return updated document
      );
  
      if (!updatedDevice) {
        return res.status(404).json({ error: "Device not found" });
      }
  
      res.status(200).json(updatedDevice);  // Send the updated device back
    } catch (err) {
      console.error("Error updating device:", err);
      res.status(500).send("Error updating device: " + err.message);
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
