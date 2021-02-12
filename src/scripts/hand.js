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

  bestHand() {
    //
    return 'Unknown'
  }

  containsPair() {
    if (this.cards.length < 2) {
      return false
    }
    let valuesCount = {}
    for (const card of this.cards) {
      if (valuesCount[card.value] === 1) {
        return true
      } else {
        valuesCount[card.value] = 1
      }
    }
    return false
  }
}
