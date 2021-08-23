const express = require("express")
const router = express.Router();
const User = require("../models/User")
const jwt = require("../jwt/jwt")

router.post("/login", async (req, res) => {
    console.log(req.body)
    try {
        const token = await jwt.generateAccessToken(req.body.email, req.body.password)
        res.json(token)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post("/signup", async (req, res) => {
    console.log(req.body)
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {

    }
})


module.exports = router;