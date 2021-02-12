import Card from './card'

test('card constructor works', () => {
  const card = new Card('Jack', 'Clubs', 11, 'JC')

  expect(card.name).toBe('Jack')
  expect(card.suit).toBe('Clubs')
  expect(card.value).toBe(11)
  expect(card.code).toBe('JC')
})
