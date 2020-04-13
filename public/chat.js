'use strict'

const socket = io.connect('http://localhost:4000')

let message = document.getElementById('message')
let handle = document.getElementById('handle')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let feedback = document.getElementById('feedback')

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})
message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})

socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>'
        + data.message + '</p>'
    feedback.innerHTML = ''
})
socket.on('typing', data => {

    feedback.innerHTML = '<p><em>' + data + 'is typing a message...</em></p>'
    setTimeout(() => {
        feedback.innerHTML = ''
    }, 3000)
})

