import Deck from "./deck"
import Card from "./card"

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

test("should return an array containing 1 card when 1 is requested", () => {
  const deck = new Deck()
  const drawnCards = deck.draw(1)
  expect(drawnCards.length).toBe(1)
  expect(drawnCards[0]).toBeInstanceOf(Card)
})