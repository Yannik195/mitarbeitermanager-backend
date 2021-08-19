const express = require("express")
const router = express.Router();
const User = require("../models/User")
const passport = require("passport")

router.post("/login", async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post("/signup", async (req, res) => {
    console.log("signup")
    console.log(req.body)
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;