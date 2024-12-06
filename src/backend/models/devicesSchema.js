const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// Define a schema
const devicesSchema = new Schema({
    deviceId: Number,
    activeRange: Date,
    period: mongoose.Schema.Types.Decimal128, //This might not be correct lmao
    APIKey: String,
});
const device = model('device', devicesSchema);
module.exports = device;
