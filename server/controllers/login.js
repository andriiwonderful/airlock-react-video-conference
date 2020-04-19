const db = require('../models/db')
const jwt = require('jsonwebtoken')
const login = async (req, res, next) => {
    try { 
        const {passcode} = req.body
        const queryRes = await db.query(`SELECT * FROM users where accesscode = '${passcode}'`)
        if(queryRes.rowCount == 0) {
            return res.status(401).json({
                error: new Error('User not found!')
            })
        }
        const userInfo = queryRes.rows[0]
        const payload = { 
            username: userInfo.username, 
            roomname: userInfo.roomname, 
            accesscode: userInfo.accesscode
        }
        const token = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET, {expiresIn: '24h'})
        res.send(token)
    } catch (err){
        res.status(500).json({
            error: new Error('Invalid request')
        })
    };
}

module.exports =  login