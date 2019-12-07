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

function runTest(input) {
  const programme = processInput(input);
  const result = runProgramme(programme);
  return format(result);
}

console.log(runTest(`1,0,0,0,99`), `2,0,0,0,99`)
console.log(runTest(`2,3,0,3,99`), `2,3,0,6,99`)
console.log(runTest(`2,4,4,5,99,0`), `2,4,4,5,99,9801`)
console.log(runTest(`1,1,1,4,99,5,6,0,99`), `30,1,1,4,2,5,6,0,99`)
console.log(runTest(`1,9,10,3,2,3,11,0,99,30,40,50`), `3500,9,10,70,2,3,11,0,99,30,40,50`)


function runReal() {
  const file = fs.readFileSync('./input.txt', 'utf8')
  const programme = processInput(file);
  programme[1] = 12;
  programme[2] = 2;
  const result = runProgramme(programme);
  return result[0];
}

console.log('REAL', runReal())
