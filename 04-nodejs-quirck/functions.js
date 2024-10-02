// function myFunc(params = 'Gabriel', params2= 'Rodríguez'){ // Esto toma que si no recibe parámetros, toma esto por defecto
//     console.log(params);
//     console.log(params, params2);
// }

// myFunc();
// myFunc('Gabri', 123);



function myFunc2(name, n, ...numbers) {
    console.log(name);
    console.log(numbers);
}

myFunc2('Gabriel', 1,2,3,4,'Daviddd',5,6); // El 1 se guarda en n, y por eso no lo pinta.



// Exactamente igual que la de arriba pero se guarda en una variable.
const myVarFunc = function myFunc2(name, n, ...numbers) {
    console.log(name);
    console.log(numbers);
}

myVarFunc('Gabriel', 1,2,3,4,'Daviddd',5,6);
