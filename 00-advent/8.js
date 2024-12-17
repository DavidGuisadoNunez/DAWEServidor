function drawRace(indices, length) {
    const result = [];
    for (let i = 0; i < indices.length; i++) {
        let row = ' '.repeat(i) + '~'.repeat(length) + ' /' + (i + 1);
        if (indices[i] > 0 && indices[i] < length) {
            row = row.substring(0, indices[i] + i) + 'r' + row.substring(indices[i] + i + 1);
        } else if (indices[i] < 0 && Math.abs(indices[i]) <= length) {
            row = row.substring(0, length + indices[i] + i) + 'r' + row.substring(length + indices[i] + i + 1);
        }
        result.push(row);
    }
    return result.join('\n');
}

console.log(drawRace([0, 5, -3], 10));
