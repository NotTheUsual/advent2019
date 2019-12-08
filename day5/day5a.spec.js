const { parseCommand } = require('./day5a')

describe('day5a', () => {
  describe('parseCommand', () => {
    it('can parse 1002', () => {
      expect(parseCommand(1002)).toEqual([2, [0, 1, 0]])
    })

    it('can parse 3', () => {
      expect(parseCommand(3)).toEqual([3, [0]])
    })

    it('can parse 99', () => {
      expect(parseCommand(99)).toEqual([99])
    })
  })
});
