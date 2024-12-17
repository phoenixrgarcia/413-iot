const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// Define a schema
const sensorDataSchema = new Schema({
    deviceID: String,
    oxygenLevel: Number,
    heartRate: Number,
    dateTime: Date,
});
const sensor = model('sensor', sensorDataSchema);
module.exports = sensor;
