const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const HttpStatus = require('http-status-codes')
const AccessToken = require('twilio').jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant

const MAX_ALLOWED_SESSION_DURATION = 14400
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET
const TWILIO_ROOM_NAME = 'squareparty'
/**
 *
 * Returns token for user with passcode
 * - user not exist => 404 {type: 'USER_NOT_FOUND'}
 *
 * @method POST
 * @param { passcode: ''}
 * @return { token: string }
 */
const login = async (req, res, next) => {
  try {
    const { passcode } = req.body
    const { User, Config } = models
    const user = await User.findOne({
      where: { access_code: passcode },
      attributes: ['name', 'access_code', 'room_name', 'role'],
    })

    if (!user) {
      // user not exist => 404 {type: 'USER_NOT_FOUND'}
      res.status(HttpStatus.NOT_FOUND).json({
        type: 'USER_NOT_FOUND',
      })
      return
    }
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySID,
      twilioApiKeySecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
      },
    )
    const videoGrant = new VideoGrant({ room: TWILIO_ROOM_NAME })
    token.identity = user.name
    token.addGrant(videoGrant)

    const config = await Config.findOne({
      where: { key: 'stream_url' },
      attributes: ['key', 'value'],
    })

    const userData = {
      access_code: user.access_code,
      identity: user.name,
      role: user.role,
      token: token.toJwt(),
      stream_url: config.value,
    }

    const jwtToken = jwt.sign(userData, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: '24h',
    })
    res.cookie('airlock_token', jwtToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    const sendData = {
      ...userData,
      access_token: jwtToken,
    }
    res.send(sendData)
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    })
  }
}

/**
 *
 * Returns user data for corresponding user for accesscode
 * - user not found => 401 { type: 'USER_NOT_FOUND' }
 * - if user don't have room, returns room filed as null
 *
 * @method GET
 * @param
 * @return
 */
const checkAuth = async (req, res, next) => {
  try {
    const access_code = req.auth_user.access_code
    const { User, Config } = models
    const user = await User.findOne({
      where: { access_code: access_code },
      attributes: ['name', 'access_code', 'room_name', 'role'],
    })

    if (!user) {
      // user not exist => 404 {type: 'USER_NOT_FOUND'}
      res.status(HttpStatus.NOT_FOUND).json({
        type: 'USER_NOT_FOUND',
      })
      return
    }
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySID,
      twilioApiKeySecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
      },
    )
    const videoGrant = new VideoGrant({ room: TWILIO_ROOM_NAME })
    token.identity = user.name
    token.addGrant(videoGrant)

    const config = await Config.findOne({
      where: { key: 'stream_url' },
      attributes: ['key', 'value'],
    })
    // generate twilio token
    const userData = {
      access_code: user.access_code,
      identity: user.name,
      role: user.role,
      token: token.toJwt(),
      stream_url: config.value,
    }

    const jwtToken = jwt.sign(userData, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: '24h',
    })
    res.cookie('airlock_token', jwtToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    const sendData = {
      ...userData,
      access_token: jwtToken,
    }
    res.send(sendData)
  } catch (err) {
    console.log(err)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    })
  }
}

const djConnect = async (req, res, next) => {
  try {
    const { username, link } = req.body
    if (!username || !link) {
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: 'Not Acceptable',
      })
    }
    const filter = { username } // { username : username }
    const update = { link, role: 'dj' } // { link: link, role: 'dj' }
    await UserModel.countDocuments(filter)
    let newDj = await UserModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true, // Make this update into an upsert
    })
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySID,
      twilioApiKeySecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
      },
    )
    console.log('tToken => ', token)
    const videoGrant = new VideoGrant({ room: newDj.username })
    token.identity = newDj.username
    token.addGrant(videoGrant)
    const responseData = {
      token: token.toJwt(),
      username,
    }
    res.send(responseData)
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: err,
    })
    return
  }
}

module.exports = { login, checkAuth, djConnect }
