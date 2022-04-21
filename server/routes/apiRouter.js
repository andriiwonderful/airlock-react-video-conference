const express = require('express')
const router = express.Router()
const userControl = require('../controllers/userControl')
const roomControl = require('../controllers/roomControl')
//testing route
router.get('/test', function (req, res, next) {
  res.json({ message: 'WELCOME to /test route' })
})

router.get('/db/user', async function (req, res, nex) {
  res.send('Sending reply to users!!! Maintenance mode')
})

// user routes
router.post('/user/login', userControl.login)
router.get('/user/check_auth', userControl.checkAuth)
router.post('/user/dj_connect', userControl.djConnect)
// room routes
router.post('/room/set_stream_url', roomControl.setStreamUrl)
router.post('/room/unlock_request', roomControl.unLockRequest)
router.post('/room/unlock_accept', roomControl.unLockAccept)
router.post('/room/unlock_decline', roomControl.unLockDecline)
router.post('/room/lock_request', roomControl.lockRequest)
router.get('/room/mic', roomControl.mic)
router.post('/room/message', roomControl.message)
module.exports = router
