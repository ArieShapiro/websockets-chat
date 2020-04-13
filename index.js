const express = require('express')
const app = express()
const socket = require('socket.io')

app.use(express.static('public'))

const server = app.listen(4000, () => {
  console.log('Listening on port 4000...')
})

let io = socket(server)
io.on('connection', socket => {
  console.log('Made Socket connection', socket.id)

  socket.on('chat', data => {
    io.sockets.emit('chat', data)
  })
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data)
  })
})