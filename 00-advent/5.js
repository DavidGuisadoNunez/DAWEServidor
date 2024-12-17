function organizeShoes(shoes) {
    const pairs = new Map();
    const result = [];

    shoes.forEach(shoe => {
        const key = shoe.size;
        if (!pairs.has(key)) {
            pairs.set(key, { I: 0, R: 0 });
        }
        pairs.get(key)[shoe.type]++;
    });

    pairs.forEach((value, size) => {
        const minPairs = Math.min(value.I, value.R);
        for (let i = 0; i < minPairs; i++) {
            result.push(size);
        }
    });

    return result;
}

const shoes = [
    { type: 'I', size: 38 },
    { type: 'R', size: 38 },
    { type: 'R', size: 42 },
    { type: 'I', size: 41 },
    { type: 'I', size: 42 }
];

console.log(organizeShoes(shoes)); // [38, 42]