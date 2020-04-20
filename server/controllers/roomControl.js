const models = require("../models");
const jwt = require("jsonwebtoken");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

const createRoom = async (req, res, next) => {
  try {
    const { User, Room } = models;
    const accessToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(accessToken, process.env.AUTH_TOKEN_SECRET);
    const { accesscode } = decodedToken;
    const { roomname, roommode } = req.body;

    const newRoom = await Room.create(
      { roomname, roommode, roomowner: accesscode },
      { fields: ["roomowner", "roomname", "roommode"] }
    );

    const updatedUser = await User.update(
      { roomname: newRoom.roomname },
      { where: { accesscode: accesscode } }
    );

    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySID,
      twilioApiKeySecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
      }
    );
    const videoGrant = new VideoGrant({ room: decodedToken.roomname });
    token.identity = decodedToken.username;
    token.addGrant(videoGrant);
    res.send(token.toJwt());
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.original.detail,
    });
  }
};

module.exports = { createRoom };
