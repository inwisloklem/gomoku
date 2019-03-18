import React, { useContext, useEffect, useRef, useState } from 'react'
import StoreContext from './StoreContext'
import MessagesList from './MessagesList'
import styles from './Lobby.module.sass'

function Lobby () {
  const [messageText, setMessageText] = useState('')
  const { socket, state, dispatch } = useContext(StoreContext)
  const { messagesList } = state
  const inputRef = useRef()

  useEffect(() => {
    document.head.querySelector('title').innerText = 'Gomoku: Lobby'
    socket.on('server:message', message => {
      const { id, messageText } = message
      dispatch({ type: 'addMessage', message: { id, messageText } })
    })
    inputRef.current.focus()
  }, [])

  const handleMessageSubmit = e => {
    e.preventDefault()
    if (messageText !== '') {
      socket.emit('client:message', messageText)
      setMessageText('')
    }
    inputRef.current.focus()
  }

  return (
    <main className={styles.lobby}>
      <h1 className={styles.title}>Lobby</h1>
      <MessagesList messages={messagesList} />
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
  )
}

export default Lobby
