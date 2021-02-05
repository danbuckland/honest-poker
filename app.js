const debugText = document.querySelector('#debug')
const poker = new Game()


prettyPrint = (cards) => {
  let prettyString = ''
  for (let card of cards) {
    prettyString += `${card.name} of ${card.suit}, `
  }
  return prettyString.substring(0, prettyString.length - 2)
}

debugText.textContent = prettyPrint(poker.deck.draw(5))