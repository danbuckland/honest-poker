const debugText = document.querySelector('#debug')
const communityCards = document.querySelector('#community-cards')
const poker = new Game()


const prettyPrint = (cards) => {
  let prettyString = ''
  for (let card of cards) {
    prettyString += `${card.name} of ${card.suit}, `
  }
  return prettyString.substring(0, prettyString.length - 2)
}

const renderCards = (cards) => {
  // <img class="front-face" src="cards/AS.svg" alt="Ace of Spades" />
  communityCards.innerHTML = '';
  cards.forEach(card => {
    const cardImage = document.createElement('img')
    cardImage.setAttribute('src', `/cards/${card.code}.svg`)
    cardImage.setAttribute('class', 'front-face')
    cardImage.setAttribute('alt', `${card.name} of ${card.suit}`)
    communityCards.appendChild(cardImage)
  });
}

const drawnCards = poker.deck.draw(5)
debugText.textContent = prettyPrint(drawnCards)
renderCards(drawnCards)