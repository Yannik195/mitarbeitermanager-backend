const jwt = require("jsonwebtoken")

function generateSecretKey() {
    console.log(require("crypto").randomBytes(64).toString("hex"))
}

function generateAccessToken(email, password) {
    user = {
        email,
        password
    }
    const token = jwt.sign(user, "secret", { expiresIn: '1800s' });
    return token;
}

function authenticateToken(req, res, next) {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)
    console.log(decoded)
    next()
}


module.exports = {
    generateAccessToken,
    authenticateToken
}