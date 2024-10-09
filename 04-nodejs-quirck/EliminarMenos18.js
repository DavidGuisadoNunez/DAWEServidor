function eliminarMenos18(arr) {
    return arr.filter(num => num >= 18);
}


console.log(eliminarMenos18([12, 25, 18, 30, 16, 22])); 
console.log(eliminarMenos18([5, 10, 15]));              
console.log(eliminarMenos18([18, 19, 20, 17, 16]));     
console.log(eliminarMenos18([30, 25, 28]));             