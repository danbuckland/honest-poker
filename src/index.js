import './styles.css'
import io from 'socket.io-client'

const socket = io(`wss://${window.location.hostname}:7000`)
const communityCards = document.querySelector('#community-cards')
const redrawButton = document.querySelector('#redraw')
const bestHandText = document.querySelector('#best-hand-text')
const playerCards = document.querySelector('#player-cards')

socket.on('connect', () => {
  console.log(`Connected as ${socket.id}`)
})

socket.on('start', (data) => {
  renderCards(data.serverGame.communityCards)
  showWinningHand(data.bestHandName)
  let playerCardData = data.playerHand.cards[0]
  console.log(prettyPrint(playerCardData))
  renderPlayerCards(playerCardData)
})

socket.on('draw', (data) => {
  renderCards(data.serverGame.communityCards)
  socket.emit('dealToPlayer')
})

socket.on('playerHand', (data) => {
  let playerCardData = data.playerHand.cards[0]
  showWinningHand(data.bestHandName)
  console.log(prettyPrint(playerCardData))
  renderPlayerCards(playerCardData)
})

const prettyPrint = (cards) => {
  let prettyString = ''
  for (let card of cards) {
    prettyString += `${card.name} of ${card.suit}, `
  }
  return prettyString.substring(0, prettyString.length - 2)
}

const renderCards = (cards) => {
  communityCards.innerHTML = ''
  cards.forEach((card) => {
    const cardImage = document.createElement('img')
    cardImage.setAttribute('src', `cards/${card.code}.svg`)
    cardImage.setAttribute('class', 'card')
    cardImage.setAttribute('alt', `${card.name} of ${card.suit}`)
    communityCards.appendChild(cardImage)
  })
}

const renderPlayerCards = (cards) => {
  playerCards.innerHTML = ''
  cards.forEach((card) => {
    const cardImage = document.createElement('img')
    cardImage.setAttribute('src', `cards/${card.code}.svg`)
    cardImage.setAttribute('class', 'player-card')
    cardImage.setAttribute('alt', `${card.name} of ${card.suit}`)
    playerCards.appendChild(cardImage)
  })
}

const showWinningHand = (bestHandName) => {
  bestHandText.textContent = `Your best hand is a ${bestHandName}`
  // console.log(prettyPrint(data.serverGame.communityCards))
}

redrawButton.addEventListener('click', () => {
  socket.emit('draw')
})
