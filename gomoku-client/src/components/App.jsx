import React, { useEffect, useReducer, useState, useRef } from 'react'
import StoreContext, { initialState, reducer } from './StoreContext'
import socketIoClient from 'socket.io-client'
import styles from './App.module.sass'

const ENDPOINT = '//localhost:4000'
let socket

function App () {
  const [messageText, setMessageText] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  const { messagesList } = state
  const inputRef = useRef()

  useEffect(() => {
    socket = socketIoClient(ENDPOINT)
    socket.on('server.message', message => {
      const { id, messageText } = message
      dispatch({ type: 'addMessage', message: { id, messageText } })
    })
  }, [])

  const handleMessageSubmit = e => {
    e.preventDefault()
    socket.emit('client.message', messageText)
    setMessageText('')
    inputRef.current.focus()
  }

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <main className={styles.app}>
        <h1 className={styles.appTitle}>Lobby</h1>
        <ul className={styles.appList}>
          {messagesList.map(message => (
            <li className={styles.appItem} key={message.id}>
              {message.messageText}
            </li>
          ))}
        </ul>
        <form className={styles.appForm} onSubmit={e => handleMessageSubmit(e)}>
          <input
            type='text'
            className={styles.appInput}
            autoFocus
            onChange={e => setMessageText(e.target.value)}
            ref={inputRef}
            value={messageText}
          />
          <button type='submit' className={styles.appButton}>
            Send message
          </button>
        </form>
      </main>
    </StoreContext.Provider>
  )
}

export default App
