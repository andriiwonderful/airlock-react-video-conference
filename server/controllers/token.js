const db = require('../models/db')
const jwt = require('jsonwebtoken')
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

module.exports = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(accessToken, process.env.AUTH_TOKEN_SECRET)
        const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
            ttl: MAX_ALLOWED_SESSION_DURATION,
          });
        const videoGrant = new VideoGrant({ room: decodedToken.roomname });
        token.identity = decodedToken.username;
        token.addGrant(videoGrant);
        res.send(token.toJwt());
    } catch (err){
        console.log(err)
        res.status(500).json({
            error: new Error('Invalid request')
        })
    };
}