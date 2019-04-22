const cors = require('cors')
const express = require('express')
const socketIo = require('socket.io')
const uuidv4 = require('uuid/v4')

const app = express()
const PORT = 4000

app.options('*', cors())

const store = {
  users: []
}

const setBusy = (users, isBusy) => {
  for (let user of Object.values(users)) {
    const index = store.users.findIndex(storeUser => user.id === storeUser.id)
    if (~index) {
      store.users[index].isBusy = isBusy
    }
  }
}

const server = app.listen(PORT, () => {
  console.info(`The server is listening on ${PORT}.`)
})

const io = socketIo(server)
io.on('connection', socket => {
  const { id } = socket

  socket.on('client:abort', user => {
    io.to(user.id).emit('server:abort')
  })

  socket.on('client:message', message => {
    io.emit('server:message', {
      ...message,
      id: uuidv4(),
      timeStamp: Date.now()
    })
  })

  socket.on('client:request', users => {
    const { currentUser, user } = users
    io.to(user.id).emit('server:request', currentUser)
  })

  socket.on('client:setBusy:true', users => {
    setBusy(users, true)
    io.emit('server:usersList', store.users)
  })

  socket.on('client:setBusy:false', users => {
    setBusy(users, false)
    io.emit('server:usersList', store.users)
  })

  socket.on('client:startGame', users => {
    for (let user of Object.values(users)) {
      io.to(user.id).emit('server:startGame')
    }
  })

  socket.on('client:userName', userName => {
    if (!store.users.some(user => user.id === id)) {
      store.users.push({
        id,
        isBusy: false,
        userName
      })
    }
    socket.emit('server:currentUser', { id, userName })
    io.emit('server:usersList', store.users)
  })

  socket.on('disconnect', () => {
    const index = store.users.findIndex(storeUser => storeUser.id === id)
    store.users.splice(index, 1)
    io.emit('server:usersList', store.users)
  })
})
