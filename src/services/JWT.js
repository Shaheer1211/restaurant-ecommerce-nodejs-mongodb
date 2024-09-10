require('dotenv').config()
const { sign, verify } = require('jsonwebtoken')

const createToken = (user) => {
    const accessToken = sign(user, process.env.JWT_SECRET_TOKEN)

    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["AccessToken"]
    
    if (!accessToken) {
        return res.status(400).json({Error: "User not authenticated"})
    }
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET_TOKEN)

        if (validToken) {
            req.authenticated = true
            return next()
        }
    } catch (err) {
        return res.status(500).json({Error: "Internal server error", err})
    }
}

const validateAdminToken = (req, res, next) => {
    const accessToken = req.cookies["AdminToken"]
    
    if (!accessToken) {
        return res.status(400).json({Error: "User not authenticated"})
    }
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET_TOKEN)
        if (validToken && validToken.type === "admin") {
            req.authenticated = true
        return next()
        }
    } catch (err) {
        return res.status(500).json({Error: "Internal server error", err})
    }
}

const decodeToken = (accessToken) => {
    if (!accessToken) {
        return ({Error: "User not authenticated"})
    }
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET_TOKEN)

        return (validToken);
    } catch (err) {
        return ({Error: "Internal server error", err})
    }
}

module.exports = {createToken, validateToken, validateAdminToken, decodeToken}