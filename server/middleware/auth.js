const db = require('../models/db')
const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log("token=>", token)
        const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET)
        console.log("decodedToken =>", decodedToken)
        const queryRes = await db.query(`SELECT * FROM users where accesscode='${decodedToken.accesscode}'`)
        if(queryRes.rowCount > 0){
            console.log("NEXT")
            next()
        }
        else 
            throw 'Invalid token'
    } catch {
        res.status(401).json({
            error: new Error('Invalid Request')
        })
    }
}