import Hand from "./hand"

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
  let maxRank = -1
  let ranking
  let bestHand = null
  combinations.forEach(combination => {
    const hand = new Hand()
    combination.forEach((i) => {
      hand.addCards(cards[i])
    })
    ranking = hand.getRanking()
    if (ranking > maxRank) {
      maxRank = ranking
      bestHand = hand
    }
    if (maxRank === 9) {
      return hand
    }
  })
  return bestHand
}

export { getBestHand }