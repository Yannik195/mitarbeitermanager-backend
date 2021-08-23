const express = require("express")
const router = express.Router();
const User = require("../models/User")
const jwt = require("jsonwebtoken")

router.post("/login", async (req, res) => {
    const accessToken = jwt.sign(req.body.email, process.env.ACCESS_TOKEN_SECRET)
    console.log(accessToken)
    res.json({ accessToken: accessToken })
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