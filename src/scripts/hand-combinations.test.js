import Hand from './hand'
import { getBestHand } from './hand-combinations'
import * as card from './test-cards'

describe('should find the best possible combination of 5 cards from 7 cards', () => {
  test('should identify the best hand as Three of a Kind when given 3 aces in 7 cards', () => {
    const expectedHand = new Hand(
      card.aceOfDiamonds,
      card.aceOfHearts,
      card.kingOfSpades,
      card.queenOfSpades,
      card.aceOfSpades
    )
    const bestHand = getBestHand([
      card.aceOfDiamonds,
      card.jackOfDiamonds,
      card.sevenOfHearts,
      card.aceOfHearts,
      card.kingOfSpades,
      card.queenOfSpades,
      card.aceOfSpades,
    ])
    expect(bestHand.getRanking()).toBe(3)
    expect(bestHand.cards.length).toBe(5)
  })
})