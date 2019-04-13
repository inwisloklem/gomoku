import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Game from './Game'
import StoreContext from './StoreContext'

function GameRoute () {
  const { state } = useContext(StoreContext)
  const { isGameStarted, isLoggedIn } = state

  return (
    <Route
      path='/game'
      render={() => {
        switch (true) {
          case isGameStarted && isLoggedIn:
            return <Game />
          case isLoggedIn:
            return <Redirect to='/lobby' />
          default:
            return <Redirect to='/' />
        }
      }}
    />
  )
}

export default GameRoute
