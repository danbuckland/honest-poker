import { containsPair } from './hand-ranker'

class TestCard {
  constructor(name, suit, value, code) {
    this.name = name
    this.suit = suit
    this.value = value
    this.code = code
  }
}

const aceSpades = new TestCard('Ace', 'Spades', 1, 'AS')
const aceClubs = new TestCard('Ace', 'Clubs', 1, 'AC')
const twoSpades = new TestCard(2, 'Spades', 2, '2S')
const threeSpades = new TestCard(3, 'Spades', 3, '3S')
const sevenHearts = new TestCard(7, 'Hearts', 7, '7H')
const jackDiamonds = new TestCard('Jack', 'Diamonds', 11, 'JD')

test('should return true when two cards have the same value', () => {
  expect(containsPair([aceSpades, aceClubs])).toBe(true)
})

test('should return false when two cards have different values', () => {
  expect(containsPair([aceSpades, twoSpades])).toBe(false)
})

test('should return true when two cards in a hand of 5 cards have the same value', () => {
  expect(containsPair([twoSpades, threeSpades, aceSpades, sevenHearts, aceClubs])).toBe(true)
})

test('should return false when a hand of 5 cards contains only unique values', () => {
  expect(containsPair([twoSpades, threeSpades, aceSpades, sevenHearts, jackDiamonds])).toBe(false)
})