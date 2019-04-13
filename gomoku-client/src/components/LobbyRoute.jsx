import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Lobby from './Lobby'
import StoreContext from './StoreContext'

function LobbyRoute () {
  const { state } = useContext(StoreContext)
  const { isGameStarted, isLoggedIn } = state

  return (
    <Route
      path='/lobby'
      render={() => {
        switch (true) {
          case isGameStarted && isLoggedIn:
            return <Redirect to='/game' />
          case isLoggedIn:
            return <Lobby />
          default:
            return <Redirect to='/' />
        }
      }}
    />
  )
}

export default LobbyRoute
