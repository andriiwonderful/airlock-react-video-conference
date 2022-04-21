const db = require("../models/db");
const jwt = require("jsonwebtoken");
const HttpStatus = require("http-status-codes");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;
const twilioRoomName = "XXXXX";
/**
 * Return twilio token for current user
 * - if user doesn't have room_name return 400{ 'type': 'NOT_ACCEPTABLE' }
 *
 * @param {* user } req
 * @return twilio token
 */

module.exports.getTwilioToken = async (req, res, next) => {
  try {
    console.log("getTwilioToken called!");
    console.log("access_code", req.auth_user);
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySID,
      twilioApiKeySecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
      }
    );
    const user = req.auth_user.dataValues;
    if (!user.room_name) {
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "NOT_ACCEPTABLE",
      });
      return;
    }
    const videoGrant = new VideoGrant({ room: twilioRoomName });
    token.identity = user.name;
    token.addGrant(videoGrant);
    res.send(token.toJwt());
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: new Error("Invalid request"),
    });
  }
};
