import axios from 'axios'
import { getAccessToken } from './cookie'
import { API_ENDPOINT } from '../config/settings'
console.log('lib console => ', process.env)
/**
 *
 * Return identity and twilio_token for user corresponding to passcode
 *
 * @param passcode string
 * @return {* access_code: string, identity: string, token: string }
 */
export const userLogin = async (passcode) =>
  axios.post(`${API_ENDPOINT}/login`, { passcode })

/**
 *
 * Check auth with cookie
 * if authorized, return user data, if not return null
 *
 */
export const checkAuth = async () => {
  const token = getAccessToken()
  return axios.get(`${API_ENDPOINT}/user/check_auth`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

/**
 *
 * Return twilio token for user
 *
 * @param
 * @return {* token:string }
 */
export const getTwilioToken = () => {
  const token = getAccessToken()
  return axios.get(`${API_ENDPOINT}/twilio/token`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

/**
 *
 * Set Stream URL
 *
 */
export const setStreamUrl = (url) => {
  const token = getAccessToken()
  return axios.post(
    `${API_ENDPOINT}/room/set_stream_url`,
    {
      url: url,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

/**
 *
 * UnLock Request
 *
 * @param string to
 */
export const sendUnLockRequest = (to) => {
  const token = getAccessToken()
  console.log('Token => ', token)
  return axios.post(
    `${API_ENDPOINT}/room/unlock_request`,
    {
      to,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

/**
 *
 * Lock Request
 *
 * @param string to
 */
export const sendLockRequest = (to) => {
  const token = getAccessToken()
  return axios.post(
    `${API_ENDPOINT}/room/lock_request`,
    {
      to,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

/**
 *
 * Lock Accept
 *
 * @param string to
 */
export const unLockAccept = (to) => {
  const token = getAccessToken()
  return axios.post(
    `${API_ENDPOINT}/room/unlock_accept`,
    {
      to,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

/**
 *
 * Lock Accept
 *
 * @param string to
 */
export const unLockDecline = (to) => {
  const token = getAccessToken()
  return axios.post(
    `${API_ENDPOINT}/room/unlock_decline`,
    {
      to,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

/**
 *
 * Set Mic On
 *
 * @param string to
 * @param boolean micOn
 */
export const switchMic = (to, micOn) => {
  const token = getAccessToken()
  return axios.get(`${API_ENDPOINT}/room/mic`, {
    params: {
      to,
      mic_on: micOn,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const sendMessage = (to, message) => {
  const token = getAccessToken()
  return axios.post(
    `${API_ENDPOINT}/room/message`,
    {
      to,
      message,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

export const djConnect = (username, link) => {
  return axios.post(`${API_ENDPOINT}/user/dj_connect`, {
    username,
    link,
  })
}
