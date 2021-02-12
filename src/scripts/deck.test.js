import Deck from './deck'
import Card from './card'

test('should contain 52 cards', () => {
  const deck = new Deck()
  expect(deck.cards.length).toBe(52)
})

test('each card should be unique', () => {
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

test('should return an array containing 1 card when 1 is requested', () => {
  const deck = new Deck()
  const drawnCards = deck.draw(1)
  expect(drawnCards.length).toBe(1)
  expect(drawnCards[0]).toBeInstanceOf(Card)
  expect(deck.cards.length).toBe(51)
})

test('should return an array containing 5 cards when 5 are requested', () => {
  const deck = new Deck()
  const drawnCards = deck.draw(5)
  expect(drawnCards.length).toBe(5)
  drawnCards.forEach((card) => {
    expect(card).toBeInstanceOf(Card)
  })
  expect(deck.cards.length).toBe(47)
})

test('should not be able to draw more than 52 cards from the deck', () => {
  const deck = new Deck()
  const drawnCards = deck.draw(53)
  expect(drawnCards.length).toBe(52)
  expect(deck.cards.length).toBe(0)
})

test('should consider Ace to have the highest value', () => {
  const deck = new Deck()
  let drawnCard = deck.draw(1)[0]
  while (drawnCard.name !== 'Ace') {
    drawnCard = deck.draw(1)[0]
  }
  expect(drawnCard.value).toBe(14)
})
