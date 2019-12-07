const fs = require('fs');

function getSourceValuesFrom(programme, index) {
  const firstIndex = programme[index + 1];
  const secondIndex = programme[index + 2];
  return [programme[firstIndex], programme[secondIndex]];
}

function runProgramme(programme) {
  let index = 0;

  for (let index = 0; index < programme.length; index += 4) {
    let command = programme[index];
    if (command === 99) return programme;
    const [firstValue, secondValue] = getSourceValuesFrom(programme, index);
    const newValue = (command === 1)
      ? firstValue + secondValue
      : firstValue * secondValue;
    const targetIndex = programme[index + 3];
    programme[targetIndex] = newValue;
  }
}

function format(programme) {
  return programme.join(',')
}


function processInput(input) {
	return input.split(',').map(Number);
}

function runWithInputs(programme, { noun, verb }) {
  programme[1] = noun;
  programme[2] = verb;
  const result = runProgramme(programme);
  return result[0];
}

function clone(array) {
  return JSON.parse(JSON.stringify(array))
}

function run() {
  const file = fs.readFileSync('./input.txt', 'utf8')
  const programme = processInput(file);
  for (let noun = 0; noun <= 99; noun += 1) {
    for (let verb = 0; verb <= 99; verb += 1) {
      const result = runWithInputs(clone(programme), { noun, verb })
      if (result === 19690720) {
      // if (result === 11590668) {
        console.log({ result, noun, verb })
        return (noun * 100) + verb;
      }
    }
  }
}

console.log(run())
