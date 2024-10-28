import chalk from 'chalk';
function calcularSuma(a, b) {
    return a + b;
}

function suma() {
    const num1 = 5;
    const num2 = 10;
    const sum = calcularSuma(num1, num2);
    console.log(chalk.green(`La suma de ${num1} y ${num2} es: ${sum}`));
}

suma();