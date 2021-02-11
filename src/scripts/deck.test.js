import Deck from "./deck"

test("should contain 52 cards", () => {
  const deck = new Deck()
  expect(deck.cards.length).toBe(52)
})

test("each card should be unique", () => {
  const deck = new Deck()
  
  const allCardsUnique = (cards) => {
    let cardCodes = {}
    for (const card of cards) {
      if (cardCodes[card.code] === 1) {
        return false
      } else {
        cardCodes[card.code] = 1
      }
    }
    return true
  }

  expect(allCardsUnique(deck.cards)).toBe(true)
})
