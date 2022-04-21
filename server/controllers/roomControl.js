const HttpStatus = require('http-status-codes')
const Pusher = require('pusher')

// Pusher credentials
const pusherAppId = process.env.PUSHER_APP_ID
const pusherAppKey = process.env.PUSHER_APP_KEY
const pusherAppSecret = process.env.PUSHER_APP_SECRET
const pusherAppCluster = process.env.PUSHER_APP_CLUSTER

const pusher = new Pusher({
  appId: pusherAppId,
  key: pusherAppKey,
  secret: pusherAppSecret,
  cluster: pusherAppCluster,
})

/**
 *
 * Set Stream URL and broadcast
 *
 */
const setStreamUrl = async (req, res, next) => {
  try {
    const url = req.body.url

    pusher.trigger('airlock-channel', 'stream-url-change', {
      name: 'stream-url',
      message: url,
    })

    res.send('success')
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    })
  }
}

/**
 *
 * Send UnLock Request
 *
 */
const unLockRequest = async (req, res, next) => {
  try {
    const userId = req.auth_user.identity
    const to = req.body.to
    console.log(`UNLOCK REQUEST TO ${to}-unlock`)
    const output = pusher.trigger(`${to}-unlock`, 'unlock', {
      name: userId,
    })
    res.send({ output })
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    })
  }
}

/**
 *
 * Send Lock Request
 *
 */
const lockRequest = async (req, res, next) => {
  try {
    const userId = req.auth_user.identity
    const to = req.body.to
    pusher.trigger(`${to}-lock-request`, 'lock', {
      name: userId,
    })
    res.send('message-sent')
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    })
  }
}

/**
 *
 * Accept UnLock Request
 *
 */
const unLockAccept = async (req, res, next) => {
  try {
    const userId = req.auth_user.identity
    const to = req.body.to
    pusher.trigger(`${to}-unlock-accept`, 'unlock-accept', {
      name: userId,
    })
    res.send('message-sent')
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    })
  }
}

/**
 *
 * Decline UnLock Request
 *
 */
const unLockDecline = async (req, res, next) => {
  try {
    const userId = req.auth_user.identity
    const to = req.body.to
    pusher.trigger(`${to}-unlock-decline`, 'unlock-decline', {
      name: userId,
    })
    res.send('message-sent')
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    })
  }
}

/**
 *
 * Mic control
 *
 */
const mic = async (req, res, next) => {
  try {
    const to = req.query.to
    const micOn = req.query.mic_on
    const userId = req.auth_user.identity

    console.log('MIC QUERY', req.query)
    pusher.trigger(`${to}-mic`, 'mic-on', {
      name: userId,
      message: micOn === 'true' ? 'on' : 'off',
    })

    res.send('message-sent')
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    })
  }
}

/**
 *
 * Message control
 *
 */
const message = async (req, res, next) => {
  try {
    const to = req.body.to
    const message = req.body.message
    const userId = req.auth_user.identity

    console.log('MESSAGE QUERY', req.body)
    pusher.trigger(`${to}-message`, 'message', {
      name: userId,
      message: message,
    })

    res.send('message-sent')
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    })
  }
}

module.exports = {
  setStreamUrl,
  unLockRequest,
  lockRequest,
  unLockAccept,
  unLockDecline,
  mic,
  message,
}
