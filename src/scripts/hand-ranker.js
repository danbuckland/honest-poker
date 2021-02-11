export const containsPair = (cards) => {
  if (cards.length < 2) { return false }
  let valuesCount = {}
  for (const card of cards) {
    if (valuesCount[card.value] === 1) {
      return true
    } else {
      valuesCount[card.value] = 1
    }
  }
  return false
}