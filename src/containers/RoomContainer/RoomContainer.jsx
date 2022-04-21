import React, { useState, useEffect, useRef } from 'react'
import Video from 'twilio-video'
import useUserData from '../../hooks/useUserData/useUserData'
import {
  setTwilioRoom,
  participantJoined,
  participantExit,
} from '../../redux/room/actions'
import { useDispatch, useSelector } from 'react-redux'
import VideoParty from '../../pages/VideoParty/VideoParty'
import useLocalTracks from '../../hooks/useLocalTracks/useLocalTracks'

const connectionOptions = {
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      dominantSpeakerPriority: 'standard',
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 90, width: 160 },
      },
    },
  },
  dominantSpeaker: true,
  maxAudioBitrate: 12000,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
}

const RoomContainer = () => {
  const userData = useUserData()
  const token = userData.token
  const dispatch = useDispatch()
  const { localTracks, getLocalVideoTrack } = useLocalTracks()
  const disconnectHandlerRef = useRef(() => {})
  const localTracksRef = useRef([])
  useEffect(() => {
    // It can take a moment for Video.connect to connect to a room. During this time, the user may have enabled or disabled their
    // local audio or video tracks. If this happens, we store the localTracks in this ref, so that they are correctly published
    // once the user is connected to the room.
    localTracksRef.current = localTracks
  }, [localTracks])

  useEffect(() => {
    const participantConnected = (participant) => {
      console.log(participant.identity, '=> connected')
      dispatch(participantJoined(participant))
    }

    const participantDisconnected = (participant) => {
      console.log(participant.identity, '=> disconnected')
      dispatch(participantExit(participant))
    }

    Video.connect(token, { ...connectionOptions, tracks: [] }).then((room) => {
      dispatch(setTwilioRoom(room))
      room.once('disconnected', () => {
        setTimeout(() => dispatch(setTwilioRoom(null)))
        window.removeEventListener('beforeunload', disconnectHandlerRef.current)
      })

      // @ts-ignore
      window.twilioRoom = room

      localTracksRef.current.forEach((track) =>
        // Tracks can be supplied as arguments to the Video.connect() function and they will automatically be published.
        // However, tracks must be published manually in order to set the priority on them.
        // All video tracks are published with 'low' priority. This works because the video
        // track that is displayed in the 'MainParticipant' component will have it's priority
        // set to 'high' via track.setPriority()
        room.localParticipant.publishTrack(track, {
          priority: track.kind === 'video' ? 'low' : 'standard',
        }),
      )

      disconnectHandlerRef.current = () => {
        console.log('beforeunload hook called!')
        room.disconnect()
      }

      window.addEventListener('beforeunload', disconnectHandlerRef.current)

      room.on('participantConnected', participantConnected)
      room.on('participantDisconnected', participantDisconnected)
      room.participants.forEach(participantConnected)
    })

    return () => {
      dispatch(setTwilioRoom(null))
    }
  }, [])

  const room = useSelector((state) => state.room.room)
  return (
    <div className="room">
      {room !== null && room.state === 'connected' ? (
        <VideoParty />
      ) : (
        <div> Connecting, Please wait for a while ...</div>
      )}
    </div>
  )
}

export default RoomContainer
