import React from 'react'
import usePublications from '../../../hooks/usePublications'
import Publication from './Publication'
import { useSelector } from 'react-redux'
/*
 *  The object model for the Room object (found here: https://www.twilio.com/docs/video/migrating-1x-2x#object-model) shows
 *  that Participant objects have TrackPublications, and TrackPublication objects have Tracks.
 *
 *  The React components in this application follow the same pattern. This ParticipantTracks component renders Publications,
 *  and the Publication component renders Tracks.
 */

export default function ParticipantTracks({ participant, disableAudio }) {
  const room = useSelector((state) => state.room.room)
  const publications = usePublications(participant)
  const isLocal = participant === room.localParticipant
  let filteredPublications
  filteredPublications = publications.filter((p) => p.trackName !== 'screen')
  return (
    <>
      {filteredPublications.map((publication) => (
        <Publication
          key={publication.kind}
          publication={publication}
          participant={participant}
          isLocal={isLocal}
          disableAudio={disableAudio}
        />
      ))}
    </>
  )
}
