const express = require("express")
const router = express.Router();
const Employee = require("../models/Employee")


//Get all employees
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find()
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
router.post("/", async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age
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