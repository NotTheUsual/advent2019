const { loadFile } = require('../shared/file')

function calculatePathFrom(object, orbitMap) {
  let nextObject = orbitMap[object].parent;
  let path = [nextObject];
  while (nextObject !== 'COM') {
    nextObject = orbitMap[nextObject].parent
    path.unshift(nextObject)
  }
  return path;
}

function calculateRouteLength(orbitMap) {
  const mePath = calculatePathFrom('YOU', orbitMap);
  const santaPath = calculatePathFrom('SAN', orbitMap);
  for (let i = 1; i < mePath.length; i += 1) {
    if (mePath[i] !== santaPath[i]) {
      return mePath.slice(i).length + santaPath.slice(i).length;
    }
  }
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
  return calculateRouteLength(orbitMap);
}

// console.log(run(loadFile()))

module.exports = {
  getOrbitsFrom,
  storeOrbits,
  calculatePathFrom,
  run
};
