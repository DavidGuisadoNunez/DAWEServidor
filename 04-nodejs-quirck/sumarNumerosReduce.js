function sumaArray(arr) {
    return arr.reduce((acumulador, siguienteValor) => acumulador + siguienteValor, 0);
}


console.log(sumaArray([1, 2, 3, 4]));         
console.log(sumaArray([5, 10, 15]));          
console.log(sumaArray([-1, -2, -3, -4]));     
console.log(sumaArray([]));       