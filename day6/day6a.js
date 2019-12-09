const { loadFile } = require('../shared/file')

function calculateOrbitsIn(orbitMap) {
  return Object.keys(orbitMap).reduce((total, object) => {
    let count = 1;
    let nextObject = orbitMap[object].parent;
    while (nextObject !== 'COM') {
      count += 1;
      if (!orbitMap[nextObject]) {
        console.log({ nextObject })
      }
      nextObject = orbitMap[nextObject].parent
    }
    return total + count;
  }, 0);
}

function storeOrbits(orbits) {
  return orbits.reduce((map, orbit) => {
    const [parent, child] = orbit.split(')');
    return Object.assign(map, { [child]: { parent } })
  }, {})
}

function getOrbitsFrom(input) {
  return input.split('\n');
}

function run(input) {
  const orbits = getOrbitsFrom(input);
  const orbitMap = storeOrbits(orbits);
  return calculateOrbitsIn(orbitMap);
}

// console.log(run(loadFile()))

module.exports = {
  run
};
