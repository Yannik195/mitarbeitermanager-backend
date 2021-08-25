const express = require("express")
const router = express.Router();
const User = require("../models/User")
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    try {
        // query user in db
        const user = await User.findOne({ email: req.body.email })
        console.log(user)

        if (!user) {
            // no user found with this mail
            console.log("no user found")
            res.status(401).send("Wrong Email")
        } else {
            // user found 
            // check for matching pw
            if (req.body.password == user.password) {
                // Sucess!
                // pw and mail match
                // Send token
                const public = req.body.email + req.body.password
                const accessToken = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 Hour expiry
                    data: public
                }, process.env.ACCESS_TOKEN_SECRET);
                console.log(accessToken)
                console.log("Uid: " + user._id)
                res.json({ accessToken: accessToken, uid: user._id })
            } else {
                // wrong pw
                res.status(401).send("Wrong Password")
            }
        }

    } catch (err) {
        res.send(err)
    }
})

let sendToken = (email, password) => {
    const public = email + password
    const accessToken = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 Hour expiry
        data: public
    }, process.env.ACCESS_TOKEN_SECRET);
    console.log(accessToken)
    res.json({ accessToken: accessToken })
}

router.post("/signup", async (req, res) => {
    console.log(req.body)

    // check if user exists already
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        // user exists already
        console.log("user exists already")
        res.status(401)
    } else {
        // user doesnt exist, create new one
        console.log("create new user")
        const user = new User({
            email: req.body.email,
            password: req.body.password,
        })
        try {
            const savedUser = await user.save()
            console.log(savedUser)
            //Send token so user can login
            const public = savedUser.email + savedUser.password
            const accessToken = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 Hour expiry
                data: public
            }, process.env.ACCESS_TOKEN_SECRET);
            console.log(accessToken)
            res.json({ accessToken: accessToken, uid: user._id })
        } catch (err) {

        }
    }

})




module.exports = router;