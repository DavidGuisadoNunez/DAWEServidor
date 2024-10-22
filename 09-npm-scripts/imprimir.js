const chalk = require('chalk');

const color = process.argv[2];
const message = process.argv[3] || 'Mensaje por defecto';

switch (color) {
  case 'azul':
    console.log(chalk.blue(message));
    break;
  case 'rojo':
    console.log(chalk.red(message));
    break;
  case 'verde':
    console.log(chalk.green(message));
    break;
  default:
    console.error('Color no válido. Usa: azul, rojo, o verde.');
    process.exit(1);
}