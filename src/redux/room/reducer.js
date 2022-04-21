import { handleActions } from 'redux-actions'
import * as actions from './actions'

let initState = {
  room: null, // twilio room
  stream: {
    // youtube stream url
    url: '',
  },
  dj: '', // dj id
  pins: [],
  participants: [],
  chatOpen: false,
  chatMember: '',
  mainSelection: '', // selection id
}

const roomReducer = handleActions(
  {
    // Init Room
    [actions.INIT_ROOM]: (state, action) => {
      return initState
    },

    // Set Stream URL
    [actions.SET_STREAM_URL_SUCCESS]: (state, action) => {
      return {
        ...state,
        stream: {
          url: action.payload,
        },
      }
    },

    // Set Stream URL as null
    [actions.SET_STREAM_URL_FAILED]: (state, action) => {
      return {
        ...state,
        stream: {
          url: '',
        },
      }
    },

    // Set Participants Joined
    [actions.PARTICIPANT_JOINED]: (state, action) => {
      const participants = [...state.participants, action.payload]
      const newP = action.payload
      const pin = state.pins.find((pin) => pin.identity === newP.identity)
      if (!pin && state.pins.length < 7) {
        return {
          ...state,
          participants: participants,
          pins: [
            ...state.pins,
            {
              identity: newP.identity,
              locked: false,
              sent: false,
              mic: false,
              chat: false,
              chats: [],
            },
          ],
        }
      }
      return {
        ...state,
        participants: participants,
        // pins: [...state.pins, { identity: newP.identity, locked: false }],
      }
    },

    // Remove Participants Exit
    [actions.PARTICIPANT_EXIT]: (state, action) => {
      const ext = action.payload
      const participants = [...state.participants]
      const filteredParticipants = participants.filter(
        (p) => p.identity !== ext.identity,
      )
      const filteredPins = state.pins.filter((p) => p.identity !== ext.identity)
      return {
        ...state,
        participants: filteredParticipants ? filteredParticipants : [],
        pins: filteredPins ? filteredPins : [],
        chatOpen: state.chatMember === ext.identity ? false : true,
        chatMember: state.chatMember === ext.identity ? '' : state.chatMember,
      }
    },

    [actions.INIT_PARTICIPANTS]: (state, action) => {
      return {
        ...state,
        participants: [...action.payload.participants],
      }
    },

    // Set Room Data
    [actions.SET_TWILIO_ROOM]: (state, action) => {
      return {
        ...state,
        room: action.payload,
      }
    },

    // Set Pin Sent
    [actions.SET_PIN_SENT]: (state, action) => {
      const pId = action.payload.identity
      const pins = [...state.pins]
      const foundIndex = pins.findIndex((pin) => pin.identity === pId)
      const originPin = pins[foundIndex]
      pins[foundIndex] = {
        ...originPin,
        sent: true,
      }

      return {
        ...state,
        pins,
      }
    },

    // Set Pin UnLock
    [actions.SET_PIN_UNLOCK]: (state, action) => {
      const pId = action.payload.identity
      const pins = [...state.pins]
      const foundIndex = pins.findIndex((pin) => pin.identity === pId)
      const originPin = pins[foundIndex]
      pins[foundIndex] = {
        ...originPin,
        locked: true,
      }

      return {
        ...state,
        pins,
      }
    },

    // Set Pin Lock
    [actions.SET_PIN_LOCK]: (state, action) => {
      const pId = action.payload.identity
      const pins = [...state.pins]
      const foundIndex = pins.findIndex((pin) => pin.identity === pId)
      const originPin = pins[foundIndex]
      pins[foundIndex] = {
        identity: pId,
        locked: false,
        sent: false,
        mic: false,
        chat: false,
        chats: [],
      }

      return {
        ...state,
        chatOpen: false,
        chatMember: '',
        pins,
      }
    },

    // Set Pin Mic On
    [actions.SET_PIN_MIC]: (state, action) => {
      const pId = action.payload.identity
      const pins = [...state.pins]
      const foundIndex = pins.findIndex((pin) => pin.identity === pId)
      const originPin = pins[foundIndex]
      pins[foundIndex] = {
        ...originPin,
        mic: action.payload.isOn,
      }
      return {
        ...state,
        pins,
      }
    },

    [actions.INIT_CHAT_ROOM]: (state, action) => {
      return {
        ...state,
        chatMember: '',
        chatOpen: false,
      }
    },

    [actions.OPEN_CHAT]: (state, action) => {
      const pins = [...state.pins]
      const pinIndex = pins.findIndex(
        (p) => p.identity === action.payload.identity,
      )
      const originPin = pins[pinIndex]
      const updatedChats = originPin.chats.map((chat) => ({
        ...chat,
        read: true,
      }))
      pins[pinIndex] = {
        ...originPin,
        chats: updatedChats,
      }
      return {
        ...state,
        chatOpen: true,
        chatMember: action.payload.identity,
        pins,
      }
    },

    [actions.CLOSE_CHAT]: (state, action) => {
      return {
        ...state,
        chatOpen: false,
        chatMember: '',
      }
    },

    [actions.ADD_MESSAGE]: (state, action) => {
      const pId = action.payload.identity
      const pins = [...state.pins]
      const foundIndex = pins.findIndex((pin) => pin.identity === pId)
      const originPin = pins[foundIndex]
      pins[foundIndex] = {
        ...originPin,
        chats: [
          ...originPin.chats,
          {
            text: action.payload.message,
            sent: action.payload.sent,
            read: action.payload.sent
              ? true
              : state.chatMember === originPin.identity
              ? true
              : false,
          },
        ],
      }
      return {
        ...state,
        pins,
      }
    },

    // set mainSelection which would be used in MainParticipant
    [actions.SELECT_MAIN]: (state, action) => {
      return {
        ...state,
        mainSelection: action.payload.identity,
      }
    },

    // radomize pins triggered from random button click
    [actions.RANDOMIZE_PINS]: (state, action) => {
      const pins = [...state.pins]
      for (let pinIndex = 0; pinIndex < 7; pinIndex++) {
        if (pins[pinIndex] && pins[pinIndex].locked === true) {
          continue
        }
        const candidates = state.participants.filter((p) => {
          const pinned = pins.find((pin) => pin.identity === p.identity)
          if (pinned) return false
          else return true
        })

        const randomPin =
          candidates[Math.floor(Math.random() * candidates.length)]

        if (!randomPin) continue
        pins[pinIndex] = {
          identity: randomPin.identity,
          locked: false,
          sent: false,
          mic: false,
          chat: false,
          chats: [],
        }
      }

      return {
        ...state,
        pins,
      }
    },
  },
  initState,
)
export default roomReducer
