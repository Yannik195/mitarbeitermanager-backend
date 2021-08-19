const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const User = require("../models/User")


passport.use(new localStrategy(
    async (email, password, done) => {
        const user = await User.find({ email: req.params.email })
        console.log(user)
    }
))

