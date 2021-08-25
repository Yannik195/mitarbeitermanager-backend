const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    birthdate: Date,
    gender: String,
    img: String,
    salary: Number,
    position: String,
    employeesince: Date,
    street: String,
    number: Number,
    postcode: Number,
    country: String,
    phone: Number

})

module.exports = mongoose.model("Employee", EmployeeSchema)