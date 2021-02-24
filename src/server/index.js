import { createServer } from 'https'
import { Server } from 'socket.io'
import fs from 'fs'
import Game from './scripts/game.js'
import Hand from './scripts/hand.js'

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
const hand = new Hand(...communityCards)

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)

  socket.emit('start', {
    communityCards,
    hand, 
    fullName: hand.getFullName()
  })

  socket.on('draw', () => {
    serverGame.reset()
    communityCards = serverGame.deck.draw(5)
    hand.empty()
    hand.addCards(...communityCards)
    io.emit('draw', {
      communityCards,
      hand, 
      fullName: hand.getFullName() 
    })
  })
  
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
  })
})
