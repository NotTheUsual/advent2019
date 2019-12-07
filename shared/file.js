const fs = require('fs')

const loadFile = (fileName = './input.txt') => {
	return fs.readFileSync(fileName, 'utf8')
}

module.exports = {
  loadFile
}
