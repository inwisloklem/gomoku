import React, { useContext, useEffect, useRef, useState } from 'react'
import StoreContext from './StoreContext'
import MessagesList from './MessagesList'
import UsersList from './UsersList'
import styles from './Lobby.module.sass'

function Lobby () {
  const [messageText, setMessageText] = useState('')
  const { socket, state, dispatch } = useContext(StoreContext)
  const { currentUser, messagesList, usersList } = state
  const inputRef = useRef()

  useEffect(() => {
    document.title = 'Gomoku: Lobby'
    socket.on('server:message', message => {
      dispatch({ type: 'addMessage', message })
    })
    inputRef.current.focus()
  }, [])

  const handleMessageSubmit = e => {
    e.preventDefault()
    if (messageText !== '') {
      socket.emit('client:message', { author: currentUser, text: messageText })
      setMessageText('')
    }
    inputRef.current.focus()
  }

  return (
    <main className={styles.lobby}>
      <h1 className={styles.title}>Lobby</h1>
      <div className={styles.inner}>
        <div className={styles.left}>
          <MessagesList messages={messagesList} />
        </div>
        <div className={styles.right}>
          <UsersList users={usersList} />
        </div>
      </div>
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
