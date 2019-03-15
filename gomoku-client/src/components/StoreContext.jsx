import { createContext } from 'react'

export const initialState = {
  messagesList: []
}

export const reducer = (state, action) => {
  const { message, type } = action
  const { messagesList } = state

  switch (type) {
    case 'addMessage':
      return {
        ...state,
        messagesList: [...messagesList, message]
      }
    default:
      return state
  }
}

export default createContext()
