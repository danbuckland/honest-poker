import Game from './game'
import Deck from './deck'

describe('Game constructor', () => {
  test('should initialise a new game with a fresh deck of cards', () => {
    const game = new Game()
    expect(game.deck.cards.length).toBe(52)
    expect(game.deck).toBeInstanceOf(Deck)
  })
})

describe('Reset game function', () => {
  test('should reset the game with a fresh deck of cards', () => {
    const game = new Game()
    game.deck.draw(12)
    expect(game.deck.cards.length).toBe(40)
    game.reset()
    expect(game.deck.cards.length).toBe(52)
  })
})
