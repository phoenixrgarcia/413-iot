const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// Define a schema
const devicesSchema = new Schema({
    deviceId: String,
    frequencyMeasured: Number,
    startHours: Number,
    startMinutes: Number,
    endHours: Number,
    endMinutes: Number,
});
const device = model('device', devicesSchema);
module.exports = device;
