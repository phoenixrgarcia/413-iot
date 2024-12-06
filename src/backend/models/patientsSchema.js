const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Device = require("./devicesSchema.js")
// Define a schema
const patientsSchema = new Schema({
    patientID: Number,
    email: String,
    password: String,
    devices: [Device], //might not be correct array delcartion
});
const patient = model('patient', patientsSchema);
module.exports = patient;
