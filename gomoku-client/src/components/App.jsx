import React, { useEffect, useReducer, useState } from 'react'
import StoreContext, { initialState, reducer } from './StoreContext'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Lobby from './Lobby'
import Login from './Login'
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
      console.info(currentUser)
      dispatch({ type: 'updateCurrentUser', currentUser })
    })
    socket.on('server:usersList', usersList => {
      console.info(usersList)
      dispatch({ type: 'updateUsersList', usersList })
    })
  }, [])

  return isConnected ? (
    <StoreContext.Provider value={{ socket, state, dispatch }}>
      <Router>
        <Route exact path='/' component={Login} />
        <Route path='/lobby' component={Lobby} />
      </Router>
    </StoreContext.Provider>
  ) : (
    <main className={styles.app}>
      <h1 className={styles.title}>Connecting to socket...</h1>
    </main>
  )
}

export default App
