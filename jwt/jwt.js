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


module.exports = {
    generateAccessToken
}