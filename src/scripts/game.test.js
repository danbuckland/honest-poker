import Game from './game'
import Deck from './deck'

test('should be able to initialise a new game', () => {
  const game = new Game()
  expect(game.deck.cards.length).toBe(52)
  expect(game.deck).toBeInstanceOf(Deck)
})

test('should be able to reset the game to start a new game', () => {
  const game = new Game()
  game.deck.draw(12)
  expect(game.deck.cards.length).toBe(40)
  game.reset()
  expect(game.deck.cards.length).toBe(52)
})
