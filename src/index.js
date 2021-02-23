import Game from './scripts/game'
import Hand from './scripts/hand'
import './styles.css'
import io from 'socket.io-client'

const socket = io('wss://localhost:7000')

socket.on('connect', () => {
  console.log(`Connected as ${socket.id}`)
})

const poker = new Game()

const communityCards = document.querySelector('#community-cards')
const redrawButton = document.querySelector('#redraw')
const bestHandText = document.querySelector('#best-hand-text')

const hand = new Hand()

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

const showWinningHand = (cards) => {
  hand.addCards(...cards)
  bestHandText.textContent = `The best hand is ${hand.getFullName()}`
  console.log(prettyPrint(cards))
}

redrawButton.addEventListener('click', () => {
  poker.reset()
  hand.empty()
  drawnCards = poker.deck.draw(5)
  renderCards(drawnCards)
  showWinningHand(drawnCards)
})

let drawnCards = poker.deck.draw(5)
renderCards(drawnCards)
showWinningHand(drawnCards)
