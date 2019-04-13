import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Login from './Login'
import StoreContext from './StoreContext'

function LoginRoute () {
  const { state } = useContext(StoreContext)
  const { isGameStarted, isLoggedIn } = state

  return (
    <Route
      exact
      path='/'
      render={() => {
        switch (true) {
          case isGameStarted && isLoggedIn:
            return <Redirect to='/game' />
          case isLoggedIn:
            return <Redirect to='/lobby' />
          default:
            return <Login />
        }
      }}
    />
  )
}

export default LoginRoute
