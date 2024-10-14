import chalk from 'chalk';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son cero-indexados
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return { year, month, day, hours, minutes, seconds };
};

setInterval(() => {
  const now = new Date();
  const { year, month, day, hours, minutes, seconds } = formatDate(now);

  // Define la parte de fecha y hora
  const datePart = `${day}-${month}-${year}`;
  const timePart = `${hours}:${minutes}:${seconds}`;

  if (seconds === '00' || seconds % 10 === 0) {
    console.log(`${datePart} ${chalk.green(timePart)}`);
  } else {
    console.log(`${datePart} ${timePart}`);
  }
}, 1000);