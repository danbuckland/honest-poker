export default class Hand {
  rankings = [
    'High Card',
    'One Pair',
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
    if (hasFlush && cardCounts.hasStraight) {
      console.log(cardCounts.highCard)
      if (cardCounts.highCard === 14) {
        return 9
      } else {
        return 8
      }
    }
  }

  #getCounts() {
    const cardCounter = { suits: {} }
    const values = []

    this.cards.forEach((card) => {
      cardCounter[card.value] = ++cardCounter[card.value] || 1
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
