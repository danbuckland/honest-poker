import Deck from './deck'

export default class Game {
  constructor() {
    this.deck = new Deck()
  }

  reset() {
    this.deck = new Deck()
  }
}
