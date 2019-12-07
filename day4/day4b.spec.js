const { isValidPassword } = require('./day4b')

describe('day4b', () => {
  describe('isValidPassword', () => {
    it('knows 112233 is valid', () => {
      expect(isValidPassword('112233')).toBe(true)
    })

    it('knows 123444 is not valid', () => {
      expect(isValidPassword('123444')).toBe(false)
    })

    it('knows 111122 is valid', () => {
      expect(isValidPassword('111122')).toBe(true)
    })

    it('knows 223450 is not valid', () => {
      expect(isValidPassword('223450')).toBe(false)
    })

    it('knows 123789 is not valid', () => {
      expect(isValidPassword('123789')).toBe(false)
    })
  })
});
