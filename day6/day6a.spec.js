const { run } = require('./day6a')

const testInput = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

describe('day6a', () => {
  it('can parse the test', () => {
    expect(run(testInput)).toBe(42)
  })
});
