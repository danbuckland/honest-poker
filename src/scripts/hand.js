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
    return this.rankings[this.getRanking()]
  }

  // Takes between 2 and 5 cards and returns the rank value of the hand
  getRanking() {
    return Math.floor(this.score / 100)
  }

  getScore() {
    if (this.cards.length === 0) return 0

    const cardCounts = this.#getCounts()
    const tiebreakerScore = this.#getTiebreakerScore(cardCounts.valuesArray)
    
    if (cardCounts.hasFlush && cardCounts.hasStraight) {
      if (cardCounts.highCard === 14) return 900 + tiebreakerScore
      return 800 + tiebreakerScore
    }

    if (cardCounts.fourOfAKind) return 700 + tiebreakerScore
    if (cardCounts.threeOfAKind && cardCounts.pairs) return 600 + tiebreakerScore
    if (cardCounts.hasFlush) return 500 + tiebreakerScore
    if (cardCounts.hasStraight) return 400 + tiebreakerScore
    if (cardCounts.threeOfAKind) return 300 + tiebreakerScore
    if (cardCounts.pairs === 2) return 200 + tiebreakerScore
    if (cardCounts.pairs === 1) return 100 + tiebreakerScore

    return 0 + tiebreakerScore 
  }

  #getTiebreakerScore(valuesArray) {
    let score = 0
    for (let i = valuesArray.length; i--; ) {
      score += valuesArray[i]
    }
    return score
  }

  #getCounts() {
    const cardCounts = {
      suits: {},
      values: {},
      fourOfAKind: false,
      threeOfAKind: false,
      pairs: 0,
      valuesArray: []
    }

    this.cards.forEach((card) => {
      cardCounts['values'][card.value] = ++cardCounts['values'][card.value] || 1
      cardCounts['suits'][card.suit] = ++cardCounts['suits'][card.suit] || 1
      cardCounts.valuesArray.push(card.value)
    })

    const handSize = this.cards.length
    cardCounts['highCard'] = Math.max(...cardCounts.valuesArray)
    if (this.cards.length === 5) {
      cardCounts['hasStraight'] = this.#hasStraight(cardCounts.valuesArray)
      cardCounts['hasFlush'] = Object.keys(cardCounts.suits).length === 1
    }

    for (const value in cardCounts.values) {
      if (cardCounts.values[value] === 4) {
        cardCounts['fourOfAKind'] = true
      } else if (cardCounts.values[value] === 3) {
        cardCounts['threeOfAKind'] = true
      } else if (cardCounts.values[value] === 2) {
        cardCounts['pairs']++
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
