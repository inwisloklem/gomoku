import { createContext } from 'react'

export const initialState = {
  currentUser: null,
  isLoggedIn: false,
  messagesList: [],
  usersList: []
}

export const reducer = (state, action) => {
  const { currentUser, message, type, usersList } = action
  const { messagesList } = state

  switch (type) {
    case 'addMessage':
      return {
        ...state,
        messagesList: [...messagesList, message]
      }
    case 'login':
      return {
        ...state,
        isLoggedIn: true
      }
    case 'logout':
      return {
        ...state,
        isLoggedIn: false
      }
    case 'updateCurrentUser':
      return {
        ...state,
        currentUser
      }
    case 'updateUsersList':
      return {
        ...state,
        usersList
      }
    default:
      return state
  }
}

export default createContext()
