import Hand from './hand'
import * as card from './test-cards'

describe('Hand ranking logic for incomplete hands', () => {
  test('should identify "High Card" when provided any 2 cards that are not a pair', () => {
    const hand = new Hand(card.twoOfSpades, card.threeOfSpades)
    expect(hand.getRank()).toBe(0)
    expect(hand.getName()).toBe('High Card')
  })

  test('should identify "Pair" when provided any 2 cards with the same value', () => {
    const hand = new Hand(card.jackOfSpades, card.jackOfDiamonds)
    expect(hand.getRank()).toBe(1)
    expect(hand.getName()).toBe('Pair')
  })

  test('should identify "High Card" when provided any 3 cards with different values', () => {
    const hand = new Hand(card.sevenOfClubs, card.aceOfClubs, card.kingOfClubs)
    expect(hand.getRank()).toBe(0)
    expect(hand.getName()).toBe('High Card')
  })

  test('should identify "Three of a Kind" when provided any 3 cards with the same value', () => {
    const hand = new Hand(
      card.sevenOfClubs,
      card.sevenOfDiamonds,
      card.sevenOfHearts
    )
    expect(hand.getRank()).toBe(3)
    expect(hand.getName()).toBe('Three of a Kind')
  })

  test('should identify "High Card" when provided any 4 cards with a different value', () => {
    const hand = new Hand(
      card.jackOfSpades,
      card.queenOfSpades,
      card.kingOfSpades,
      card.aceOfSpades
    )
    expect(hand.getRank()).toBe(0)
    expect(hand.getName()).toBe('High Card')
  })

  test('should identify "Two Pair" when provided 4 cards consisting of two pairs of cards', () => {
    const hand = new Hand(
      card.sevenOfHearts,
      card.sevenOfDiamonds,
      card.jackOfSpades,
      card.jackOfDiamonds
    )
    expect(hand.getRank()).toBe(2)
    expect(hand.getName()).toBe('Two Pair')
  })

  test('should identify "Four of a Kind" when provided 4 cards of equal values', () => {
    const hand = new Hand(
      card.aceOfClubs,
      card.aceOfSpades,
      card.aceOfDiamonds,
      card.aceOfHearts
    )
    expect(hand.getRank()).toBe(7)
    expect(hand.getName()).toBe('Four of a Kind')
  })
})

describe('Hand ranking logic for 5 card hands', () => {
  test('should identify "Royal Flush" when 5 consecutive cards of the same suit are Ace high', () => {
    const hand = new Hand(
      card.aceOfSpades,
      card.kingOfSpades,
      card.queenOfSpades,
      card.jackOfSpades,
      card.tenOfSpades
    )
    expect(hand.getRank()).toBe(9)
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
    expect(hand.getRank()).toBe(8)
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
    expect(hand.getRank()).toBe(7)
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
    expect(hand.getRank()).toBe(6)
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
    expect(hand.getRank()).toBe(5)
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
    expect(hand.getRank()).toBe(4)
    expect(hand.getName()).toBe('Straight')
  })

  test('should identify "Straight" when an Ace is used as a low card in Ace, 2, 3, 4, 5', () => {
    const hand = new Hand(
      card.twoOfClubs,
      card.threeOfDiamonds,
      card.aceOfClubs,
      card.fiveOfHearts,
      card.fourOfClubs
    )
    expect(hand.getRank()).toBe(4)
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
    expect(hand.getRank()).toBe(3)
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
    expect(hand.getRank()).toBe(2)
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
    expect(hand.getRank()).toBe(1)
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
    expect(hand.getRank()).toBe(0)
    expect(hand.getName()).toBe('High Card')
  })
})

describe('Tiebreaker logic', () => {
  test('should always score Four of a Kind 3s higher than Four 2s', () => {
    const fourOfAKind3s = new Hand(
      card.threeOfSpades,
      card.threeOfDiamonds,
      card.threeOfClubs,
      card.threeOfHearts,
      card.twoOfClubs
    )
    const fourOfAKind2s = new Hand(
      card.twoOfHearts,
      card.twoOfDiamonds,
      card.twoOfClubs,
      card.twoOfSpades,
      card.aceOfDiamonds
    )
    expect(fourOfAKind3s.score).toBeGreaterThan(fourOfAKind2s.score)
  })

  test('should score Full House Aces over 2s higher than Kings over Queens', () => {
    const fullHouseAces = new Hand(
      card.aceOfDiamonds,
      card.aceOfClubs,
      card.aceOfHearts,
      card.twoOfSpades,
      card.twoOfHearts
    )
    const fullHouseKings = new Hand(
      card.queenOfSpades,
      card.queenOfDiamonds,
      card.kingOfDiamonds,
      card.kingOfClubs,
      card.kingOfSpades
    )
    expect(fullHouseAces.score).toBeGreaterThan(fullHouseKings.score)
  })

  test('should score Full House 3s over 2s higher than 2s over Aces', () => {
    const fullHouse3s = new Hand(
      card.threeOfClubs,
      card.threeOfDiamonds,
      card.threeOfSpades,
      card.twoOfSpades,
      card.twoOfHearts
    )
    const fullHouse2s = new Hand(
      card.twoOfClubs,
      card.twoOfDiamonds,
      card.twoOfHearts,
      card.aceOfHearts,
      card.aceOfSpades
    )
    expect(fullHouse3s.score).toBeGreaterThan(fullHouse2s.score)
  })

  test('should always score an Ace high flush higher than any King high flush', () => {
    const aceHighFlush = new Hand(
      card.aceOfHearts,
      card.twoOfHearts,
      card.threeOfHearts,
      card.fourOfHearts,
      card.sixOfHearts
    )
    const kingHighFlush = new Hand(
      card.kingOfSpades,
      card.queenOfSpades,
      card.jackOfSpades,
      card.tenOfSpades,
      card.eightOfSpades
    )
    expect(aceHighFlush.score).toBeGreaterThan(kingHighFlush.score)
  })

  test('should look to next highest card when two flushes have the same high card', () => {
    const aceHighFlush = new Hand(
      card.aceOfHearts,
      card.twoOfHearts,
      card.threeOfHearts,
      card.fourOfHearts,
      card.sixOfHearts
    )
    const anotherAceHighFlush = new Hand(
      card.aceOfSpades,
      card.sixOfSpades,
      card.fourOfSpades,
      card.threeOfSpades,
      card.fiveOfSpades
    )
    expect(anotherAceHighFlush.score).toBeGreaterThan(aceHighFlush.score)
  })

  test('should always score Three of a Kind 3s higher than Three of a Kind 2s', () => {
    const threeOfAKind3s = new Hand(
      card.threeOfSpades,
      card.threeOfClubs,
      card.threeOfDiamonds,
      card.twoOfSpades,
      card.fourOfClubs
    )
    const threeOfAKind2s = new Hand(
      card.twoOfHearts,
      card.twoOfClubs,
      card.twoOfDiamonds,
      card.aceOfSpades,
      card.kingOfClubs
    )
    expect(threeOfAKind3s.score).toBeGreaterThan(threeOfAKind2s.score)
  })

  test('should always score Two Pair Aces and 2s higher than Two Pair Kings and Queens', () => {
    const twoPairAces2s = new Hand(
      card.aceOfSpades,
      card.aceOfDiamonds,
      card.twoOfSpades,
      card.twoOfClubs,
      card.threeOfClubs
    )
    const twoPairKingsQueens = new Hand(
      card.kingOfClubs,
      card.kingOfDiamonds,
      card.queenOfHearts,
      card.queenOfSpades,
      card.aceOfDiamonds
    )
    expect(twoPairAces2s.score).toBeGreaterThan(twoPairKingsQueens.score)
  })

  test('should always score a pair of Aces higher than a pair of Kings', () => {
    const pairOfAces = new Hand(
      card.aceOfSpades,
      card.aceOfDiamonds,
      card.twoOfSpades,
      card.fourOfClubs,
      card.threeOfClubs
    )
    const pairOfKings = new Hand(
      card.kingOfClubs,
      card.kingOfDiamonds,
      card.queenOfHearts,
      card.jackOfDiamonds,
      card.aceOfDiamonds
    )
    expect(pairOfAces.score).toBeGreaterThan(pairOfKings.score)
  })

  test('should go to the next highest card repeatedly if high cards match', () => {
    const aceHighHand = new Hand(
      card.aceOfSpades,
      card.sevenOfDiamonds,
      card.sixOfSpades,
      card.fourOfClubs,
      card.threeOfClubs
    )
    const anotherAceHighHand = new Hand(
      card.aceOfHearts,
      card.sevenOfHearts,
      card.sixOfHearts,
      card.fourOfSpades,
      card.twoOfSpades
    )
    expect(aceHighHand.score).toBeGreaterThan(anotherAceHighHand.score)
  })
})

describe('Maximum hand size logic', () => {
  test('should prevent hands being initialised with more than 5 cards', () => {
    const attemptToCreate6CardHand = () => {
      new Hand(
        card.threeOfHearts,
        card.fiveOfHearts,
        card.aceOfDiamonds,
        card.queenOfDiamonds,
        card.tenOfSpades,
        card.aceOfSpades
      )
    }
    expect(attemptToCreate6CardHand).toThrowError()
  })

  test('should prevent cards being added to hands that already have 5 cards', () => {
    const fullHand = new Hand(
      card.threeOfHearts,
      card.fiveOfHearts,
      card.aceOfDiamonds,
      card.queenOfDiamonds,
      card.tenOfSpades
    )
    expect(() => fullHand.addCards(card.aceOfSpades)).toThrowError()
    expect(fullHand.cards.length).toBe(5)
  })
})

describe('Add cards method', () => {
  test('should update the score when a card is added', () => {
    const highCardHand = new Hand(
      card.kingOfSpades,
      card.queenOfSpades,
      card.jackOfSpades,
      card.tenOfSpades
    )
    expect(highCardHand.score).toBe(30742)
    highCardHand.addCards(card.aceOfSpades)
    expect(highCardHand.score).toBe(9000000)
  })
})

describe('Empty hand method', () => {
  test('should clear all cards from a hand resulting in 0 cards', () => {
    const fullHand = new Hand(
      card.threeOfHearts,
      card.fiveOfHearts,
      card.aceOfDiamonds,
      card.queenOfDiamonds,
      card.tenOfSpades
    )
    fullHand.empty()
    expect(fullHand.cards.length).toBe(0)
    expect(fullHand.score).toBe(0)
  })
})
