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
    if (cardCounts.fourOfAKind) {
      return 7000000 + this.#fourOfAKindTiebreaker(cardCounts)
    }
    // Full House - highest trip, then highest pair
    if (cardCounts.threeOfAKind && cardCounts.pairs.length > 0) {
      return (
        6000000 +
        cardCounts.threeOfAKind * Math.pow(13, 2) +
        parseInt(cardCounts.pairs[0]) * Math.pow(13, 1)
      )
    }
    // Flush - high card tiebreaker, followed by next highest card
    if (cardCounts.hasFlush) {
      return 5000000 + this.#highCardTiebreaker(cardCounts.valuesArray)
    }
    // Straight - high card tiebreaker
    if (cardCounts.hasStraight) return 4000000 + highCard
    // Three of a Kind - highest trip, then next highest cards
    if (cardCounts.threeOfAKind) {
      return 3000000 + this.#threeOfAKindTiebreaker(cardCounts)
    }
    // Two Pair - highest top pair, then highest bottom pair, then highest remaining card
    if (cardCounts.pairs.length === 2) {
      return 2000000 + this.#twoPairTiebreaker(cardCounts)
    }
    // Pair - highest pair, then next highest cards
    if (cardCounts.pairs.length === 1) {
      return 1000000 + this.#pairTiebreaker(cardCounts)
    }
    // High card - Highest card then next highest card
    return 0 + this.#highCardTiebreaker(cardCounts.valuesArray)
  }

  #fourOfAKindTiebreaker(cardCounts) {
    const quadrupleScore = cardCounts.fourOfAKind * Math.pow(13, 3)
    let kicker = 0
    if (this.cards.length === 5) {
      kicker = cardCounts.valuesArray.filter((value) => {
        return value !== parseInt(cardCounts.fourOfAKind)
      })[0]
    }
    return quadrupleScore + kicker
  }

  #threeOfAKindTiebreaker(cardCounts) {
    const tripleScore = cardCounts.threeOfAKind * Math.pow(13, 2)
    const nonMatchingCards = cardCounts.valuesArray.filter((value) => {
      return value !== parseInt(cardCounts.threeOfAKind)
    })
    return this.#highCardTiebreaker(nonMatchingCards) + tripleScore
  }

  #highCardTiebreaker(valuesArray) {
    let sum = 0
    for (let i = 0; i < valuesArray.length; i++) {
      sum += valuesArray[i] * Math.pow(13, i)
    }
    return sum
  }

  #twoPairTiebreaker(cardCounts) {
    cardCounts.pairs.sort((a, b) => a - b)
    const topPair = cardCounts.pairs[1]
    const bottomPair = cardCounts.pairs[0]
    const topPairScore = topPair * Math.pow(13, 2)
    const bottomPairScore = bottomPair * Math.pow(13, 1)
    let kicker = 0
    if (this.cards.length === 5) {
      kicker = cardCounts.valuesArray.filter((value) => {
        return value !== parseInt(topPair) && value !== parseInt(bottomPair)
      })[0]
    }
    return topPairScore + bottomPairScore + kicker
  }

  #pairTiebreaker(cardCounts) {
    const pair = cardCounts.pairs[0]
    const pairScore = pair * Math.pow(13, 3)
    const nonPairedCards = cardCounts.valuesArray.filter((value) => {
      return value !== parseInt(cardCounts.pairs[0])
    })
    return pairScore + this.#highCardTiebreaker(nonPairedCards)
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
