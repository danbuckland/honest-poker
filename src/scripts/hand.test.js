import Hand from './hand'
import * as card from './test-cards'

describe('Hand ranking algorithm', () => {
  test('should identify "High Card" when provided any 2 cards that are not a pair', () => {
    const hand = new Hand(card.twoOfSpades, card.threeOfSpades)
    expect(hand.getRanking()).toBe(0)
    expect(hand.getName()).toBe('High Card')
  })

  test('should identify "Pair" when provided any 2 cards with the same value', () => {
    const hand = new Hand(card.jackOfSpades, card.jackOfDiamonds)
    expect(hand.getRanking()).toBe(1)
    expect(hand.getName()).toBe('Pair')
  })

  test('should identify "High Card" when provided any 3 cards with different values', () => {
    const hand = new Hand(card.sevenOfClubs, card.aceOfClubs, card.kingOfClubs)
    expect(hand.getRanking()).toBe(0)
    expect(hand.getName()).toBe('High Card')
  })

  test('should identify "Three of a Kind" when provided any 3 cards with the same value', () => {
    const hand = new Hand(
      card.sevenOfClubs,
      card.sevenOfDiamonds,
      card.sevenOfHearts
    )
    expect(hand.getRanking()).toBe(3)
    expect(hand.getName()).toBe('Three of a Kind')
  })

  test('should identify "High Card" when provided any 4 cards with a different value', () => {
    const hand = new Hand(
      card.jackOfSpades,
      card.queenOfSpades,
      card.kingOfSpades,
      card.aceOfSpades
    )
    expect(hand.getRanking()).toBe(0)
    expect(hand.getName()).toBe('High Card')
  })

  test('should identify "Two Pair" when provided 4 cards consisting of two pairs of cards', () => {
    const hand = new Hand(
      card.sevenOfHearts,
      card.sevenOfDiamonds,
      card.jackOfSpades,
      card.jackOfDiamonds
    )
    expect(hand.getRanking()).toBe(2)
    expect(hand.getName()).toBe('Two Pair')
  })

  test('should identify "Four of a Kind" when provided 4 cards of equal values', () => {
    const hand = new Hand(
      card.aceOfClubs,
      card.aceOfSpades,
      card.aceOfDiamonds,
      card.aceOfHearts
    )
    expect(hand.getRanking()).toBe(7)
    expect(hand.getName()).toBe('Four of a Kind')
  })

  test('should identify "Royal Flush" when 5 consecutive cards of the same suit are Ace high', () => {
    const hand = new Hand(
      card.aceOfSpades,
      card.kingOfSpades,
      card.queenOfSpades,
      card.jackOfSpades,
      card.tenOfSpades
    )
    expect(hand.getRanking()).toBe(9)
    expect(hand.getName()).toBe('Royal Flush')
  })

  test('should identify "Straight Flush" when 5 consecutive cards of the same suit are not Ace high', () => {
    const hand = new Hand(
      card.kingOfSpades,
      card.queenOfSpades,
      card.jackOfSpades,
      card.tenOfSpades,
      card.nineOfSpades
    )
    expect(hand.getRanking()).toBe(8)
    expect(hand.getName()).toBe('Straight Flush')
  })

  test('should identify "Four of a Kind" when 4 cards each have the same value', () => {
    const hand = new Hand(
      card.aceOfClubs,
      card.aceOfSpades,
      card.aceOfDiamonds,
      card.aceOfHearts,
      card.kingOfSpades
    )
    expect(hand.getRanking()).toBe(7)
    expect(hand.getName()).toBe('Four of a Kind')
  })

  test('should identify "Full House" when 5 cards are "Three of a Kind" and "One Pair"', () => {
    const hand = new Hand(
      card.aceOfClubs,
      card.aceOfDiamonds,
      card.aceOfHearts,
      card.kingOfClubs,
      card.kingOfSpades
    )
    expect(hand.getRanking()).toBe(6)
    expect(hand.getName()).toBe('Full House')
  })

  test('should identify "Flush" when 5 non-consecutive cards are of the same suit', () => {
    const hand = new Hand(
      card.queenOfSpades,
      card.jackOfSpades,
      card.tenOfSpades,
      card.nineOfSpades,
      card.twoOfSpades
    )
    expect(hand.getRanking()).toBe(5)
    expect(hand.getName()).toBe('Flush')
  })

  test('should identify "Straight" when 5 consecutive cards are not all of the same suit', () => {
    const hand = new Hand(
      card.aceOfHearts,
      card.kingOfClubs,
      card.queenOfSpades,
      card.jackOfDiamonds,
      card.tenOfSpades
    )
    expect(hand.getRanking()).toBe(4)
    expect(hand.getName()).toBe('Straight')
  })

  test('should identify "Three of a Kind" when 5 cards contain 3 cards of the same value', () => {
    const hand = new Hand(
      card.aceOfClubs,
      card.aceOfHearts,
      card.aceOfSpades,
      card.jackOfDiamonds,
      card.tenOfSpades
    )
    expect(hand.getRanking()).toBe(3)
    expect(hand.getName()).toBe('Three of a Kind')
  })

  test('should identify "Two Pair" when 5 cards contain 2 pairs of cards of different values', () => {
    const hand = new Hand(
      card.aceOfClubs,
      card.aceOfHearts,
      card.kingOfClubs,
      card.kingOfSpades,
      card.tenOfSpades
    )
    expect(hand.getRanking()).toBe(2)
    expect(hand.getName()).toBe('Two Pair')
  })

  test('should identify "Pair" when 5 cards contains 2 cards of the same value', () => {
    const hand = new Hand(
      card.aceOfClubs,
      card.aceOfHearts,
      card.kingOfClubs,
      card.queenOfSpades,
      card.tenOfSpades
    )
    expect(hand.getRanking()).toBe(1)
    expect(hand.getName()).toBe('Pair')
  })

  test('should identify "High Card" when 5 cards are unable to make any other hand', () => {
    const hand = new Hand(
      card.aceOfClubs,
      card.kingOfSpades,
      card.queenOfSpades,
      card.jackOfSpades,
      card.nineOfSpades
    )
    expect(hand.getRanking()).toBe(0)
    expect(hand.getName()).toBe('High Card')
  })

  test('should score Full House Kings over 2s higher than Queens over Jacks', () => {
    const fullHouseKings = new Hand(
      card.kingOfClubs,
      card.kingOfSpades,
      card.kingOfDiamonds,
      card.twoOfSpades,
      card.twoOfHearts
    )

    const fullHouseQueens = new Hand(
      card.queenOfSpades,
      card.queenOfDiamonds,
      card.queenOfHearts,
      card.jackOfDiamonds,
      card.jackOfSpades
    )

    expect(fullHouseKings.score).toBeGreaterThan(fullHouseQueens.score)
  })
})
