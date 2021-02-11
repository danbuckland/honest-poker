import Hand from './hand'
import Card from './card'

const aceSpades = new Card('Ace', 'Spades', 1, 'AS')
const aceClubs = new Card('Ace', 'Clubs', 1, 'AC')
const twoSpades = new Card(2, 'Spades', 2, '2S')
const threeSpades = new Card(3, 'Spades', 3, '3S')
const sevenHearts = new Card(7, 'Hearts', 7, '7H')
const jackDiamonds = new Card('Jack', 'Diamonds', 11, 'JD') 

test('should return true when two cards have the same value', () => {
  const hand = new Hand(aceClubs, aceSpades)
  expect(hand.containsPair()).toBe(true)
})

test('should return false when two cards have different values', () => {
  const hand = new Hand(twoSpades, aceSpades)
  expect(hand.containsPair()).toBe(false)
})

test('should return true when two cards in a hand of 5 cards have the same value', () => {
  const hand = new Hand(twoSpades, threeSpades, aceSpades, sevenHearts, aceClubs)
  expect(hand.containsPair()).toBe(true)
})

test('should return false when a hand of 5 cards contains only unique values', () => {
  const hand = new Hand(twoSpades, threeSpades, aceSpades, sevenHearts, jackDiamonds)
  expect(hand.containsPair()).toBe(false)
})