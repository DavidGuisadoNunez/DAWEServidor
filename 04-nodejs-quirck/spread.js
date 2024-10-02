const array1 = [1,2,3,4,5];
const array2 = [10,20,30,40,50];

const array3 = [...array1, ...array2]; // Se rompen dos arrays y el contenido se ambos se metería en un solo array (array3).

console.log(...array3) // Se rompe el array3 y aparecen los números sin corchetes