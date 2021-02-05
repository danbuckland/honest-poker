class Game {
  constructor() {
    this.deck = new Deck()
    this.deck.shuffle()
  }
}

class Deck {
  constructor() {
    this.cards = []

    const suits = ["Clubs", "Diamonds", "Hearts", "Spades"]
    const names = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]
    const valueCodes = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]

    suits.forEach((suit) => {
      names.forEach((name, i) => {
        this.cards.push(new Card(name, suit, (i + 1), (valueCodes[i] + suit[0])))
      })
    })
  }

  shuffle() {
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    const { cards } = this;
    let m = cards.length, i;
  
    while (m) {
      i = Math.floor(Math.random() * m--);
  
      [cards[m], cards[i]] = [cards[i], cards[m]];
    }
  
    return this;
  }

  draw(n) {
    let drawnCards = []
    for (let i = 0; i < n && this.cards.length; i++) {
      drawnCards.push(this.cards.pop())
    }
    return drawnCards
  }

  printDeck() {
    let deck = "";
    for (let card of this.cards) {
      deck += `${card.code}, `
    }
    console.log(deck)
  }
}

class Card {
  constructor(name, suit, value, code) {
    this.name = name
    this.suit = suit
    this.value = value
    this.code = code
  }
}
