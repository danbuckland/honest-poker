import { createServer } from 'https'
import { Server } from 'socket.io'
import fs from 'fs'
import Game from './game.js'

const httpServer = createServer({
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
  requestCert: false,
  rejectUnauthorized: false,
}).listen(7000)

const io = new Server(httpServer, {
  cors: {
    origin: true
    // origin: ['https://localhost:8080', 'https://0.0.0.0:8080'],
  },
  // ...
})

const serverGame = new Game()
let communityCards = serverGame.deck.draw(5)

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)

  io.emit('start', communityCards)

  socket.on('draw', () => {
    serverGame.reset()
    communityCards = serverGame.deck.draw(5)
    io.emit('draw', communityCards)
  })
  
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
  })
})
