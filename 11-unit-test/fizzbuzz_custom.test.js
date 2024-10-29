import fizzBuzzCustom from './fizzbuzz_custom';

test('Should return 1', () => {
    expect(fizzBuzzCustom(1, { 2: 'poo', 3: 'fizz', 5: 'buzz' })).toBe(1);
});

test('Should return fizz', () => {
    expect(fizzBuzzCustom(3, { 2: 'poo', 3: 'fizz', 5: 'buzz' })).toBe('fizz');
});

test('Should return buzz', () => {
    expect(fizzBuzzCustom(5, { 2: 'poo', 3: 'fizz', 5: 'buzz' })).toBe('buzz');
});

test('Should return fizzbuzz for custom conditions', () => {
    const conditions = { 3: 'fizz', 5: 'buzz', 15: 'foo' };
    expect(fizzBuzzCustom(15, conditions)).toBe('fizzbuzzfoo');
});