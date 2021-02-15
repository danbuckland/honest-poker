export default class Hand {
  rankings = [
    'High Card',
    'Pair',
    'Two Pair',
    'Three of a Kind',
    'Straight',
    'Flush',
    'Full House',
    'Four of a Kind',
    'Straight Flush',
    'Royal Flush',
  ]

  constructor(...cards) {
    this.cards = [...cards]
  }

  addCards(...cards) {
    cards.forEach((card) => this.cards.push(card))
  }

  empty() {
    this.cards = []
  }

  // Takes between 1 and 7 cards and returns the name of the best hand
  bestHand() {
    return this.rankings[this.getRanking()]
  }

  // Takes between 2 and 5 cards and returns the rank value of the hand
  getRanking() {
    const cardCounts = this.#getCounts()
    const hasFlush = Object.keys(cardCounts.suits).length === 1

    // Royal Flush or Straight Flush
    if (hasFlush && cardCounts.hasStraight) {
      if (cardCounts.highCard === 14) {
        return 9
      } else {
        // Code can never reach this line!
        return 8
      }
    }
    // Four of a Kind
    const matches = {
      fourOfAKind: false,
      threeOfAKind: false,
      pairs: 0,
    }
    for (const value in cardCounts.values) {
      if (cardCounts.values[value] === 4) {
        matches.fourOfAKind = true
      } else if (cardCounts.values[value] === 3) {
        matches.threeOfAKind = true
      } else if (cardCounts.values[value] === 2) {
        matches.pairs++
      }
    }

    if (matches.fourOfAKind) {
      return 7
    }

    if (matches.threeOfAKind && matches.pairs) {
      return 6
    }

    if (hasFlush) {
      return 5
    }

    if (cardCounts.hasStraight) {
      return 4
    }

    if (matches.threeOfAKind) {
      return 3
    }

    if (matches.pairs === 2) {
      return 2
    }

    if (matches.pairs === 1) {
      return 1
    }

    return 0
  }

  // Four of a kind
  // {
  //   suits: { Clubs: 1, Spades: 2, Diamonds: 1, Hearts: 1 },
  //   values: { '13': 1, '14': 4 },
  //   hasStraight: false,
  //   highCard: 14
  // }

  #getCounts() {
    const cardCounter = {
      suits: {},
      values: {},
    }
    const values = []

    this.cards.forEach((card) => {
      cardCounter['values'][card.value] =
        ++cardCounter['values'][card.value] || 1
      cardCounter['suits'][card.suit] = ++cardCounter['suits'][card.suit] || 1
      values.push(card.value)
    })

    cardCounter['hasStraight'] = this.#hasStraight(values)
    cardCounter['highCard'] = Math.max(...values)

    return cardCounter
  }

  #hasStraight(values) {
    if (values.length !== 5) return false
    values.sort()
    for (let i = values.length - 1; i > 0; i--) {
      if (values[i] - values[i - 1] !== 1) {
        return false
      }
    }
    return true
  }
}
