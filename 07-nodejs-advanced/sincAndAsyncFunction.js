function suma(a, b) {
    return a + b;
}

function sumaAsincrona(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000); 
    });
}


console.log('Suma síncrona:', suma(5, 3));


sumaAsincrona(5, 3).then(resultado => {
    console.log('Suma asíncrona:', resultado);
});