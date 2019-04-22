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

  const handleDialogReject = user => {
    socket.emit('client:abort', user)
    socket.emit('client:setBusy:false', {
      currentUser,
      user
    })
    setDialogOptions({
      open: false
    })
  }

  useEffect(() => {
    document.title = 'Gomoku: Lobby'
    socket.on('server:abort', () => {
      setDialogOptions({
        open: false
      })
    })
    socket.on('server:message', message => {
      dispatch({ type: 'addMessage', message })
    })
    socket.on('server:request', user => {
      socket.emit('client:setBusy:true', {
        currentUser,
        user
      })
      setDialogOptions({
        onAccept () {
          socket.emit('client:startGame', {
            currentUser,
            user
          })
        },
        onReject () {
          handleDialogReject(user)
        },
        open: true,
        user,
        view: 'choose'
      })
    })
    socket.on('server:startGame', () => {
      dispatch({ type: 'startGame' })
    })
    inputRef.current.focus()
  }, [])

  const handleDialogInit = user => {
    if (user.id === currentUser.id) {
      return
    }
    setDialogOptions({
      onReject () {
        handleDialogReject(user)
      },
      open: true,
      user,
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
