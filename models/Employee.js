const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
    name: String,
    lastname: String,
    age: Number,
})

module.exports = mongoose.model("Employee", EmployeeSchema)