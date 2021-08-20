const express = require("express")
const router = express.Router();
const User = require("../models/User")

router.post("/login", async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.find({ email: req.body.email })
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;