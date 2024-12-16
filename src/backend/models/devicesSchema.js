const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// Define a schema
const devicesSchema = new Schema({
    deviceId: Number,
    activeRange: Date,
    period: Number, 
    APIKey: String,
});
const device = model('device', devicesSchema);
module.exports = device;
