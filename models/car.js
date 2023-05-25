const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    make: { type: String, required: true, maxlength: 100 },
    model: { type: String, required: true, maxlength: 100 },
    year: { type: Number, required: true, maxlength: 4 },
    price: { type: Number, required: true, maxlength: 10 },
    distance: { type: Number, required: true, maxlength: 10 },
    condition: { type: String, enum: ["New", "Used"], required: true },
});

module.exports = mongoose.model("Car", CarSchema);