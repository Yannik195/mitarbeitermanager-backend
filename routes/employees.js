const express = require("express")
const router = express.Router();
const Employee = require("../models/Employee")
const col = require("../server")

router.get("/", (req, res) => {
    res.send("We are on Mitarbeiter")
})

router.post("/", async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age
    })

    employee.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ message: err })
        })
}
)

module.exports = router;