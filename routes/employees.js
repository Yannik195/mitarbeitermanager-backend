const express = require("express")
const router = express.Router();
const Employee = require("../models/Employee")
const jwt = require("../jwt/jwt")


//Get all employees
// todo load only logged in users employees
router.get("/", jwt.authenticateToken, async (req, res) => {
    try {
        const employees = await Employee.find({ employerID: req.header("employeeID") })
        res.json(employees)
    } catch (err) {
        res.json({ message: err })
    }
})

router.get("/:employeeId", async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId)
        res.json(employee)
    } catch (err) {
        res.json({ message: err })
    }
})

//Submit employee
// todo save to logged in user only
router.post("/", async (req, res) => {
    console.log(req.body)
    const employee = new Employee({
        employerID: req.body.employerID,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        birthdate: req.body.birthdate,
        position: req.body.position,
        gender: req.body.gender,
        street: req.body.street,
        number: req.body.number,
        postcode: req.body.postcode,
        country: req.body.country,
        phone: req.body.phone

    })

    try {
        const savedEmployee = await employee.save()
        res.json(savedEmployee)
    } catch (err) {
        res.json({ message: err })
    }
}
)

//Delete Employee
router.delete("/:employeeId", async (req, res) => {
    try {
        const employee = await Employee.remove({ _id: req.params.employeeId })
        res.json(employee)
    } catch (err) {
        res.json({ message: err })
    }
})

//Update Employee
router.patch("/:employeeId", async (req, res) => {
    try {
        const employee = await Employee.updateOne({ _id: req.params.employeeId }, { $set: { age: req.body.age } })
        res.json(employee)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;