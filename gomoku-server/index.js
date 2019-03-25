const cors = require('cors')
const express = require('express')
const socketIo = require('socket.io')
const uuidv4 = require('uuid/v4')

const app = express()
const PORT = 4000

app.options('*', cors())

const users = []

const server = app.listen(PORT, () => {
  console.info(`The server is listening on ${PORT}.`)
})

const io = socketIo(server)
io.on('connection', socket => {
  const { id } = socket

  socket.on('client:userName', userName => {
    if (!users.some(user => user.id === id)) {
      users.push({
        id,
        userName
      })
    }
    socket.emit('server:currentUser', { id, userName })
    io.emit('server:usersList', users)
  })

  socket.on('client:message', messageText => {
    io.emit('server:message', {
      id: uuidv4(),
      messageText
    })
  })

  socket.on('disconnect', () => {
    const index = users.findIndex(user => user.id === id)
    users.splice(index, 1)
    io.emit('server:usersList', users)
  })
})
