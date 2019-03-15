import React, { useEffect, useState, useRef } from 'react'
import socketIoClient from 'socket.io-client'
import styles from './App.module.sass'

const ENDPOINT = '//localhost:4000'
let socket

function App () {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const inputRef = useRef()

  useEffect(() => {
    socket = socketIoClient(ENDPOINT)
    socket.on('server.message', message => {
      setMessageList(prevState => [...prevState].concat([message]))
    })
  }, [])

  const handleMessageSubmit = e => {
    e.preventDefault()
    socket.emit('client.message', message)
    setMessage('')
    inputRef.current.focus()
  }

  return (
    <main className={styles.app}>
      <h1 className={styles.appTitle}>Lobby</h1>
      <ul className={styles.appList}>
        {messageList.map((message, k) => (
          <li className={styles.appItem} key={k}>
            {message}
          </li>
        ))}
      </ul>
      <form className={styles.appForm} onSubmit={e => handleMessageSubmit(e)}>
        <input
          type='text'
          className={styles.appInput}
          autoFocus
          onChange={e => setMessage(e.target.value)}
          ref={inputRef}
          value={message}
        />
        <button type='submit' className={styles.appButton}>
          Send message
        </button>
      </form>
    </main>
  )
}

export default App
