import Deck from './deck'
import Card from './card'

describe('Deck constructor', () => {
  test('should return a Deck containing 52 cards', () => {
    const deck = new Deck()
    expect(deck.cards.length).toBe(52)
  })

  test('should return a deck where each card is unique', () => {
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

  test('should consider Ace to have the highest value', () => {
    const deck = new Deck()
    let drawnCard = deck.draw()
    while (drawnCard.name !== 'Ace') {
      drawnCard = deck.draw()
    }
    expect(drawnCard.value).toBe(14)
  })
})

describe('Draw card function', () => {
  test('should return a single Card object when draw is called without an argument', () => {
    const deck = new Deck()
    const drawnCard = deck.draw()
    expect(drawnCard).toBeInstanceOf(Card)
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
})
