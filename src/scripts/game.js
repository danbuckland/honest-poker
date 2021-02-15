import Deck from './deck'

export default class Game {
  constructor() {
    this.deck = new Deck()
    this.deck.shuffle()
  }

  reset() {
    this.deck = new Deck()
    this.deck.shuffle()
  }
}
