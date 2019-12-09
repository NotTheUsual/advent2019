const readline = require('readline-sync');
const { loadFile } = require('../shared/file')

function parameterLengthFor(opcode) {
  switch (opcode) {
    case 3:
    case 4:
      return 1;
    case 5:
    case 6:
      return 2;
    case 1:
    case 2:
    case 7:
    case 8:
      return 3;
    default:
      return 0;
  }
}

function parseParameterModes(instruction, parameterLength) {
   return `${instruction}`
     .slice(0, -2)
     .padStart(parameterLength, '0')
     .split('')
     .reverse()
     .map(x => Number(x));
}

const parseCommand = (command) => {
  if (command === 99) return [command];
  const opcode = Number(`${command}`.slice(-2));
  const parameterLength = parameterLengthFor(opcode);
  const parameterModes = parseParameterModes(command, parameterLength);
  return [opcode, parameterModes];
}

function runProgramme(programme) {
  let nextJump = 0;

  for (let index = 0; index < programme.length; index += nextJump) {
    const [opCode, parameterModes] = parseCommand(programme[index]);
    if (opCode === 99) return programme;

    nextJump = 1 + parameterLengthFor(opCode);
    const inputs = programme.slice(index + 1, index + nextJump);
    const args = inputs.map((input, i) => {
      if (parameterModes[i] === 0) return programme[input];
      if (parameterModes[i] === 1) return input;
    })

    switch (opCode) {
      case 1:
        const newValue1 = args[0] + args[1];
        programme[inputs[2]] = newValue1;
        continue;
      case 2:
        const newValue2 = args[0] * args[1];
        programme[inputs[2]] = newValue2;
        continue;
      case 3:
        const newValue3 = Number(readline.question('Input value: '));
        programme[inputs[0]] = newValue3;
        continue;
      case 4:
        console.log(args[0]);
        continue;
      case 5:
        if (args[0] !== 0) {
          index = args[1];
          nextJump = 0;
        }
        continue;
      case 6:
        if (args[0] === 0) {
          index = args[1];
          nextJump = 0;
        }
        continue;
      case 7:
        if (args[0] < args[1]) {
          programme[inputs[2]] = 1
        } else {
          programme[inputs[2]] = 0
        }
        continue;
      case 8:
        if (args[0] === args[1]) {
          programme[inputs[2]] = 1
        } else {
          programme[inputs[2]] = 0
        }
        continue;
    }
  }
}

function parseInput(input) {
  return input.split(',').map(Number);
}

function run(input) {
  let programme = parseInput(input)
  runProgramme(programme)
  // console.log(`DONE: ${programme}`)
}

// run('3,9,8,9,10,9,4,9,99,-1,8')
// run('3,9,7,9,10,9,4,9,99,-1,8')
// run('3,3,1108,-1,8,3,4,3,99')
// run('3,3,1107,-1,8,3,4,3,99')
// run('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9')
// run('3,3,1105,-1,9,1101,0,0,12,4,12,99,1')
// run('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')

run(loadFile('./day5/input.txt'))

// 907493 -> too low

module.exports = {
  run
};
