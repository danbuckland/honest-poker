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
    this.score = this.getScore()
  }

  addCards(...cards) {
    cards.forEach((card) => this.cards.push(card))
    this.score = this.getScore()
  }

  empty() {
    this.cards = []
  }

  getName() {
    return this.rankings[this.getRank()]
  }

  // Returns a value corresponding to the rankings array
  getRank() {
    return Math.floor(this.score / 1000)
  }

  // Returns an absolute score of a hand of any number of cards
  getScore() {
    if (this.cards.length === 0) return 0

    const cardCounts = this.#getCounts()
    const highCard = cardCounts.highCard

    if (cardCounts.hasFlush && cardCounts.hasStraight) {
      // Royal Flush - no tiebreaker
      if (highCard === 14) return 9000
      // Straight Flush - high card tiebreaker
      return 8000 + highCard
    }
    // 4 of a Kind - matching cards tiebreaker, no kicker
    if (cardCounts.fourOfAKind)
      return 7000 + cardCounts.fourOfAKind * 40 + highCard
    // Full House - highest trip, then highest pair
    if (cardCounts.threeOfAKind && cardCounts.pairs.length > 0) {
      return 6000 + cardCounts.threeOfAKind * 30 + parseInt(cardCounts.pairs[0])
    }
    // Flush - high card tiebreaker, followed by next highest card
    if (cardCounts.hasFlush) return 5000
    if (cardCounts.hasStraight) return 4000
    if (cardCounts.threeOfAKind) return 3000
    if (cardCounts.pairs.length === 2) return 2000
    if (cardCounts.pairs.length === 1) return 1000

    return 0
  }

  #getCounts() {
    const cardCounts = {
      suits: {},
      values: {},
      fourOfAKind: false,
      threeOfAKind: false,
      pairs: [],
      valuesArray: [],
    }

    this.cards.forEach((card) => {
      cardCounts['values'][card.value] = ++cardCounts['values'][card.value] || 1
      cardCounts['suits'][card.suit] = ++cardCounts['suits'][card.suit] || 1
      cardCounts.valuesArray.push(card.value)
    })

    cardCounts['highCard'] = Math.max(...cardCounts.valuesArray)
    if (this.cards.length === 5) {
      cardCounts['hasStraight'] = this.#hasStraight(cardCounts.valuesArray)
      cardCounts['hasFlush'] = Object.keys(cardCounts.suits).length === 1
    }

    for (const value in cardCounts.values) {
      if (cardCounts.values[value] === 4) {
        cardCounts['fourOfAKind'] = value
      } else if (cardCounts.values[value] === 3) {
        cardCounts['threeOfAKind'] = value
      } else if (cardCounts.values[value] === 2) {
        cardCounts['pairs'].push(value)
      }
    }

    return cardCounts
  }

  #hasStraight(values) {
    values.sort((a, b) => {
      return a - b
    })
    for (let i = values.length - 1; i > 0; i--) {
      if (values[i] - values[i - 1] !== 1) {
        return false
      }
    }
    return true
  }
}
