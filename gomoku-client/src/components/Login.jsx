import React, { useContext, useEffect, useRef, useState } from 'react'
import StoreContext from './StoreContext'
import style from './Login.module.sass'

const MIN_USERNAME_LENGTH = 4

function Login () {
  const { socket } = useContext(StoreContext)
  const [userName, setUserName] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    document.title = 'Gomoku: Log In'
    inputRef.current.focus()
  }, [])

  const handleUserNameSubmit = e => {
    e.preventDefault()
    if (userName.length >= MIN_USERNAME_LENGTH) {
      socket.emit('client:userName', userName)
      setUserName('')
    }
    inputRef.current.focus()
  }

  return (
    <main className={style.login}>
      <h1 className={style.title}>Let me in</h1>
      <div className={style.desc}>
        In Japanese language Go means five, and moku pieces (or eyes or dots). X plays first, and
        players alternate in placing a sign on an empty intersection. The winner is the first player
        to get an unbroken row of five signs horizontally, vertically, or diagonally.
      </div>
      <form className={style.form} onSubmit={e => handleUserNameSubmit(e)}>
        <input className={style.input} type='text' onChange={e => setUserName(e.target.value)} placeholder='Name' ref={inputRef} value={userName} />
        <button className={style.button} type='submit'>
          To lobby
        </button>
      </form>
    </main>
  )
}

export default Login
