const express = require("express")
const router = express.Router();
const User = require("../models/User")
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email }).exec()
        res.json(user)
    } catch (err) {
        res.status(401)
        res.send("Wrong Email!")
    }

    const public = req.body.email + req.body.password
    const accessToken = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 Hour expiry
        data: public
    }, process.env.ACCESS_TOKEN_SECRET);
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