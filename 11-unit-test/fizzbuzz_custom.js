export default function fizzBuzzCustom(n, conditions) {
    let result = '';
    for (const [key, value] of Object.entries(conditions)) {
        if (n % key === 0) {
            result += value;
        }
    }
    return result || n;
}
