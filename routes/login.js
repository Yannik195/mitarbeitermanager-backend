const express = require("express")
const router = express.Router();
const User = require("../models/User")

router.post("/", async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;