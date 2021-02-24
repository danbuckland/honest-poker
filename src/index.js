import './styles.css'
import io from 'socket.io-client'

const socket = io(`wss://${window.location.hostname}:7000`)
const communityCards = document.querySelector('#community-cards')
const redrawButton = document.querySelector('#redraw')
const bestHandText = document.querySelector('#best-hand-text')

socket.on('connect', () => {
  console.log(`Connected as ${socket.id}`)
})

socket.on('start', (data) => {
  renderCards(data.serverGame.communityCards)
  showWinningHand(data.bestHandName)
  console.log(prettyPrint(data.playerHand.cards[0]))
})

socket.on('draw', (data) => {
  renderCards(data.serverGame.communityCards)
  socket.emit('dealToPlayer')
})

socket.on('playerHand', (data) => {
  showWinningHand(data.bestHandName)
  console.log(prettyPrint(data.playerHand.cards[0]))
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

const showWinningHand = (bestHandName) => {
  bestHandText.textContent = `The best hand is ${bestHandName}`
  // console.log(prettyPrint(data.serverGame.communityCards))
}

redrawButton.addEventListener('click', () => {
  socket.emit('draw')
})
