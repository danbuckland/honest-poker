import { createServer } from 'https'
import { Server } from 'socket.io'
import fs from 'fs'
import Game from './scripts/game.js'
import Hand from './scripts/hand.js'
import { getBestHand } from './scripts/hand-combinations.js'

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

const game = new Game()
const serverGame = {
  game,
  communityCards: game.deck.draw(5)
}

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)
  const playerHand = new Hand(serverGame.game.deck.draw(2))

  const sevenCards = [...playerHand.cards[0], ...serverGame.communityCards]
  const bestHand = getBestHand(sevenCards)
  const bestHandName = bestHand.getFullName()

  socket.emit('start', {
    serverGame,
    playerHand,
    bestHand,
    bestHandName
  })

  socket.on('draw', () => {
    serverGame.game.reset()
    serverGame.communityCards = serverGame.game.deck.draw(5)
    io.emit('draw', {
      serverGame
    })
  })

  socket.on('dealToPlayer', () => {
    playerHand.empty()
    playerHand.addCards(serverGame.game.deck.draw(2))
    const sevenCards = [...playerHand.cards[0], ...serverGame.communityCards]
    const bestHand = getBestHand(sevenCards)
    const bestHandName = bestHand.getFullName()
    socket.emit('playerHand', {
      playerHand,
      bestHand, 
      bestHandName
    })
  })
  
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
  })
})
