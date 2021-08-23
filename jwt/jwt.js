const jwt = require("jsonwebtoken")

function generateSecretKey() {
    console.log(require("crypto").randomBytes(64).toString("hex"))
}


function authenticateToken(req, res, next) {
    //Authorize
    const token = req.headers["authorization"]
    if (token == null) return res.sendStatus(401)

    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


module.exports = {
    authenticateToken
}