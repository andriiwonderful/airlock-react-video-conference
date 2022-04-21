/**
 *
 * Custom Icons
 *
 */

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLockOpen,
  faLock,
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faCheck,
  faPaperPlane,
  faTimes,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { faCommentDots, faCopy } from '@fortawesome/free-regular-svg-icons'
import { faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons'

export const LockIcon = () => {
  return <FontAwesomeIcon icon={faLock} />
}
export const UnlockIcon = () => {
  return <FontAwesomeIcon icon={faLockOpen} />
}
export const ChatIcon = () => {
  return <FontAwesomeIcon icon={faCommentDots} />
}
export const MicOnIcon = () => {
  return <FontAwesomeIcon icon={faMicrophoneAlt} />
}
export const MicOffIcon = () => {
  return <FontAwesomeIcon icon={faMicrophoneAltSlash} />
}
export const CheckIcon = () => {
  return <FontAwesomeIcon icon={faCheck} />
}

export const PaperPlanIcon = () => {
  return <FontAwesomeIcon icon={faPaperPlane} />
}

export const CloseIcon = () => {
  return <FontAwesomeIcon icon={faTimes} />
}

export const YoutubeIcon = () => {
  return <FontAwesomeIcon icon={faYoutube} />
}

export const FacebookIcon = () => {
  return <FontAwesomeIcon icon={faFacebook} />
}

export const ExternalLinkIcon = () => {
  return <FontAwesomeIcon icon={faExternalLinkAlt} />
}

export const CopyIcon = () => {
  return <FontAwesomeIcon icon={faCopy} />
}
