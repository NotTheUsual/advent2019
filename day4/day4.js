function hasAscendingDigits(password) {
  for (let index = 1; index < password.length; index += 1) {
    const previousDigit = Number(password[index - 1])
    const nextDigit = Number(password[index])
    if (previousDigit > nextDigit) return false
  }
  return true
}

function hasAdjacentDouble(password) {
  for (let index = 1; index < password.length; index += 1) {
    const previousDigit = password[index - 1]
    const nextDigit = password[index]
    if (previousDigit === nextDigit) return true
  }
  return false
}

function isValidPassword(password) {
  if (!hasAscendingDigits(password)) return false
  if (!hasAdjacentDouble(password)) return false
  return true
}

function countValidPasswordsInRange(firstPassword, lastPassword) {
  let count = 0
  for (let password = firstPassword; password <= lastPassword; password += 1) {
    if (isValidPassword(`${password}`)) count += 1
  }
  return count
}

function run(input) {
  const [firstPassword, lastPassword] = input.split('-').map(password => Number(password))
  return countValidPasswordsInRange(firstPassword, lastPassword)
}

console.log(run('382345-843167'))

module.exports = {
  isValidPassword,
  countValidPasswordsInRange
}
