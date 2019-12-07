const { loadFile } = require('../shared/file')

const createGridStore = () => new Proxy({}, { get: (target, name) => name in target ? target[name] : {} })
const WIRE_1 = 'W1'
const WIRE_2 = 'W2'

class Store {
  constructor () {
    this.grid = createGridStore();
    this.history = {
      [WIRE_1]: [createKey({ x: 0, y: 0 })],
      [WIRE_2]: [createKey({ x: 0, y: 0 })]
    }
  }

  save(position, wire) {
    const key = createKey(position)
    this.grid[key] = Object.assign(this.grid[key], { [wire]: true })
    this.history[wire].push(key)
  }

  get intersections() {
    return Object.keys(this.grid).reduce((intersections, gridPoint) => {
      const { W1, W2 } = this.grid[gridPoint]
      if (!W1 || !W2) return intersections;
      return intersections.concat([gridPoint])
    }, [])
  }

  totalStepsTo(point) {
    const w1Distance = this.history[WIRE_1].indexOf(point)
    const w2Distance = this.history[WIRE_2].indexOf(point)
    if (!w1Distance || !w2Distance) return 9999999999999;
    return w1Distance + w2Distance;
  }
}



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
          store.save({ x, y: y + dY }, wireName)
        }
        y +=  distance;
        break;
      case 'R':
        for (let dX = 1; dX <= distance; dX += 1) {
          store.save({ x: x + dX, y }, wireName)
        }
        x +=  distance;
        break;
      case 'D':
        for (let dY = 1; dY <= distance; dY += 1) {
          store.save({ x, y: y - dY }, wireName)
        }
        y -=  distance;
        break;
      case 'L':
        for (let dX = 1; dX <= distance; dX += 1) {
          store.save({ x: x - dX, y }, wireName)
        }
        x -=  distance;
        break;
    }
  }
}

function calculateResult(grid) {
  return grid.intersections.reduce((lowestValue, nextPoint) => {
    const steps = grid.totalStepsTo(nextPoint)
    return (!lowestValue || steps < lowestValue)
      ? steps
      : lowestValue;
  }, null)
}

const parseLine = line => line.split(',')
const parseInput = input => input.split('\n').map(parseLine)

function run(input) {
  const grid = new Store()
  const [wire1, wire2] = parseInput(input)
  processWire(WIRE_1, wire1, grid)
  processWire(WIRE_2, wire2, grid)
  const result = calculateResult(grid)
  return result;
}


console.log(run(`R8,U5,L5,D3
U7,R6,D4,L4`), 30)
console.log(run(`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`), 610)
console.log(run(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`), 410)

console.log(run(loadFile()))




