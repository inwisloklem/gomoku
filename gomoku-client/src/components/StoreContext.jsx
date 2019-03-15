import { createContext } from 'react'

export const initialState = {
  messagesList: []
}

export const reducer = (state, action) => {
  const { message, type } = action
  const { messagesList } = state

  switch (type) {
    case 'addMessage':
      const result = {
        ...state,
        messagesList: [
          ...messagesList,
          message
        ]
      }
      return result
    default:
      return state
  }
}

export default createContext()
