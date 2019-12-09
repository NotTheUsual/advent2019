const { run, getOrbitsFrom, storeOrbits, calculatePathFrom } = require('./day6b')

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
K)L
K)YOU
I)SAN`;

describe('day6b', () => {
  it('passes the test case', () => {
    expect(run(testInput)).toBe(4)
  })

  describe('calculatePathFrom', () => {
    function generateOrbitMap() {
      const orbits = getOrbitsFrom(testInput);
      return storeOrbits(orbits);
    }

    it('can calculate the path from H', () => {
      const orbitMap = generateOrbitMap();
      expect(calculatePathFrom('H', orbitMap)).toEqual(['COM', 'B', 'G']);
    })

    it('can calculate the path from K', () => {
      const orbitMap = generateOrbitMap();
      expect(calculatePathFrom('K', orbitMap)).toEqual(['COM', 'B', 'C', 'D', 'E', 'J']);
    })
  });
});
