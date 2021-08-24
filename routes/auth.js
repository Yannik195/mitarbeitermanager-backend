const express = require("express")
const router = express.Router();
const User = require("../models/User")
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    // Todo
    try {
        // query user in db
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            // no user found with this mail
            console.log("no user found")
            res.status(401).send("no user found")
        } else {
            // user found 
            // check for matching pw
            if (req.body.password == user.password) {
                // pw and mail match
                res.json(user)
            } else {
                // wrong pw
                res.status(401).send("wrong password")
            }
        }

    } catch (err) {
        res.send(err)
    }

    // const public = req.body.email + req.body.password
    // const accessToken = jwt.sign({
    //     exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 Hour expiry
    //     data: public
    // }, process.env.ACCESS_TOKEN_SECRET);
    // console.log(accessToken)
    // res.json({ accessToken: accessToken })
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