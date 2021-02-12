import Hand from './hand'
import Card from './card'

// Test Card data
const aceOfClubs = new Card('Ace', 'Clubs', 14, 'AC')
const kingOfClubs = new Card('King', 'Clubs', 13, 'KC')

const aceOfDiamonds = new Card('Ace', 'Diamonds', 14, 'AD')
const jackOfDiamonds = new Card('Jack', 'Diamonds', 11, 'JD')

const aceOfHearts = new Card('Ace', 'Hearts', 14, 'AH')
const sevenOfHearts = new Card(7, 'Hearts', 7, '7H')

const aceOfSpades = new Card('Ace', 'Spades', 14, 'AS')
const kingOfSpades = new Card('King', 'Spades', 13, 'KS')
const queenOfSpades = new Card('Queen', 'Spades', 12, 'QS')
const jackOfSpades = new Card('Jack', 'Spades', 11, 'JS')
const tenOfSpades = new Card(10, 'Spades', 10, 'TS')
const nineOfSpades = new Card(9, 'Spades', 9, '9S')
const threeOfSpades = new Card(3, 'Spades', 3, '3S')
const twoOfSpades = new Card(2, 'Spades', 2, '2S')

test('should return false when a hand of 5 cards contains only unique values', () => {
  const hand = new Hand(
    twoOfSpades,
    threeOfSpades,
    aceOfSpades,
    sevenOfHearts,
    jackOfDiamonds
  )
  expect(hand.containsPair()).toBe(false)
})

test('should return "Royal Flush" when 5 consecutive cards of the same suit are Ace high', () => {
  const hand = new Hand(
    aceOfSpades,
    kingOfSpades,
    queenOfSpades,
    jackOfSpades,
    tenOfSpades
  )
  expect(hand.bestHand()).toBe('Royal Flush')
})

test('should return "Straight Flush" when 5 consecutive cards of the same suit are not Ace high', () => {
  const hand = new Hand(
    kingOfSpades,
    queenOfSpades,
    jackOfSpades,
    tenOfSpades,
    nineOfSpades
  )
  expect(hand.bestHand()).toBe('Straight Flush')
})

test('should return "Four of a Kind" when 4 cards each have the same value', () => {
  const hand = new Hand(
    aceOfClubs,
    aceOfSpades,
    aceOfDiamonds,
    aceOfHearts,
    kingOfSpades
  )
  expect(hand.bestHand()).toBe('Four of a Kind')
})

test('should return "Full House" when 5 cards are "Three of a Kind" and "One Pair"', () => {
  const hand = new Hand(
    aceOfClubs,
    aceOfDiamonds,
    aceOfHearts,
    kingOfClubs,
    kingOfSpades
  )
  expect(hand.bestHand()).toBe('Full House')
})

test('should return "Flush" when 5 non-consecutive cards are of the same suit', () => {
  const hand = new Hand(
    queenOfSpades,
    jackOfSpades,
    tenOfSpades,
    nineOfSpades,
    twoOfSpades
  )
  expect(hand.bestHand()).toBe('Flush')
})

test('should return "Straight" when 5 consecutive cards are not all of the same suit', () => {
  const hand = new Hand(
    aceOfHearts,
    kingOfClubs,
    queenOfSpades,
    jackOfDiamonds,
    tenOfSpades
  )
  expect(hand.bestHand()).toBe('Straight')
})

test('should return "Three of a Kind" when 5 cards contain 3 cards of the same value', () => {
  const hand = new Hand(
    aceOfClubs,
    aceOfHearts,
    aceOfSpades,
    jackOfDiamonds,
    tenOfSpades
  )
  expect(hand.bestHand()).toBe('Three of a Kind')
})

test('should return "Two Pair" when 5 cards contain 2 pairs of cards of different values', () => {
  const hand = new Hand(
    aceOfClubs,
    aceOfHearts,
    kingOfClubs,
    kingOfSpades,
    tenOfSpades
  )
  expect(hand.bestHand()).toBe('Two Pair')
})

test('should return "Pair" when 5 cards contains 2 cards of the same value', () => {
  const hand = new Hand(
    aceOfClubs,
    aceOfHearts,
    kingOfClubs,
    queenOfSpades,
    tenOfSpades
  )
  expect(hand.bestHand()).toBe('Pair')
})

test('should return "High Card" when 5 cards are unable to make any other hand', () => {
  const hand = new Hand(
    aceOfClubs,
    kingOfSpades,
    queenOfSpades,
    jackOfSpades,
    nineOfSpades
  )
  expect(hand.bestHand()).toBe('High Card')
})
