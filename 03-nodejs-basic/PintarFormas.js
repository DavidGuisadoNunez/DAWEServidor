
function dibujarCuadrado(tamaño) {
    console.log("Cuadrado:");
    for (let i = 0; i < tamaño; i++) {
        console.log("* ".repeat(tamaño));
    }
    console.log(""); 
}


function dibujarTriangulo(tamaño) {
    console.log("Triángulo:");
    for (let i = 1; i <= tamaño; i++) {
        console.log("* ".repeat(i));
    }
    console.log(""); 
}


dibujarCuadrado(5);   
dibujarTriangulo(5); 