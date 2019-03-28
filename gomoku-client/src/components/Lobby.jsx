import React, { useContext, useEffect, useRef, useState } from 'react'
import Dialog from './Dialog'
import StoreContext from './StoreContext'
import MessagesList from './MessagesList'
import UsersList from './UsersList'
import styles from './Lobby.module.sass'

function Lobby () {
  const [dialogOptions, setDialogOptions] = useState(null)
  const [messageText, setMessageText] = useState('')
  const { socket, state, dispatch } = useContext(StoreContext)
  const { currentUser, messagesList, usersList } = state
  const inputRef = useRef()

  useEffect(() => {
    document.title = 'Gomoku: Lobby'
    socket.on('server:message', message => {
      dispatch({ type: 'addMessage', message })
    })
    socket.on('server:request', user => {
      const { userName } = user
      setDialogOptions({
        onAccept () {
          console.info('handleDialogAccept')
        },
        onReject () {
          console.info('handleDialogReject')
        },
        open: true,
        userName,
        view: 'choose'
      })
    })
    inputRef.current.focus()
  }, [])

  const handleDialogInit = user => {
    if (user.id === currentUser.id) {
      return
    }
    setDialogOptions({
      open: true,
      userName: user.userName,
      view: 'request'
    })
    socket.emit('client:request', {
      currentUser,
      user
    })
  }

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
          <UsersList currentUser={currentUser} users={usersList} onDialogInit={handleDialogInit} />
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
      <Dialog {...dialogOptions} />
    </main>
  )
}

export default Lobby
