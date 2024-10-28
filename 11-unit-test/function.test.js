
const {sum} = require('./function');

test('3 + 4 should be 7', () => {
    const result = sum(3, 4);
    expect(result).toBe(7);
});

test('2 + 4 should be 6', () => {
    const result = sum(2, 4);
    expect(result).toBe(6);
});