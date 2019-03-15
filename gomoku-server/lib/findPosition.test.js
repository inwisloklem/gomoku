const findPosition = require('./findPosition')

const t1 = [['X', 'X', 'X'], [null, null, null], [null, null, null]]
const t2 = [[null, null, null], ['X', 'X', null], [null, null, null]]
const t3 = [[null, null, null], [null, null, null], [null, 'X', 'X']]
const t4 = [[null, 'X', null], [null, 'X', null], [null, 'X', null]]
const t5 = [[null, 'X', null], [null, 'X', null], [null, null, null]]
const t6 = [['X', null, null], [null, 'X', null], [null, null, null]]
const t7 = [['X', null, null], [null, 'X', null], [null, null, 'X']]
const t8 = [['X', null, null], [null, 'X', null], [null, null, null]]
const t9 = [[null, null, null], [null, 'X', null], [null, null, 'X']]
const t10 = [[null, null, 'X'], [null, 'X', null], ['X', null, null]]
const t11 = [[null, null, 'X'], [null, 'X', null], [null, null, null]]
const t12 = [[null, null, null], [null, 'X', null], [null, null, 'X']]

describe('findPosition', () => {
  describe('left-right', () => {
    test('finds 3 points win position', () => {
      expect(findPosition(t1, 3)).toEqual([[0, 0], [1, 0], [2, 0]])
    })
    test(`doesn't find 3 points win position`, () => {
      expect(findPosition(t2, 3)).toBe(null)
    })
    test(`doesn't find 3 points win position`, () => {
      expect(findPosition(t3, 3)).toBe(null)
    })
  })

  describe('bottom', () => {
    test('finds 3 points win position', () => {
      expect(findPosition(t4, 3)).toEqual([[1, 0], [1, 1], [1, 2]])
    })
    test(`doesn't find 3 points win position`, () => {
      expect(findPosition(t5, 3)).toBe(null)
    })
    test(`doesn't find 3 points win position`, () => {
      expect(findPosition(t6, 3)).toBe(null)
    })
  })

  describe('bottom-right', () => {
    test('finds 3 points win position', () => {
      expect(findPosition(t7, 3)).toEqual([[0, 0], [1, 1], [2, 2]])
    })
    test(`doesn't find 3 points win position`, () => {
      expect(findPosition(t8, 3)).toBe(null)
    })
    test(`doesn't find 3 points win position`, () => {
      expect(findPosition(t9, 3)).toBe(null)
    })
  })

  describe('bottom-left', () => {
    test('finds 3 points win position', () => {
      expect(findPosition(t10, 3)).toEqual([[2, 0], [1, 1], [0, 2]])
    })
    test(`doesn't find 3 points win position`, () => {
      expect(findPosition(t11, 3)).toBe(null)
    })
    test(`doesn't find 3 points win position`, () => {
      expect(findPosition(t12, 3)).toBe(null)
    })
  })
})
