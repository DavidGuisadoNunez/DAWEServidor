function createXmasTree(height, ornament) {
    let tree = '';
    for (let i = 0; i < height; i++) {
        let spaces = '_'.repeat(height - i - 1);
        let ornaments = ornament.repeat(2 * i + 1);
        tree += spaces + ornaments + spaces + '\n';
    }
    let trunk = '_'.repeat(height - 1) + '#' + '_'.repeat(height - 1);
    tree += trunk + '\n' + trunk;
    return tree;
}

console.log(createXmasTree(3, '*'));