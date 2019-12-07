const createGridStore = () => new Proxy({}, { get: (target, name) => name in target ? target[name] : {} })
const WIRE_1 = 'W1'
const WIRE_2 = 'W2'

const createKey = ({ x, y }) => `${x}-${y}`
const parseKey = (key) => {
	const [x, y] = key.split('-')
  return { x, y }
}

function processWire(wireName, wire, store) {
  let x = 0
  let y = 0
  for (let command of wire) {
    console.log({ x, y, command })
    const [direction, distance] = command.split('')
    switch (direction) {
      case 'U': y +=  Number(distance); break;
      case 'R': x +=  Number(distance); break;
      case 'D': y -=  Number(distance); break;
      case 'L': x -=  Number(distance); break;
    }
    const key = createKey({ x, y })
    console.log({ x, y, key })
    store[key] = Object.assign(store[key], { [wireName]: true })
  }
}

function calculateResult(grid) {
  console.log({ grid })
  return Object.keys(grid).reduce((lowestValue, nextPoint) => {
    const { W1, W2 } = grid[nextPoint]
    if (!W1 || !W2) return lowestValue;
    const { x, y } = parseKey(nextPoint)
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


console.log(run(`R8,U5,L5,D3
U7,R6,D4,L4`), 6)




