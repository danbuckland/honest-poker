import Deck from './deck.js'

export default class Game {
  constructor() {
    this.deck = new Deck()
  }

  reset() {
    this.deck = new Deck()
  }
}
