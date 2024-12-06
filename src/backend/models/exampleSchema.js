const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// Define a schema
const UserSchema = new Schema({
    name: String,
    age: Number,
});
const User = model('User', UserSchema);
module.exports = User;
