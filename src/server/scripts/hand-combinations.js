import Hand from './hand'

const combinations = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 5],
  [0, 1, 2, 3, 6],
  [0, 1, 2, 4, 5],
  [0, 1, 2, 4, 6],
  [0, 1, 2, 5, 6],
  [0, 1, 3, 4, 5],
  [0, 1, 3, 4, 6],
  [0, 1, 3, 5, 6],
  [0, 1, 4, 5, 6],
  [0, 2, 3, 4, 5],
  [0, 2, 3, 4, 6],
  [0, 2, 3, 5, 6],
  [0, 2, 4, 5, 6],
  [0, 3, 4, 5, 6],
  [1, 1, 2, 3, 4],
  [1, 2, 3, 4, 6],
  [1, 2, 3, 5, 6],
  [1, 2, 4, 5, 6],
  [1, 3, 4, 5, 6],
  [2, 3, 4, 5, 6],
]

// Takes 7 cards and returns the rank of the best hand
const getBestHand = (cards) => {
  let highScore = -1
  let bestHand = null
  combinations.forEach((combination) => {
    const selectedCards = []
    combination.forEach((i) => selectedCards.push(cards[i]))
    const hand = new Hand(...selectedCards)
    if (hand.score > highScore) {
      highScore = hand.score
      bestHand = hand
    }
    if (highScore === 9000000) return hand
  })
  return bestHand
}

export { getBestHand }
