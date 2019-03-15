const cors = require('cors')
const express = require('express')
const socketIo = require('socket.io')

const app = express()
const PORT = 4000

app.options('*', cors())

const server = app.listen(PORT, () => {
  console.info(`The server is listening on ${PORT}.`)
})

io = socketIo(server)
io.on('connection', socket => {
  console.info('User connected.')
  socket.emit('server.message', 'Welcome to Gomoku game chat.')

  socket.on('client.message', message => {
    io.emit('server.message', message)
  })

  socket.on('disconnect', () => {
    console.info('User disconnected.')
  })
})
