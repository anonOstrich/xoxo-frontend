const testableFunction = require('../src/index.js')

test('Simple test passes', () => {
    expect(testableFunction(1, 2)).toBe(3)
})