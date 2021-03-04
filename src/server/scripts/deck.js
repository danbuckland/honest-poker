import Card from './card.js'

export default class Deck {
  constructor() {
    this.cards = []

    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
    const names = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
    const valueCodes = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A']

    suits.forEach((suit) => {
      names.forEach((name, i) => {
        this.cards.push(new Card(name, suit, i + 2, valueCodes[i] + suit[0]))
      })
    })

    this.#shuffle()
  }

  #shuffle() {
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    const { cards } = this
    let m = cards.length
    let i

    while (m) {
      i = Math.floor(Math.random() * m--)
      ;[cards[m], cards[i]] = [cards[i], cards[m]]
    }

    return this
  }

  draw(numberOfCards = 1) {
    if (numberOfCards === 1) return this.cards.pop()
    let drawnCards = []
    for (let i = 0; i < numberOfCards && this.cards.length; i++) {
      drawnCards.push(this.cards.pop())
    }
    return drawnCards
  }
}
