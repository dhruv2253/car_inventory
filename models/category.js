const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    condition: { enum: ["New", "Used"], required: true },
})

module.exports = mongoose.model("Category", CategorySchema);