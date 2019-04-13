import React, { useEffect, useReducer, useState } from 'react'
import StoreContext, { initialState, reducer } from './StoreContext'
import { BrowserRouter as Router } from 'react-router-dom'
import LoginRoute from './LoginRoute'
import GameRoute from './GameRoute'
import LobbyRoute from './LobbyRoute'
import socketIoClient from 'socket.io-client'
import styles from './App.module.sass'

const ENDPOINT = '//localhost:4000'
let socket

function App () {
  const [isConnected, setIsConnected] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    socket = socketIoClient(ENDPOINT)
    socket.on('connect', () => {
      setIsConnected(true)
    })
    socket.on('server:currentUser', currentUser => {
      dispatch({ type: 'updateCurrentUser', currentUser })
      dispatch({ type: 'login' })
    })
    socket.on('server:usersList', usersList => {
      dispatch({ type: 'updateUsersList', usersList })
    })
  }, [])

  return isConnected ? (
    <StoreContext.Provider value={{ socket, state, dispatch }}>
      <Router>
        <LoginRoute />
        <LobbyRoute />
        <GameRoute />
      </Router>
    </StoreContext.Provider>
  ) : (
    <main className={styles.app}>
      <h1 className={styles.title}>Connecting to socket...</h1>
    </main>
  )
}

export default App
