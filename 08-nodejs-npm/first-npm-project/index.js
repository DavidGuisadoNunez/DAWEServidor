import { faker } from '@faker-js/faker';
import chalk from 'chalk';

const colors = [
  chalk.red,
  chalk.green,
  chalk.blue,
  chalk.yellow,
  chalk.magenta,
  chalk.cyan,
  chalk.white,
  chalk.gray,
];

const randomName = faker.name.firstName();

const randomColor = colors[Math.floor(Math.random() * colors.length)];

console.log(randomColor(randomName));