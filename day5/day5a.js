const readline = require('readline-sync');
const { loadFile } = require('../shared/file')

function parameterLengthFor(opcode) {
  switch (opcode) {
    case 1:
    case 2:
      return 3;
    case 3:
    case 4:
      return 1;
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

// run('3,0,4,0,99')
run(loadFile())

// 907493 -> too low

module.exports = {
  parseCommand
};
