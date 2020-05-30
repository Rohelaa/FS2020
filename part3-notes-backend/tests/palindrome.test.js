const palindrome = require('../utils/for_testing').palindrome

test('palindrome of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tkaer')
})

test('palindrome of saippuakauppias', () => {
  const result = palindrome('saippuakauppias')

  expect(result).toBe('saippuakauppias')
})