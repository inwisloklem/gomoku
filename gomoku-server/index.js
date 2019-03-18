const cors = require('cors')
const express = require('express')
const socketIo = require('socket.io')
const uuidv4 = require('uuid/v4')

const app = express()
const PORT = 4000

app.options('*', cors())

const server = app.listen(PORT, () => {
  console.info(`The server is listening on ${PORT}.`)
})

const io = socketIo(server)
io.on('connection', socket => {
  socket.emit('server:message', { id: uuidv4(), messageText: 'Welcome to Gomoku chat' })

  socket.on('client:message', messageText => {
    io.emit('server:message', {
      id: uuidv4(),
      messageText
    })
  })
})
