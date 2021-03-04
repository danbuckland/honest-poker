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

  cardNames = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King',
    'Ace',
  ]

  constructor(...cards) {
    if (cards.length > 5) {
      throw Error('Hands must contain 5 or less cards')
    }
    this.cards = [...cards]
    this.score = this.getScore()
    this.cardCounts
  }

  addCards(...cards) {
    cards.forEach((card) => {
      if (this.cards.length >= 5) {
        throw Error('Hand is full, unable to add more cards')
      }
      this.cards.push(card)
    })
    this.score = this.getScore()
  }

  empty() {
    this.cards = []
    this.score = 0
    this.cardCounts = {}
  }

  getName() {
    return this.rankings[this.getRank()]
  }

  getFullName() {
    const highCardName = this.cardNames[this.cardCounts.highCard - 2]
    const firstPairName = this.cardNames[this.cardCounts.pairs[0] - 2]
    const secondPairName = this.cardNames[this.cardCounts.pairs[1] - 2]
    const tripleName = this.cardNames[this.cardCounts.threeOfAKind - 2]
    const quadrupleName = this.cardNames[this.cardCounts.fourOfAKind - 2]

    switch (this.getRank()) {
      case 0:
        return `${this.rankings[0]}, ${highCardName}`
      case 1:
        return `${this.rankings[1]} of ${firstPairName}s`
      case 2:
        return `${this.rankings[2]}, ${secondPairName}s over ${firstPairName}s`
      case 3:
        return `${this.rankings[3]}, ${tripleName}s`
      case 4:
        return `${highCardName}-high ${this.rankings[4]}`
      case 5:
        return `${highCardName}-high ${this.rankings[5]}`
      case 6:
        return `${this.rankings[6]}, ${tripleName}s over ${firstPairName}s`
      case 7:
        return `${this.rankings[7]}, ${quadrupleName}s`
      case 8:
        return `${highCardName}-high ${this.rankings[8]}`
      case 9:
        return this.rankings[9]
      default:
        return this.getName()
    }
  }

  // Returns a value corresponding to the rankings array
  getRank() {
    return Math.floor(this.score / 1_000_000)
  }

  // Returns an absolute score of a hand of any number of cards
  getScore() {
    if (this.cards.length === 0) return 0

    const cardCounts = (this.cardCounts = this.#getCounts())
    const {
      hasFlush,
      hasStraight,
      fourOfAKind,
      threeOfAKind,
      pairs,
      valuesArray,
      highCard,
    } = this.cardCounts

    if (hasFlush && hasStraight) {
      // Royal Flush - no tiebreaker
      if (highCard === 14) return 9_000_000
      // Straight Flush - high card tiebreaker
      return 8_000_000 + highCard
    }
    // 4 of a Kind - matching cards tiebreaker, no kicker
    if (fourOfAKind) return 7_000_000 + this.#fourOfAKindTiebreaker(cardCounts)
    // Full House - highest trip, then highest pair
    if (threeOfAKind && pairs.length > 0) {
      return (
        6_000_000 +
        threeOfAKind * Math.pow(13, 2) +
        parseInt(pairs[0]) * Math.pow(13, 1)
      )
    }
    // Flush - high card tiebreaker, followed by next highest card
    if (hasFlush) return 5_000_000 + this.#highCardTiebreaker(valuesArray)
    // Straight - high card tiebreaker
    if (hasStraight) return 4_000_000 + highCard
    // Three of a Kind - highest trip, then next highest cards
    if (threeOfAKind)
      return 3_000_000 + this.#threeOfAKindTiebreaker(cardCounts)
    // Two Pair - highest top pair, then highest bottom pair, then highest remaining card
    if (pairs.length === 2)
      return 2_000_000 + this.#twoPairTiebreaker(cardCounts)
    // Pair - highest pair, then next highest cards
    if (pairs.length === 1) return 1_000_000 + this.#pairTiebreaker(cardCounts)
    // High card - Highest card then next highest card
    return 0 + this.#highCardTiebreaker(valuesArray)
  }

  #fourOfAKindTiebreaker({ fourOfAKind, valuesArray }) {
    const quadrupleScore = fourOfAKind * Math.pow(13, 3)
    let kicker = 0
    if (this.cards.length === 5) {
      kicker = valuesArray.filter((value) => {
        return value !== parseInt(fourOfAKind)
      })[0]
    }
    return quadrupleScore + kicker
  }

  #threeOfAKindTiebreaker({ threeOfAKind, valuesArray }) {
    const tripleScore = threeOfAKind * Math.pow(13, 2)
    const nonMatchingCards = valuesArray.filter((value) => {
      return value !== parseInt(threeOfAKind)
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

  #twoPairTiebreaker({ pairs, valuesArray }) {
    pairs.sort((a, b) => a - b)
    const topPair = pairs[1]
    const bottomPair = pairs[0]
    const topPairScore = topPair * Math.pow(13, 2)
    const bottomPairScore = bottomPair * Math.pow(13, 1)
    let kicker = 0
    if (this.cards.length === 5) {
      kicker = valuesArray.filter((value) => {
        return value !== parseInt(topPair) && value !== parseInt(bottomPair)
      })[0]
    }
    return topPairScore + bottomPairScore + kicker
  }

  #pairTiebreaker({ pairs, valuesArray }) {
    const pair = pairs[0]
    const pairScore = pair * Math.pow(13, 3)
    const nonPairedCards = valuesArray.filter((value) => {
      return value !== parseInt(pairs[0])
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

    cardCounts.valuesArray.sort((a, b) => a - b)
    cardCounts['highCard'] = cardCounts.valuesArray.slice(-1)[0]
    if (this.cards.length === 5) {
      // Handle unique case where Ace is low in a 5-high "wheel" straight
      if (JSON.stringify(cardCounts.valuesArray) === '[2,3,4,5,14]') {
        cardCounts.valuesArray = [1, 2, 3, 4, 5]
        cardCounts.highCard = 5
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
