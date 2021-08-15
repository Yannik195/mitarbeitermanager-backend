const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String
})

module.exports = mongoose.model("Employee", EmployeeSchema)