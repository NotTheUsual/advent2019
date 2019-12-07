const { isValidPassword, countValidPasswordsInRange } = require('./day4')

describe('day4a', () => {
  describe('isValidPassword', () => {
    it('knows 111111 is valid', () => {
      expect(isValidPassword('111111')).toBe(true)
    })

    it('knows 223450 is not valid', () => {
      expect(isValidPassword('223450')).toBe(false)
    })

    it('knows 123789 is not valid', () => {
      expect(isValidPassword('123789')).toBe(false)
    })
  })

  describe('countValidPasswordsInRange', () => {
    it('counts valid passwords in a given range', () => {
      expect(countValidPasswordsInRange(123788, 123790)).toBe(1)
    })
  })
});
