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

    // Royal Flush or Straight Flush
    if (cardCounts.hasFlush && cardCounts.hasStraight) {
      if (cardCounts.highCard === 14) return 9
      return 8
    }

    if (cardCounts.fourOfAKind) return 7
    if (cardCounts.threeOfAKind && cardCounts.pairs) return 6
    if (cardCounts.hasFlush) return 5
    if (cardCounts.hasStraight) return 4
    if (cardCounts.threeOfAKind) return 3
    if (cardCounts.pairs === 2) return 2
    if (cardCounts.pairs === 1) return 1

    return 0
  }

  #getCounts() {
    const cardCounts = {
      suits: {},
      values: {},
      fourOfAKind: false,
      threeOfAKind: false,
      pairs: 0,
    }
    const valuesArray = []

    this.cards.forEach((card) => {
      cardCounts['values'][card.value] =
        ++cardCounts['values'][card.value] || 1
      cardCounts['suits'][card.suit] = ++cardCounts['suits'][card.suit] || 1
      valuesArray.push(card.value)
    })

    cardCounts['hasStraight'] = this.#hasStraight(valuesArray)
    cardCounts['highCard'] = Math.max(...valuesArray)
    cardCounts['hasFlush'] = Object.keys(cardCounts.suits).length === 1

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
    if (values.length !== 5) return false
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
