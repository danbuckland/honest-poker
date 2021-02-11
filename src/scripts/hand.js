export default class Hand {
  constructor(...cards) {
    this.cards = [...cards]
  }

  addCards(...cards) {
    cards.forEach(card => this.cards.push(card))
  }

  empty() {
    this.cards = []
  }

  containsPair() {
    if (this.cards.length < 2) { return false }
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