import React from 'react'
import { shallow } from 'enzyme'
import Lobby from './Lobby'

describe('Lobby', () => {
  const lobby = shallow(<Lobby />)

  it('renders the header', () => {
    expect(lobby.find('header').exists()).toBe(true)
  })
})
