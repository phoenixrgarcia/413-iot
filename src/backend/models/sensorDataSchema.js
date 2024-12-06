const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// Define a schema
const sensorDataSchema = new Schema({
    patientId: Number,
    oxygenLevel: mongoose.Schema.Types.Decimal128,
    heartRate: mongoose.Schema.Types.Decimal128,
    dateTime: Date,
});
const sensor = model('sensor', sensorDataSchema);
module.exports = sensor;
