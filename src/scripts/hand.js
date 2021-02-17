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
    return Math.floor(this.score / 1000000)
  }

  // Returns an absolute score of a hand of any number of cards
  getScore() {
    if (this.cards.length === 0) return 0

    const cardCounts = this.#getCounts()
    const highCard = cardCounts.highCard

    if (cardCounts.hasFlush && cardCounts.hasStraight) {
      // Royal Flush - no tiebreaker
      if (highCard === 14) return 9000000
      // Straight Flush - high card tiebreaker
      return 8000000 + highCard
    }
    // 4 of a Kind - matching cards tiebreaker, no kicker
    if (cardCounts.fourOfAKind)
      return 7000000 + cardCounts.fourOfAKind * Math.pow(13, 4) + highCard
    // Full House - highest trip, then highest pair
    if (cardCounts.threeOfAKind && cardCounts.pairs.length > 0) {
      return 6000000 + cardCounts.threeOfAKind * Math.pow(13, 3) + parseInt(cardCounts.pairs[0]) * Math.pow(13, 2)
    }
    // Flush - high card tiebreaker, followed by next highest card
    if (cardCounts.hasFlush) return 5000000 + this.flushTiebreaker(cardCounts.valuesArray)
    // Straight - high card tiebreaker
    if (cardCounts.hasStraight) return 4000000 + highCard
    // Three of a Kind - highest trip, then next highest cards
    if (cardCounts.threeOfAKind) return 3000000
    // Two Pair - highest top pair, then highest bottom pair, then highest remaining card
    if (cardCounts.pairs.length === 2) return 2000000
    // Pair - highest pair, then next highest cards
    if (cardCounts.pairs.length === 1) return 1000000
    return 0
  }

  flushTiebreaker(valuesArray) {
    let sum = 0
    for (let i = 0; i < valuesArray.length; i++) {
      sum += valuesArray[i] * (Math.pow(13, i))
    }
    console.log(sum)
    return sum
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
      cardCounts.valuesArray.sort((a, b) => a - b)
      // Handle unique case where Ace is low in a 5-high "wheel" straight
      if (JSON.stringify(cardCounts.valuesArray) === '[2,3,4,5,14]') {
        cardCounts.valuesArray = [1, 2, 3, 4, 5]
        cardCounts['hasStraight'] = true
      } else {
        cardCounts['hasStraight'] = this.#hasStraight(cardCounts.valuesArray)
      }
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
    for (let i = values.length - 1; i > 0; i--) {
      if (values[i] - values[i - 1] !== 1) {
        return false
      }
    }
    return true
  }
}
