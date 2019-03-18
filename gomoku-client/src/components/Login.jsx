import React, { useEffect, useRef } from 'react'
import style from './Login.module.sass'

function Login () {
  const inputRef = useRef()

  useEffect(() => {
    document.head.querySelector('title').innerText = 'Gomoku: Log In'
    inputRef.current.focus()
  }, [])

  return (
    <main className={style.login}>
      <h1 className={style.title}>Let me in</h1>
      <div className={style.desc}>
        In Japanese language Go means five, and moku pieces (or eyes or dots). X plays first, and
        players alternate in placing a sign on an empty intersection. The winner is the first player
        to get an unbroken row of five signs horizontally, vertically, or diagonally.
      </div>
      <form className={style.form}>
        <input className={style.input} type='text' placeholder='Name' ref={inputRef} />
        <button className={style.button} type='submit'>
          To lobby
        </button>
      </form>
    </main>
  )
}

export default Login
