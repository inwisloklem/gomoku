import React, { useEffect, useReducer, useRef, useState } from 'react'
import StoreContext, { initialState, reducer } from './StoreContext'
import socketIoClient from 'socket.io-client'
import styles from './Lobby.module.sass'

const ENDPOINT = '//localhost:4000'
let socket

function Lobby () {
  const [messageText, setMessageText] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  const { messagesList } = state
  const inputRef = useRef()

  useEffect(() => {
    document.head.querySelector('title').innerText = 'Gomoku: Lobby'
    socket = socketIoClient(ENDPOINT)
    socket.on('server:message', message => {
      const { id, messageText } = message
      dispatch({ type: 'addMessage', message: { id, messageText } })
    })
  }, [])

  const handleMessageSubmit = e => {
    e.preventDefault()
    socket.emit('client:message', messageText)
    setMessageText('')
    inputRef.current.focus()
  }

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <main className={styles.lobby}>
        <h1 className={styles.title}>Lobby</h1>
        <ul className={styles.list}>
          {messagesList.map(message => (
            <li className={styles.listItem} key={message.id}>
              {message.messageText}
            </li>
          ))}
        </ul>
        <form className={styles.form} onSubmit={e => handleMessageSubmit(e)}>
          <input
            type='text'
            className={styles.input}
            autoFocus
            onChange={e => setMessageText(e.target.value)}
            placeholder='Type a message...'
            ref={inputRef}
            value={messageText}
          />
          <button type='submit' className={styles.button}>
            Send
          </button>
        </form>
      </main>
    </StoreContext.Provider>
  )
}

export default Lobby
