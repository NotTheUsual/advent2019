const fs = require('fs')

const createGridStore = () => new Proxy({}, { get: (target, name) => name in target ? target[name] : {} })
const WIRE_1 = 'W1'
const WIRE_2 = 'W2'

const createKey = ({ x, y }) => `${x}/${y}`
const parseKey = (key) => {
	const [x, y] = key.split('/')
  return { x, y }
}

const parseCommand = (command) => {
  const [direction, ...distances] = command
  const distance = Number(distances.join(''))
  return [direction, distance];
}

function processWire(wireName, wire, store) {
  let x = 0
  let y = 0
  for (let command of wire) {
    const [direction, distance] = parseCommand(command)
    switch (direction) {
      case 'U':
        for (let dY = 1; dY <= distance; dY += 1) {
          const key = createKey({ x, y: y + dY })
          store[key] = Object.assign(store[key], { [wireName]: true })
        }
        y +=  distance;
        break;
      case 'R':
        for (let dX = 1; dX <= distance; dX += 1) {
          const key = createKey({ x: x + dX, y })
          store[key] = Object.assign(store[key], { [wireName]: true })
        }
        x +=  distance;
        break;
      case 'D':
        for (let dY = 1; dY <= distance; dY += 1) {
          const key = createKey({ x, y: y - dY })
          store[key] = Object.assign(store[key], { [wireName]: true })
        }
        y -=  distance;
        break;
      case 'L':
        for (let dX = 1; dX <= distance; dX += 1) {
          const key = createKey({ x: x - dX, y })
          store[key] = Object.assign(store[key], { [wireName]: true })
        }
        x -=  distance;
        break;
    }
  }
}

function calculateResult(grid) {
  return Object.keys(grid).reduce((lowestValue, nextPoint) => {
    const { W1, W2 } = grid[nextPoint]
    if (!W1 || !W2) return lowestValue;
    const { x, y } = parseKey(nextPoint)
    if (y === '') console.log({ nextPoint })
    const nyDistance = Math.abs(x) + Math.abs(y);
    return (!lowestValue || nyDistance < lowestValue)
      ? nyDistance
      : lowestValue;
  }, null)
}

const parseLine = line => line.split(',')
const parseInput = input => input.split('\n').map(parseLine)

function run(input) {
  const grid = createGridStore()
  const [wire1, wire2] = parseInput(input)
  processWire(WIRE_1, wire1, grid)
  processWire(WIRE_2, wire2, grid)
  const result = calculateResult(grid)
  return result;
}

const loadInput = () => {
  return fs.readFileSync('./input.txt', 'utf8')
}


console.log(run(`R8,U5,L5,D3
U7,R6,D4,L4`), 6)
console.log(run(`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`), 159)
console.log(run(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`), 135)

console.log(run(loadInput()))




