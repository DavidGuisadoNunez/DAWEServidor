var uno = ['Piedra', 'Papel', 'Tijeras'];

var dos = Math.floor(Math.random() * 3);
var tres = Math.floor(Math.random() * 3);

console.log("Jugador 1 elige: " + uno[dos]);
console.log("Jugador 2 elige: " + uno[tres]);


if (dos === tres) {
    console.log('Empate');
} else if (uno[dos] === 'Piedra' && uno[tres] === 'Tijeras') {
    console.log('Ganó jugador 1');
} else if (uno[dos] === 'Tijeras' && uno[tres] === 'Papel') {
    console.log('Ganó jugador 1');
} else if (uno[dos] === 'Papel' && uno[tres] === 'Piedra') {
    console.log('Ganó jugador 1');
} else {
    console.log('Ganó Jugador 2');
}