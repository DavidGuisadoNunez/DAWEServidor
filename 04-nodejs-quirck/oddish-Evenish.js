function oddishOrEvenish(number) {
    
    const digits = number.toString().split('').map(Number);
    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    return sum % 2 === 0 ? 'Evenish' : 'Oddish';
}

console.log(oddishOrEvenish(43));  
console.log(oddishOrEvenish(22));  
console.log(oddishOrEvenish(101)); 
console.log(oddishOrEvenish(123)); 